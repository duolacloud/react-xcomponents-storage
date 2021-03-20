import { Storage } from '../../storage';
import COS from 'cos-js-sdk-v5';

const formatUrl = url => {
  if (!url) {
    return '';
  }

  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }

  if (url.startsWith('//')) {
    return url.replace('//', 'https://');
  }

  if (url.startsWith('https://')) {
    return url;
  }

  return `https://${url}`;
};

class COSStorage implements Storage {
  private cos: COS;

  constructor(opts) {
    this.cos = new COS({
      getAuthorization: (options, callback) => {
        opts.getCredentials(options, credentials => {
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            XCosSecurityToken: credentials.sessionToken,
            StartTime: credentials.startTime / 1000, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            ExpiredTime: credentials.expiredTime / 1000, // 时间戳，单位秒，如：1580000900
          });
        });
      },
    });
  }

  sliceUploadFile(options) {
    this.cos.sliceUploadFile(
      {
        Bucket: options.bucket,
        Region: options.region,
        Key: options.key,
        Body: options.body,
        onHashProgress: options.onHashProgress,
        onProgress: options.onProgress,
      },
      (err, data) => {
        if (err != null) {
          options.onError(err);
          return;
        }
        options.onSuccess(
          { ...data, url: formatUrl(data.Location) },
          options.file,
        );
      },
    );
  }
}

globalThis._storage_platforms['cos'] = options => new COSStorage(options);

export default COSStorage;

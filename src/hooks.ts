import { useMemo } from 'react';
import { create } from './storage';

interface Options {
  platform: string;
  bucket: string;
  region: string;
  getCredentials?: (opts: Options, callback: (credentials) => void) => void;
  onUpload?: (files: any[]) => void;
}

export interface Result {
  props: any;
}

export function useUpload(options: Options): Result {
  const storage = useMemo(
    () =>
      create({
        platform: options.platform,
        getCredentials: options.getCredentials,
      }),
    [options],
  );

  const props = {
    beforeUpload: file => {
      return true; // 返回 false 会阻止上传，需要手工去激活上传
    },
    customRequest: async ({ file, onError, onProgress, onSuccess }) => {
      // 这里指定上传目录和文件名 file.name
      const key = `${Date.now()}.${file.name}`;

      storage.sliceUploadFile({
        bucket: options.bucket,
        region: options.region,
        key,
        body: file,
        onHashProgress: progress => {
          console.log('校验中', progress);
        },
        onProgress: progress => {
          const { loaded, total } = progress;
          onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file,
          );
        },
        onError,
        onSuccess: res => {
          onSuccess(res, file);
        },
      });

      return {
        abort() {
          console.log('upload progress is aborted.');
        },
      };
    },
  };

  return {
    props,
  };
}

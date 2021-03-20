---
hero:
  title: Storage
  desc: 无服务端 Storage 组件
  actions:
    - text: 在线Demo
      link: /playground
---

### 安装

```bash
npm i @xcomponents/storage
```

### 使用

```js
import React, { useState } from 'react';
import Storage from '@xcomponents/storage';
import { Upload } from 'antd';

const Demo = () => {
  const storage = Storage.create({
    platform: 'cos',
  });

  const bucket = '';
  const region = '';

  const uploadProps = {
    accept: '*',
    beforeUpload: file => {
      return true; // 返回 false 会阻止上传，需要手工去激活上传
    },
    customRequest: async ({ file, onError, onProgress, onSuccess }) => {
      storage.sliceUploadFile({
        bucket: bucket,
        region: region,
        key,
        body: file,
        onHashProgress: progress => {
          console.log('校验中', progress);
        },
        onProgress: progress => {
          const { loaded, total } = progress;
          console.log(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file,
          );
        },
        onError,
        onSuccess: res => {
          console.log('complete: ', res);
        },
      });
    },
  };

  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleChange = ({ fileList }) => {
    setFilesToUpload(fileList);
  };

  return (
    <>
      上传文件
      <Upload
        listType="picture-card"
        fileList={filesToUpload}
        onChange={handleChange}
        multiple={true}
        {...uploadProps}
      />
    </>
  );
};

export default Demo;
```

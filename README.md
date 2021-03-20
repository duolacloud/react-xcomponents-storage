# Storage baas 服务组件

storage

## Storage

- 支持平台：
  - Amazon
  - 腾讯云
  - 阿里云
  - 七牛

### 安装

```bash
npm i @xcomponents/storage
```

### 使用

```js
import React, { useState } from 'react';
import { useUpload } from '@xcomponents/storage';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Demo = () => {
  console.log('Storage', Storage);

  const { props: uploadProps, files } = useUpload({
    platform: 'cos',
    bucket: 'bucket-11',
    region: 'region-21',
    getCredentials: (options, callback) => {
      console.log('getCredentials');
      const credentials = {}; // TODO 从服务端获取 credentials
      callback(credentials);
    },
    onUpload: (files: any[]) => {
      console.log('上传', files);
    },
  });

  return (
    <>
      上传文件
      <Upload listType="picture-card" multiple={false} {...uploadProps}>
        <PlusOutlined />
      </Upload>
    </>
  );
};

export default Demo;
```

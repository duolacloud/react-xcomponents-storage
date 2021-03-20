globalThis._storage_platforms = [];

export interface Storage {
  sliceUploadFile(options);
}

export interface Options {
  platform: string;
  getCredentials?: (opts: Options, callback: (credentials) => void) => void;
}

export function create(options: Options): Storage {
  // TODO 根据 channel 进行实例化
  const fn = globalThis._storage_platforms[options.platform];
  return fn(options);
}

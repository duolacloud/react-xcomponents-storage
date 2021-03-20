import * as Storage from './storage';

import COSStorage from './plugins/cos';
export { COSStorage };

export { useUpload, Result } from './hooks';
export default Storage;

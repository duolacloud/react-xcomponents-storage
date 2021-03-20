import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Storage',
  favicon: 'http://www.foo.com',
  logo: 'http://www.foo.com',
  navs: [
    null,
    {
      title: 'Storage',
      path: 'https://github.com./duolacloud/react-xcomponents-storage',
    },
    {
      title: 'GitHub',
      path: 'https://github.com./duolacloud/react-xcomponents-storage',
    },
    {
      title: '更新日志',
      path:
        'https://github.com./duolacloud/react-xcomponents-storage/blob/master/CHANGELOG.md',
    },
  ],
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/storage/',
  publicPath: '/storage/',
  exportStatic: {},
  // more config: https://d.umijs.org/config
});

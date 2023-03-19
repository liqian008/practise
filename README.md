# react-app-rewired 使用

create-creact-app 项目，如果需要手动修改配置，需先 npm run eject 弹出配置，这个过程是不可逆的，所以推荐使用第三方工具去修改。

react-app-rewired 的作用是用来帮助你重写 react 脚手架配置

react-app-rewired@2.x版本需要搭配customize-cra使用。

customize-cra的作用是帮助你自定义 react 脚手架 2.x 版本配置

###  基本使用

安装：

```shell 
npm i react-app-rewired customize-cra --save-dev
```

在根目录下新建文件config-overrides.js文件

```javascript
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config
}
```


修改 package.json 文件
```json
{
  // ...
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  // ...
}
```

### 使用 Less

安装 less 和 less-loader：

```shell 
npm i less less-loader --save-dev
```
### 修改 config-overrides.js 文件

```javascript
const {
  override,
  // ...
  addLessLoader,
  // ...
} = require('customize-cra')

module.exports = override(
  // ...
  // less
  // addLessLoader(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // Optionally adjust URLs to be relative. When false, URLs are already relative to the entry less file.
      relativeUrls: false,
      modifyVars: { '@primary-color': '#A80000' },
      // cssModules: {
      //   // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      //   localIdentName: "[path][name]__[local]--[hash:base64:5]",
      // }
    }
  })
  // ...
)
```

### 配置打包输出目录

```javascript
/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const { override, addLessLoader } = require('customize-cra');
const { aliasDangerous, configPaths } = require('react-app-rewire-alias/lib/aliasDangerous');
const paths = require('react-scripts/config/paths');

const processDefine = Object.entries(process.env).reduce(
  (res, [key, value]) => ({
    ...res,
    [`process.env.${key}`]: JSON.stringify(value),
  }),
  {},
);

module.exports = {
  webpack: override(
    // removeModuleScopePlugin(), // 为了导入根目录的common，cra默认只能导入src下的文件
    // addWebpackAlias({
    //   '@common': path.resolve(__dirname, '../common'),
    //   '@environment': path.resolve(__dirname, './src/enviroment'),
    // }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
    (config, env) => {
      // 配置打包目录输出到 ../dist/public 目录中
      paths.appBuild = path.join(__dirname, '../dist/public');
      config.output.path = paths.appBuild;
      config.output.publicPath = './';
      config.plugins.push(new webpack.DefinePlugin(processDefine));

      // NOTE: 解决 create-react-app imports restriction outside of src directory 的限制
      aliasDangerous(configPaths('tsconfig.paths.json'))(config);

      return config;
    },
  ),
};
```

### 添加别名

修改 config-overrides.js 文件

```javascript
const {
  override,
  // ...
  addWebpackAlias
} = require('customize-cra')
const path = require('path')

module.exports = override(
  // ...
  // 路径别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  })
)
```

### 配置多环境

安装 dotenv-cli：

```shell
npm i dotenv-cli --save-dev
```

在根目录下添加.env.dev 文件

```conf
REACT_APP_URL_API=http://dev.com
REACT_APP_URL_UPLOAD=http://upload.dev.com
```

在根目录下添加.env.prod 文件
```conf
REACT_APP_URL_API=http://prod.com
REACT_APP_URL_UPLOAD=http://upload.prod.com
```

修改 package.json 文件
```json
{
  // ...
  "scripts": {
    "start": "dotenv -e .env.dev react-app-rewired start",
    "build:prod": "dotenv -e .env.prod react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  // ...
}
```

在 index.html 中使用%REACT_APP_URL_API%

在 js/jsx 中：process.env.REACT_APP_URL_API


### proxy

开发环境下跨域问题，前端一般是给本地的 devServer 设置代理

安装 http-proxy-middleware：

```shell 
npm i http-proxy-middleware --save-dev
```

在 src/目录下新建文件 setupProxy.js（注意：文件名不能修改！！cra 会按照 src/setupProxy.js 这个路径解析）

```javascript
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:3001/',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': ''
      // }
    })
  )
}
```

重新启动即可

http-proxy-middleware 的 1.x 版本做了较大改动。

以上方法配置会出现 proxy is not a function 的问题

解决办法是修改 src/setupProxy.js 文件

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:3001/',
    changeOrigin: true,
    // pathRewrite: {
    //   '^/api': ''
    // }
  }))
```


### 参考资料

https://www.jianshu.com/p/352e33c56d55

http://wmm66.com/index/article/detail/id/165.html
const { override, addWebpackAlias, addDecoratorsLegacy, fixBabelImports } = require('customize-cra');
const addLessLoader = require("customize-cra-less-loader");
const path = require('path');

module.exports = override(
  // 配置装饰器
  addDecoratorsLegacy(),
  // 配置别名
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  }),
  // antd样式
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // 配置less
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#038fde',
        }
      }
    }
  }),
  (config) => {
      // 修改、添加 loader 配置 :
      // 所有的 loaders 规则是在 config.module.rules 的第二项的 oneOf 中
      // 即：config.module.rules[2].oneof (具体可以打印一下看是第几项目)
      // 修改 less 配置，less在第9项, module.less在第10项 (具体可以打印配置)
      const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
      // *.less
      loaders[9].use.push({
        loader: 'style-resources-loader',
        options: {
          patterns: path.resolve(__dirname, 'src/style/variable.less') // 全局引入公共的less文件
        }
      })
      // *.module.less
      loaders[10].use.push({
        loader: 'style-resources-loader',
        options: {
          patterns: path.resolve(__dirname, 'src/style/variable.less') // 全局引入公共的less文件
        }
      })
    return config
  }
);
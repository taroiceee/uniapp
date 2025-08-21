// vue.config.js
// 生产 / 开发通用配置
const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'
const devServerPort = 8081

const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()

module.exports = {
  lintOnSave: !IS_PROD,
  productionSourceMap: false,

  devServer: {
    port: devServerPort,
    open: false,
    // webpack-dev-server v4 的 overlay 写在 client 下
    client: {
      overlay: { warnings: false, errors: true }
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_HOST + process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: { ['^' + process.env.VUE_APP_BASE_API]: '' }
      }
    }
  },

  // 用对象/函数返回，避免和 cli 内置配置冲突
  configureWebpack: () => {
    return {
      devtool: IS_PROD ? false : 'source-map',
      plugins: [
        // uni-read-pages：在构建期注入 ROUTES
        new webpack.DefinePlugin({
          ROUTES: webpack.DefinePlugin.runtimeValue(() => {
            const tfPages = new TransformPages({
              includes: ['path', 'name', 'aliasPath', 'meta']
            })
            return JSON.stringify(tfPages.routes)
          }, true)
        })
      ],
      resolve: {
        // 关键点：禁用旧 polyfill 入口，彻底避免浏览器端 require/exports 冲突
        alias: {
          '@babel/polyfill$': path.resolve(__dirname, 'src/shims/empty.js'),
          'babel-polyfill$': path.resolve(__dirname, 'src/shims/empty.js')
        },
        // webpack5 不再内置 node core 模块，按需关闭即可
        fallback: {
          crypto: false,
          stream: false,
          path: false,
          fs: false
        }
      }
    }
  },

  // 可选：用 chain 再次加固 alias（即使 configureWebpack 已设置也无妨）
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@babel/polyfill$', path.resolve(__dirname, 'src/shims/empty.js'))
      .set('babel-polyfill$', path.resolve(__dirname, 'src/shims/empty.js'))
  }
}

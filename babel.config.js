const plugins = []

if (process.env.UNI_OPT_TREESHAKINGNG) {
  plugins.push(require('@dcloudio/vue-cli-plugin-uni-optimize/packages/babel-plugin-uni-api/index.js'))
}

if (
  (
    process.env.UNI_PLATFORM === 'app-plus' &&
    process.env.UNI_USING_V8
  ) ||
  (
    process.env.UNI_PLATFORM === 'h5' &&
    process.env.UNI_H5_BROWSER === 'builtin'
  )
) {
  const path = require('path')
  const isWin = /^win/.test(process.platform)
  const normalizePath = p => (isWin ? p.replace(/\\/g, '/') : p)
  const input = normalizePath(process.env.UNI_INPUT_DIR)
  try {
    plugins.push([
      require('@dcloudio/vue-cli-plugin-hbuilderx/packages/babel-plugin-console'),
      {
        file(file) {
          file = normalizePath(file)
          if (file.indexOf(input) === 0) {
            return path.relative(input, file)
          }
          return false
        }
      }
    ])
  } catch (e) { }
}

process.UNI_LIBRARIES = process.UNI_LIBRARIES || ['@dcloudio/uni-ui']
process.UNI_LIBRARIES.forEach(libraryName => {
  plugins.push([
    'import',
    {
      libraryName,
      customName: (name) => `${libraryName}/lib/${name}/${name}`
    }
  ])
})

module.exports = {
  presets: [
    [
      '@vue/app',
      {
        // 关键点1：不要把 ESModule 转成 CommonJS，避免浏览器端出现 require 未定义/运行时冲突
        modules: false,
        // 关键点2：按需注入 polyfill（由 Babel 自动插入 core-js 片段）
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  plugins
}

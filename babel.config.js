// 生产环境下清除console打印
const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins
}

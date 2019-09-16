const webpack = require('webpack')
const port = process.env.PORT || 8088;

module.exports = {
  productionSourceMap: false, // 不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  },
  // devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    // open: true,
    // 让前后端http请求都转到node的3000端口，而不是前端的8080端口
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:' + port + '/', // 后端接口地址
        changeOrigin: true, // 是否允许跨越
        ws: false,
        pathRewrite: {
          '^/api': '/api' // 重写,
        }
      }
    }
  }
}

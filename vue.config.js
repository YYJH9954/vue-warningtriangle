module.exports = {
  lintOnSave: false,
  publicPath: './',
  // prodectionSourceMap: false,
  // 已省略其他配置项
  devServer: {
    hot: true,//热加载
    host: 'localhost',//ip地址
    port: 8080,//端口
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {//业务类的接口请求地址，这里的api可以是后端的工程名
        changeOrigin: true,
        target: 'http://127.0.0.1:3000/',
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }

}
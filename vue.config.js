const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    https: false,
    /* 使用代理 */
    proxy: {
      '/dev-api': {
        target: 'http://localhost:9527', //后端地址
        ws: true,//是否代理websockets
        changeOrigin: true,// 是否允许跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    // before: require('./mock/mock-server.js')
  },
})

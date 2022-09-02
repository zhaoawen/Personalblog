const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    // 代理跨域
    devServer:{
      port:8080,
      host: 'localhost',
      open: true,
      https: false,
      proxy:{
        '/api':{
          target:'http://localhost:3007',
          changOrigin:true,
          ws: true,
          pathRewrite:{'^/api':''},
        },
      }
    }
})
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // publicPath: "/seat_arrangement/",
  publicPath: "./",
  // devServer: {
  //   disableHostCheck: true, // 关闭host检查
  // }
})

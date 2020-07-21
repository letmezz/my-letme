const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  //基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"))
      .set("@u", resolve("src/utils"))
      .set("@s", resolve("src/service")); /* 别名配置 */
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    //host: "192.168.1.107",
    host: "localhost", //局域网和本地访问
    port: "8080",
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    proxy: {
      "/devApi": {
        /* 目标代理服务器地址 */
        target: "http://www.web-jshtml.cn/productapi/token", //
        // target: "http://192.168.1.102:8888", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/devApi": ""
        }
      }
    }
  }
};

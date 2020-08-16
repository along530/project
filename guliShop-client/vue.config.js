module.exports = {
  lintOnSave: false, //eslint-loader 是否在保存的时候检查
  devServer: {
      //代理服务器
    proxy: {
        //匹配到/api就会访问http://182.92.128.115/
      "/api": {
        target: "http://182.92.128.115/",
      },
    },
  },
};

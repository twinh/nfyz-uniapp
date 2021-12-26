module.exports = {
  transpileDependencies: ['uview-ui'],
  chainWebpack(config) {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => { 
        options.compiler = require('@fower/uni-template-compiler')
        return options
      })
  },
}
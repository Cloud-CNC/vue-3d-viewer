/**
 * @fileoverview Vue CLI Config
 */

//Export
module.exports = {
  chainWebpack: config => 
  {
    config.module
      .rule('worker')
      .before('js')
      .test(/\.worker\.js$/)
      .use('threads-webpack-plugin')
      .loader('threads-webpack-plugin')
      .end();
  }
};
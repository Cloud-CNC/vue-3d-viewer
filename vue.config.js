/**
 * @fileoverview Vue CLI Config
 */

//Imports
const ThreadsPlugin = require('threads-plugin');

//Export
module.exports = {
  configureWebpack: {
    plugins: [
      new ThreadsPlugin()
    ]
  }
};
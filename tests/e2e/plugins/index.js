/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

//Imports
const fs = require('fs');

//Export
module.exports = (on, config) => 
{
  // on('file:preprocessor', webpack({
  //  webpackOptions: require('@vue/cli-service/webpack.config'),
  //  watchOptions: {}
  // }))

  require('@cypress/code-coverage/task')(on, config);
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

  on('task', {
    readBinary: path =>
    {
      const exists = fs.statSync(path).isFile();

      if (exists)
      {
        console.log(`[readBinary] The path ${path} exists, reading as binary file.`);

        //Read
        const buffer = fs.readFileSync(path);

        //Convert to JSON
        const json = JSON.stringify(Array.from(buffer));

        return json;
      }
      else
      {
        throw new Error(`[readBinary] The path ${path} does not exist!`);
      }
    }
  });

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js'
  });
};

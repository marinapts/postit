var webpackConfig = require('./webpack.config.js');

// DONT FORGET: In files and preprocessors change the boilerplate name to the name of each project!
 

module.exports = function (config) {
  config.set({
    basePath: '../',
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'boilerplate/node_modules/jquery/dist/jquery.min.js',
      'boilerplate/app/js/materialize.min.js',
      'boilerplate/app/tests/**/*.test.jsx'
    ],
    preprocessors: {
      'boilerplate/app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        timeout: '5000'
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};

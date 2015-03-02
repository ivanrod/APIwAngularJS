// Karma configuration
// Generated on Mon Feb 23 2015 17:42:14 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'vendor/assets/javascripts/angular.min.js',
      'vendor/assets/javascripts/angular-mocks.js',
      'vendor/assets/javascripts/jquery-2.1.3.min.js',
      'vendor/assets/javascripts/angular-ui-router.min.js',
      'vendor/assets/javascripts/*.js',
      'app/assets/javascripts/*/*.html',
      'app/assets/javascripts/app/*/*.js',
      'app/assets/javascripts/app/*.js',
      'spec/javascripts/**/*spec.js',
      '/home/ivan/Documentos/ALTRAN/APIwAngularJS/spec/javascripts/app/**/*spec.js',
      'spec/javascripts/**/*spec.js'
    ],


    // list of files to exclude
    exclude: [
    'vendor/assets/javascripts/*.map.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

// Karma configuration
// Generated on Tue Jan 10 2017 20:14:56 GMT+0100 (WAT)

module.exports = function(config) {
  config.set({

    /* base path that will be used to resolve all patterns 
    (eg. files, exclude) */
    
    basePath: '',


    /* frameworks to use
     available frameworks: 
     https://npmjs.org/browse/keyword/karma-adapter */
    
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    
    files: [

        'public/lib/jquery/jquery.js',
        'public/lib/underscore/underscore-min.js',
        'public/lib/bootstrap/js/bootstrap.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-ui-utils/modules/route.js',
        'public/js/**/**.js',
        'test/client/**/**.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    /* preprocess matching files before serving them to the browser
     available preprocessors: 
     https://npmjs.org/browse/keyword/karma-preprocessor */
    
    preprocessors: {
    },


    /* test results reporter to use
     possible values: 'dots', 'progress'
     available reporters: 
     https://npmjs.org/browse/keyword/karma-reporter */
    
    reporters: ['progress'],


    // web server port
    
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    
    colors: true,


    /* level of logging
     possible values: config.LOG_DISABLE || config.LOG_ERROR ||
     config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG */
    
    logLevel: config.LOG_INFO,


    /* enable / disable watching file and executing 
    tests whenever any file changes
    */
    
    autoWatch: false,


    /* start these browsers
    // available browser launchers: 
    https://npmjs.org/browse/keyword/karma-launcher */
    
    browsers: ['Chrome', 'Firefox'], //'PhantomJS']


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};

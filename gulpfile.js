'use strict';

// Sources:
// https://github.com/sogko/gulp-recipes/blob/master/browser-sync-nodemon-expressjs/gulpfile.js
// http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/

var gulp = require('gulp');

var browserSync = require('browser-sync');
var del = require('del');
var karmaServer = require('karma').Server;
var nodemon = require('gulp-nodemon');
// var opn = require('opn');
var appConfig = require('./config/config.js');
var runSequence = require('run-sequence');

// Clean Output Directory
gulp.task('clean', function (cb) {
  console.log('here');
  del([
    'tmp/**',
  ]).then(
    cb()
  );
});

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = appConfig.constant.BrowserSyncReloadDelay;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'app.js',

    // watch core server file(s) that require server restart on change
    watch: ['**/*'],
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;

      // Run tests
      karmaSingleRun();
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false,   //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);

      // Run tests
      karmaSingleRun();
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // watch the following files; changes will be injected (css & images) or cause browser to refresh
    files: ['public/**/*.*'],

    // informs browser-sync to proxy our expressjs app which would run at the following location
    // The port specified in the app.js
    proxy: 'http://localhost:'+appConfig.port.app.main,

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    // Use in browser
    port: appConfig.port.BrowserSync.browser,

    // open the proxied app in chrome
    // browser: ['google chrome'],

    // Decide which URL to open automatically when Browsersync starts.
    // Defaults: "local" if none set.
    // Options: true, local, external, ui, ui-external, tunnel or false
    open: false,

    // Sync viewports to TOP position
    // scrollProportionally: false
  });

  // Open a specific url in browser
  // opn('https://www.google.com',{app: ['google chrome']});
  // opn('http://localhost:4000',{app: ['google chrome']});
});

var karmaSingleRun = function() {
  gulp.start('karmaSingleRun');
};

// No need to Karma plugin: https://github.com/karma-runner/gulp-karma
gulp.task('karmaSingleRun', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

gulp.task('test', ['karmaSingleRun']);

gulp.task('default', ['clean'], function (cb) {
  console.log('before run sequence');
  runSequence(
    ['browser-sync'],
    cb);
});

// gulp.task('dist', ['clean'], function (cb) {
//   runSequence(
//     ['browser-sync'],
//     ['karmaSingleRun'],
//     cb);
// });

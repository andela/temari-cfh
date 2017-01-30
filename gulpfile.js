// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const browserSync = require('browser-sync');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const bower = require('gulp-bower');

/*
 **Include gulp tasks
 */

// eslint task
gulp.task('eslint', () => {
  gulp.src([
    'gulpfile.js',
    'app/**/*.js',
    'test/**/*.js',
    'public/js/**/*.js'
  ]).pipe(eslint())
    .pipe(eslint.format(), {
      beep: true
    });
});

gulp.task('mochaTest', () => {
  gulp.src('test/**/*.js', {
    read: false
  })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('end', () => {
      process.exit();
    });
});

// Nodemon task
gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

// Sass Task
gulp.task('sass', () => {
  gulp.src('public/css/common.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css/'));
});

// Bower Task
gulp.task('bower', () => {
  bower()
    .pipe(gulp.dest('./public/lib/'));
});

// Watch Task
gulp.task('watch', () => {
  gulp.watch('public/css/*.scss', ['sass']);
  gulp.watch('app/**/*.js', ['jshint']);
  gulp.watch(['app/views/**/*.jade', 'public/**/**.*'])
    .on('change', browserSync.reload);
});

// Server Task
gulp.task('server', ['nodemon'], () => {
  browserSync.create({
    server: 'server.js',
    port: 3000,
    reloadOnRestart: true
  });
});

// Test task.
gulp.task('test', ['mochaTest']);

// Default task(s).
gulp.task('default', ['eslint', 'server', 'watch']);

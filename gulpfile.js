// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const browserSync = require('browser-sync');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const bower = require('gulp-bower');
const istanbul = require('gulp-istanbul');

/*
 **Include gulp tasks
 */

// eslint task
gulp.task('lint', () => {
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', () => gulp.src(['test/**/*.js'])
  .pipe(istanbul({ includeUntested: true }))
  .pipe(istanbul.hookRequire()));

gulp.task('mochaTest', ['pre-test'], () => gulp.src(['./test/**/*.js'],
  {
    read: false
  })
  .pipe(mocha({ reporter: 'spec' }))
  .pipe(istanbul.writeReports({
    dir: './coverage',
    reporters: ['lcov'],
    reportOpts: { dir: 'coverage/' },
  }))
  .once('error', () => {
    process.exit(1);
  })
  .once('end', () => {
    process.exit();
  }));

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
  gulp.watch(['app/**/*.js', 'public/js/**/*.js'], ['lint'])
    .on('change', browserSync.reload);
  gulp.watch(['app/views/**/*.jade', 'public/css/*.css'])
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
gulp.task('default', ['server', 'watch', 'lint']);

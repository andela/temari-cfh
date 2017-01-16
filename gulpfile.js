'use strict';

//Include gulp
const gulp = require('gulp');

//Include gulp plugins
const browserSync = require('browser-sync');
const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const bower = require('gulp-bower');
const jade = require('gulp-jade');


/*
 **Include gulp tasks
 */

//jshint task
gulp.task('jshint', () => {
    return gulp.src([
            'gulpfile.js',
            'app/**/*.js',
            'test/**/*.js',
            'public/js/**/*.js'
        ]).pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('mochaTest', () => {
    gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .once('end', () => {
            process.exit();
        });
});

//Nodemon task
gulp.task('nodemon', () => {
    nodemon({ script: 'server.js', ext: 'js' });
});

//Sass Task
gulp.task('sass', () => {
    return gulp.src('public/css/common.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css/'));
});

//Jade Task
gulp.task('jade', () => {
    return gulp.src('app/views/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/views/'));
});

//Bower Task
gulp.task('bower', () => {
    bower()
        .pipe(gulp.dest('./public/lib/'));
});

//Watch Task
gulp.task('watch', () => {
    gulp.watch('public/css/*.scss', ['sass']);
    gulp.watch('app/**/*.js', ['jshint']);
    gulp.watch(['public/**/**', 'app/views/**/*.jade'])
        .on('change', browserSync.reload);
});

//Server Task
gulp.task('server', ['nodemon'], () => {
    browserSync.create({
        server: 'server.js',
        port: 3000,
        reloadOnRestart: true
    });
});

//Test task.
gulp.task('test', ['mochaTest']);

//Default task(s).
gulp.task('default', ['jshint', 'server', 'watch', 'sass']);
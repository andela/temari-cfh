const gulp = require('gulp');
const browserSync = require('browser-sync');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
const bower = require('gulp-bower');
const sass = require('gulp-sass');

//Default task(s).
gulp.task('default', ['jshint', 'server', 'watch', 'sass', 'test']);

// Project Configuration
//const fs = require('fs');
//const json = JSON.parse(fs.readFileSync('package.json'));
gulp.task('nodemon', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: { NODE_ENV: 'development' }
    })
});

gulp.task('watch', function() {
    gulp.watch(['public/css/common.scss', 'public/css/views/articles.scss'], ['sass']);
    gulp.watch("app/views/**").on('change', browserSync.reload);
    gulp.watch(['public/js/**', 'app/**/*.js'], ['jshint']).on('change', browserSync.reload);
    gulp.watch("public/views/**").on('change', browserSync.reload);
    gulp.watch('public/css/**', ['sass']).on('change', browserSync.reload);
    gulp.watch('app/views/**', ['jade']).on('change', browserSync.reload);
});


gulp.task('jshint', function() {
    return gulp.src([
            'gulpfile.js',
            'app/**/*.js',
            'test/**/*.js',
            'public/js/**/*.js'
        ]).pipe(jshint())
        .pipe(jshint.reporter('fail'));
});



gulp.task('server', ['nodemon'], function() {
    browserSync.create({
        server: 'server.js',
        port: 3000,
        reloadOnRestart: true
    });
});

gulp.task('mochaTest', function() {
    gulp.src('test/**/*.js', { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('sass', function() {
    return gulp.src('public/css/common.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('bower', function() {
    bower()
        .pipe(gulp.dest('./public/lib/'))
});




//Test task.
gulp.task('test', ['mochaTest'], function() {

});



//Bower task.
gulp.task('install', ['bower'], function(done) {
    done();
});
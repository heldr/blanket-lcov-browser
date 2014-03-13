'use strict';

var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    jsList  = ['lib/**/*.js', '!lib/vendor/**/*.js'];

gulp.task('lint', function () {
    gulp.src(jsList)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function () {
    gulp.watch(jsList, ['lint']);
});

gulp.task('default', ['lint']);

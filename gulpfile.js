var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    jshint  = require('gulp-jshint'),
    concat  = require('gulp-concat'),
    stylish = require('jshint-stylish'),
    jsList  = ['lib/**/*.js', '!lib/vendor/**/*.js'];

gulp.task('lint', function () {
    gulp.src(jsList)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('minify', ['lint'], function () {
    gulp.src(['lib/browser.js', 'lib/vendor/lcov_reporter.js'])
        .pipe(concat('branket-lcov-browser.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(jsList, ['minify']);
});

gulp.task('default', ['minify']);

var gulp = require('gulp');

gulp.task('compile', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('../views/*.twig')
        .pipe(twig())
        .pipe(gulp.dest('../public'));
});

gulp.task('default', ['compile']);
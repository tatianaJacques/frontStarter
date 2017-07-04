var gulp        = require('gulp'),
    config      = require('../config').views,
    processhtml = require('gulp-processhtml'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync').create();

gulp.task('views', function(){
  return gulp.src(config.watchSrc)
              .pipe(processhtml({}))
              .pipe(gulp.dest(config.dest));
});

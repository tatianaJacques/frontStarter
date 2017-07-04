var gulp          = require('gulp'),
    config        = require('../config'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

gulp.task('server', ['styles', 'twig', 'jshint', 'scripts:vendors', 'scripts:app', 'images'], function(){
  browserSync.init(config.browserSync);
  gulp.watch(config.styles.watchSrc, ['styles', reload]);
/*
  gulp.watch(config.views.watchSrc, ['views', reload]);
*/
  gulp.watch(config.twig.src, ['twig', reload]);
  gulp.watch(config.images.src, ['images', reload]);
  gulp.watch(config.scripts.src, ['jshint', reload]);
  gulp.watch(config.scripts.src, ['scripts:app', reload]);
  gulp.watch(config.iconfont.src, ['iconfontWatch', reload]);
});
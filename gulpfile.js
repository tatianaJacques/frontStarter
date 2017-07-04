// Require plugins
var gulp        = require('gulp'),
  requireDir    = require('require-dir'),
  runSequence   = require('run-sequence');

// Load tasks
requireDir('./gulp/tasks');

// Default task
gulp.task('default', function(){
  runSequence('iconfont', 'scripts:app', 'copy:root', 'copy:fonts', 'modernizr', 'server');
});
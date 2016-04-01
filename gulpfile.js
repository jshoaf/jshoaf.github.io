var gulp = require('gulp');
var webserver = require('gulp-webserver');

// https://www.npmjs.com/package/gulp-webserver
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('default', function() {
  gulp.run('webserver');
});

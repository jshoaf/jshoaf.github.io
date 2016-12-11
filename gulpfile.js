var gulp = require('gulp');
var sass = require('gulp-sass');
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

gulp.task('default', ['sass'], function() {
  gulp.watch('scss/**/*');
  gulp.run('webserver');
});

gulp.task('sass', function() {

  return gulp.src('scss/main.scss')
    .pipe(sass({
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets']
    }))
    .pipe(gulp.dest('css/'));

});

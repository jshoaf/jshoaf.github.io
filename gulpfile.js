var gulp = require('gulp');
    css = require('./gulp/css');
    build = require('./gulp/build');
var webserver = require('gulp-webserver');

var config = {
  bowerDir: './bower_components'
}

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

gulp.task('css', css);
gulp.task('build', build);

gulp.task('default', ['css', 'icons', 'build'], function() {
  console.log("Hello Mr. Shoaf.");
  gulp.watch('scss/**/*', ['css']);
  gulp.watch('./templates/**/*.{hbs,json}', ['build']);
  gulp.run('webserver');
});


gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./fonts'));
});
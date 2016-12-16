var gulp = require('gulp');
var sass = require('gulp-sass');


module.exports = function () {

    gulp.src('scss/*')
        .pipe(sass({
            outputStyle: 'nested',
            precison: 3,
            errLogToConsole: true,
            includePaths: ['./bower_components/font-awesome/scss', './bower_components/bootstrap-sass/assets/stylesheets']
        }))
        .pipe(gulp.dest('css/'));

}


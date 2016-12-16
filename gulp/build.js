var gulp = require('gulp'),
    assemble = require('assemble'),
    extname = require('gulp-extname'),
    gutil = require('gulp-util');


module.exports = function () {

  //assemble.enable('debugEngine');

  assemble.option('layout', 'default');
  assemble.layouts('templates/layouts/*.hbs');
  assemble.partials('templates/partials/*.hbs');
  assemble.data('./templates/**/*.json');

  assemble.src('templates/pages/*.hbs')
    .pipe(extname())
    .pipe(assemble.dest(''))
    .on('error', gutil.log);

}

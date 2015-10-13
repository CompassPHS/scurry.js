var gulp = require('gulp')
  , install = require('gulp-install')
  , extend = require('gulp-multi-extend')
  , args = require('yargs').argv
  , path = require('path')
  , dest = args.dest || path.join(__dirname, 'build');

gulp.task('build', ['copy', 'install']);

gulp.task('copy', function() {
  gulp.src([path.join(__dirname + '/**/*.js'), '!./**/gulpfile.js', '!./{jobs,jobs/**/*}', '!./{node_modules,node_modules/**/*}'])
    .pipe(gulp.dest(dest))
})

gulp.task('install', function() {
  return gulp.src('./package.json')
    .pipe(gulp.dest(dest))
    .pipe(install({ production:true }));
})

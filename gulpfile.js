var gulp = require('gulp')
    , args = require('yargs').argv
    , fs = require('fs')
    , path = require('path')
    , jobsFolder = path.join(__dirname, 'src', 'jobs')
    , _ = require('lodash')
    ;

gulp.task('build', ['copy', 'jobs']);

gulp.task('copy', function() {
    gulp.src(['./src/**/*.js', './src/**/*.json', '!./src/{jobs,jobs/**}'])
        .pipe(gulp.dest('./build'));
})

gulp.task('jobs', function() {
    _.chain(fs.readdirSync(jobsFolder))
        .filter(function(job) { return fs.statSync(path.join(jobsFolder, job)).isDirectory(); })
        .each(function(job) {
            require(path.join(jobsFolder, job, 'gulpfile'));
        })
        .value();
})
var gulp = require('gulp');
var bower = require('gulp-bower');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var argv = require('yargs').argv;
var template = require('gulp-template-compile');
var sequence = require('gulp-sequence');
 
gulp.task('bower', function() {
  return bower();
});

gulp.task('framework', function(){
    return gulp.src(['bower_components/bootstrap/less/**/*.less'])
        .pipe(template({
            namespace: 'BILT_LESS',
            name: function(file) {
                return 'bilt/' + file.relative;
            }
        }))
        .pipe(concat('framework.js'))
        .pipe(gulp.dest('generated/js'));
});

gulp.task('build', ['framework'], function(){
    console.log(argv);
    return gulp.src([
        //'bower_components/jQuery/jquery.js',
        'bower_components/zepto-full/zepto.js',
        'bower_components/lazy/lazy.js',
        'generated/js/framework.js',
        'bower_components/less/dist/less.js',
        'bootstrap.js'
    ])
        .pipe(concat('bilt.js', {newLine: ';'}))
        .pipe(uglify('bilt.js', {
            mangle: argv.mangle ? true : false,
            compress: argv.compress ? true : false,
            output: {
                beautify: (argv.mangle || argv.compress) ? false : true
            }
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('set_compress', function(){
    argv.mangle = true;
    argv.compress = true;
});

gulp.task('compressed', sequence('set_compress', 'build'));

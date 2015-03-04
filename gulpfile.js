var gulp = require('gulp');
var bower = require('gulp-bower');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var argv = require('yargs').argv;
var sequence = require('gulp-sequence');
 
gulp.task('init', function() {
  return bower();
});

gulp.task('templates', function(){
    return gulp.src(['app/templates/*.us'])
        .pipe(template({
            namespace: 'CMM_WIDGET_JST',
            name: function(file) {
                return 'templates/' + file.relative.replace(/\.us$/, '');
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('generated/js'));
});

gulp.task('css', function(){
    return gulp.src('app/css/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('generated/css'));
});

gulp.task('buildcss', ['css'], function(){
    return gulp.src([
            'vendor/css/*.css',
            'generated/css/*.css'
        ])
        .pipe(concat('main.css'))
        .pipe(template({
            namespace: 'CMM_WIDGET_JST',
            name: function(file) {
                return 'generated/css/' + file.relative;
            }
        }))
        .pipe(concat('css.js'))
        .pipe(gulp.dest('generated/js'));
});

gulp.task('build', function(){
    console.log(argv);
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/underscore/underscore.js',
        'generated/js/css.js',
        'generated/js/templates.js',
        'bootstrap.js'
    ])
        .pipe(concat('bilt.js'))
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
})

gulp.task('compressed', sequence('set_compress', 'build'));

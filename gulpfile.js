const fs = require('fs')
    , path = require('path')
    , gulp = require('gulp')
    , sass = require('gulp-sass')
    , pug = require('gulp-pug')
    , babel = require('gulp-babel')
    , concat = require('gulp-concat')
    , browserify = require('browserify')
    , uglify = require('gulp-uglify')
    , sourcemaps = require('gulp-sourcemaps')
    , autoprefixer = require('gulp-autoprefixer')
    , source = require('vinyl-source-stream')
    , buffer = require('vinyl-buffer')
    , size = require('gulp-size')
;

var logError = function(e) {
  if (err) console.error(err);
}

//to make this work with node v10
require('es6-promise').polyfill();

var pugInput = './src/pug/*.pug';
var pugFolders = './src/pug/**/*.pug';
var pugOutput = './dist/';
global.package = require('./package.json');

//compile pug 
gulp.task('templates', function() {
  gulp.src(pugInput)
  .pipe(pug({
    pretty: true
  }).on('error', logError))
  .pipe(gulp.dest(pugOutput))
});

//compile scss files
var sassInput = './src/scss/*.scss';
var sassOutput = './dist/assets/styles/css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('stylesheets', function () {
  return gulp
  .src(sassInput)
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(autoprefixer())
  .pipe(gulp.dest(sassOutput));
});

//compile any JavaScript dependencies installed with npm
var browserifyInput = __dirname+'/src/js/dependencies.js';
var browserifyOutput = __dirname+'/dist/assets/js';
gulp.task('browserify', function() {
  var bundler = browserify({
    entries: [browserifyInput],
    debug: true
  })
  return bundler.bundle()
  .pipe(source('dependencies.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(size())
  .pipe(gulp.dest(browserifyOutput));
});

//concat main javascript file
var jsInput = [__dirname+'/src/js/functions.js',__dirname+'/src/js/main.js'];
var jsOutput = __dirname+'/dist/assets/js';
gulp.task('scripts', function() {
  gulp.src(jsInput)
  .pipe(concat('main.js').on('error', logError))
  .pipe(babel({
    presets: ['env']
  }).on('error', logError))
  .pipe(gulp.dest(jsOutput));
});


var pugWatcher = gulp.watch(pugFolders, ['templates']);
var sassWatcher = gulp.watch(sassInput, ['stylesheets']);
var jsWatcher = gulp.watch(jsInput, ['scripts']);
var browserifyWatcher = gulp.watch(browserifyInput, ['browserify']);

pugWatcher.on('change', function(event) {
  console.log('File ' + event + ' changed, generating HTML...');
}).on('error', function(err) {
  console.error(err);
});

sassWatcher.on('change', function(event) {
  console.log('File ' + event + ' changed, generating CSS...');
}).on('error', function(err) {
  console.error(err);
});

browserifyWatcher.on('change', function(event) {
  console.log('File ' + event + ' changed, generating JS bundle...');
}).on('error', function(err) {
  console.error(err);
});

jsWatcher.on('change', function(event) {
  console.log('File ' + event + ' changed, generating main JavaScript file...');
}).on('error', function(err) {
  console.error(err);
});

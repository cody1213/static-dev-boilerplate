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
;

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
  }).on('error', function(e){
    console.error(e);
   }))
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
var browserifyInput = './src/js/dependencies.js';
var browserifyOutput = './dist/assets/js';
gulp.task('browserify', function() {
  return browserify(browserifyInput)
  .bundle()
  .pipe(source('dependencies.min.js'))
  .pipe(buffer())
  .pipe(uglify().on('error', function(e){
    console.error(e);
   }))
  .pipe(gulp.dest(browserifyOutput));
});

//concat main javascript file
var jsInput = ['./src/js/functions.js','./src/js/main.js'];
var jsOutput = './dist/assets/js';
gulp.task('scripts', function() {
  gulp.src(jsInput)
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest(jsOutput));
});

var dirs = ['./dist','./dist/assets','./dist/assets/images','./dist/assets/libs'];
dirs.forEach(function(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
})

var pugWatcher = gulp.watch(pugFolders, gulp.series('templates'));
var sassWatcher = gulp.watch(sassInput, gulp.series('stylesheets'));
var jsWatcher = gulp.watch(jsInput, gulp.series('scripts'));
var browserifyWatcher = gulp.watch(browserifyInput, gulp.series('browserify'));

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
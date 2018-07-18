var fs = require('fs')
, gulp = require('gulp')
, sass = require('gulp-sass')
, pug = require('gulp-pug')
, babel = require('gulp-babel')
, concat = require('gulp-concat')
, browserify = require('browserify')
, uglify = require('gulp-uglify')
, source = require('vinyl-source-stream')
, buffer = require('vinyl-buffer')
, sourcemaps = require('gulp-sourcemaps')
, autoprefixer = require('gulp-autoprefixer')
, browserSync = require('browser-sync').create()
;

//to make this work with node v10
require('es6-promise').polyfill();

global.package = require('./package.json');

var pugInput = './src/pug/*.pug';
var pugFolders = './src/pug/**/*.pug';
var pugOutput = './dist/'

//compile pug 
gulp.task('templates', function() {
  gulp.src(pugInput)
  .pipe(pug( {
    pretty: true
  }))
  .pipe(gulp.dest(pugOutput))
  .pipe(browserSync.stream({once: true}));
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
  .pipe(gulp.dest(sassOutput))
  .pipe(browserSync.reload({stream: true}))
});

//compile any JavaScript dependencies installed with npm
var browserifyInput = './src/js/dependencies.js';
var browserifyOutput = './dist/assets/js';
gulp.task('browserify', function() {
  return browserify(browserifyInput)
  .bundle()
  .pipe(source('dependencies.min.js'))
  .pipe(buffer())
  .pipe(uglify())
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

//make any additional folders
gulp.task('folders', function() {
  var dirs = ['./dist/assets/images','./dist/assets/files'];
  dirs.forEach(function(dir) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  })
});

browserSync.init({
  proxy: "localhost:3000"
});

var pugWatcher = gulp.watch(pugFolders, ['templates']);
var sassWatcher = gulp.watch(sassInput, ['stylesheets']);
var jsWatcher = gulp.watch(jsInput, ['scripts']);
var browserifyWatcher = gulp.watch(browserifyInput, ['browserify']);

pugWatcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', creating HTML...');
});

sassWatcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', creating CSS...');
});

browserifyWatcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', creating JS bundle...');
});

jsWatcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', creating main JavaScript file...');
});

gulp.task('default', ['stylesheets','templates','browserify','scripts','folders']);
gulp.start('default');


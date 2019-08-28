const fs = require('fs'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  browserify = require('browserify'),
  beautify = require('gulp-beautify'),
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();

//to make this work with node v10
require('es6-promise').polyfill();

global.package = require('./package.json');

var pugInput = './src/pug/*.pug';
var pugFolders = './src/pug/**/*.pug';
var pugOutput = './dist/'

//compile pug
gulp.task('templates', function() {
  gulp.src(pugInput)
    .pipe(pug())
    .pipe(beautify.html({
      indent_size: 2,
      inline: ['abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'button','cite','code', 'data', 'datalist', 'del', 'dfn', 'em', 'i', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript','output', 'progress', 'q', 'ruby', 's', 'samp', 'small','span', 'strong', 'sub', 'sup','time', 'u', 'var','wbr', 'text','acronym', 'big', 'strike', 'tt']
    }))
    .pipe(gulp.dest(pugOutput))
    .pipe(beautify())
    .pipe(browserSync.stream({
      once: true
    }));
});

//compile scss files
var sassInput = './src/scss/*.scss';
var sassOutput = './dist/assets/styles/css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('stylesheets', function() {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(sassOutput))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//compile any JavaScript dependencies installed with npm
var browserifyInput = './src/js/dependencies/dependencies.js';
var browserifyOutput = './dist/assets/js';
gulp.task('browserify', function() {
  return browserify(browserifyInput)
    .bundle()
    .pipe(source('dependencies.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(browserifyOutput));
});

//concat main javascript file(s)
var jsInput = ['./src/js/*.js'];
var jsOutput = './dist/assets/js';
gulp.task('scripts', function() {
  gulp.src(jsInput)
    .pipe(concat('main.js').on('error', function(err) {
      console.error(err);
    }))
    .pipe(babel({
      presets: ['env']
    }).on('error', function(err) {
      console.error(err);
    }))
    .pipe(gulp.dest(jsOutput));
});

//make any additional folders
gulp.task('folders', function() {
  var dirs = ['./dist', './dist/assets', './dist/assets/images', './dist/assets/files'];
  dirs.forEach(function(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  })
});

browserSync.init({
  proxy: "localhost:3000",
  port: 3000
});

gulp.task('beautify-html', function() {
  return gulp
    .src('./dist/*.html')
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('beautify-js', function() {
  // gulp-beautify exports are identical to js-beautify programmatic access
  // so beautify() is the old pattern for beautify.js()
  return gulp
    .src('./src/*.js')
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest('./public/'));
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

gulp.task('default', ['stylesheets', 'templates', 'browserify', 'scripts', 'folders']);
gulp.start('default');

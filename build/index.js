if (!process.env.NODE_ENV) {
  require('dotenv').config({path: __dirname+'/.env-development'})
}
const NODE_ENV = process.env.NODE_ENV || 'development';

const fs = require('fs'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  browserify = require('browserify'),
  beautify = require('gulp-beautify'),
  terser = require('gulp-terser'),
  noop = require('gulp-noop'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename')
;
//to make this work with node v10
require('es6-promise').polyfill();

var pugInput = './src/pug/*.pug';
var pugFolders = './src/pug/**/*.pug';
var pugOutput = './dist/'

//compile pug
gulp.task('templates', function(done) {
  return gulp.src(pugInput)
    .pipe(pug().on('error', console.error))
    .pipe(NODE_ENV == "production"?noop():beautify.html({
      indent_size: 2,
      inline: ['abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'button','cite','code', 'data', 'datalist', 'del', 'dfn', 'em', 'i', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript','output', 'progress', 'q', 'ruby', 's', 'samp', 'small','span', 'strong', 'sub', 'sup','time', 'u', 'var','wbr', 'text','acronym', 'big', 'strike', 'tt']
    }))
    .pipe(gulp.dest(pugOutput))
  ;
  done();
});

//compile scss files
var sassInput = './src/scss/*.scss';
var sassOutput = './dist/assets/styles/css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
gulp.task('stylesheets', function(done) {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(sassOutput))
  done()
});

gulp.task('minify-css', function(done) {
  return gulp.src(sassOutput+'/style.css')
    .pipe(cleanCSS().on('error',console.error))
    .pipe(rename({
      suffix: '.min'
    }).on('error',console.error))
    .pipe(gulp.dest('./dist/assets/styles/css/'))
  ;
  done();
});

//compile any JavaScript dependencies installed with npm
var browserifyInput = './src/js/main.js';
var browserifyOutput = './dist/assets/js';
var browserifyFolders = './src/js/**/*.js'
gulp.task('browserify', function(done) {
  return browserify(browserifyInput)
    .bundle()
    .on('error', function(err){
      console.log(err.stack);
    })
    .pipe(source('bundle.min.js'))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(terser())
    .pipe(gulp.dest(browserifyOutput));
  done();
});

gulp.task('browserify-pretty', function(done) {
  return browserify(browserifyInput)
    .bundle()
    .on('error', function(err){
      console.log(err.stack);
    })
    .pipe(source('bundle.js'))
    .pipe(plumber())
    .pipe(gulp.dest(browserifyOutput));
  done();
});

const build = gulp.series(['stylesheets', 'minify-css','templates', 'browserify','browserify-pretty']);
build()

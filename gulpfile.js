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
  autoprefixer = require('gulp-autoprefixer')
;

if (NODE_ENV != "production") browserSync = require('browser-sync').create();

//to make this work with node v10
require('es6-promise').polyfill();

global.package = require('./package.json');

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
    .pipe(NODE_ENV == "production"?noop():browserSync.stream({
      once: true
    })
  );
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
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(sassOutput))
    .pipe(NODE_ENV == "production"?noop():browserSync.reload({
      stream: true
    }))
  done()
});
//compile any JavaScript dependencies installed with npm
var browserifyInput = './src/js/main.js';
var browserifyOutput = './dist/assets/js';
var browserifyFolders = './src/js/**/*.js'
gulp.task('browserify', function(done) {
  return browserify(browserifyInput)
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(terser())
    .pipe(gulp.dest(browserifyOutput));
  done();
});

gulp.task('browserify-pretty', function(done) {
  return browserify(browserifyInput)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(browserifyOutput));
  done();
});

gulp.task('icons', function(done) {
  return gulp.src('./node_modules/@fortawesome/*')
    .pipe(gulp.dest('./dist/assets/libs/@fortawesome/'));
  done();
});


var pugWatcher = gulp.watch(pugFolders, gulp.parallel(['templates']), () => browserSync.reload());
var sassWatcher = gulp.watch(sassInput, gulp.parallel(['stylesheets']));
var browserifyWatcher = gulp.watch(browserifyFolders, gulp.series(['browserify','browserify-pretty']));

pugWatcher.on('change', function(event) {
  console.log('File ' + event + ' was modified, creating HTML...');
});

sassWatcher.on('change', function(event) {
  console.log('File ' + event + ' was modified, creating CSS...');
});

browserifyWatcher.on('change', function(event) {
  console.log('File ' + event + ' was modified, creating JS bundle...');
});

const build = gulp.parallel(['stylesheets', 'templates', 'browserify','browserify-pretty','icons']);
build()

setTimeout(function() {
if (NODE_ENV != "production") {
  browserSync.init({
    proxy: "localhost:3000",
    port: 3000
  });
}
}, 1000)

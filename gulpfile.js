if (!process.env.NODE_ENV) {
  require('dotenv').config({ path: __dirname + '/.env-development' })
}
const NODE_ENV = process.env.NODE_ENV || 'development';

const gulp = require('gulp'),
  async = require('async'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
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
    rename = require('gulp-rename');

if (NODE_ENV != "production") var browserSync = require('browser-sync').create();

//to make this work with node v10
require('es6-promise').polyfill();

global.package = require('./package.json');

var pugInput = './src/pug/*.pug';
var pugFolders = './src/pug/**/*.pug';
var pugOutput = './dist/'

//compile pug
gulp.task('templates', function(done) {
  gulp.src(pugInput)
  .pipe(pug().on('error', console.error))
  .pipe(NODE_ENV == "production" ? noop() : beautify.html({
    indent_size: 2,
    inline: ['abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'button', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'i', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'text', 'acronym', 'big', 'strike', 'tt']
  }))
  .pipe(gulp.dest(pugOutput))
  .pipe(NODE_ENV == "production" ? noop() : browserSync.stream({
    once: true
  }));
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
  gulp
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
  gulp.src(sassOutput + '/style.css')
  .pipe(sourcemaps.init())
  .pipe(cleanCSS().on('error', console.error))
  .pipe(rename({
    suffix: '.min'
  }).on('error', console.error))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/assets/styles/css/'))
  .pipe(NODE_ENV == "production" ? noop() : browserSync.reload({
    stream: true
  }));
  done();
});

//compile any JavaScript dependencies installed with npm
var browserifyInput = [
  './src/js/main.js',
  // './src/js/main-a.js',
  // './src/js/main-b.js'
];
var browserifyOutput = './dist/assets/js';
var browserifyFolders = './src/js/**/*.js'
gulp.task('browserify', function(done) {
  async.each(browserifyInput, function(file, cb) {
    var filename = file.split('/').pop();
    browserify(file, { debug: NODE_ENV !== "production" })
    .transform("babelify", {
      presets: ["@babel/preset-env"],
      sourceMaps: true
    })
    .bundle()
    .on('error', console.error)
    .pipe(source('bundle.min.js'))
    .pipe(rename(filename))
    .pipe(gulp.dest(browserifyOutput))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(terser())
    .on('error', console.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(browserifyOutput));
    cb();
  })
  done();
});

var pugWatcher = gulp.watch(pugFolders, gulp.parallel(['templates']), function() {
  if (NODE_ENV != "production") browserSync.reload()
});

var sassWatcher = gulp.watch(sassInput, gulp.series(['stylesheets', 'minify-css']));
var browserifyWatcher = gulp.watch(browserifyFolders, gulp.series(['browserify']));

pugWatcher.on('change', function(event) {
  console.log('File ' + event + ' was modified, creating HTML...');
});

sassWatcher.on('change', function(event) {
  console.log('File ' + event + ' was modified, creating CSS...');
});

browserifyWatcher.on('change', function(event) {
  console.log('File ' + event + ' was modified, creating JS bundle...');
});

const build = gulp.parallel(['stylesheets', 'templates', 'browserify']);
build()

setTimeout(function() {
  if (NODE_ENV != "production") {
    browserSync.init({
      proxy: "localhost:3000",
      port: 3000,
      open: false
    });
  }
}, 1000)
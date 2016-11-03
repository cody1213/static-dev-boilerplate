var express    = require('express')
, fs           = require('fs')
, bodyParser   = require('body-parser')
, compression  = require('compression')
, app          = express()
, path         = require('path')
, cp = require('child_process')
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

//to make this work with node v10
require('es6-promise').polyfill();


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
    presets: ['es2016']
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
//stop errors from closing the app
process.on('uncaughtException', function(err) {
  console.error(err.stack);
});

//create web server
var app = express();

//define port
var port = process.env.PORT || 4000;

//express middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Add any special API routes to the routes.js file
require('./routes')(app);

//Serve any files in the www folder as static content
app.use(express.static(__dirname + '/dist'));


//open web server
app.listen(port);
console.log("Listening on port "+port);
console.log("static dir is : "+__dirname + '/dist');
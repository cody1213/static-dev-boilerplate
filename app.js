var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exec = require('child_process');

var index = require('./routes/index');
var users = require('./routes/users');

global.package = require('./package.json');

if (!process.env.NODE_ENV) {
  require('dotenv').config({path: __dirname+'/.env-development'})
}
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV != "production") {
  //run gulp tasks
  var gulptasks = require('./gulpfile');

  //create directory structure for distribution bundle
  var dirs = ['/dist','/dist/assets','/dist/assets/images','/dist/assets/styles','/dist/assets/videos','/dist/assets/libs'];
  dirs.forEach(function(dir) {
    if (!fs.existsSync(__dirname+dir)){
      fs.mkdirSync(__dirname+dir);
    }
  })

  /**
   * Stop errors from crashing the system
   */
  process.on('uncaughtException', function(err) {
    console.error(err.stack);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.warn('Unhandled promise rejection:', promise, 'reason:', reason.stack || reason);
  });
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/pug'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, 'dist')));

app.use('/', index);
app.use('/users', users);
app.use('/assets/libs/', express.static(__dirname + '/node_modules/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

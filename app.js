var express = require('express');
var path = require('path');

//grunt for jade, less
var cp = require('child_process');
var grunt = cp.spawn('grunt');

grunt.stdout.on('data', function(data) {
    // relay output to console
    console.log("%s", data)
});

//stop errors from closing the app
process.on('uncaughtException', function(err) {
  console.error(err.stack);
});

//create web server
var app = express();

//define port
var port = process.env.PORT || 4000;

//express middleware
app.use(express.compress());
app.use(express.bodyParser());

//Add any special API routes to the routes.js file
require('./routes')(app);

//Serve any files in the www folder as static content
app.use(express.static(__dirname + '/www'));


//open web server
app.listen(port);
console.log("Listening on port "+port);
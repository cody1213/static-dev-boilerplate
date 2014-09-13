var express    = require('express')
, bodyParser   = require('body-parser')
, compression  = require('compression')
, app          = express()
, path         = require('path')
, cp = require('child_process');

//grunt for LESS and JADE
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
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Add any special API routes to the routes.js file
require('./routes')(app);

//Serve any files in the www folder as static content
app.use(express.static(__dirname + '/www'));


//open web server
app.listen(port);
console.log("Listening on port "+port);
console.log("static dir is : "+__dirname + '/www');
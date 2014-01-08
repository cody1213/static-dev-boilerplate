var express = require('express');

//stop errors from crashing the system
process.on('uncaughtException', function(err) {
  console.error(err.stack);
});

var app = express();
var port = process.env.PORT || 3000;

app.use(express.compress());

//Add any API routes
require('./routes')(app);

//Serve any files in the www folder as static content
app.use(express.static(__dirname + '/www'));

app.listen(port);
console.log("Listening on port "+port);
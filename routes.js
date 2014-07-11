var fs = require('fs');
var path = require('path');
var exec = require("child_process").exec;
var environment = process.env;
var PHPserialize = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
    str.push(typeof v == "object" ?
      serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }
  return str.join(" ");
}
//Define any non-static routes here
module.exports = function(app){

  //PHP files - $_GET works like a charm 
  app.get('*.php', function(req, res){

    var urlparts = req.url.split('?');
    var url = urlparts[0];
    var command = "php-cgi -f www"+url+' '+PHPserialize(req.query)+' '+PHPserialize(req.body,'_POST');
    console.log(command);
    exec(command, function (error, stdout, stderr) {
      res.send(stdout);
    });
  });

  //$_POST less so
  app.post('*.php', function(req, res) {
    var urlparts = req.url.split('?');
    var url = urlparts[0];

    console.log(req);
    var tempfile = path.join(__dirname, "temp"+Math.floor(Math.random()*1000000)+".php");
    fs.openSync(tempfile, 'w');
    thePHPFile = fs.readFile('www'+url, function(err, data) {
      var newData = '<?php $_POST = $_GET["_POST"]; ?>'+data;
      fs.writeFile(tempfile, newData, function(err) {
        fs.readFile(tempfile, function(err, data) {
          var command = "php-cgi -f "+tempfile+' '+PHPserialize(req.query)+' '+PHPserialize(req.body, '_POST');
          exec(command, function (error, stdout, stderr) {
            res.send(stdout);
            fs.unlink(tempfile);
          });
        });
      });
    })
  });
  
  app.get('/api/users/:id', function(req, res){
    //get the data from req.params
    var data = { theId: req.params.id}
    
    //send it as a JSON file
    res.json(data);
  });
        
}

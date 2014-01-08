//Define your API routes here
module.exports = function(app){

    app.get('/api/users/:id', function(req, res){
      //get the data from req.params
      var data = { theId: req.params.id}
      
      //send it as a JSON file
      res.json(data);
    });
        
}

//the require library is configuring paths
require.config({
  paths: {
    //tries to load jQuery from Google's CDN first and falls back
    //to load locally
    "jquery": ['//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min', 'libs/jquery/jquery'],
    'underscore': ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min', 'libs/underscore/underscore-min'],
    'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min', 'libs/bootstrap/dist/js/bootstrap-min'],
  },
  shim: {
    "underscore": {
      deps: ["jquery"]
    },
    "bootstrap": {
      deps: ["jquery"]
    }

  },
  //how long the it tries to load a script before giving up, the default is 7
  waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['jquery', 'underscore', 'bootstrap'], function($) {
  
    $('#test').on("click", function(e) {
      $.post('/php/test.php', {testpost: 2})
      .done(function(reply) {
        console.log(reply)
      });
    });
    return {};
});

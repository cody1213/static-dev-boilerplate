//the require library is configuring paths
require.config({
  paths: {
    //tries to load jQuery from Google's CDN first and falls back
    //to load locally
    "jquery": ['http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min', 'libs/jquery/jquery'],
    'underscore': ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min', 'libs/underscore/underscore-min'],
    'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min', 'libs/bootstrap/dist/js/bootstrap-min'],
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
    console.log("Loaded :)");
    
    $('#test').on("click", function(e) {
      alert("Worked!");
    });
    return {};
});
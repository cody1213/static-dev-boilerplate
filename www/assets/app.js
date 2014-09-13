//the require library is configuring paths
requirejs.config({
  baseUrl: 'assets',
  map: {
    '*': {
      'css': 'libs/require-css/css' // or whatever the path to require-css is
    }
  },
  paths: {
    //tries to load jQuery from Google's CDN first and falls back to load locally
    "jquery": ['//code.jquery.com/jquery-2.1.1.min','libs/jquery/dist/jquery.min'],
    'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min', 'libs/bootstrap/dist/js/bootstrap-min'],
    'main': 'js/main',
    'typekit': '//use.typekit.net/rfv3uqn'
  },
  shim: {
    'main': {
      deps: ["jquery","typekit","bootstrap"]
    },
    'bootstrap': {
      deps: ["jquery"]
    },
    'bootbox': {
    deps: ["jquery","bootstrap"],
      export: "bootbox"
    }

  },
  //how long the it tries to load a script before giving up, the default is 7
  waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require([
  'fonts',
  'css!//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min',
  'css!//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css',
  'css!styles/css/style',
  'jquery',
  'bootstrap',
  'main'
]);

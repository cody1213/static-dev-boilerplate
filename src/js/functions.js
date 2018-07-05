//These are some functions I use all the time.

//support for location.origin in < IE 11 
if (!window.location.origin) { 
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
} 

var getUrlVars = getUrlVars || function() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
   vars[key] = value;
  });
  return vars;
};

// animate anchor clicks
$('a[href^="#"]').on('click', function(e){     
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 700);
});

//jQuery additions
//Deserializes query strings
;(function ($) {
  $.deserialize = function (query, options) {
    if (query == '') return null;
    var hash = {};
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var k = decodeURIComponent(pair[0]);
      var isArray = false;
      if (k.substr(k.length-2) == '[]') {
        isArray = true;
        k = k.substring(0, k.length - 2);
      }
      var v = decodeURIComponent(pair[1]);
      // If it is the first entry with this name
      if (typeof hash[k] === "undefined") {
        if (isArray)  // not end with []. cannot use negative index as IE doesn't understand it
          hash[k] = [v];
        else
          hash[k] = v;
      // If subsequent entry with this name and not array
      } else if (typeof hash[k] === "string") {
        hash[k] = v;  // replace it
      // If subsequent entry with this name and is array
      } else {
        hash[k].push(v);
      }
    }
    return hash;
  };
  $.fn.deserialize = function (options) {
    return $.deserialize($(this).serialize(), options);
  };
})(jQuery);


;(function($){
  $.fn.serializeObject = function () {
    "use strict";

    var result = {};
    var extend = function (i, element) {
      var node = result[element.name];

  // If node with same name exists already, need to convert it to an array as it
  // is a multi-value field (i.e., checkboxes)

      if ('undefined' !== typeof node && node !== null) {
        if ($.isArray(node)) {
          node.push(element.value);
        } else {
          result[element.name] = [node, element.value];
        }
      } else {
        result[element.name] = element.value;
      }
    };

    $.each(this.serializeArray(), extend);
    return result;
  };
})(jQuery);


//Add $.put and $.delete functions
;(function( $ ){
  jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
      if ( jQuery.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
   
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
})( jQuery );
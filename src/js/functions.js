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

var Cody = {};
//various string functions
Cody.toTitleCase = String.prototype.toTitleCase || function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Cody.nl2br = function() {
  return this.replace(/(\r\n|\r|\n)/g, "<br />");
}
Cody.br2nl = function() {
  return this.replace(/<br \/>|<br\/>/g, "\n");
}
Cody.stripTags = function() {
  return this.replace(/<\S[^>]*>/g, "");
}

Cody.toOrdinal = function() {
  var n = this;
  var s=["th","st","nd","rd"],
       v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}

Cody.statesNamesAndAbbreviations=[{name:"Alabama",abbrev:"AL"},{name:"Alaska",abbrev:"AK"},{name:"Arizona",abbrev:"AZ"},{name:"Arkansas",abbrev:"AR"},{name:"California",abbrev:"CA"},{name:"Colorado",abbrev:"CO"},{name:"Connecticut",abbrev:"CT"},{name:"Delaware",abbrev:"DE"},{name:"District of Columbia",abbrev:"DC"},{name:"Florida",abbrev:"FL"},{name:"Georgia",abbrev:"GA"},{name:"Hawaii",abbrev:"HI"},{name:"Idaho",abbrev:"ID"},{name:"Illinois",abbrev:"IL"},{name:"Indiana",abbrev:"IN"},{name:"Iowa",abbrev:"IA"},{name:"Kansas",abbrev:"KS"},{name:"Kentucky",abbrev:"KY"},{name:"Louisiana",abbrev:"LA"},{name:"Maine",abbrev:"ME"},{name:"Maryland",abbrev:"MD"},{name:"Massachusetts",abbrev:"MA"},{name:"Michigan",abbrev:"MI"},{name:"Minnesota",abbrev:"MN"},{name:"Mississippi",abbrev:"MS"},{name:"Missouri",abbrev:"MO"},{name:"Montana",abbrev:"MT"},{name:"Nebraska",abbrev:"NE"},{name:"Nevada",abbrev:"NV"},{name:"New Hampshire",abbrev:"NH"},{name:"New Jersey",abbrev:"NJ"},{name:"New Mexico",abbrev:"NM"},{name:"New York",abbrev:"NY"},{name:"North Carolina",abbrev:"NC"},{name:"North Dakota",abbrev:"ND"},{name:"Ohio",abbrev:"OH"},{name:"Oklahoma",abbrev:"OK"},{name:"Oregon",abbrev:"OR"},{name:"Pennsylvania",abbrev:"PA"},{name:"Rhode Island",abbrev:"RI"},{name:"South Carolina",abbrev:"SC"},{name:"South Dakota",abbrev:"SD"},{name:"Tennessee",abbrev:"TN"},{name:"Texas",abbrev:"TX"},{name:"Utah",abbrev:"UT"},{name:"Vermont",abbrev:"VT"},{name:"Virginia",abbrev:"VA"},{name:"Washington",abbrev:"WA"},{name:"West Virginia",abbrev:"WV"},{name:"Wisconsin",abbrev:"WI"},{name:"Wyoming",abbrev:"WY"}];

Cody.getStateName = function(abbr) {
  if (typeof(abbr) === "undefined" || !abbr) {
    return false;
  } else {
    var name;
    statesNamesAndAbbreviations.forEach(function(st) {
      if (st.abbrev.toLowerCase() == abbr.toLowerCase()) {
        name = st.name
      }
    })
    return name;
  }
}
 
Cody.getStateAbbr = function(state) {
  if (typeof(state) === "undefined" || !state) {
    return false;
  } else {
    var abbr;
    statesNamesAndAbbreviations.forEach(function(st) {
      if (st.name.toLowerCase() == state.toLowerCase()) {
        name = st.abbrev
      }
    })
    return abbr;
  }
}
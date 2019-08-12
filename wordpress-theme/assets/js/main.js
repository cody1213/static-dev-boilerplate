"use strict";

//These are some functions and things I use on almost every project.
var getUrlVars = getUrlVars || function () {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}; // animate anchor clicks


$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 700);
}); //jQuery additions
//Deserializes query strings

;

(function ($) {
  $.deserialize = function (query, options) {
    if (query == '') return null;
    var hash = {};
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var k = decodeURIComponent(pair[0]);
      var isArray = false;

      if (k.substr(k.length - 2) == '[]') {
        isArray = true;
        k = k.substring(0, k.length - 2);
      }

      var v = decodeURIComponent(pair[1]); // If it is the first entry with this name

      if (typeof hash[k] === "undefined") {
        if (isArray) // not end with []. cannot use negative index as IE doesn't understand it
          hash[k] = [v];else hash[k] = v; // If subsequent entry with this name and not array
      } else if (typeof hash[k] === "string") {
        hash[k] = v; // replace it
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

;

(function ($) {
  $.fn.serializeObject = function () {
    "use strict";

    var result = {};

    var extend = function extend(i, element) {
      var node = result[element.name]; // If node with same name exists already, need to convert it to an array as it
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
})(jQuery); //Add $.put and $.delete functions


;

(function ($) {
  jQuery.each(["put", "delete"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
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
})(jQuery);

'use strict';

$(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  $('.menu-button').on('click', function () {
    $('.nav-menu').animate({
      right: "0px"
    }, 500);
    $('body').animate({
      right: "100vw"
    }, 500);
  });
  /* Then push them back */

  $('.close-menu').on('click', function () {
    $('.nav-menu').animate({
      right: "-100vw"
    }, 500);
    $('body').animate({
      right: "0px"
    }, 500);
  }); //mixitup

  var containerEl = document.querySelectorAll('.mixitup');

  if (typeof mixitup !== "undefined" && containerEl && containerEl.length) {
    var mixer = mixitup(containerEl, {});
  }
});
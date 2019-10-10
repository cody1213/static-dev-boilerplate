//These are some functions and things I use on almost every project.

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

jQuery.fn.table2CSV = function(options) {
    var options = jQuery.extend({
        separator: ',',
        header: [],
        delivery: 'popup' // popup, value
    },
    options);

    var csvData = [];
    var headerArr = [];
    var el = this;

    //header
    var numCols = options.header.length;
    var tmpRow = []; // construct header avalible array

    if (numCols > 0) {
        for (var i = 0; i < numCols; i++) {
            tmpRow[tmpRow.length] = formatData(options.header[i]);
        }
    } else {
        $(el).filter(':visible').find('thead th').not('.exclude-from-csv').each(function() {
            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
        });
    }

    row2CSV(tmpRow);

    // actual data
    $(el).find('tbody tr, tfoot tr').not('.exclude-from-csv').each(function() {
        var tmpRow = [];
        $(this).filter(':visible').find('td, th').not('.exclude-from-csv').each(function() {
            var content = $(this);
            content.find('.exclude-from-csv').remove();
            var select = content.find('select');
            if (select && select.length) {
              selval = select.find('option:checked').text();
              content = $('<div>').html(selval);
            }
            if (content.data('export-val') && content.data('export-val').trim() != '') {
              content = $('<div>').html(content.data('export-val'))
            }
            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData(content.html());
        });
        row2CSV(tmpRow);
    });
    if (options.delivery == 'popup') {
        var mydata = csvData.join('\n');
        return popup(mydata);
    } else {
        var mydata = csvData.join('\n');
        return mydata;
    }

    function row2CSV(tmpRow) {
        var tmp = tmpRow.join('') // to remove any blank rows
        // alert(tmp);
        if (tmpRow.length > 0 && tmp != '') {
            var mystr = tmpRow.join(options.separator);
            csvData[csvData.length] = mystr;
        }
    }
    function formatData(input) {
        // replace " with â€œ
        var regexp = new RegExp(/["]/g);
        var output = input.replace(regexp, "â€œ");
        //HTML
        var regexp = new RegExp(/\<[^\<]+\>/g);
        var output = output.replace(regexp, "");
        if (output == "") return '';
        return '"' + output + '"';
    }
    function popup(data) {
        var generator = window.open('', 'csv', 'height=400,width=600');
        generator.document.write('<html><head><title>CSV</title>');
        generator.document.write('</head><body >');
        generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
        generator.document.write(data);
        generator.document.write('</textArea>');
        generator.document.write('</body></html>');
        generator.document.close();
        return true;
    }
};


$('[data-toggle="popover"]').popover();
$('[data-toggle="tooltip"]').tooltip();

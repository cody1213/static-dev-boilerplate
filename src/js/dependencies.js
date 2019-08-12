// Get Bootstrap styles with cssify
require('../../node_modules/bootstrap/dist/css/bootstrap.css')


// Bootstrap wants jQuery global =(
window.jQuery = window.$ = require('jquery')

//underscore/lodash should be global
window._ = require('lodash');

// Bootstrap JS and CSS
window.popper = require('popper.js')
window.bootstrap = require('../../node_modules/bootstrap/dist/js/bootstrap')
require('../../node_modules/bootstrap/dist/css/bootstrap.css')


window.bootbox = require('bootbox');

//moment for times
window.moment = require('moment');

//filter and sort library
window.mixitup = require('mixitup')

//slick carousel
window.slick = require('slick-carousel');
require('../../node_modules/slick-carousel/slick/slick.css');
require('../../node_modules/slick-carousel/slick/slick-theme.css');

//font-awesome 5
require('../../node_modules/@fortawesome/fontawesome-pro/css/all.css')

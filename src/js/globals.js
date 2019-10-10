// Bootstrap wants jQuery global
window.jQuery = window.$ = require('jquery')

// Bootstrap JS
window.popper = require('popper.js')
window.bootstrap = require('../../node_modules/bootstrap/dist/js/bootstrap')

//jQuery plugins and random functions
require('./cody-stuff');

// Bootstrap wants jQuery global
window.jQuery = window.$ = require('jquery')

// Bootstrap JS
window.popper = require('popper.js')
window.bootstrap = require('../../node_modules/bootstrap/dist/js/bootstrap')

// Bootstrap popovers and tooltips
$('[data-toggle="popover"]').popover();
$('[data-toggle="tooltip"]').tooltip();

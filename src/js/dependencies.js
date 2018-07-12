// Bootstrap wants jQuery global =(
window.jQuery = $ = require('jquery')
// Bootstrap doesn't have a "main" field / export anything =(
window.popper = require('popper.js')
window.bootstrap = require('../../node_modules/bootstrap/dist/js/bootstrap')
window.bootbox = require('bootbox');

// Get Bootstrap styles with cssify
require('../../node_modules/bootstrap/dist/css/bootstrap.css')
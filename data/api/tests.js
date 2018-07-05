const moment = require('moment')
    , async = require('async')
;

exports.http = function(req, res, next) {
  res.json({success: 1})
}
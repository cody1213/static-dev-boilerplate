var express = require('express'); // (npm install --save express)
var request = require('request');
var _ = require('lodash');
var expect = require('chai').expect;
var routes = require('../routes');

//The test for the API needs an API key for localhost
var APIkey = null;

describe('Basic Server', function() {
  var options = {
    url: 'http://localhost:3000/tests/http',
    form: {
      key:'value'
    },
    headers: {}
  }
  it('should accept GET requests', function() {
    options.method = "get";
    request(options, function(req, res, body) {
      var json = JSON.parse(body);
      expect(json.success).to.equal(true);
    })
  });

  it('should accept POST requests', function() {
    options.method = "post";
    request(options, function(req, res, body) {
      var json = JSON.parse(body);
      expect(json.success).to.equal(true);
    })
  })


  it('should accept PUT requests', function() {
    options.method = "put";
    request(options, function(req, res, body) {
      var json = JSON.parse(body);
      expect(json.success).to.equal(true);
    })
  });

  it('should accept DELETE requests', function() {
    options.method = "delete";
    request(options, function(req, res, body) {
      var json = JSON.parse(body);
      expect(json.success).to.equal(true);
    })
  });

  it('should accept PATCH requests', function() {
    options.method = "patch";
    request(options, function(req, res, body) {
      var json = JSON.parse(body);
      expect(json.success).to.equal(true);
    })
  });
});
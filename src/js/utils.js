//favorite lodash utilities
const each = require('lodash/each');
const groupBy = require('lodash/groupBy');
const sortBy = require('lodash/sortBy');
const compact = require('lodash/compact');
const flatten = require('lodash/flatten');
const flattenDeep = require('lodash/flattenDeep');
const uniq = require('lodash/uniq');
const zipObject = require('lodash/zipObject');
const size = require('lodash/size');
const max = require('lodash/max');
const min = require('lodash/min');
const mean = require('lodash/mean');
const round = require('lodash/round');
const capitalCase = require('lodash/capitalize');
const lowerCase = require('lodash/toLower');
const kebabCase = require('lodash/kebabCase');

//additional helper functions
function getURLVars() {
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}


function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

function titleCase(string) {
  string = string.toLowerCase();
  'use strict'
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i
  var alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/
  var wordSeparators = /([ :–—-])/

  return string.split(wordSeparators)
  .map(function(current, index, array) {
    if (
      /* Check for small words */
      current.search(smallWords) > -1 &&
      /* Skip first and last word */
      index !== 0 &&
      index !== array.length - 1 &&
      /* Ignore title end and subtitle start */
      array[index - 3] !== ':' &&
      array[index + 1] !== ':' &&
      /* Ignore small words that start a hyphenated phrase */
      (array[index + 1] !== '-' ||
        (array[index - 1] === '-' && array[index + 1] === '-'))
    ) {
      return current.toLowerCase()
    }

    /* Ignore intentional capitalization */
    if (current.substr(1).search(/[A-Z]|\../) > -1) {
      return current.toUpperCase()
    }

    /* Ignore URLs */
    if (array[index + 1] === ':' && array[index + 2] !== '') {
      return current
    }

    /* Capitalize the first letter */
    return current.replace(alphanumericPattern, function(match) {
      return match.toUpperCase()
    })
  })
  .join('')
}

module.exports = {
  isArray: isArray,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFunction: isFunction,
  each: each,
  groupBy: groupBy,
  sortBy: sortBy,
  trim: trim,
  compact: compact,
  flatten: flatten,
  flattenDeep: flattenDeep,
  uniq: uniq,
  zipObject: zipObject,
  size: size,
  max: max,
  min: min,
  mean: mean,
  round: round,
  capitalCase: capitalCase,
  lowerCase: lowerCase,
  titleCase: titleCase,
  kebabCase: kebabCase,
  getURLVars: getURLVars
};

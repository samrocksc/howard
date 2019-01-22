'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffer = exports.formData = exports.blob = exports.arrayBuffer = exports.text = exports.json = exports.withDefaults = exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require('isomorphic-fetch');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @global
 * Howard - An isomorphic-fetch manager
 * @author Sam Clark(samrocksc@gmail.com)
 * @param {string} path - The path of the endpoint you need to access.
 * @param {object} options - An object containing the method, and also the query parameters.
 * @return {object}  A Promise.
 */
function howard(path, options) {
  if (options && options.body && !options.method) {
    options.method = 'POST';
  }

  if (options && _typeof(options.body) === 'object' && !(global.FormData && options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(path, options);
}

/**
 * withDefaults - include a default url for the api.
 * @param {object} config - Any options passed in from options.
 * @return {object}  A Promise.
 */
function withDefaults() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  config.url = config.url || '';

  function defaultedClient(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var qs = '';
    if (_typeof(options.body) === 'object' && !(global.FormData && options.body instanceof FormData)) {
      options.body = JSON.stringify(options.body);
    }

    if (options.query) {
      // eslint-disable-next-line
      var query = {};
      // eslint-disable-next-line
      for (var key in options.query) {
        if (options.query[key] !== undefined) {
          query[key] = options.query[key];
        }
      }

      qs = '?' + _queryString2.default.stringify(query);
    }
    Object.assign({ credentials: 'include' }, options);

    return howard('' + config.url + path + qs, options);
  }

  return defaultedClient;
}

/**
 * json -(node/browser) wrap an API call with a json wrapper if you are receiving it back
 * @param {object} response - The return from a fetched promise.
 * @return {object}  Raw JSON that has been resolved out of its promise.
 */
function json(response) {
  return Promise.resolve(response).then(function (res) {
    return res.json();
  });
}

/**
 * text -(node/browser) wrap an API call with text and return it as a promise
 * @param {object} response - The return from a fetched promise.
 * @return {string}  If the expected resolver is a string, this stringifies it.
 */
function text(response) {
  return Promise.resolve(response).then(function (res) {
    return res.text();
  });
}

/**
 * arrayBuffer -(node/browser) wrap the API call and return the arrayBuffer in a promise
 * @param {object} response - The return from a fetched promise.
 * @return {string}  The resolver will be an arrayBuffer.
 */
function arrayBuffer(response) {
  return Promise.resolve(response).then(function (res) {
    return res.arrayBuffer();
  });
}

/**
 * blob -(node only) Wraps blob in in API call and returns it.
 * @param {object} response - The return from a fetched promise.
 * @return {string}  If the expected resolver is a blob, this stringifies it.
 */
function blob(response) {
  return Promise.resolve(response).then(function (res) {
    if (typeof res.blob === 'function') {
      return res.blob();
    }
    return Promise.reject(new Error('Method not implemented'));
  });
}

/**
 * formData -(browser) Wraps the formData in a promise and returns it.
 * @param {object} response - The return from a fetched promise.
 * @return {string}  If the expected resolver is a string, this stringifies it.
 */
function formData(response) {
  return Promise.resolve(response).then(function (res) {
    if (typeof res.formData === 'function') {
      return res.formData();
    }
    return Promise.reject(new Error('Method not implemented'));
  });
}

/**
 * buffer -(node only) Returns a promise with a buffer inside
 * @param {object} response - The return from a fetched promise.
 * @return {string}  Returns an error of method not implemented if buffer does not exist
 * @desc testing
 */
function buffer(response) {
  return Promise.resolve(response).then(function (res) {
    if (typeof res.buffer === 'function') {
      return res.buffer();
    }
    return Promise.reject(new Error('Method not implemented'));
  });
}

exports.default = howard;
exports.withDefaults = withDefaults;
exports.json = json;
exports.text = text;
exports.arrayBuffer = arrayBuffer;
exports.blob = blob;
exports.formData = formData;
exports.buffer = buffer;
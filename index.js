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

function howard(path, options) {
  return fetch(path, options);
}

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

function json(response) {
  return Promise.resolve(response).then(function (res) {
    return res.json();
  });
}

function text(response) {
  return Promise.resolve(response).then(function (res) {
    return res.text();
  });
}

function arrayBuffer(response) {
  return Promise.resolve(response).then(function (res) {
    return res.arrayBuffer();
  });
}

function blob(response) {
  return Promise.resolve(response).then(function (res) {
    if (typeof res.blob === 'function') {
      return res.blob();
    }
    return Promise.reject(new Error('Method not implemented'));
  });
}

function formData(response) {
  return Promise.resolve(response).then(function (res) {
    if (typeof res.formData === 'function') {
      return res.formData();
    }
    return Promise.reject(new Error('Method not implemented'));
  });
}

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
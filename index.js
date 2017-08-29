'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.handledFetch = handledFetch;
exports.default = howard;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handledFetch(path, options) {
  return (0, _isomorphicFetch2.default)(path, options).then(function (res) {
    if (res.status >= 400) {
      var err = new Error('Bad response from server');
      err.status = res.status;
      var contentType = res.headers.get('content-type');

      if ((0, _lodash.startsWith)(contentType, 'application/json')) {
        return res.json().then(function (content) {
          err.content = content;
          throw err;
        });
      }

      return res.text().then(function (content) {
        err.content = content;
        throw err;
      });
    }
    return res;
  });
}

function howard() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  config.url = config.url || '';

  function apiFetch(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var qs = '';
    if (_typeof(options.body) === 'object' && !(global.FormData && options.body instanceof FormData)) {
      options.body = JSON.stringify(options.body);
    }

    if (options.query) {
      var query = (0, _lodash.omitBy)(options.query, _lodash.isUndefined);
      qs = '?' + _queryString2.default.stringify(query);
    }
    Object.assign(options, { credentials: 'include' });

    return handledFetch('' + config.url + path + qs, options).then(function (res) {
      if (res.status === 200) {
        return res.json();
      }
      return true;
    });
  }

  return apiFetch;
}
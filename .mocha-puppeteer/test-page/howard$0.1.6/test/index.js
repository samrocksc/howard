$_mod.def("/howard$0.1.6/test/index", function(require, exports, module, __filename, __dirname) { 'use strict';var process=require("process"); 

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require('/howard$0.1.6/src/index'/*'../src/index'*/);

var _index2 = _interopRequireDefault(_index);

var _expect = require('/expect$21.1.0/build-es5/index'/*'expect'*/);

var _expect2 = _interopRequireDefault(_expect);

var _fetchMock = require('/fetch-mock$5.12.2/es5/client'/*'fetch-mock'*/);

var _fetchMock2 = _interopRequireDefault(_fetchMock);

var _readBlob = require('/read-blob$1.1.0/index'/*'read-blob'*/);

var _readBlob2 = _interopRequireDefault(_readBlob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pass = {
  result: 'I passed'
};

var img = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==";

var config = {
  url: 'https://shoutinginfrench.com'
};

var isNode = process && process.release && process.release.name === 'node';

describe('Howard Should', function () {

  beforeEach(function () {
    _fetchMock2.default.getOnce(config.url + '/get', pass);
    _fetchMock2.default.postOnce(config.url + '/post', pass);
    _fetchMock2.default.getOnce(config.url + '/fail', { status: 404 });
    _fetchMock2.default.getOnce(config.url + '/blob', img);
  });

  //const api = howard(config);

  it('has proper exports', function (done) {
    (0, _expect2.default)(typeof _index2.default === 'undefined' ? 'undefined' : _typeof(_index2.default)).toBe('function');
    (0, _expect2.default)(typeof _index.json === 'undefined' ? 'undefined' : _typeof(_index.json)).toBe('function');
    (0, _expect2.default)(typeof _index.text === 'undefined' ? 'undefined' : _typeof(_index.text)).toBe('function');
    (0, _expect2.default)(typeof _index.arrayBuffer === 'undefined' ? 'undefined' : _typeof(_index.arrayBuffer)).toBe('function');
    (0, _expect2.default)(typeof _index.blob === 'undefined' ? 'undefined' : _typeof(_index.blob)).toBe('function');
    (0, _expect2.default)(typeof _index.formData === 'undefined' ? 'undefined' : _typeof(_index.formData)).toBe('function');
    (0, _expect2.default)(typeof _index.buffer === 'undefined' ? 'undefined' : _typeof(_index.buffer)).toBe('function');
    done();
  });

  it('handle a get call', function () {
    var request = (0, _index2.default)(config.url + '/get');
    return (0, _expect2.default)(request).resolves.toMatchObject(_expect2.default.objectContaining({ status: 200 }));
  });

  it('handle a post call', function () {
    var request = (0, _index2.default)(config.url + '/post', { method: 'POST', body: { yo: 'hello my friend' } });
    return (0, _expect2.default)(request).resolves.toMatchObject(_expect2.default.objectContaining({ status: 200 }));
  });

  it('should handle failure', function () {
    var request = (0, _index2.default)(config.url + '/fail');
    return (0, _expect2.default)(request).resolves.toMatchObject(_expect2.default.objectContaining({ status: 404 }));
  });

  it.skip('should handle a query string', function (done) {
    done();
  });

  it('receive a json error message', function (done) {
    done();
  });

  it('should handle a status code non 200 below 400', function (done) {
    done();
  });

  it('handle json()', function () {
    var request = (0, _index.json)((0, _index2.default)(config.url + '/get'));
    return (0, _expect2.default)(request).resolves.toMatchObject(pass);
  });

  it('allow json to accept a Response()', function () {
    var request = (0, _index.json)(new Response(JSON.stringify(pass)));
    return (0, _expect2.default)(request).resolves.toMatchObject(pass);
  });

  it('handle text()', function () {
    var request = (0, _index.text)((0, _index2.default)(config.url + '/get'));
    return (0, _expect2.default)(request).resolves.toEqual(JSON.stringify(pass));
  });

  it('allow text() to accept a Response()', function () {
    var request = (0, _index.text)(new Response(JSON.stringify(pass)));
    return (0, _expect2.default)(request).resolves.toEqual(JSON.stringify(pass));
  });

  it('handle blob()', function () {
    if (isNode) {
      this.skip();
    }
    var request = (0, _index.blob)((0, _index2.default)(config.url + '/blob')).then(_readBlob2.default.text);

    return (0, _expect2.default)(request).resolves.toEqual(img);
  });

  it('blob rejects in unsupported node', function () {
    if (!isNode) {
      this.skip();
    }
    var request = (0, _index.blob)((0, _index2.default)(config.url + '/blob'));
    return (0, _expect2.default)(request).rejects.toMatchObject(new Error('Method not implemented'));
  });

  it('allow blob() to accept a Response()', function () {
    if (isNode) {
      this.skip();
    }
    var data = new Blob([img]);
    var request = (0, _index.blob)(new Response(data)).then(_readBlob2.default.text);
    return (0, _expect2.default)(request).resolves.toEqual(img);
  });

  // Form Data
  it('handle formData()', function () {
    if (isNode) {
      this.skip();
    }
    var data = new FormData();
    data.append('testing', 'this');
    _fetchMock2.default.getOnce(config.url + '/form', { body: data, sendAsJson: false });
    var request = (0, _index.formData)((0, _index2.default)(config.url + '/form'));

    return (0, _expect2.default)(request).resolves.toEqual(data);
  });

  it('formData rejects in unsupported node', function () {
    if (!isNode) {
      this.skip();
    }
    _fetchMock2.default.getOnce(config.url + '/form', {});
    var request = (0, _index.formData)((0, _index2.default)(config.url + '/form'));
    return (0, _expect2.default)(request).rejects.toMatchObject(new Error('Method not implemented'));
  });

  it('allow formData() to accept a Response()', function () {
    if (isNode) {
      this.skip();
    }
    var data = new FormData();
    data.append('testing', 'this');
    var request = (0, _index.formData)(new Response(data));
    return (0, _expect2.default)(request).resolves.toEqual(data);
  });
});
});
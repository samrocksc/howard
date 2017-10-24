'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require('../src/index');

var _index2 = _interopRequireDefault(_index);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pass = {
  body: 'I passed'
};

var config = {
  url: 'https://shoutinginfrench.com'
};

describe('Howard Should', function () {

  beforeEach(function () {
    (0, _nock2.default)(config.url).get('/get').reply(200, pass);
    (0, _nock2.default)(config.url).post('/post').reply(200, pass);
    (0, _nock2.default)(config.url).get('/fail').reply(404);
    (0, _nock2.default)(config.url).get('/users').query({ id: 1 }).reply(200, pass);
    (0, _nock2.default)(config.url).get('/header').reply(404, pass, {
      'content-type': 'application/json'
    });
    (0, _nock2.default)(config.url).put('/update').reply(201, pass);
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
    return (0, _expect2.default)(request).resolves.toMatchObject({ status: 200 });
  });

  it('handle a post call', function () {
    var request = (0, _index2.default)(config.url + '/post', { method: 'POST', body: { yo: 'hello my friend' } });
    return (0, _expect2.default)(request).resolves.toMatchObject({ status: 200 });
  });

  it('should handle failure', function () {
    var request = (0, _index2.default)(config.url + '/fail');
    return (0, _expect2.default)(request).resolves.toMatchObject({ status: 404 });
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
    if (process.release.name === 'node') {
      this.skip();
    }
    var request = (0, _index.blob)((0, _index2.default)(config.url + '/get'));
    return (0, _expect2.default)(request).resolves.toEqual(JSON.stringify(pass));
  });

  it('blob rejects in unsupported node', function () {
    if (process.release.name != 'node') {
      this.skip();
    }
    var request = (0, _index.blob)((0, _index2.default)(config.url + '/get'));
    return (0, _expect2.default)(request).rejects.toMatch('Method not implemented');
  });

  it('allow blob() to accept a Response()', function () {
    var request = (0, _index.text)(new Response(JSON.stringify(pass)));
    return (0, _expect2.default)(request).resolves.toEqual(JSON.stringify(pass));
  });

  it('handles blob()');
  it('handles formData() properly');
  it('handles arrayBuffer() properly');
});
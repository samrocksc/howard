'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffer = exports.formData = exports.blob = exports.arrayBuffer = exports.text = exports.json = exports.default = undefined;

require('isomorphic-fetch');

function howard(path, options) {
  return fetch(path, options);
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
exports.json = json;
exports.text = text;
exports.arrayBuffer = arrayBuffer;
exports.blob = blob;
exports.formData = formData;
exports.buffer = buffer;
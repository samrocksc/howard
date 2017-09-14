import 'isomorphic-fetch';

function howard(path, options) {
  return fetch(path, options);
}

function json(response) {
  return Promise.resolve(response)
    .then(res => res.json());
}

function text(response) {
  return Promise.resolve(response)
    .then(res => res.text());
}

function arrayBuffer(response) {
  return Promise.resolve(response)
    .then(res => res.arrayBuffer());
}

function blob(response) {
  return Promise.resolve(response)
    .then((res) => {
      if (typeof res.blob === 'function') {
        return res.blob();
      }
      return Promise.reject(new Error('Method not implemented'));
    });
}

function formData(response) {
  return Promise.resolve(response)
    .then((res) => {
      if (typeof res.formData === 'function') {
        return res.formData();
      }
      return Promise.reject(new Error('Method not implemented'));
    });
}

function buffer(response) {
  return Promise.resolve(response)
    .then(res => res.buffer());
}

export { howard as default, json, text, arrayBuffer, blob, formData, buffer };


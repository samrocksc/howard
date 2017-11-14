import 'isomorphic-fetch';
import queryString from 'query-string';

function howard(path, options) {
  return fetch(path, options);
}

function withDefaults(config = {}) {
  config.url = config.url || '';

  function defaultedClient(path, options = {}) {
    let qs = '';
    if (typeof options.body === 'object' && !(global.FormData && options.body instanceof FormData)) {
      options.body = JSON.stringify(options.body);
    }

    if (options.query) {
      // eslint-disable-next-line
      let query = {};
      // eslint-disable-next-line
      for(let key in options.query) {
        if (options.query[key] !== undefined) {
          query[key] = options.query[key];
        }
      }

      qs = `?${queryString.stringify(query)}`;
    }
    Object.assign({ credentials: 'include' }, options);

    return howard(`${config.url}${path}${qs}`, options);
  }

  return defaultedClient;
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
    .then((res) => {
      if (typeof res.buffer === 'function') {
        return res.buffer();
      }
      return Promise.reject(new Error('Method not implemented'));
    });
}

export { howard as default, withDefaults, json, text, arrayBuffer, blob, formData, buffer };

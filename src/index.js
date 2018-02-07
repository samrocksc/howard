import 'isomorphic-fetch';
import queryString from 'query-string';

/**
 * Howard - An isomorphic-fetch manager.
 */

/**
 * The Main Module returns a promise..
 * @param {string} path - The path of the endpoint you need to access.
 * @param {object} options - An object containing the method, and also the query parameters.
 * @return {object}  A Promise.
 */
function howard(path, options) {
  if (options && options.body && !options.method) {
    options.method = 'POST';
  }
  return fetch(path, options);
}

/**
 * @name withDefaults
 * @param {object} config - Any options passed in from options.
 * @return {object}  A Promise.
 */
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

/**
 * json
 * @param {object} response - The return from a fetched promise.
 * @return {object}  Raw JSON that has been resolved out of its promise.
 */
function json(response) {
  return Promise.resolve(response)
    .then(res => res.json());
}

/**
 * text
 * @param {object} response - The return from a fetched promise.
 * @return {string}  If the expected resolver is a string, this stringifies it.
 */
function text(response) {
  return Promise.resolve(response)
    .then(res => res.text());
}

/**
 * arrayBuffer
 * @param {object} response - The return from a fetched promise.
 * @return {string}  If the expected resolver is a string, this stringifies it.
 */
function arrayBuffer(response) {
  return Promise.resolve(response)
    .then(res => res.arrayBuffer());
}

/**
 * blob
 * @param {object} response - The return from a fetched promise.
 * @return {string}  If the expected resolver is a string, this stringifies it.
 */
function blob(response) {
  return Promise.resolve(response)
    .then((res) => {
      if (typeof res.blob === 'function') {
        return res.blob();
      }
      return Promise.reject(new Error('Method not implemented'));
    });
}

/**
 * formData
 * @param {object} response - The return from a fetched promise.
 * @return {string}  If the expected resolver is a string, this stringifies it.
 */
function formData(response) {
  return Promise.resolve(response)
    .then((res) => {
      if (typeof res.formData === 'function') {
        return res.formData();
      }
      return Promise.reject(new Error('Method not implemented'));
    });
}


/**
 * buffer
 * @param {object} response - The return from a fetched promise.
 * @return {string}  Returns an error of method not implemented if buffer does not exist
 * @desc testing
 */
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

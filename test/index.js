import howard, { withDefaults, json, text, arrayBuffer, blob, formData, buffer } from '../src/index';
import expect from 'expect';
import fetchMock from 'fetch-mock';
import readBlob from 'read-blob';

const pass = {
  result: 'I passed',
};

const img = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==";

const config = {
  url: 'https://shoutinginfrench.com'
}

const mockArrayBuffer = new ArrayBuffer;

const isNode = (process &&  process.release && process.release.name === 'node');

describe('Howard should', () => {

  beforeEach(function() {
    fetchMock.getOnce(config.url + '/get', pass)
    fetchMock.postOnce(config.url + '/post', pass)
    fetchMock.postOnce(config.url + '/checkAuth', { status: 301 });
    fetchMock.getOnce(config.url + '/fail', { status: 404 })
    fetchMock.getOnce(config.url + '/blob', img);
    fetchMock.getOnce(config.url + '/qs?id=1', pass);
    fetchMock.getOnce(config.url + '/arrayBuffer', mockArrayBuffer);
  });

  //const api = howard(config);

  it('have proper exports', (done) => {
    expect(typeof howard).toBe('function');
    expect(typeof json).toBe('function');
    expect(typeof text).toBe('function');
    expect(typeof arrayBuffer).toBe('function');
    expect(typeof blob).toBe('function');
    expect(typeof formData).toBe('function');
    expect(typeof buffer).toBe('function');
    done();
  })

  it('handle a get call', () => {
    const request = howard(config.url + '/get')
    return expect(request).resolves.toMatchObject(expect.objectContaining({status: 200}));
  })

  it('handle a post call', () => {
    const request = howard(config.url + '/post', {method: 'POST', body: {yo: 'hello my friend'}})
    return expect(request).resolves.toMatchObject(expect.objectContaining({status: 200}));
  })

  it('should handle failure', () => {
    const request = howard(config.url + '/fail')
    return expect(request).resolves.toMatchObject(expect.objectContaining({status: 404}));
  })

  // Query Strings
  it('handle a query string', () => {
    const api = withDefaults(config);
    const options = {
      method: 'GET',
      query: {
        id: 1
      }
    }
    const request = json(api('/qs', options));
    return expect(request).resolves.toEqual(pass);
  });

  // JSON
  it('handle json()', () => {
    const request = json(howard(config.url + '/get'))
    return expect(request).resolves.toMatchObject(pass);
  });

  it('allow json to accept a Response()', () => {
    const request = json(new Response(JSON.stringify(pass)));
    return expect(request).resolves.toMatchObject(pass);
  })


  // Text
  it('handle text()', () => {
    const request = text(howard(config.url + '/get'))
    return expect(request).resolves.toEqual(JSON.stringify(pass));
  });

  it('allow text() to accept a Response()', () => {
    const request = text(new Response(JSON.stringify(pass)));
    return expect(request).resolves.toEqual(JSON.stringify(pass));
  })

  // Blobs
  it('handle blob()', function() {
    if (isNode) {
      this.skip();
    }
    const request = blob(howard(config.url + '/blob'))
      .then(readBlob.text);

    return expect(request).resolves.toEqual(img);
  });

  it('should reject a blob in unsupported node', function() {
    if (!isNode) {
      this.skip();
    }
    const request = blob(howard(config.url + '/blob'))
    return expect(request).rejects.toMatchObject(new Error('Method not implemented'));
  });

  it('allow blob() to accept a Response()', function() {
    if (isNode) {
      this.skip();
    }
    const data = new Blob([img]);
    const request = blob(new Response(data))
      .then(readBlob.text);
    return expect(request).resolves.toEqual(img);
  })

  // Form Data
  it('handle formData()', function() {
    if (isNode) {
      this.skip();
    }
    const data = new FormData();
    data.append('testing', 'this')
    fetchMock.getOnce(config.url + '/form', { body: data, sendAsJson: false })
    const request = formData(howard(config.url + '/form'))

    return expect(request).resolves.toEqual(data);
  });

  it('formData rejects in unsupported node', function() {
    if (!isNode) {
      this.skip();
    }
    fetchMock.getOnce(config.url + '/form', {})
    const request = formData(howard(config.url + '/form'))
    return expect(request).rejects.toMatchObject(new Error('Method not implemented'));
  });

  it('allow formData() to accept a Response()', function() {
    if (isNode) {
      this.skip();
    }
    const data = new FormData();
    data.append('testing', 'this')
    const request = formData(new Response(data));
    return expect(request).resolves.toEqual(data);
  })

  it('allows a buffer', function() {
    if(!isNode) {
      this.skip();
    }

    const data = Buffer.from('Hello World');
    fetchMock.getOnce(config.url + '/buffer', { body: data, sendAsJson: false })
    const request = buffer(howard(config.url + '/buffer'));

    return expect(request).resolves.toEqual(data);
  })

  it('is buffer is unsupported in browser', function () {
    if(isNode) {
      this.skip();
    }
    fetchMock.getOnce(config.url + '/buffer', {})
    const request = buffer(howard(config.url + '/buffer'));
    return expect(request).rejects.toMatchObject(new Error('Method not implemented'));
  });

  // withDefaults
  it('is able to take defaults', function() {
    const api = withDefaults(config);
    const request = json(api('/get', { method: 'GET' }));
    return expect(request).resolves.toEqual(pass);
  });
});

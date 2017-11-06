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

const isNode = (process &&  process.release && process.release.name === 'node');

describe('Howard Should', () => {

  beforeEach(function() {
    fetchMock.getOnce(config.url + '/get', pass)
    fetchMock.postOnce(config.url + '/post', pass)
    fetchMock.getOnce(config.url + '/fail', { status: 404 })
    fetchMock.getOnce(config.url + '/blob', img);
  });

  //const api = howard(config);

  it('has proper exports', (done) => {
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

  it.skip('should handle a query string', (done) => {
    done();
  });

  it('receive a json error message', (done) => {
    done();
  })

  it('should handle a status code non 200 below 400', (done) => {
    done();
  })

  it('handle json()', () => {
    const request = json(howard(config.url + '/get'))
    return expect(request).resolves.toMatchObject(pass);
  });

  it('allow json to accept a Response()', () => {
    const request = json(new Response(JSON.stringify(pass)));
    return expect(request).resolves.toMatchObject(pass);
  })


  it('handle text()', () => {
    const request = text(howard(config.url + '/get'))
    return expect(request).resolves.toEqual(JSON.stringify(pass));
  });

  it('allow text() to accept a Response()', () => {
    const request = text(new Response(JSON.stringify(pass)));
    return expect(request).resolves.toEqual(JSON.stringify(pass));
  })

  it('handle blob()', function() {
    if (isNode) {
      this.skip();
    }
    const request = blob(howard(config.url + '/blob'))
      .then(readBlob.text);

    return expect(request).resolves.toEqual(img);
  });

  it('blob rejects in unsupported node', function() {
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

  it('is unsupported in browser', function () {
    if(isNode) {
      this.skip();
    }
    fetchMock.getOnce(config.url + '/buffer', {})
    const request = buffer(howard(config.url + '/buffer'));
    return expect(request).rejects.toMatchObject(new Error('Method not implemented'));
  })

});

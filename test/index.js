import { expect } from 'chai';
import nock from 'nock'
import { howard } from '../src/index';

const pass = {
  body: 'I passed',
};

const config = {
  url: 'https://shoutinginfrench.com'
}

describe('Howard Should', () => {

  before(function() {
    nock(config.url)
      .get('/pass')
      .reply(200, pass);
    nock(config.url)
      .post('/pass')
      .reply(200, pass);
    nock(config.url)
      .get('/fail')
      .reply(404);
    nock(config.url)
      .get('/users')
      .query({id: 1})
      .reply(200, pass);
    nock(config.url)
      .get('/header')
      .reply(404, pass, {
        'content-type': 'application/json'
      });
    nock(config.url)
      .put('/update')
      .reply(201, pass);
  });

  const api = howard(config);


  it('be a function', (done) => {
    expect(howard).to.be.a('function');
    done();
  })

  it('handle a get call', (done) => {
    api('/pass')
      .then((res) => {
        expect(pass.body).to.equal(res.body);
      });
    done();
  })

  it('handle a post call', (done) => {
    api('/pass', {method: 'POST', body: {yo: 'hello my friend'}})
      .then((res) => {
        expect(pass.body).to.equal(res.body);
      });
    done();
  })

  it('should handle failure', (done) => {
    api('/fail', {method: 'GET'})
      .catch((res) => {
        expect(res.status).to.equal(404);
      });
    done();
  })

  it('should handle a query string', (done) => {
    api('/users', {method: 'GET', query: {id: 1}})
      .then((res) => {
        expect(res.body).to.equal(pass.body)
      })
    done();
  })

  it('receive a json error message', (done) => {
    api('/header', {method: 'GET'})
      .catch((err) => {
        expect(err.content.body).to.equal(pass.body);
      });
    done();
  })

  it('should handle a status code non 200 below 400', (done) => {
    api('/update', { method: 'PUT' })
      .catch((res) => {
        expect(res.body).to.equal(pass.body);
      })
    done();
  })

});

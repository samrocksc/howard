import { expect } from 'chai';
import nock from 'nock'
import howard from '../src/index';

const pass = {
  body: 'I passed',
};

const fail = {
  body: 'I failed',
};

describe('Howard Should', () => {

  before(function() {
    nock('https://shoutinginfrench.com')
      .get('/pass')
      .reply(200, pass);
    nock('https://shoutinginfrench.com')
      .post('/pass')
      .reply(200, pass);
    nock('https://shoutinginfrench.com')
      .get('/fail')
      .reply(404, pass);
  });

  const config = {
    url: 'https://shoutinginfrench.com'
  }

  const api = howard(config);


  it('be a function', function(done) {
    expect(howard).to.be.a('function');
    done();
  })

  it('handle a get call', function(done) {
    api('/pass')
      .then((res) => {
        expect(pass.body).to.equal(res.body);
      });
    done();
  })

  it('handle a post call', function(done) {
    api('/pass', {method: 'POST', body: {yo: 'hello my friend'}})
      .then((res) => {
        expect(pass.body).to.equal(res.body);
      });
    done();
  })

});

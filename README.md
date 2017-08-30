# Howard The Duck

[![NPM](https://nodei.co/npm/howard.png?compact=true)](https://nodei.co/npm/howard/)

[![Build Status](https://travis-ci.org/samrocksc/howard.svg?branch=master)](https://travis-ci.org/samrocksc/howard)

[![Coverage Status](https://coveralls.io/repos/github/samrocksc/howard/badge.svg?branch=master)](https://coveralls.io/github/samrocksc/howard?branch=master)

![howard](howard.png)

I simplify life!  If you are on a project that requires a lot of api Calls I can just handle the data retrieval in a quick and efficient manner!  Set a simple config file of the base URL and start making easier REST calls!

Howard is basically a factory function for an [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) call that extrapolates the JSON out of it and returns it as a promise.  Do whatever you want with the Promise, tag it in a chain.....tap it and use the results?  Make what you need to happen with it!

## Example
```javascript
import { howard } from 'howard';

const config = {
  url: 'http://theduck.com/api',
}

const api = apiFetch(config);

api('/stuff', { method: 'GET' })
  .then((res) => {
    return res;
  })

// Pass a body!
api('/stuff', { method: 'POST', body: { quote: 'Quack Fu' } })
  .then((res) => {
    return res;
  })

// Make a PUT request
api(`/stuff/${quoteId}`, { method: 'PUT', body: { quote: 'No one laughs at a master of Quack Fu' } })
  .then((res) => {
    return res;
  })

// Need Query Strings? put them in manually, or pass a param object!
const paramString = '?id=1';
api(`/stuff${paramString}`, { method: 'GET' })
  .then((res) => {
    return res;
  })

// ....with a param object
api('/stuff', { method: 'GET', params: { id: 1 } })
  .then((res) => {
    return res;
  })
```

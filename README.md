# Howard The Duck

[![NPM](https://nodei.co/npm/howard.png?compact=true)](https://nodei.co/npm/howard/)

[![Build Status](https://travis-ci.org/samrocksc/howard.svg?branch=master)](https://travis-ci.org/samrocksc/howard)

[![Coverage Status](https://coveralls.io/repos/github/samrocksc/howard/badge.svg?branch=master)](https://coveralls.io/github/samrocksc/howard?branch=master)

![howard](howard.png)

I simplify life!  If you are on a project that requires a lot of api Calls I can just handle the data retrieval in a quick and efficient manner!  Set a simple config file of the base URL and start making easier REST calls!

Howard is basically a factory function for an [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) call that extracts JSON and returns it as a promise.  Do whatever you want with the Promise, tag it in a chain.....tap it and use the results?  Make what you need to happen with it!

## Examples!!!!

Including Howard:

```javascript
import howard, { withDefaults, json, text, arrayBuffer, blob, formData, buffer} from 'howard';
```

```javascript
json(howard('https://swapi.co/api/people/1/'))
  .then((res) => {
    /*
      {
        "name": "Luke Skywalker",
        ...
      }
    */ })
```

Need Query Strings? put them in manually, or pass a param object!

```javascript
const paramString = '?format=wookiee';
json(howard(`https://swapi.co/api/people/1${paramString}`, { method: 'GET' }))
  .then((res) => {
    /*
      {
        "whrascwo": "Lhuorwo Sorroohraanorworc",
        "acwoahrracao": "172",
        "scracc": "77", 
        ...
      }
    */
  })
```

Using a param:

```javascript
  json(howard('https://swapi.co/api/people/1', { method: 'GET', params: { format: wookiee } }))
    .then((res) => {
      return res;
  })
```

If you need to set up a client with a default configuration, use the `withDefaults` method and specify a config object that gets merged with options for every request. In this example we also use async await:

```Javascript
const config = {
  url: 'http://theduck.com/api',
}

const api = howard.withDefaults(config);

const data = await api('/stuff', { method: 'GET'});
```

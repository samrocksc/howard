# Howard The Duck

[![NPM](https://nodei.co/npm/howard.png?compact=true)](https://nodei.co/npm/howard/)

[![Build Status](https://travis-ci.org/samrocksc/howard.svg?branch=master)](https://travis-ci.org/samrocksc/howard)

![howard](howard.jpg)

I simplify life!  If you are on a project that requires a lot of api Calls I can just handle the data retrieval in a quick and efficient manner!  Set a simple config file of the base URL and start making easier REST calls!

## Example
```
import howard from 'howard';

const config = {
  url: 'http://theduck.com/api',
}

const api = howard(config);

api('/stuff', { method: 'GET' })
api('/stuff', { method: 'POST', body: { quote: 'Quack Fu' } })
api(`/stuff/${quoteId}`, { method: 'PUT', body: { quote: 'No one laughs at a master of Quack Fu' } })
```

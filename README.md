# Howard The Duck

I simplify life!  If you are on a project that requires a lot of api Calls I can just handle the data retrieval in a quick and efficient manner!  Set a simple config file of the base URL and go to town!

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

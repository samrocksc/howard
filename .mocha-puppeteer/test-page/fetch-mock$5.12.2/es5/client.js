$_mod.def("/fetch-mock$5.12.2/es5/client", function(require, exports, module, __filename, __dirname) { 'use strict';

var FetchMock = require('/fetch-mock$5.12.2/es5/fetch-mock'/*'./fetch-mock'*/);
var statusTextMap = require('/fetch-mock$5.12.2/es5/status-text'/*'./status-text'*/);
var theGlobal = typeof window !== 'undefined' ? window : self;

FetchMock.global = theGlobal;
FetchMock.statusTextMap = statusTextMap;

FetchMock.setImplementations({
	Promise: theGlobal.Promise,
	Request: theGlobal.Request,
	Response: theGlobal.Response,
	Headers: theGlobal.Headers
});

module.exports = new FetchMock();
});
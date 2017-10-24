$_mod.def("/isomorphic-fetch$2.2.1/fetch-npm-browserify", function(require, exports, module, __filename, __dirname) { // the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('/whatwg-fetch$2.0.3/fetch'/*'whatwg-fetch'*/);
module.exports = self.fetch.bind(self);

});
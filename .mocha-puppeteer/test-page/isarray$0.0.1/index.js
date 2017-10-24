$_mod.def("/isarray$0.0.1/index", function(require, exports, module, __filename, __dirname) { module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

});
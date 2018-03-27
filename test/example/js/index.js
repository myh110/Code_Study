(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './thumb'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./thumb'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.thumb);
    global.index = mod.exports;
  }
})(this, function (exports, _thumb) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _thumb2 = _interopRequireDefault(_thumb);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _thumb2.default;
});
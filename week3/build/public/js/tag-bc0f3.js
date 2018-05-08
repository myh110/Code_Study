webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./index.es6\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var f = new _index2.default();
var t = '';
xtag.register('x-praise', {
    content: '\n    <div class="main">\n        <div class="count"></div>\n        <div class="thumb">\n            <div></div>\n            <div></div>\n        </div>\n    </div>\n    ',
    methods: {
        praise: function praise() {
            var _this = this;
            f.clickAction();
            // let animation = _this.querySelector("#animation");
            // animation.className = "hide num";
            // setTimeout(function () {
            //     animation.className = "hide"
            // }, 800)
        }
    },
    events: {
        click: function click(e) {
            var _this = this;
            if (e.target.id == 'thumb') {
                if (t) {
                    clearTimeout(t);
                }
                t = setTimeout(function () {
                    _this.praise();
                }, 500);
            }
        }
    }
});

/***/ })
],[1]);
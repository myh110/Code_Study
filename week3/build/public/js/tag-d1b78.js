webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _thu = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./thu.es6\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _thu2 = _interopRequireDefault(_thu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var f = new _thu2.default();
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
            debugger;
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
],[3]);
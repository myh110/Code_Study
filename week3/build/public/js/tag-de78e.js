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
    content: "<div class='hand' id='thumb'>" + "<div class='finger'></div>" + "<div class='finger'></div>" + "<div class='finger'></div>" + "<div class='finger'></div>" + "<div class='finger thumb'></div>" + "<div class='arm'></div>" + "</div>" + "<span class='hide' id='animation'>+1</span>",

    methods: {
        praise: function praise() {
            var _this = this;
            f.clickAction();
            var animation = _this.querySelector("#animation");
            animation.className = "hide num";
            setTimeout(function () {
                animation.className = "hide";
            }, 800);
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
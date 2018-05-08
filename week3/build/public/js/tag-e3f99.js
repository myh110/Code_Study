webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _praiseButton = __webpack_require__(4);

var _praiseButton2 = _interopRequireDefault(_praiseButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var f = new _praiseButton2.default();
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

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PraiseButton = function () {
  function PraiseButton() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _classCallCheck(this, PraiseButton);

    this.count = count;
  }

  _createClass(PraiseButton, [{
    key: "add",
    value: function add() {
      this.count++;
    }
  }]);

  return PraiseButton;
}();

exports.default = PraiseButton;

/***/ })
],[1]);
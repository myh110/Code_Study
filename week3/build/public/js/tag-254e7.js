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


var _thumb = __webpack_require__(5);

var _thumb2 = _interopRequireDefault(_thumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var f = new _thumb2.default();
var t = '';
xtag.register('x-praise', {
    content: '\n    <div class="main">\n        <div class="count"></div>\n        <div class="thumb" id="thumb">\n            <div></div>\n            <div></div>\n        </div>\n    </div>\n    ',
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _praiseButton = __webpack_require__(6);

var _praiseButton2 = _interopRequireDefault(_praiseButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thumb = function (_PraiseButton) {
    _inherits(Thumb, _PraiseButton);

    function Thumb(clikeElName, addElName) {
        var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Thumb);

        var _this = _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this, count));

        _this.clikeEl = document.querySelector("." + clikeElName);
        _this.addEl = document.querySelector("." + addElName);
        // this.bindEvent();
        // this.render()
        return _this;
    }

    _createClass(Thumb, [{
        key: "render",
        value: function render() {
            // this.addEl.innerHTML = this.count;
            alert(this.count);
        }
        // bindEvent(){

        //     addEvent(this.clikeEl, 'click', this.handle.bind(this), false);
        // }

    }, {
        key: "clickAction",
        value: function clickAction() {
            axios.get('/index/update').then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            this.add();
            this.render();
        }
    }]);

    return Thumb;
}(_praiseButton2.default);

var addEvent = function () {
    if (window.addEventListener) {
        return function (elem, type, fn, capture) {
            if (type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for (var i = 0; i < types.length; i++) {
                    elem.addEventListener(types[i], fn, capture);
                }
            } else {
                elem.addEventListener(type, fn, capture);
            }
        };
    } else {
        return function (elem, type, fn, capture) {
            if (type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for (var i = 0; i < types.length; i++) {
                    elem.attachEvent('on' + types[i], fn);
                }
            } else {
                elem.attachEvent('on' + type, fn);
            }
        };
    }
}();
exports.default = Thumb;

/***/ }),
/* 6 */
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
],[3]);
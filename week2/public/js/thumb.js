'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _praiseButton = require('./praiseButton.js');

var _praiseButton2 = _interopRequireDefault(_praiseButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thumb = function (_PraiseButton) {
    _inherits(Thumb, _PraiseButton);

    function Thumb(clikeElName, addElName, count) {
        _classCallCheck(this, Thumb);

        var _this = _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this, count));

        _this.clikeEl = document.querySelector('.' + clikeElName);
        _this.addEl = document.querySelector('.' + addElName);
        _this.bindEvent();
        _this.render();
        return _this;
    }

    _createClass(Thumb, [{
        key: 'render',
        value: function render() {
            this.addEl.innerHTML = this.count;
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {

            addEvent(this.clikeEl, 'click', this.handle.bind(this), false);
        }
    }, {
        key: 'handle',
        value: function handle() {
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
exports.default = { Thumb: Thumb };
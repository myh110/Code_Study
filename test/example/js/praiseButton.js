(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.praiseButton = mod.exports;
    }
})(this, function () {
    "use strict";

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var PraiseButton = function () {
        function PraiseButton(clikeElName) {
            _classCallCheck(this, PraiseButton);

            this.clikeEl = document.querySelector("." + clikeElName);
            this.count = 0;
            this.bindEvent();
        }

        _createClass(PraiseButton, [{
            key: "bindEvent",
            value: function bindEvent() {
                addEvent(this.clikeEl, 'click', this.clickHandle.bind(this), false);
            }
        }, {
            key: "clickHandle",
            value: function clickHandle() {
                this.count++;
                this.render();
            }
        }]);

        return PraiseButton;
    }();

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
});
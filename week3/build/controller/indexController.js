'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexmodel = require('../models/indexmodel');

var _indexmodel2 = _interopRequireDefault(_indexmodel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var indexController = {
    // async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成 await 只能出现在 async 函数中
    //
    index: function index() {
        var _this = this;

        return function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return ctx.render('index.html', {
                                    title: "大拇指点赞" //注意async的书写
                                });

                            case 2:
                                ctx.body = _context.sent;

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
    },

    //ctx是context的缩写 中文叫成上下文，可以理解为上(request)下(response)沟通的环境
    //所以koa中把他们两都封装进了ctx对象，koa官方文档里的解释是为了调用方便
    //body是http协议中的响应体，header是指响应头： ctx.body = ctx.res.body = ctx.response.body
    update: function update() {
        var _this2 = this;

        return function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
                var indexM;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                indexM = new _indexmodel2.default();
                                _context2.next = 3;
                                return indexM.updateNum();

                            case 3:
                                ctx.body = _context2.sent;

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }();
    }
};
exports.default = indexController;
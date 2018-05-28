'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexController = require('./indexController');

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllInit = {
    init(app, router) {
        app.use(router(_ => {
            _.get('/', _indexController2.default.indexAction());
        }));
    }
};

exports.default = controllInit;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
    "viewDir": "",
    "staticDir": _path2.default.join(__dirname, '..', 'assets')
    //todo 增加了非常多无用的代码 导致当前的逻辑过长 导致代码量偏大  对代码进行清洗
};const init = function () {

    if (process.env.NODE_ENV == "development") {
        const localConfig = {
            port: 8081
        };
        config = _lodash2.default.extend(config, localConfig);
    }

    if (process.env.NODE_ENV == "production") {
        const prodConfig = {
            port: 8081
        };
        config = _lodash2.default.extend(config, prodConfig);
    }
    return config;
};
const result = init();
// console.log(result);
exports.default = result;
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));

let config = {
    "viewDir": ""
};
//todo 增加了非常多无用的代码 导致当前的逻辑过长 导致代码量偏大  对代码进行清洗
const init = function (){
  
    {
        const prodConfig = {
            port: 8081
        };
        config = _.extend(config, prodConfig);
    }
    return config;
};
const result = init();

module.exports = result;

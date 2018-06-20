"use strict";

var _Koa = require("Koa");

var _Koa2 = _interopRequireDefault(_Koa);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _controllerinit = require("./controllers/controllerinit");

var _controllerinit2 = _interopRequireDefault(_controllerinit);

var _index = require("./config/index");

var _index2 = _interopRequireDefault(_index);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _Koa2.default();
//配置前端swig模板
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _index2.default.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ["[[", "]]"]
}));
//日志配置
_log4js2.default.configure({
    appenders: { cheese: { type: 'file', filename: `${__dirname}/logs/ma.log` } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
//拿到log
const logger = _log4js2.default.getLogger('cheese');
//传给错误处理的中间件
_errorHandler2.default.error(app, logger);

//静态资源
app.use((0, _koaStatic2.default)(_index2.default.staticDir));
_controllerinit2.default.init(app, _koaSimpleRouter2.default);

app.listen(_index2.default.port, () => {
    // logger.trace('Entering cheese testing');
    logger.info('server start');
    console.log(`huihui listening on ${_index2.default.port}`);
});
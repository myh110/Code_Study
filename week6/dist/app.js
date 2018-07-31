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

var _index = require("./config/index");

var _index2 = _interopRequireDefault(_index);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import controllerInit from './controllers/controllerinit';
const app = new _Koa2.default();

//ioc控制反转的容器
const container = (0, _awilix.createContainer)();
//每一次请求new
app.use((0, _awilixKoa.scopePerRequest)(container));
//装载所有的所有的services到controller 完成利用切面的注入
container.loadModules([__dirname + '/services/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: _awilix.Lifetime.SCOPED
    }
});
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
// controllerInit.init(app, router);
//注册所有的controllers
app.use((0, _awilixKoa.loadControllers)(__dirname + '/controllers/*.js', { cwd: __dirname }));

app.listen(_index2.default.port, () => {
    // logger.trace('Entering cheese testing');
    logger.info('server start');
    console.log(`huihui listening on ${_index2.default.port}`);
});
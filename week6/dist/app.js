"use strict";

var _Koa = require("Koa");

var _Koa2 = _interopRequireDefault(_Koa);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _controllerinit = require("./controllers/controllerinit");

var _controllerinit2 = _interopRequireDefault(_controllerinit);

var _index = require("./config/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _Koa2.default();
app.use((0, _koaStatic2.default)(_index2.default.staticDir));
_controllerinit2.default.init(app, _koaSimpleRouter2.default);

app.listen(_index2.default.port, () => {
    console.log(`huihui listening on ${_index2.default.port}`);
});
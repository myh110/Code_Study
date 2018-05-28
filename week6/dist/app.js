"use strict";

var _Koa = require("Koa");

var _Koa2 = _interopRequireDefault(_Koa);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _controllerinit = require("./controllers/controllerinit");

var _controllerinit2 = _interopRequireDefault(_controllerinit);

var _index = require("./config/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _Koa2.default();
_controllerinit2.default.init(app, _koaSimpleRouter2.default);
// app.use(router(_ => {
//     _.get('/', (ctx, next) => {
//         ctx.body = 'hello'
//     })
//     _.post('/name/:id', (ctx, next) => {
//         // ...
//     })
// })
// console.log(config);
app.listen(_index2.default.port);
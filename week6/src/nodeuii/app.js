import Koa from "Koa";
import router from "koa-simple-router";
import controllerInit from './controllers/controllerinit';
import config from './config/index'


const app = new Koa();
controllerInit.init(app, router);
// app.use(router(_ => {
//     _.get('/', (ctx, next) => {
//         ctx.body = 'hello'
//     })
//     _.post('/name/:id', (ctx, next) => {
//         // ...
//     })
// })
// console.log(config);
app.listen(config.port);
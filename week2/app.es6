// const Koa = require('koa');
import CONFIG from "./config/config";
import 'babel-polyfill'
import Koa from "koa";
import router from 'koa-simple-router';
import  serve from 'koa-static';
import render from "koa-swig";
import  co from 'co';
import initController from './controller/initController';

const app = new Koa();

initController.init(app, router);

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.context.render = co.wrap(render({
  root: CONFIG.get('viewDir'),
  autoescape: true,
  cache: 'memory', // disable, set to false 
  ext: 'html'
}));


app.use(serve(CONFIG.get('staticDir')));
app.listen(CONFIG.get('port'));

export default app 
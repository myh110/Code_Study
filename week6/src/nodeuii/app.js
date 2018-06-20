import Koa from "Koa";
import render from "koa-swig";
import log4js from 'log4js';
import co from "co";
import serve from 'koa-static';
import router from "koa-simple-router";
import controllerInit from './controllers/controllerinit';
import config from './config/index'
import errorHandler from './middlewares/errorHandler'


const app = new Koa();
//配置前端swig模板
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[","]]"], 
}));
//日志配置
log4js.configure({
    appenders: { cheese: { type: 'file', filename: `${__dirname}/logs/ma.log` } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  });
//拿到log
const logger = log4js.getLogger('cheese');
//传给错误处理的中间件
errorHandler.error(app, logger)

//静态资源
app.use(serve(config.staticDir));
controllerInit.init(app, router);

app.listen(config.port, () => {
    // logger.trace('Entering cheese testing');
    logger.info('server start');
    console.log(`huihui listening on ${config.port}`);
});
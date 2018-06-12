import Koa from "Koa";
import router from "koa-simple-router";
import controllerInit from './controllers/controllerinit';
import config from './config/index'


const app = new Koa();
controllerInit.init(app, router);

app.listen(config.port,()=>{
    console.log(`huihui listening on ${config.port}`);
});
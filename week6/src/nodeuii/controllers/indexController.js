import { route, GET, POST, before } from 'awilix-koa';
@route("/")
// @route("/index.html")
export default class IndexController {
    constructor({ indexService }) {
        this.indexService = indexService;
    }
    @GET()
    async getData(ctx, next){
        const result = await this.indexService.getData();
        ctx.body = await ctx.render('../views/index/pages/index', { data: result });
    }
}
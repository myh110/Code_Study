import indexModel from '../models/indexmodel'
const indexController = {
// async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成 await 只能出现在 async 函数中
//
    index() {
        return async(ctx, next) => {
            ctx.body = await ctx.render('index.html', {
                title: "大拇指点赞" //注意async的书写
            })
        }
    },
    //ctx是context的缩写 中文叫成上下文，可以理解为上(request)下(response)沟通的环境
    //所以koa中把他们两都封装进了ctx对象，koa官方文档里的解释是为了调用方便
    //body是http协议中的响应体，header是指响应头： ctx.body = ctx.res.body = ctx.response.body
    update() {
        return async(ctx, next) => {
            const indexM = new indexModel();
            ctx.body = await indexM.updateNum();

        }
    },
    star() {
        return async(ctx, next) => {
            if (ctx.request.header['x-pjax']) {
                ctx.body = "<x-star></x-star>";
            } else {
                ctx.body = await ctx.render('star.html', {
                    title: "星星点赞"
                })
            }

        }
    },
    praise() {
        return async(ctx, next) => {
            if (ctx.request.header['x-pjax']) {
                ctx.body = "<x-praise></x-praise>"
            } else {
                ctx.body = await ctx.render('index.html', {
                    title: "大拇指点赞"
                })

            }

        }
    },

    advertisement() {
        return async(ctx, next) => {
            ctx.body = '<div style="height: 150px;background: orange;">。。。。大幅广告。。。。</div>';
        }
    },
}
export default indexController
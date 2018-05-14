import css from '../css/common.css'
import PraiseButton from './thumb.es6'
const f=new PraiseButton();
let t='';
xtag.register('x-star', {
    content: "<div class='star' id='star' >" +
    "<div class='star1'></div>" +
    " </div>" +
    " <span class='hide' id='animation'>+1</span>",

    methods: {
        praise: function() {
            let _this = this;
            f.clickAction();//向后台请求
            //然后让animation出现，首先通过id来找到animation
            let animation = _this.querySelector("#animation");
            animation.className = "hide num";//且把animation的className重新赋值
            setTimeout(function() {
                animation.className = "hide"
            }, 800)
        }
    },

    events: {
        click: function(e) {
            let _this = this;
            if (e.target.id == "star") {//首先判断点击事件是否点击到thumb
                let t = "";
                if (t) {
                    clearTimeout(t);
                }
                t = setTimeout(() => {
                    _this.praise();
                }, 500);
            }
        },
    }
});
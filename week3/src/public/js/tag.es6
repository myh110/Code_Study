import PraiseButton from './thumb.es6'
const f=new PraiseButton();
let t='';
xtag.register('x-praise', {
    content: `
    <div class="main">
        <div class="count"></div>
        <div class="thumb" id="thumb">
            <div></div>
            <div></div>
        </div>
    </div>
    `,
    methods: {
        praise: function () {
        let _this=this;
        f.clickAction();
        // let animation = _this.querySelector("#animation");
        // animation.className = "hide num";
        // setTimeout(function () {
        //     animation.className = "hide"
        // }, 800)
      }
    },
    events: {
        click: function (e) {
            let _this=this;
            // if (e.target.id=='thumb') {
                if(t){
                    clearTimeout(t);
                }
                t = setTimeout(() => {
                    _this.praise();
                }, 500);
            // }
        }
    }
});
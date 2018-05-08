
import PraiseButton from "./praiseButton.es6"


class Thumb extends PraiseButton {
    constructor(clikeElName, addElName,count = 0){
        super(count)
        this.clikeEl = document.querySelector(`.${clikeElName}`)
        this.addEl = document.querySelector(`.${addElName}`)
        // this.bindEvent();
        // this.render()
    }

    render(){
        // this.addEl.innerHTML = this.count;
        alert(this.count)
    }
    // bindEvent(){
    
    //     addEvent(this.clikeEl, 'click', this.handle.bind(this), false);
    // }
    clickAction(){
        axios.get('/index/update')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        this.add()
        this.render()
    }
}
const addEvent = (function() {
    if(window.addEventListener) {
        return function(elem, type, fn, capture) {
            if(type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for(var i = 0; i < types.length; i++) {
                    elem.addEventListener(types[i], fn, capture);
                }
            } else {
                elem.addEventListener(type, fn, capture);
            }
        }
    } else {
        return function(elem, type, fn, capture) {
            if(type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for(var i = 0; i < types.length; i++) {
                    elem.attachEvent('on' + types[i], fn);
                }
            } else {
                elem.attachEvent('on' + type, fn);
            }
        }
    }
})();
export default Thumb
 

class PraiseButton {
    constructor(clikeElName){
        this.clikeEl = document.querySelector(`.${clikeElName}`)
        this.count = 0
        this.bindEvent();
    }
    bindEvent(){
        addEvent(this.clikeEl, 'click', this.clickHandle.bind(this), false);
    }
    clickHandle(){
        this.count++ 
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
 

class PraiseButton {
    constructor(count = 0){
      
        this.count = count
       
    }
    
    add(){
        this.count++ 
   
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
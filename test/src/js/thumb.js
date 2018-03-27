import PraiseButton from "./praiseButton.js"


class Thumb extends PraiseButton {
    constructor(clikeElName, addElName,count){
        super(count)
        this.clikeEl = document.querySelector(`.${clikeElName}`)
        this.addEl = document.querySelector(`.${addElName}`)
        this.bindEvent();
        this.render()
    }

    render(){
        this.addEl.innerHTML = this.count;
    }
    bindEvent(){
    
        addEvent(this.clikeEl, 'click', this.handle.bind(this), false);
    }
    handle(){
        this.add()
        this,render()
    }
}

export default Thumb
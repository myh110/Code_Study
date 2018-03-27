import PraiseButton from "./praiseButton"


class Thumb extends PraiseButton {
    constructor(clikeElName, addElName){
        super(clikeElName)
        this.addEl = document.querySelector(`.${addElName}`)
        this.render()
    }

    render(){
        this.addEl.innerHTML = this.count;
    }
 
}

export default Thumb
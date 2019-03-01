// widget/input-number/input-number.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initNum:{
      type : Number,
      observer(newVal){
        this.setData({
          result: newVal
        })
      }
    },
    target:{
      type: Number
    },
    min:{
      type:Number,
      value:0
    },
    max: {
      type: Number,
      value: 999999
    },
    btnDisable:{
      type:Boolean
    },
    result:{
      type: Number
    }
  },
  ready(){
    let that = this;
    this.setData({
      result: that.properties.initNum
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    result:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setNumber(event){
      let type =  event.currentTarget.dataset.type;
      let that = this;
      let next = type === 'add' ? that.data.result + 1 : that.data.result - 1;

      if (type === 'add' && that.data.result < that.properties.max) {
        that.setData({ result: that.data.result+1});
      } else if (type === 'delete' && that.data.result > that.properties.min) {   
        that.setData({ result: that.data.result-1 });
      }
      this.triggerEvent("changeNumber",
        { result:that.data.result, 
          target:that.properties.target,
          next:next });
    }
  }
})

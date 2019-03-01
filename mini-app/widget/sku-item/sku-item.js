// widget/sku-item/sku-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sku: {
      type: Object,
      observer(newVal, oldVal){
        this.setData({
          innerSku: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    innerSku: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeNumber(params){
      this.triggerEvent("changeNumber", params.detail);
    }
  }
})

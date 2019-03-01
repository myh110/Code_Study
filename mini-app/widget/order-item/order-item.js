// widget/order-item/order-item.js
const Tool = require("../../utils/tool/tool.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderTimeFormat:null
  },
  attached: function () {
    this.formatOrderDate(this.data.order);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e){
      let orderId = this.properties.order.order_id;
      
      wx.navigateTo({
        url: `../order-detail/order-detail?order_id=${orderId}`,
      })
    },
    /**
    * 格式化订单时间
    */
    formatOrderDate(orderHead) {
      this.setData({
        orderTimeFormat: Tool.formatDate(orderHead.ordered_at, "datetime")
      })
    },
  }
})

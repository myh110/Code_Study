// widget/coupon-item/coupon-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupon: {
      type: Object,
      value: {}
    },
    circleBgColor: {
      type: String,
      value: "#fff",
      observer: function (newVal, oldVal) { }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    couponName: "优惠券",
    couponType: "discounts"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

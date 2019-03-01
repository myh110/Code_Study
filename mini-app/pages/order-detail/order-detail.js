// pages/order-detail/order-detail.js

const Tool = require("../../utils/tool/tool.js");
import WX from "../../utils/weixin/weixin.js";
import Api from "../../utils/api/Api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId : null,
    orderTimeFormat: null,
    orderHead: null,
    orderDetail: null,
    discountMoney: null,
    savingMoney: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.order_id
    })

    this.getOrderInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 获取订单详情
   */
  getOrderInfo: function(){
    WX.$http(Api.getOrderDetail,{
      order_id: this.data.orderId
    }).then(res=>{
      let orderInfo = res.content;
      this.setData({
      orderHead: orderInfo.order_head,
      orderDetail: orderInfo.order_detail_list
    })
    this.formatOrderDate(orderInfo.order_head);
    this.formatDiscountMoney(orderInfo.order_head);
    this.formatSavingMoney(orderInfo.order_head);
    });
  },
  /**
   * 格式化订单时间
   */
  formatOrderDate(orderHead){
    this.setData({
      orderTimeFormat: Tool.formatDate(orderHead.ordered_at, "datetime")
    })
  },
  formatDiscountMoney(orderHead){
    this.setData({
      discountMoney: (Number(orderHead.promotion_info.promotion_money) + Number(orderHead.promotion_sku_info.promotion_sku_money)).toFixed(2)
    })
  },
  formatSavingMoney(orderHead){
    this.setData({
      savingMoney: (Number(orderHead.sku_money) - Number(orderHead.money)).toFixed(2)
    })
  }
})
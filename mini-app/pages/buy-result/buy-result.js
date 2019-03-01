// pages/about-us/about-us.js
import WX from "../../utils/weixin/weixin.js";
import Api from "../../utils/api/Api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasCoupon: false,
    couponInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponInfo(options.order_id);
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
   * 获取优惠券信息
   */
  getCouponInfo(orderId) {
    WX.$http(Api.getCouponPayret,{
      order_id: orderId
    }).then(data=>{
      if (!Array.isArray(data.content.give_coupon_info)) {
        this.setData({
          hasCoupon:true,
          couponInfo: data.content.give_coupon_info
        });
      }
    });
  }
})
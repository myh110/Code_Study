// pages/coupons/coupons.js
var app = getApp();

import WX from "../../utils/weixin/weixin.js";
import Api from "../../utils/api/Api.js";
import Loading from "../../utils/ui/loading/loading.js";
import Confirm from "../../utils/ui/confirm/confirm.js";
import Alert from "../../utils/ui/alert/alert.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: "#fff",
    isEnd: false,
    couponList: [],
    total: 0,
    pn: 0,
    rn: 12
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList();
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
    if (!this.data.isEnd) {
      this.getCouponList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getCouponList(){
    Loading.show()
    WX.$http(Api.getCouponList, {
      pn: this.data.pn,
      rn: this.data.rn
    }).then(data => {
      Loading.hide()
      this.setData({
        pn: this.data.pn + 12,
        total: data.content.total,
        bgColor: data.content.total == 0 ? "#fff" : "#ebebeb",
        couponList: [...this.data.couponList, ...data.content.list]
      });
      if (this.data.pn >= this.data.total) {
        this.setData({
          isEnd: true
        })
      }
    })
  }
})
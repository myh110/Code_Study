//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '查看我的订单',
    userInfo: {},
    wxUserInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.setWxUserInfo();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.wxUserInfo = e.detail.userInfo
    this.setData({
      wxUserInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 前往优惠券列表页
   */
  goCoupons(e){
    wx.navigateTo({
      url: '../coupons/coupons',
    })
  },
  /**
   * 前往用户订单列表页
   */
  goOrderList(e) {
    wx.navigateTo({
      url: '../order-list/order-list',
    })
  },
  goPhoto(e){
    wx.navigateTo({
      url: '../photo/photo',
    })
  },
  goAboutUs(e){
    wx.navigateTo({
      url: '../about-us/about-us',
    })
  },
  /**
   * 拨打客服电话
   */
  phoneCall: function(e){
    console.log(e);
    wx.makePhoneCall({
      phoneNumber: "4009990328",
      success: function(e){
        console.log(e)
      },
      fail: function(e){
        console.log(e);
      },
      complete: function(e){
        console.log(e);
      }
    })
  },
  setWxUserInfo(){
    if (app.globalData.wxUserInfo) {
      this.setData({
        wxUserInfo: app.globalData.wxUserInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          wxUserInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.wxUserInfo = res.userInfo
          this.setData({
            wxUserInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})

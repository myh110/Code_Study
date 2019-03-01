//app.js
import Api from "utils/api/Api.js";
import WX from "utils/weixin/weixin.js";
import Alert from "./utils/ui/alert/alert.js";
App({
  location() {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude, longitude)
        Alert(latitude.toString())
      },
      fail: function (err) {
        Alert(err)
      }
    })

  },
  onLaunch: function () {
    const that = this;
    // this.location();
    // // 获取wx用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res.userInfo);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.wxUserInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     } else {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success(res) {
    //           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //           wx.getUserInfo({
    //             success: res => {
    //               // 可以将 res 发送给后台解码出 unionId
    //               that.globalData.wxUserInfo = res.userInfo
    //               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //               // 所以此处加入 callback 以防止这种情况
    //               if (this.userInfoReadyCallback) {
    //                 this.userInfoReadyCallback(res)
    //               }
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // });
  },
  // getUserInfo(){
  //   WX.$http(Api.getUserInfo,{}).then(data => {
  //     console.log(data);
  //   });
  //   // this.globalData.userInfo = {}
  // },
  globalData: {
    wxUserInfo: null,
    marketId: null,
    marketInfo:null
  }
})
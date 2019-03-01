//index.js
// 微信相关
import WX from "../../utils/weixin/weixin.js";
import Api from "../../utils/api/Api.js";
import Alert from "../../utils/ui/alert/alert.js";
import Loading from "../../utils/ui/loading/loading";
var app = getApp();
Page({
  data: {
    isLogin: false,
    photoSrc: "",
    hasPhoneNum: false,
    marketInfo: {},
    optMarketId: "", //存储用户扫小程序码进入的门店id
    time: "5", //倒计时
    timer: null,
    openDoor: false, //开门弹窗
    isClosed: true, //门是否被打开
    hasUserInfo: true,
    marketId: "",
    gif: ""
  },
  signInSuccess() {
    this.setData({
      isLogin: true
    });
  },
  getUserInfo(data){
    if (data.detail.userInfo){
      this.setData({
        hasUserInfo: true
      });
      app.globalData.wxUserInfo = data.detail.userInfo;
      this.userLogin(this.data.marketId);
    }

  },
  onLoad(opts) {
    var _t = this;
    this.setData({
      marketId: opts.marketId ? opts.marketId : ""
    });
    // console.log(app)
    Loading.show();
    // let optsi = { marketId: 1 };

    // 获取wx用户信息，查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // console.log(res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.wxUserInfo = res.userInfo;
              _t.userLogin(opts.marketId);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        } else {
          // this.setData({
          //   hasUserInfo: false
          // });
          this.authorize(opts);
        }
      }
    });

    // let optsi = { marketId: 1 };

    // this.userLogin(opts.marketId);
    // .then(this.setMarket).then();
  },
  //监听倒计时变化，倒计时到0时，清除延迟函数
  watchTime(time) {
    if (time <= 0) {
      clearInteval(this.data.timer);
    }
  },

  //授权
  authorize(opts){
    var _t = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success(res) {
        _t.setData({
          gif: `http://mall.quark.lsh123.com/static/images/t.gif?authorize_success=true`
        });
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          
          success: res => {
            _t.setData({
              gif: `http://mall.quark.lsh123.com/static/images/t.gif?getUserInfo_success=true`
            });
            // 可以将 res 发送给后台解码出 unionId
            app.globalData.wxUserInfo = res.userInfo;
            _t.userLogin(opts.marketId);
            // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // // 所以此处加入 callback 以防止这种情况
            // if (this.userInfoReadyCallback) {
            //   this.userInfoReadyCallback(res)
            // }
          },
          fail: err => {
            _t.setData({
              gif: `http://mall.quark.lsh123.com/static/images/t.gif?getUserInfo_fail=${JSON.stringify(err)}`
            });
          }
        })
      },
      fail(err){
        // Loading.hide();
        
        _t.setData({
          gif: `http://mall.quark.lsh123.com/static/images/t.gif?authorize_fail=${JSON.stringify(err)}`
        });
        // Alert("微信授权失败!")
      
      }
    })
  },

  //用户登录
  userLogin(param) {
    var _t = this;
    _t.setData({
      gif: `http://mall.quark.lsh123.com/static/images/t.gif?enter_login=true`
    });
    WX.$http("login")
      .then(data => {
        _t.setData({
          gif: `http://mall.quark.lsh123.com/static/images/t.gif?already_login=true`
        });
        Loading.hide();
        //如果用户未绑定手机号，弹窗提示用户点获取手机号
        if (!data.cellphone) {
          this.remindBindPhone();
        }
        this.isSelectMarket(this.setMarketId(param));
      })
      .catch(msg => {
        let that = this;
        if (msg === "login") {
          this.remindBindPhone();
          //如果用户没有绑定过手机号，则是未登录状态。
          //这时已经通过扫小程序码进入小程序的marketId是已经存在的
          //所以弹窗提醒用户获取手机号的同时，需要先设置超市。
          //以便用户登录成功后可以开门直接购物，而不需要重新再扫码进入。
          this.setMarketId(param);
        } else {
          Alert(msg);
        }
      });
  },
  //提醒用户绑定手机
  remindBindPhone() {
    this.setData({
      hasPhoneNum: true
    });
  },

  //设置marketId
  setMarketId(id) {
    //用户当前所在门店号
    let marketId;

    if (id) {
      marketId = id;
      this.setData({
        optMarketId: id
      });
    } else {
      marketId = WX.userInfo.get().current_market_id;
    }

    return marketId;
  },

  //判断用户是否有选中门店
  isSelectMarket(id) {
    //当前用户选中门店，则获取门店信息
    //未选中，提示用户选择门店。

    id
      ? this.selectedMarket(id)
      : wx.showToast({
          title: "请先扫描货架上的店铺识别码！",
          icon: "none",
          duration: 2000
        });
  },

  //用户选择超市
  selectedMarket(marketId) {
    WX.$http(Api.userSelectMarket, { market_id: marketId })
      .then(data => {
        this.getMarketInfo(marketId);
      })
      .catch(msg => {
        Alert(msg);
      });
  },

  //获取门店信息
  getMarketInfo(marketId) {
    let that = this;
    //获取门店信息，存一份在global里，一份在页面数据里
    WX.$http(Api.getMarketInfo, {
      market_id: marketId
    })
      .then(data => {
        Loading.hide();
        if(!that.data.optMarketId){
          wx.showToast({
            title: "店铺识别成功！",
            icon: "none",
            duration: 1000
          });
        }

        app.globalData.marketInfo = data.content;
        that.setData({ marketInfo: data.content });

        //获取完用户信息后开门
        if (that.data.optMarketId) {
          this.openDoor();
        }
      })
      .catch(msg => {
        Alert(msg);
      });
  },

  getPhoneNumber(e) {
    this.updateUserInfo({
      iv: e.detail.iv,
      encrypted_data: e.detail.encryptedData
    });
  },
  updateUserInfo(phoneInfo) {
    let wxUserInfo = app.globalData.wxUserInfo;
    let newWxUserInfo = {
      nickname: wxUserInfo.nickName,
      sex: wxUserInfo.gender,
      province: wxUserInfo.province,
      city: wxUserInfo.city,
      country: wxUserInfo.country,
      headimgurl: wxUserInfo.avatarUrl
    };
    WX.$http(Api.updateinfo, Object.assign(newWxUserInfo, phoneInfo))
      .then(() => {
        this.setData({
          hasPhoneNum: false
        });

        this.userLogin(this.data.optMarketId);
      })
      .catch(msg => {
        Alert(msg);
      });
  },

  //开门
  openDoor() {
    let that = this;
    WX.$http(Api.goToOpen, { market_id: this.data.optMarketId })
      .then(res => {
        wx.vibrateLong({
          success() {
            that.setData({
              openDoor: true,
              isClosed: false
            });
            // wx.showToast({
            //   title: "门已打开，请进入！",
            //   icon: "success",
            //   duration: 2000
            // });
          }
        });

        that.data.timer = setInterval(function() {
          if (that.data.time == 1) {
            clearInterval(that.data.timer);
            that.setData({
              isClosed: true
            });
          }
          that.setData({
            time: that.data.time - 1
          });
        }, 1000);
      })
      .catch(msg => {
        Alert(msg);
      });
  },
  //退出小程序
  logout() {
    wx.navigateBack({
      delta: 0
    });
  },

  //关闭开门提示
  closeTip(){
    this.setData({
      openDoor:false
    });
  },

  /**
   * 扫码购物
   */
  scanCode() {
    wx.navigateTo({
      url: "../free/free?code=6901808500126"
    });
    // WX.scanCode().then(code =>{
    //   // 根据code查询商品
    //   if (String(code).indexOf(".") === -1) {
    //     wx.navigateTo({
    //       url: '../free/free?code='+code
    //     });
    //   } else {
    //     wx.showToast({
    //       title: '请扫描条形码，二维码不能识别哟！',
    //       icon: 'none',
    //       duration: 2000
    //     });
    //   }4
    // });
  },
  //扫描店铺识别码
  scanMarketCode() {
    WX.scanCode().then(code => {
      const marketId = WX.hashQueryString("market_id", code);
      Loading.show();
      if (marketId) {
        this.selectedMarket(marketId);
      } else {
        wx.showToast({
          title: "请先扫描货架上的店铺识别码！",
          icon: "none",
          duration: 2000
        });
      }
    });
  }
});

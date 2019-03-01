// pages/free/free.js
import WX from "../../utils/weixin/weixin.js";
import Api from "../../utils/api/Api.js";
import Loading from "../../utils/ui/loading/loading.js";
import Confirm from "../../utils/ui/confirm/confirm.js";
import Alert from "../../utils/ui/alert/alert.js";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowCoupon: false,
    isShowInput: false,
    userInputCode: null,
    couponList: [],
    // 商品合计金额
    skuMoney: 0,
    discountMoney: 0,
    marketInfo: {},
    coupon: null,
    // 开始条目
    pn: 0,
    // 每页条目
    rn: 12,
    // 是否获取完毕
    isEnd: false,
    // 是否绑定了滚动事件
    hasBindScroll: false,
    // 是否正在获取中
    isGetting: false,
    //节省金额
    savingMoney: 0,
    // 最终金额
    sumMoney: 0,
    // 选中的优惠券ids，现在只能选择一张
    coupon_ids: [],
    // 优惠券信息
    couponInfo: {
      coupon_ids: [],
      coupon_money: "00.00",
      usable_coupon_total: 0
    },
    // 活动优惠信息
    promotionInfo: {
      promotion_ids: [],
      promotion_money: 0
    },
    // 商品优惠信息
    promotionSkuInfo: {
      promotion_sku_ids: [],
      promotion_sku_money: 0
    },
    skuList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.code);
    this.setData({marketInfo:app.globalData.marketInfo});
    this.searchSku(options.code);
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
    if (this.data.isShowCoupon){
      this.whetherGetCouponList();
    }
  },
  /**
   * 用户点击事件
   */
  tapScan:function(event){

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 监听skuList的变化
   * 只要有地方setData了skuList就调用该方法
   */
  watchSkuList(skulist) {
    // 当商品列表中商品个数为0时要处理相关数据
    if (skulist.length === 0) {
      this.setData({
        sumMoney: 0,
        skuMoney: 0,
        coupon: null,
        couponList: []
      });
      //商品列表为空时切换至首页tab
      wx.switchTab({ url:"/pages/index/index"});
    }
    // 商品个数不为0时则要计算商品金额
    this.getSumMoney();
  },
  // 监听折扣金额
  watchDiscountMoney() {
    let discountMoney = (Number(this.data.promotionInfo.promotion_money) + Number(this.data.promotionSkuInfo.promotion_sku_money)).toFixed(2);
    this.setData({
      discountMoney: discountMoney
    });
  },
  // 监听实际节省金额
  watchSavingMoney() {
    let savingMoney = (Number(this.data.skuMoney) - Number(this.data.sumMoney)).toFixed(2);
    this.setData({
      savingMoney: savingMoney
    });
  },
  bindCodeInput(e){
    this.setData({
      userInputCode: e.detail.value
    })
  },
  showInput(){
    this.setData({
      isShowInput: true
    })
  },
  hideInput(){
    this.setData({
      isShowInput: false
    })
  },
  onPullDownRefresh() {

  },
  /** 
   * 展示优惠券列表
   */
  showCoupons() { 
    if (this.data.couponInfo.usable_coupon_total && this.data.couponInfo.usable_coupon_total != 0) {
      this.setData({
        couponList:[],
        pn:0,
        isEnd: false,
        isShowCoupon: true
      });
      this.whetherGetCouponList();
    }
  },
  /**
   * 能否获取优惠券，在滚动时进行判断
   */
  whetherGetCouponList() {
    if (!this.data.isEnd && !this.data.isGetting) {
      this.getCouponList();
    }
  },
  /**
   * 隐藏优惠券
   */
  hideCoupons(){
    this.setData({
      isShowCoupon: false
    })
  },
  /**
   * 计算商品金额
   */
  getSumMoney(){
    const skuList = this.formatSkuList();
    // console.time("111");
    WX.$http(Api.getSum,{
      sku_list: JSON.stringify(skuList),
      coupon_ids: JSON.stringify(this.data.coupon_ids),
      market_id: app.globalData.marketInfo.marketId
    }).then(data =>{
      // console.tiemEnd("222");
      if (data.ret === 0) {
        this.setData({
          sumMoney: data.content.order_head.money,
          skuMoney: data.content.order_head.sku_money,
          couponInfo: data.content.order_head.coupon_info,
          promotionInfo: data.content.order_head.promotion_info,
          promotionSkuInfo: data.content.order_head.promotion_sku_info
        });
        this.watchSavingMoney();
        this.watchDiscountMoney();
      } else {
        // 由于用户操作商品导致的优惠券不可用
        if (data.ret === 56004) {
          this.setData({
            coupon: null,
            coupon_ids: []
          });
          this.getSumMoney();
        } else {
          Alert(data.msg);
        }
      }
      }).catch(msg => {
        Alert(msg);
      });
  },
  /**
   * 重组购物车中数据结构
   */
  formatSkuList() {
    return this.data.skuList.map((sku, index) => {
      return {
        sku_id: sku.sku_id,
        qty: sku.qty
      }
    })
  },
  /**
   * 根据国条码/用户手输码进行查询商品
   * 
   * @param {Number/String} code 商品国条码
   */
  searchSku(code) {
    Loading.show();
    Loading.hide();

    WX.$http(Api.searchSku, {
      code: code,
      market_id: app.globalData.marketInfo.marketId
    }).then(data => {
        this.addSku(data.content);
    }).catch(msg=>{
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1500
      })
    });
  },
  /**
   * 添加商品
   */
  addSku(skuInfo) {
    const checkResult = this.checkSku(skuInfo.sku_id);
    let skuList = this.data.skuList;
    if (checkResult.isAdded) {
      skuList[checkResult.index].qty++;
    } else {
      skuList.unshift(Object.assign(skuInfo,{qty:1}));
    }
    this.setData({
      skuList: skuList
    });
    this.watchSkuList(skuList);
  },
  /**
   * 检测sku是否被添加过了
   */
  checkSku(skuId) {
    let result = {
      index: 0,
      isAdded: false
    };
    this.data.skuList.forEach((sku, ind) => {
      if (sku.sku_id == skuId) {
        result.index = ind;
        result.isAdded = true;
      }
    })
    return result;
  },

  /**
   * 购物车加减操作
   */
  changeNumber(params){
    this.goodCountChange(params.detail.result, params.detail.target, params.detail.next);
  },

  /**
   * 商品数量发生变化时的响应
   * 
   * @param {Number} num 当前商品数量
   * @param {Number} skuId 商品的skuId
   * @param {Number} next 下一个动作的数字，用户操作 + - 时返回值不同
   */
  goodCountChange(num, skuId, next) {
    let that=this;
    let skuList = this.data.skuList;

    skuList.forEach((sku,index) => {
      if (sku.sku_id == skuId) {
        if (next > 0){
          sku.qty = num;
        }else{
          Confirm("是否确定删除该商品？",function(){
            // '用户点击确定'
            skuList.splice(index, 1);
            that.setData({
              skuList: skuList
            });
            that.watchSkuList(skuList);
          });
        } 
      }
    });
    this.setData({
      skuList:skuList
    });
    console.log(skuList,this.skuList);
    
    this.watchSkuList(skuList);
  },
  /**
   * 扫码
   */
  scanCode() {
    //扫描的API做了封装
    WX.scanCode().then(code => {
      // 根据code查询商品
      if (String(code).indexOf(".") === -1) {
        this.searchSku(code);
      } else {
        wx.showToast({
          title: '请扫描条形码，二维码不能识别哟！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  /**
   * 手动输入商品条码
   */
  confirm() {
    this.searchSku(this.data.userInputCode);
    this.setData({
      isShowInput:false
    });
  },
  /** 
   * 进行支付，支付成功后跳转到支付结果页面
   */
  goPay() {
    const skuList = this.formatSkuList();
    // const returnUrl = "http://" + location.hostname + "../buy-result/buy-result";
    // Loading.show();
    Loading.show();

    WX.$http(Api.goPay,{
      sku_list:JSON.stringify(skuList),
      coupon_ids:JSON.stringify(this.data.coupon_ids),
      market_id:app.globalData.marketInfo.marketId,
      return_url:""
    }).then(data=>{
      Loading.hide();
      let result = data.content.result;
      // console.log("111");
      if (!result){
        Alert("微信下单失败");
      }
      wx.requestPayment({
        'timeStamp': result.timeStamp,
        'nonceStr': result.nonceStr,
        'package': result.package,
        'signType': result.signType,
        'paySign': result.paySign,
        'success':function(res){
          wx.redirectTo({ url:`../buy-result/buy-result?order_id=${data.content.order_id}`});
        },
        'fail':function(res){
          console.log('fail...');
          // if (res.requestPayment=="fail cancel"){
          //   console.log("用户取消了支付");
          // }else if (res.requestPayment){
          //   console.log("用户取消了支付");
          // }
        }
      });
    });
  },
  /**
   * 获取可用优惠券列表
   */
  getCouponList() {
    const skuList = this.formatSkuList();
    this.setData({isGetting:true});

    Loading.show();
    WX.$http(Api.getCartCouponList,{
      sku_list: JSON.stringify(skuList),
      pn:this.data.pn,
      rn:this.data.rn,
      market_id: app.globalData.marketInfo.marketId
    }).then(data=>{
      Loading.hide();
      if (data.ret === 0) {
        this.setData({
          pn: this.data.pn + this.data.rn,
          couponList: [...this.data.couponList, ...data.content.list],
          total: data.content.total,
          isGetting: false
        });
        if (this.data.pn >= this.data.total) {
          this.setData({
            isEnd: true
          });
        }
      } else if (data.ret !== -100021) {
          wx.showToast({
            title: '获取优惠券失败！',
            icon: 'none',
            duration: 2000
          });
      }
      this.setData({isGetting: false});
    }).catch(()=>{
      wx.showToast({
        title: "服务器发生异常，请稍后再试！",
        icon: "none",
        duration: 2000
      });
    });
  },
  /**
   * 选中优惠券
   */
  selectCoupon(e) {
    let couponIds = this.data.coupon_ids;
    console.log(e);
    let coupon = e.target.dataset.coupon;
    if (this.data.coupon && this.data.coupon.coupon_id == coupon.coupon_id) {
      this.setData({
        coupon: null,
        coupon_ids: []
      });
    } else {
      couponIds.splice(0, 1, coupon.coupon_id);
      this.setData({
        coupon: coupon,
        coupon_ids: couponIds
      });
      
    }
    this.getSumMoney();
    this.hideCoupons();
  },
  /**
   * 从优惠券返回购物车
   */
  goBack(){
    this.setData({
      isShowCoupon:false
    })
  }
})
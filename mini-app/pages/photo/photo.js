// pages/photo/photo.js
import Api from "../../utils/api/Api.js";
import WX from "../../utils/weixin/weixin.js";
import Loading from "../../utils/ui/loading/loading.js";
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    image: null,
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setUserInfo();
    this.hasPhoto();
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
   * 用户是否已经上传过照片
   */
  hasPhoto(){
    if(this.data.userInfo.face_img.length === 0){
      this.setData({
        step: 1
      })
    }else{
      this.setData({
        step: 2,
        image: this.data.userInfo.face_img[0].origin
      })
    }
  },

  /**
   * 设置用户信息
   */
  setUserInfo(){
    let userInfo = WX.userInfo.get();
    this.setData({
      userInfo: userInfo
    })
  },

  /**
   * 选择照片
   */
  chooseImage(){
    let that = this;
    wx.chooseImage({
      success:function(res){
        that.setData({
          step: 3,
          image: res.tempFilePaths
        })
      }
    });
  },

  uploadImage(){
    let that = this;
    Loading.show("上传中...");
    wx.uploadFile({
      url: Api.uploadFaceImg, //开发者服务器 url
      filePath: this.data.image[0],
      name: 'fileUp',
      header:{
        QUARKSESSID:wx.getStorageSync("QUARKSESSID")
      },
      formData: {
        'user': 'test'
      },
      success(res) {
        // 获取邻选用户信息
        WX.$http(Api.getUserInfo, {}).then(data => {
          WX.userInfo.set(data.content);
          Loading.hide();
          that.setData({
            step: 4
          });
        }).catch(msg => {
          Loading.hide();
        });
        console.log("上传成功！");
      },
      fail(){
        console.log("上传失败！");
      }
    })
    
    // wx.request({
    //   url: `${Api.sendFaceImg}`,
    //   data: {
    //     face_img:this.data.img
    //   },
    //   method:'GET',
    //   success(res){
    //     this.setData({
    //       step: 4
    //     })
    //   },
    //   fail(res){
    //     wx.hideLoading();
    //   }
    // })
    // this.setData({
    //   step: 4
    // })
  }
})
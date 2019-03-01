export default {
  show(text){
     wx.showLoading({
      "title": text ? text:"加载中",
      "mask": true
    });
  },
  hide(){
    wx.hideLoading();
  }
}
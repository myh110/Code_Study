export default ((msg) => {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel:false
  })
})
export default ((msg, onComfirm, onCancel) => {
  wx.showModal({
    title: '提示',
    content: msg,
    success: function (res) {
      if (res.confirm) {
        onComfirm && onComfirm();
      } else if (res.cancel) {
        onCancel && onCancel();
      }
    }
  })
})
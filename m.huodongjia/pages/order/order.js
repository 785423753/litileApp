// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    order: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  bindKeyInput: function (e) {
    this.setData({ phone: e.detail.value})
  },
  post: function () {
    var tel = this.data.phone, that = this
    if (tel.length >= 11) {
      wx.navigateTo({
        url: '../orderDetail/orderDetail?number=' + tel,
      })
    } else {
      wx.showToast({
        title: '请输入正确的手机号码或订单号',
        icon: 'none',
        duration: 3000
      })
    }
  },
  research:function(){
    this.setData({
      phone:'',
      order:[]
    })
  },
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '028-69761252'
    })
  },
  
})
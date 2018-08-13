// pages/kefu/kefu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  tel:function(){
    wx.makePhoneCall({
      phoneNumber: '028-69761252'
    });
  }
})
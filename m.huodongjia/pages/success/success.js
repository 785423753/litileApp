// pages/success/success.js
var app = getApp(), host = app.globalData.host;
Page({
  data: {
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: host + '/searchorder/',
      data: { order_search: options.number },
      method: 'GET',
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        that.setData({
          order: res.data.orders[0]
        })
      },
      fail: function () {
        // fail
      }
    });
    //获取分享截图
    wx.request({
      url: host + '/order/share_order/?order_num=' + options.number,
      method: 'GET',
      success: function (res) {
        that.setData({
          share_img: res.data.share_img_url
        })
      }
    });
  },
  get_order: function () {
    wx.redirectTo({
      url: '../orderDetail/orderDetail?number=' + this.data.order.order_number,
    });
  },
  save: function (e) {
    var url = this.data.share_img;
    wx.downloadFile({
      url: url,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
        })
      }
    })

  },
  pre: function () {
    var url = this.data.share_img;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  shareNext: function () {
    this.setData({
      current: 1
    })
  }
})
// pages/base/base.js
Page({
  data: {
    show_rule:0
  },
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'info',
      success: function (res) {
        if (res.data) {
          _this.setData({
            info: JSON.parse(res.data)
          })
        };
        // _this.getData()
      }
    });
  },
  open: function () {
    this.setData({
      show_rule: 1
    })
  },
  close:function(){
    this.setData({
      show_rule: 0
    })
  },
  bindGetUserInfo: function (e) {
    this.start()
  },
  start:function(){
      wx.navigateTo({
        url: '../index/index',
      })
  },
  getData: function () {
    var _this = this;
    wx.request({
      url: 'https://xcv.xiaorizi.me/miniGame/scoreRecord/?minigame_id=1&open_id=' + this.data.info.openId,
      success: function (res) {
        console.log(res)
        // res.data.data.timecost = parseInt(res.data.data.timecost / 60) + "'" + res.data.data.timecost % 60 + "''"
        _this.setData({
          my: res.data.data
        })
      }
    })
  },
  postData: function () {
    var _this = this, info = this.data.my;
    info.sharerecord = info.sharerecord+1;
    wx.request({
      url: 'https://xcv.xiaorizi.me/miniGame/scoreRecord/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        minigame_id:1,
        openid: info.openid,
        share_record:1
      },
      success: function (res) {
        console.log(res)
      }
    });
  },
  onShareAppMessage: function () {
    var _this=this;
    return{
      title: '每天玩一玩，您的大脑不会老!',
      path: '/pages/base/base',
      success:function(){
        // _this.postData()
      }
    }
  }
})
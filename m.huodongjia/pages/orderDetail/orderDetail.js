// pages/orderDetail/orderDetail.js
var md5 = require('md5.js');
var app = getApp(), host = app.globalData.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: host+'/searchorder/',
      data: { order_search: options.number },
      method: 'GET',
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {   
          that.setData({
            order: res.data.orders
          })       
      },
      fail: function () {
        // fail
      }
    });
    this.getOpenid();
  },
  getOpenid: function () {
    // 获取openid
    var _this = this;
    wx.login({
      success: function (res) {
        //发起网络请求
        wx.request({
          url: host + '/get_wx_open_id/?js_code=' + res.code,
          success: function (res) {
            _this.setData({
              openid: res.data.openid
            })
          }
        })

      }
    });
  },
  repay: function (e) {
    console.log(e)
    var order_num = e.target.dataset.num, i = e.target.dataset.index, _this = this;
    wx.request({
      url: host+"/repay/",
      method: 'POST',
      data: {
        order_num: order_num,
        openid: _this.data.openid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        var appId = "wx7f88573f18f0f247";
        var tmpStr = "appId=" + appId + "&nonceStr=" + res.data.nonce_str + "&package=prepay_id=" + res.data.prepay_id + "&signType=MD5&timeStamp=" + res.data.timestamp;
        var signStr = tmpStr + "&key=" + res.data.key;
        var paySign = md5(signStr).toUpperCase();
        var formid = res.data.prepay_id
        // 调起支付
        wx.requestPayment({
          'timeStamp': res.data.timestamp,
          'nonceStr': res.data.nonce_str,
          'package': 'prepay_id=' + res.data.prepay_id,
          'signType': 'MD5',
          'paySign': paySign,
          'success': function (res) {
            // 支付成功
            console.log('支付成功')
            wx.navigateTo({
              url: '../success/success?number=' + order_num,
            })  
            //发送模板消息
            wx.request({
              url: host + '/get_wx_access_token/',
              success: function (res) {
                var myDate = new Date();
                var time = myDate.toLocaleString();
                console.log(res)
                wx.request({
                  url: host + '/get_wx_message_temp/?access_token=' + res.data.access_token,
                  method: 'POST',
                  data: {
                    "touser": _this.data.openid,
                    "template_id": "GwDpJGWxYAacqpLXn8jaCn9IXd4mxT8JkSAuPuVSWOM",
                    "page": "pages/orderDetail/orderDetail?number=" + _this.data.order[i].order_number,
                    "form_id": formid,
                    "data": {
                      "keyword1": {
                        "value": _this.data.order[i].event_name,
                        "color": "#000"
                      },
                      "keyword2": {
                        "value": _this.data.order[i].order_user_name,
                        "color": "#000"
                      },
                      "keyword3": {
                        "value": _this.data.order[i].order_totalpay+"元",
                        "color": "#000"
                      },
                      "keyword4": {
                        "value": time,
                        "color": "#000"
                      },
                      "keyword5": {
                        "value": "028-69761252",
                        "color": "#000"
                      },
                      "keyword6": {
                        "value": "订单详细信息，可点击查看详情",
                        "color": "#000"
                      }
                    },
                    "emphasis_keyword": ""
                  },
                  'success': function (res) {
                    console.log(res)

                  },
                  'fail': function (res) {
                    console.log(res)
                  }

                })
              }
            })
            //发送模板消息
          },

          'fail': function (res) {
            console.log(res)
            // 支付失败
            wx.showModal({
              title: '支付失败',
              content: '',
              showCancel: false
            })
          }
        })
      }
    })
  },
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '028-69761252'
    })
  },
})
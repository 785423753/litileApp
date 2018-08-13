// pages/signup/signup.js
var app = getApp(), host = app.globalData.host;
var md5 = require('md5.js')
Page({
  data: {
    event:{},
    info: { 
      pay_way: 'wx_smallapp_pay',
      name:'',
      phone:'',
      email:'',
      job:'',
      company:'',
      coupon:''
      },
    current:0,
    share_img:'',
    order_num:'',
    phone:'',
    is_discount:0,
    discount:0
  },
  onLoad: function (options) {
    var _this=this;  
    if (options.type == 1 || options.type == 2){      //免费和待定会议
        this.setData({
          current:2,
          type: options.type
        })
    }else{      //收费会议
      wx.showLoading({
        title: '正在加载中',
      })
      this.event('/signup/' + options.title + '/?json=1'); 
      // this.event('/signup/131007944/?json=1');
      // 获取openid
      wx.login({
        success: function (res) {
          //发起网络请求
          wx.request({
            url: host+'/get_wx_open_id/?js_code=' + res.code,
            success: function (res) {
              var info = _this.data.info;
              info.openid = res.data.openid;
              _this.setData({
                info: info
              })
            }
          });
        }
      });
     // 获取openid
    }; 
  },
  event: function (url) {
    var _this = this
    wx.request({
      url: host + url,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.event)
        console.log('2333')
        if (res.statusCode == 200) {
          var info = _this.data.info, data = res.data.event.event_price_unit, event_price_unit = res.data.event.event_price_unit;
          info.event_id = res.data.event.event_id, info.event_name = res.data.event.event_name;
            // info.price = data[0].price, info.price_id = data[0].id, info.property = data[0].property, info.limit = data[0].limit_people;
          for (var i = 0; i < event_price_unit.length;i++){
            event_price_unit[i].limit_people = (event_price_unit[i].limit_people) ? event_price_unit[i].limit_people : 1
            event_price_unit[i].amount = event_price_unit[i].limit_people
            };
            _this.setData({
              event:res.data.event,
              info: info,
              event_price_unit: event_price_unit
            })
        } else {
          wx.showToast({
            title: '服务器开小差啦',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '服务器开小差啦',
          icon: 'none',
          duration: 3000
        })
      }
    });
  },
  chooseTkt:function(e){
    var data = e.currentTarget.dataset, info = this.data.info;
    info.price = data.price, info.price_id = data.id, info.property = data.property, info.limit = data.limit, 
      info.amount = this.data.event_price_unit[data.index].amount;
    this.setData({
      _index: data.index,
      info: info
    })
  },
  add:function(e){
    var index = e.target.dataset.index, amount = parseInt(this.data.event_price_unit[index].amount) +1,
      event_price_unit = this.data.event_price_unit;
    event_price_unit[index].amount = amount;
    this.setData({
      event_price_unit: event_price_unit
    })
  },
  sub: function (e) {
    var index = e.target.dataset.index, amount = parseInt(this.data.event_price_unit[index].amount),
      event_price_unit = this.data.event_price_unit;
    if (event_price_unit[index].amount > event_price_unit[index].limit_people) {
      amount--
    };
    event_price_unit[index].amount = amount;
    this.setData({
      event_price_unit: event_price_unit
    })
  },
  next:function(e){
    if (this.data.info.price_id){
      if (this.data.info.price == 0){
        this.setData({
          current: 2,
          type:1,
          free:1
        })
      }else{
        this.setData({
          current: 1,
          type: 0,
          free: 0
        })
      };  
      console.log(e)
      this.sendModel(e.detail.formId);
    }else{
      wx.showToast({
        title: '请先选择票价',
        icon: 'none',
        duration: 2000
      })
    }
  },
  prev:function(){
    this.setData({
      current: 0,
      is_discount: 0,
      discount: 0
    })
  },
  bindKeyInput: function (e) {
    var info=this.data.info;
    info[e.target.id] = e.detail.value;
    this.setData({
      info: info
    })
  },
  formSubmit: function (e) {
    this.post(e.detail.formId);
  },
  post: function (fid) {
    var that = this
    var _Data = this.data.info;
    _Data.coupon=this.data.phone;
    this.setData({
      all: that.data.info.price * parseFloat(that.data.info.amount)
    })
    if (_Data.name == "") {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 2000
      })
    }
    else if (!(/^1+\d{10}$/).test(_Data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      })
    } else if (!(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/).test(_Data.email)) {
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none',
        duration: 2000
      })
    } else if (_Data.company == "") {
      wx.showToast({
        title: '请输入单位名称',
        icon: 'none',
        duration: 2000
      })
    } else if (_Data.job == "") {
      wx.showToast({
        title: '请输入职位',
        icon: 'none',
        duration: 2000
      })
    }else {
      wx.request({
        url: host+'/submitorder/',
        method: 'POST',
        data: _Data,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          var appId = "wx7f88573f18f0f247";
          var tmpStr = "appId=" + appId + "&nonceStr=" + res.data.nonce_str + "&package=prepay_id=" + res.data.prepay_id + "&signType=MD5&timeStamp=" + res.data.timestamp;
          var signStr = tmpStr + "&key=" + res.data.key;
          var paySign = md5(signStr).toUpperCase();
          var formid = res.data.prepay_id;
          that.setData({
            order_num: res.data.order_no
          })
          //发送下单模板消息
          wx.request({
            url: host+'/get_wx_access_token/',
            success: function (res) {
              var myDate = new Date();
              var time = myDate.toLocaleString(), 
              price = parseFloat(that.data.info.price) * parseFloat(that.data.info.amount) - that.data.discount+"元";
              console.log(price)
              wx.request({
                url: host+'/get_wx_message_temp/?access_token=' + res.data.access_token,
                method: 'POST',
                data: {
                  "touser": that.data.info.openid,
                  "template_id": "6fsR-MpkAAwWhCn_etL4IxonSyVSLEG2bsxwfxamQcQ",
                  "page": "pages/orderDetail/orderDetail?number=" + that.data.info.phone,
                  "form_id": fid,
                  "data": {
                    "keyword1": {
                      "value": that.data.info.name,
                      "color": "#000"
                    },
                    "keyword2": {
                      "value": time,
                      "color": "#000"
                    },
                    "keyword3": {
                      "value": price,
                      "color": "#000"
                    },
                    "keyword4": {
                      "value": "订单详细信息，可点击查看详情",
                      "color": "#000"
                    }
                  },
                  "emphasis_keyword": ""
                },
                'success': function (res) {
                  console.log('发送下单模板消息')
                  console.log(res)

                },
                'fail': function (res) {
                  console.log(res)
                }

              })
            }
          })
          //发送模板消息
          // 调起支付
          wx.requestPayment({
            'timeStamp': res.data.timestamp,
            'nonceStr': res.data.nonce_str,
            'package': 'prepay_id=' + res.data.prepay_id,
            'signType': 'MD5',
            'paySign': paySign,
            'success': function (res) {
              // 支付成功
              wx.redirectTo({
                url: '../success/success?number=' + that.data.order_num,
              })            
             //发送模板消息
              wx.request({
                url: host + '/get_wx_access_token/',
                success: function (res) {                 
                  var myDate = new Date();
                  var time = myDate.toLocaleString(), price = parseFloat(that.data.info.price) * parseFloat(that.data.info.amount) + "元";
                  console.log(res)
                  wx.request({
                    url: host + '/get_wx_message_temp/?access_token=' + res.data.access_token,
                    method: 'POST',
                    data: {
                      "touser": that.data.info.openid,
                      "template_id": "GwDpJGWxYAacqpLXn8jaCn9IXd4mxT8JkSAuPuVSWOM",
                      "page": "pages/orderDetail/orderDetail?number=" + that.data.info.phone,
                      "form_id": formid,
                      "data": {
                        "keyword1": {
                          "value": that.data.info.event_name,
                          "color": "#000"
                        },
                        "keyword2": {
                          "value": that.data.info.name,
                          "color": "#000"
                        },
                        "keyword3": {
                          "value": price,
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
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      })
    };
  },
  free: function () {
    var that = this
    var _Data = this.data.info
    if (_Data.name == "") {
      wx.showModal({
        title: '请输入联系人',
        content: '',
        showCancel: false
      })
    }
    else if (!(/^1+\d{10}$/).test(_Data.phone)) {
      wx.showModal({
        title: '请输入正确的手机号码',
        content: '',
        showCancel: false
      })
    } else if (!(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/).test(_Data.email)) {
      wx.showModal({
        title: '请输入正确的邮箱',
        content: '',
        showCancel: false
      })
    } else if (_Data.job == "" || _Data.company == ""){
      wx.showModal({
        title: '单位和职位不能为空',
        content: '',
        showCancel: false
      })
    }else {
      var url="";
      if(this.data.type == 1){
        url ="/dofreesignup/"
      }else{
        url = "/dopendingorder/"
      };
      wx.showLoading({
        title: '正在提交...',
      });
      wx.request({
        url: host + url,
        method: 'POST',
        data: _Data,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.hideLoading();

          if (res.statusCode ==200){
            if (that.data.type == 1) {   //免费报名
              if (res.data.code == 1) {
                wx.showModal({
                  title: '',
                  content: '免费名额申请中，审核通过后将在会前3天发参会通知，请耐心等待',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../index/index'
                      })
                    }
                  }
                });
              } else if (res.data.code == 2) {
                wx.showModal({
                  title: '',
                  content: '请勿重复提交',
                  showCancel: false
                })
              } else {
                wx.showModal({
                  title: '',
                  content: '很抱歉，提交失败,请联系客服',
                  showCancel: false
                })
              };
            } else {         //待定
              if (res.data.code == 1) {
                wx.showModal({
                  title: '',
                  content: '提交成功，会议信息更新后，我们会邮件通知您。',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../index/index'
                      })
                    }
                  }
                });
              } else {
                wx.showModal({
                  title: '',
                  content: '很抱歉，提交失败,请联系客服',
                  showCancel: false
                })
              };
            }
          }else{
            wx.showModal({
              title: '服务器开小差啦',
              content: '',
              showCancel: false
            });
          }; 

        }

      });
    }
  },
  bindKeyPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
    if (e.detail.value.length >= 11) {
      this.sure();
    }else{

    }
  },
  sure:function(){
    var _this=this;
    wx.request({
      url: host + "/usercenter/2018welcomecoupon/?phone=" + this.data.phone,
      success: function (res) {
        console.log(res.data)
        if (res.data.data.coupons_count > 0){
          var discount = parseFloat(_this.data.info.price * 0.05 * _this.data.info.amount).toFixed(2);
          _this.setData({
            is_discount:1,
            discount: (discount > 100) ? 100 : discount
          })
        }else{
          _this.setData({
            is_discount: 0,
            discount:0
          })
          wx.showModal({
            title: '输入错误，该优惠码不存在',
            content: '',
            showCancel: false
          })
        }
      }
    })
  },
  sendModel: function (formid) {
    var that = this;
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
            "touser": that.data.info.openid,
            "template_id": "tgfR-Symqjk8UFS8m16bxygHUm4QZmAZZlwHJmHhrl0",
            "page": "pages/event/event?id=" + that.data.event.event_id,
            "form_id": formid,
            "data": {
              "keyword1": {
                "value": that.data.event.event_name,
                "color": "#000"
              },
              "keyword2": {
                "value": that.data.event.event_begin_time,
                "color": "#000"
              },
              "keyword3": {
                "value": that.data.event.event_venue_info[0].title + " " + that.data.event.event_venue_info[0].address,
                "color": "#000"
              }
            },
            "emphasis_keyword": ""
          },
          'success': function (res) {
            console.log('发送成功')
            console.log(res)
          },
          'fail': function (res) {
            console.log(res)
          }

        })
      }
    })
    //发送模板消息
  }
})
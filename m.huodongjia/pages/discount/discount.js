// pages/discount/discount.js
var app = getApp(), host = app.globalData.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    phone:'',
    party_a:'',
    openid:'',
    userInfo:{},
    party_bs:[],
    formId:'',
    myformId:'',
    is_show:1,
    focus:false,
    events:[],
    page: 0,
    next: 1,
    next_page: '1',
    top: 0,
    s_top: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log("options:")
    console.log(options)
    this.getEvent("/usercenter/discount_event/");
    var _this=this;
    if (options.id){
          this.setData({
            party_a:options.id,
            formId: options.formId
          })
      };
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          _this.setData({ userInfo: userInfo})
        }
      })
      // 获取openid
      wx.login({
        success: function (res) {
          //发起网络请求
          wx.request({
            url: host + '/get_wx_open_id/?js_code=' + res.code,
            success: function (res) {
              _this.setData({
                openid: res.data.openid
              })
              _this.getcoupon(res.data.openid);
            }
          });
        }
      });
        // 获取openid
  },
  getEvent:function(url){
    var _this=this;
    wx.request({
      url: host + url,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          var Data = res.data, events = _this.data.events;
 
          // 赋值会议列表
          var nextPage = '', Events = Data.events;
          for (var i = 0; i < Events.length; i++) {
            events.push(Events[i]);
          };
          if (Data.nextPage != 'false') {
            nextPage = Data.nextPage
          };
          _this.setData({
            events: events,
            page: _this.data.next,
            next: parseInt(_this.data.next) + 1,
            next_page: nextPage,
          });
          // 赋值会议列表

        } else {
          wx.showModal({
            title: '服务器开小差啦',
            content: '',
            showCancel: false
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '服务器开小差啦',
          content: '',
          showCancel: false
        })
      }
    })
  },
  getcoupon: function (id) {
    var _this = this;
    wx.request({
      url: host + "/usercenter/2018welcomecoupon/?open_id=" + id,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading();
        if(res.data.code == 500){
          wx.showModal({
            title: '服务器开小差啦',
            content: '',
            showCancel: false
          })
        }
        else if (res.data.data.qualification != 1) {
          _this.setData({
            current: 1,
            party_bs: res.data.data.party_bs
          })
        };
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  sub:function(e){
    console.log(2333)
      this.setData({
        myformId: e.detail.formId,
        is_show:0,
        focus:true
      })
  },
  post:function(e){
    var _this = this, formid = e.detail.formId;
    // _this.sendModel(formid);
    if (!(/^1+\d{10}$/).test(_this.data.phone)) {
      wx.showModal({
        title: '请输入正确的手机号码',
        content: '',
        showCancel: false
      })
    } else{
      wx.request({
        url: host + "/usercenter/share_2018welcomecoupon/",
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          open_id: _this.data.openid,
          party_a: (_this.data.party_a) ? _this.data.party_a : '',
          phone: _this.data.phone,
          nickName: _this.data.userInfo.nickName,
          avatarUrl: _this.data.userInfo.avatarUrl
        },
        success: function (res) {
          console.log(res)
          _this.setData({
            current: 1
          });
          _this.sendModel(formid);
          if (res.data.data.flag != 0) {
            _this.setData({
              current: 1
            });
            // _this.sendModel(formid);
          } else {
            wx.showModal({
              title: res.data.data.msg,
              content: '',
              showCancel: false
            })
          }
        }
      })
    };
   
  },

  onShareAppMessage: function () {
    var _this = this;
    var url = '/pages/discount/discount?id=' + _this.data.openid + "&formId=" + _this.data.myformId;
    console.log(url)
    return {
      path: url,
    }
  },
  tolist:function(){
    wx.switchTab({
      url: '../list/list',
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
        if (that.data.party_a && that.data.party_a != that.data.openid){
          send(that.data.party_a, '成功邀请好友', that.data.formId);
          send(that.data.openid, '优惠码已生效。成功邀请好友，可额外获得1张优惠券。立即邀请 >>', formid);
        }else{
          send(that.data.openid, '优惠码已生效。成功邀请好友，可额外获得1张优惠券。立即邀请 >>', formid);    
          console.log('233444')   
        };
        function send(id, des, formid){
          console.log("formid:")
          console.log(formid)
          wx.request({
            url: host + '/get_wx_message_temp/?access_token=' + res.data.access_token,
            method: 'POST',
            data: {
              "touser": id,
              "template_id": "nLDEWmDwJrV43qoA5Ijb78UMolqFrGfPKeFnfGJbjJo",
              "page": "pages/discount/discount",
              "form_id": formid,
              "data": {
                "keyword1": {
                  "value": '小程序拉新活动',
                  "color": "#000"
                },
                "keyword2": {
                  "value": '1张9.5折小程序专属优惠码',
                  "color": "#000"
                },
                "keyword3": {
                  "value": time,
                  "color": "#000"
                },
                "keyword4": {
                  "value": des,
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
       
      }
    })
    //发送模板消息
  },
  scroll: function (e) {
    this.setData({
      s_top: e.detail.scrollTop
    })
  },
  lower: function (e) {
    if (this.data.page != this.data.next) {
      this.data.next = this.data.page
      if (this.data.next_page) {
        this.getEvent(this.data.next_page)
      }
    }
  },
})
// pages/event/event.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp(), host = app.globalData.host;
Page({
  data: {
    event:{},
    relate_events:[],
    tab_index:0,
    height:0,
    youhui:[],
    top:0,
    s_top: 0,
    id:'',
    src:''
  },
  wxParseImgLoad: function (e) {
    var that = this
    WxParse.wxParseImgLoad(e, that)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '正在加载中',
    // })
    this.getOpenid();
    this.setData({
      id: options.id,
      src: "https://m.huodongjia.com/xcxevent-" + options.id+".html"
    })
    // this.event("/event-"+options.id+".html?json=1")
    // this.event("/event-821288797.html?json=1")
  },
  getOpenid:function(){
    // 获取openid
    var _this=this;
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
  onShareAppMessage: function () {
    return {
      title: this.data.event.event_name,
      path: '/pages/event/event?id=' + id
    }
  },
  event: function (url) {
    var _this = this
    wx.request({
      url: host + url,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
       
        console.log(res)
        if (res.statusCode == 200) {
          var youhui=[];
          for (var i = 0; i < res.data.event.event_price_unit.length; i++){
            if (res.data.event.event_price_unit[i].original_price){
                youhui.push(res.data.event.event_price_unit[i])
              }
          }
            _this.setData({
              event: res.data.event,
              relate_events: res.data.relate_events,
              youhui: youhui
            });
            var Data = res.data, replyArr=[],title=[];
            for (var i in Data.event.event_paragraph_info) {
              // if (Data.event.event_paragraph_info[i].txt != "") {
                
                if (Data.event.event_paragraph_info[i].name == '会议嘉宾') {
                  if (!Data.event.event_guest) {
                    replyArr.push(Data.event.event_paragraph_info[i].txt);
                    title.push(Data.event.event_paragraph_info[i].name)  
                  } else {
                    replyArr.push('')
                    title.push('会议嘉宾')  
                  }
                } else {
                  replyArr.push(Data.event.event_paragraph_info[i].txt);
                  title.push(Data.event.event_paragraph_info[i].name)  
                }
              }
            // };
            _this.setData({
              title: title
            });
            console.log(replyArr)
            for (let i = 0; i < replyArr.length; i++) {
              WxParse.wxParse('reply' + i, 'html', replyArr[i], _this);
              if (i === replyArr.length - 1) {
                WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, _this)
              }
            };
            wx.hideLoading();
        } else {
          wx.showModal({
            title: '服务器开小差啦',
            content: '',
            showCancel: false
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '服务器开小差啦',
          content: '',
          showCancel: false
        })
      }
    })
  },
  tabChange:function(e){
    this.setData({
      tab_index: e.target.dataset.index,
      top:0
    })
  },
  closeNav:function(){
      this.setData({height:0})
  },
  openNav: function () {
    this.setData({ height: 237 })
  },
  top:function(){
    this.setData({
      top: 0
    })
  },
   scroll:function(e){
      this.setData({
        s_top: e.detail.scrollTop
      })
  },
  formSubmit:function(e){
    console.log(e.detail.target.dataset.type)
    this.sendModel(e.detail.formId);
    wx.navigateTo({
      url: '../signup/signup?title=' + this.data.event.event_id + '&type=' + e.detail.target.dataset.type
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
            "touser": that.data.openid,
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
                "value":that.data.event.event_venue_info[0].title + " " + that.data.event.event_venue_info[0].address,
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
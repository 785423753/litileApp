// pages/tag/tag.js
var app = getApp(), host = app.globalData.host;
Page({
  data: {
    page: 0,
    next: 1,
    next_page: '1',
    events: [],
    height: 0,
    top: 0,
    s_top: 0,
    tag_name:'',
    events_cnt:'',
    not:0,
    height: 0
  },
  onLoad: function (options) {
    this.setData({
      key: options.key,
      tag: options.tag
    })
      if(options.tag){
        this.event("/tag/"+options.tag+"/?json=1")
      }
      if (options.key) {
        this.event("/search/events/?keyword="+options.key+"&json=1")
      }     
  },
  onShareAppMessage: function () {
    if(this.data.key){
      return {
        title: this.data.event.event_name,
        path: 'pages/tag/tag?key=' + this.data.key
      }
    }else{
      return {
        title: this.data.tag_name + "大会_" + this.data.tag_name +"行业会议最新优选_活动家",
        path: 'pages/tag/tag?tag=' + this.data.tag
      }
    }
   
  },
  event: function (url) {
    var _this = this
    console.log(url)
    wx.request({
      url: host + url,
      // header: {
      //   'Content-Type': 'application/json'
      // },
      success: function (res) {   
    
        if (res.statusCode == 200) {
          console.log(res.data)
          var Data = res.data.data, events = _this.data.events;
          // 赋值会议列表
          var nextPage = '', Events = Data.events;
          if (Events.length == 0 && _this.data.key){
            _this.setData({ not: 1 })           
          }else{
            _this.setData({not:0})
          };
          for (var i = 0; i < Events.length; i++) {
            if (Events[i]) events.push(Events[i]);
          };
          if (Data.nextPage != 'false') {
            nextPage = Data.nextPage
          };
          _this.setData({
            events: events,
            page: Data.cur_page,
            next: parseInt(Data.cur_page) + 1,
            next_page: nextPage,
            events_cnt: Data.events_cnt,
            tag_name: Data.tag_name
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
  lower: function (e) {
    if (this.data.page != this.data.next) {
      this.data.next = this.data.page
      if (this.data.next_page) {
        this.event(this.data.next_page)
      }
    }
  },
  scroll: function (e) {
    this.setData({
      s_top: e.detail.scrollTop
    })
  },
  top_back: function () {
    this.setData({
      top: 0
    })
  },
  closeNav: function () {
    this.setData({ height: 0 })
  },
  openNav: function () {
    this.setData({ height: 237 })
  }
})
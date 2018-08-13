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
    tag_name: '',
    events_cnt: '',
    not: 0,
    height: 0
  },
  onLoad: function (options) {
    this.event(options.key)
  },
  event: function (url) {
    var _this = this
    console.log(url)
    wx.request({
      url: host + "/servicezone_data/?key="+url,
      // header: {
      //   'Content-Type': 'application/json'
      // },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          
          var Data = res.data.data, events = _this.data.events;
          // 赋值会议列表
          var nextPage = '', Events = Data.events;
          if (Events.length == 0 && _this.data.key) {
            _this.setData({ not: 1 })
          } else {
            _this.setData({ not: 0 })
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
            events_cnt: Data.event_cnt,
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
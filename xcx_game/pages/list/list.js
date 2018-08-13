// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    n_page:1,
    next_page: 1,
    list:[]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
      var _this=this;
      wx.getStorage({
        key: 'info',
        success: function (res) {
          if (res.data) {
            _this.setData({
              info: JSON.parse(res.data)
            })
          };
          _this.getData()
        }
      });
      this.getList();
  },
  getList:function(){
    var _this = this, list = this.data.list, page = this.data.next_page;
    if(page){
      wx.request({
        url: 'https://xcv.xiaorizi.me/miniGame/scoreRecords/?minigame_id=1&pageindex=' + this.data.next_page + '&limit=11',
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          var data = res.data.data.current_objects;
          for (let i = 0; i < data.length; i++) {
            data[i].timecost = parseInt(data[i].timecost / 60) + "'" + data[i].timecost % 60+"''"
            list.push(data[i])
          };
          if (res.data.data.nextpage) { page = res.data.data.nextpage } else { page = "" }
          _this.setData({
            list: list,
            page: res.data.data.cupage,
            n_page: parseFloat(res.data.data.cupage)+1,
            next_page: page
          })
        }
      })
    };
  },
  getData:function(){
    var _this=this;
    wx.request({
      url: 'https://xcv.xiaorizi.me/miniGame/scoreRecord/?minigame_id=1&open_id=' + this.data.info.openId,
      success: function (res) {
        console.log(res)
        res.data.data.timecost = parseInt(res.data.data.timecost / 60) + "'" + res.data.data.timecost % 60 + "''"
        _this.setData({
          my: res.data.data
        })
      }
    })
  },
  next:function(){
    if (this.data.n_page != this.data.page) {
      this.setData({
        n_page: this.data.page
      })
      if (this.data.next_page) {
        this.getList()
      }
    }
    
  },
  onShareAppMessage: function () {
  
  }
})
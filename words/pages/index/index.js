//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    word:'',
    history:[],
    disable:'disabled'
  },
  onLoad: function () {
  }, 
  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'history',
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          that.setData({
            history: res.data.split(',').reverse()
          })
        }
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      word: e.detail.value,
    });
    var disable;
    if (e.detail.value){
        disable =''
    }else{
      disable ='disabled'
    };
    this.setData({
      disable: disable
    })
  },
  toDetail:function(e){
      var type=e.target.dataset.type,word=this.data.word;
      var history = this.data.history.reverse();
      if (history.indexOf(word) < 0) { history.push(word)} 
      wx.setStorage({
        key: "history",
        data: history.join(',')
      })
      wx.navigateTo({
        url: '../logs/logs?word=' + word+'&type='+type,
      });
      this.setData({
        word:'',
        disable: 'disabled'
      })
  },
  search:function(e){
      this.setData({
        word:e.target.dataset.text,
        disable:''
      })
  },
  onShareAppMessage: function (res) {
    return {
      title: '小学生组词造句大全',
      path: '/pages/index/index'
    }
  }
})

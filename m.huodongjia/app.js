//app.js
var fundebug = require('./lib/fundebug.0.0.3.min.js')
fundebug.apikey = "0bc33d589b48cd125044cc2a01854352a5acc2598e64632f044c8e63d3671ef2";
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData:{
    cat:'',
    city:'',
    phone:'',
    host:'https://mini.huodongjia.com',
    openid:'',
    flag:0
  }
})
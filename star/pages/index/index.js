//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date:'',
    star: [
      {
        name: "水星",
        rotation: 58.6,
        revolution: 87.97,
        img: 'mercur'
      },
      {
        name: "火星",
        rotation: 1.03,
        revolution: Math.round(1.88 * 365.26),
        img: 'mars'
      },
      {
        name: "金星",
        rotation: 243,
        revolution: 224.7,
        img: 'venus'
      },
      {
        name: "木星",
        rotation: 0.41,
        revolution: Math.round(11.86 * 365.26),
        img: 'jupiter'
      },
      {
        name: "土星",
        rotation: 0.45,
        revolution: Math.round(29.46 * 365.26),
        img: 'saturn'
      },
      {
        name: "天王星",
        rotation: 0.72,
        revolution: Math.round(84.01 * 365.26),
        img: 'uranus'
      },
      {
        name: "海王星",
        rotation: 0.67,
        revolution: Math.round(164.79 * 365.26),
        img: 'neptune',
      },
      {
        name: "地球",
        rotation: 0.99,
        revolution: 365.26,
        img: 'earth',
      },
    ],
  },
  onLoad: function () {
    
    
  },
  post:function(){
    if (this.data.date){
      wx.navigateTo({
        url: '../result/result?age=' + this.data.date,
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '请先选择出生年月日哦'
      })
    }
      
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  onShareAppMessage: function () {
      return{
        title: '你想知道你在其他星球里的年龄吗？',
        path: '/pages/index/index'
      }
  }
})

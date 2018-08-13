// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:'',
    xi:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this, name = '';
    var school = [
      '国立中央大学',
      '国立武汉大学',
      '国立浙江大学',
      '国立北京大学',
      '国立清华大学',
      '国立南开大学',
      '国立东北大学',
      '国立西南联合大学',
    ]
    var xi = [
      '公民训育学系',
      '中国文学系',
      '物理学系',
      '社会学系',
      '航空工程学系',
      '史地学系',
      '电机工程学系',
      '商学系',
      '理化学系',
    ]

    this.setData({
      school: school[Math.floor(Math.random() * (school.length - 1))],
      xi: xi[Math.floor(Math.random() * (xi.length - 1))]
    })
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        _this.setData({
          user: res.userInfo
        })
        name = res.userInfo.nickName
        draw();
      },
      fail: function (res) {
        console.log(res)
      }
    })
 
    function draw() {
      var res = wx.getSystemInfoSync();
      var ctx = wx.createCanvasContext('firstCanvas');
      var w = 414, h = 736;

  

      ctx.drawImage('../images/bg.jpg', 0, 0, w, h)
      ctx.drawImage('../images/img_niupizhi(1).png',25, 25, 364, 560)
      ctx.drawImage('../images/erweima.png', parseFloat(w - 82), parseFloat(h - 92), 82, 92, );

      // ctx.setTextAlign('center')    // 文字居中
      ctx.setFillStyle('#1A1A1A')  // 文字颜色：黑色
      ctx.setFontSize(30)         // 文字字号：22px
      // ctx.fillText('捷', parseFloat(w-90), 280)
      // ctx.fillText('报', parseFloat(w - 90), 320)
      ctx.stroke();
      // ctx.draw();
      nikename(name+"同学：",260,117)
      nikename("民国高考", 320, 170)
      list(_this.data.school+_this.data.xi)
      function list(str){
          for(var i=0;i<str.length;i++){
            ctx.setFontSize(22)
            ctx.setFillStyle('#E61700')  
            ctx.fillText(str[i], 170, 117 + i * 28)
          }
      }
      function nikename(str,x,y) {
        for (var i = 0; i < str.length; i++) {
          ctx.setFontSize(18)
          ctx.setFillStyle('#1A1A1A')
          ctx.fillText(str[i], x, y + i * 25)
        }
      }
      ctx.draw(false, function (e) {
        console.log('success')
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: w,
          height: h,
          canvasId: 'firstCanvas',
          success: function (res) {
            console.log(res.tempFilePath)
            _this.setData({ filePath: res.tempFilePath })
            // _this.saveImg()
          },
          fail: function (data) {
            console.log('fail')
            console.log(data)
          }
        })
      })
    }
  },

 
  onShareAppMessage: function () {
    return {
      title: "我在民国考大学，快来看看吧",
      path: 'pages/base/base'
    }
  },
  saveImg: function () {
    var _this = this;
    wx.showToast({
      title: '已保存到相册'
    })
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.filePath,
      success(res) {

      }
    })
  },
})
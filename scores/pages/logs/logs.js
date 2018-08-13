//logs.js


Page({
  data: {
    filePath: '',
    data:{},
    text:[]
  },
  onLoad: function (options) {
    var _this = this,name='';
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        _this.setData({
          user: res.userInfo
        })
        name = res.userInfo.nickName
        draw();
      },
      fail:function(res){
        console.log(res)
      }
    })
    var shi = [
    '有一种青春叫高考，谢谢曾经努力的自己',
      '那年高考，感谢曾经努力的自己',
      '我流的汗水，会折射出我的光芒',
      '零抬头，无声音',
      '提高1分，干掉千人',
      '十年磨剑为一搏，六月试锋现真我',
      '同闯峥嵘十春秋，共创辉煌佳年华',
      '十年磨剑三日锋，数载人生在其中',
      '每一发奋努力的背后，必有加倍的赏赐',
      '生活的理想，就是为了理想的生活',
      '春风吹战鼓擂，今年高考谁怕谁',
      '高考得努力，毕竟最后一次不看脸的比赛',
      '六月里，我们云飞翔',
      '万米长跑百步冲刺，十年磨剑全凭一日开锋',
      '拼搏高考，今生无悔',
      '每次考完试，我都安慰自己没关系重在参与']
    var str = shi[Math.floor(Math.random() * (shi.length - 1))].split('，');
    _this.setData({
      data: options,
      text: [str[0], str[1]],
    });
    function draw(){
      var res = wx.getSystemInfoSync();
      var ctx = wx.createCanvasContext('firstCanvas');
      var w = 414,h=736;
      
      // options={
      //   year:'2017',
      //   city:'四川省',
      //   per:'99',
      //   rank:'前100名'
      // }
      _this.setData({
        h: res.screenHeight - 160,
        data: options,
      });

      console.log(res.screenHeight)

      ctx.drawImage('../images/bg2.jpg', 0, 0, w, h)

      ctx.setTextAlign('center')    // 文字居中
      ctx.setFillStyle('#E03F2D')  // 文字颜色：黑色
      ctx.setFontSize(22)         // 文字字号：22px
      ctx.font = "bold 22px Arial";
      ctx.fillText(name, w / 2, 45)
      ctx.setFillStyle('#1A1A1A')  // 文字颜色：黑色
      ctx.fillText("在" + options.year + "年" + options.city + "高考中获得", w / 2, 95)

      ctx.setTextAlign('center')
      ctx.setFillStyle('#1A1A1A')
      ctx.setFontSize(22)
      ctx.fillText("打败了", w / 2 - 70, 250)
      ctx.fillText("的同学", w / 2 + 70, 250)
      ctx.setFillStyle('#E03F2D')
      ctx.fillText(options.per + "%", w / 2, 250)



      ctx.setTextAlign('center')
      ctx.setFillStyle('#E03F2D')
      ctx.font = "bold 40px Arial";
      ctx.setFontSize(40)
      ctx.fillText(options.rank, w / 2, 160)

      ctx.drawImage('../images/img_blackboard.png', parseFloat((w - 300) / 2), 300, 300, 170);
      ctx.drawImage('../images/erweima.png', parseFloat(w - 82), parseFloat(h - 92), 82, 92, );
      ctx.setTextAlign('center')
      ctx.setFillStyle('#FFFFFF')
      ctx.font = "normal 24px Arial";
      ctx.fillText(str[0], w / 2, 370)
      ctx.fillText(str[1], w / 2, 420)
      ctx.stroke();
      // ctx.draw();
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
  saveImg:function(){
    var _this=this;
    wx.showToast({
      title: '已保存到相册'
    })
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.filePath,
      success(res) {
        
      }
    })
  },
  onShareAppMessage: function (res) {
    var _this=this;
    return {
      title: _this.data.user.nickName+'在当年高考中打败了'+_this.data.data.per+'%的同学，我也来回忆下',
      path: 'pages/base/base'
    }
  }
})

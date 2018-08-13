// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      star:[
        {
          name:"水星",
          rotation: 58.6,
          revolution: 87.97,
          img: 'mercur'
        },
        {
          name: "火星",
          rotation: 1.03,
          revolution: 1.88 * 365.26,
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
          revolution: 11.86 * 365.26,
          img: 'jupiter'
        },
        {
          name: "土星",
          rotation: 0.45,
          revolution: 29.46 * 365.26,
          img: 'saturn'
        },
        {
          name: "天王星",
          rotation: 0.72,
          revolution: 84.01 * 365.26,
          img: 'uranus'
        },
        {
          name: "海王星",
          rotation: 0.67,
          revolution: 164.79 * 365.26,
          img: 'neptune'
        },
      ],
      current:1,
      clas:1,
      name:'***'
  },
  onLoad: function (options) {
    // options.age='1992-09-03'
    var _this=this;
    wx.getUserInfo({
      success:function(res){
        _this.setData({
          name: res.userInfo.nickName
        });
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
          success: function (res) {
            _this.setData({
              avatar: res.tempFilePath
            })
            _this.draw();
          }
        })
       
      },
    })
    var burn = options.age.replace(/-/g, '/');
      var data = this.data.star, earthDay;
      for(let i in data){
          earthDay = date(burn);
          data[i].age = parseInt((earthDay / data[i].revolution).toFixed(1));
          data[i].year = (earthDay / data[i].revolution).toFixed(1);
          data[i].day = (earthDay / data[i].rotation).toFixed(1);
          data[i].burnth = burnth(data[i].age, data[i].revolution)
      }
      this.setData({
        star: data
      })
      function date(s1) {
        s1 = new Date(s1);
        var s2 = new Date();
        var days = s2.getTime() - s1.getTime();
        var time = parseInt(days / (1000 * 60 * 60 * 24));
        return time;
      }
      function burnth(age, revolution){
        var time = new Date(burn).getTime();
        var day = time / (1000 * 60 * 60 * 24);
        var all = (day + (age + 1) * revolution) * (1000 * 60 * 60 * 24);
        var d = new Date()
        d.setTime(all);
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var days = d.getDate();
        var str = year + "/" + month + "/" + days
        return Math.abs(date(str))
      }

      
  },
  currentChange:function(e){
      this.setData({
        clas: e.detail.current
      });
      this.draw();
  },
  draw: function () {
    var res = wx.getSystemInfoSync(), _this = this, star = this.data.star;
    var ctx = wx.createCanvasContext('firstCanvas');
    var w = 414, h = 736, name = this.data.star[this.data.clas].name, img = this.data.star[this.data.clas].img;
    var age = this.data.star[this.data.clas].age, day = this.data.star[this.data.clas].burnth

    console.log(day)
    ctx.drawImage('../images/bg_share.png', 0, 0, w, h)
    ctx.setFillStyle('#CFD4E6')
    ctx.setFontSize(14)
    ctx.fillText(_this.data.name, 70, 80)
    ctx.setFillStyle('#FFF')
    ctx.setFontSize(20)
    ctx.fillText("原来我在" + name + "上的年龄是这样的！", 30, 135)
    ctx.setFontSize(14)
    ctx.fillText("快来测一测你在其他星球的年龄吧~", 30, 160)
    ctx.drawImage('../images/' + img + '.png', 30, 200, 354, 500)
    ctx.setTextAlign('center')
    ctx.setFillStyle('#292B33')
    ctx.setFontSize(14)
    ctx.fillText("我的" + name + "年龄", w / 2, 470)
    ctx.fillText(" 下一个" + name + "生日距今还有:", w / 2, 580)
    ctx.fillText('天', w / 2 + JSON.stringify(day).length * 8, 619)
    ctx.setFillStyle('#FF33BB')
    ctx.setFontSize(36)
    if (age >= 1) {
      ctx.fillText(age, w / 2, 530) 
      ctx.setFillStyle('#292B33')
      ctx.setFontSize(18)
      ctx.fillText('岁', w / 2 + JSON.stringify(age).length * 16, 528)
    } else {
      ctx.fillText('不满一岁', w / 2, 530)
    }
    ctx.setFontSize(18)
    ctx.setFillStyle('#292B33')
    ctx.fillText(day, w / 2, 620)
    
    
    ctx.drawImage('../images/ewm.png', w - 125, h - 130, 80, 80, );
    ctx.stroke();

    ctx.save()
    ctx.beginPath()
    ctx.arc(45, 75, 15, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(this.data.avatar, 30, 60, 30, 30)
    ctx.restore()
    // ctx.draw();
    ctx.draw(false, function (e) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: w,
        height: h,
        canvasId: 'firstCanvas',
        success: function (res) {
          _this.setData({ filePath: res.tempFilePath })
          // _this.saveImg()
        },
      })
    })
  },
  // draw:function(){
  //   var res = wx.getSystemInfoSync(),_this=this,star=this.data.star;
  //   var ctx = wx.createCanvasContext('firstCanvas');
  //   var w = 414, h = 736;

    
  //   ctx.drawImage('../images/result_bg.png', 0, 0, w, h)
  //   ctx.setTextAlign('center')    // 文字居中
  //   ctx.setFillStyle('#FEFEFE')
  //   ctx.setFontSize(20)
  //   ctx.fillText('「 ' + _this.data.name + ' 」', w / 2, 50)
  //   var s_h,s_w;
  //   for (var i = 0; i < star.length;i++){
  //       if(i%2 == 0){
  //         s_h=65*i;
  //         ctx.drawImage('../images/' + star[i].img + '.png', 35, 100 + s_h, 50, 50)
  //         ctx.setFontSize(12)
  //         ctx.setFillStyle('#B8BCCC')
  //         ctx.setTextAlign('left')
  //         ctx.fillText("我的" + star[i].name + "年龄", 100, 120 + s_h)
  //         ctx.fillText("下一个" + star[i].name + "生日", 100, 175 + s_h)
  //         ctx.setFillStyle('#FF33BB')
  //         ctx.setFontSize(16)
  //         if (star[i].age > 0) {
  //           ctx.fillText(star[i].age, 100, 145 + s_h)
  //           ctx.setFillStyle('#fff')
  //           ctx.setFontSize(12)
  //           if (star[i].age > 99) {
  //             ctx.fillText("岁", 132, 145 + s_h)
  //           }
  //           else if (star[i].age < 10) {
  //             ctx.fillText("岁", 112 , 145 + s_h)
  //           } else {
  //             ctx.fillText("岁", 122 , 145 + s_h)
  //           }
  //         } else {
  //           ctx.fillText("不满一岁", 100, 145 + s_h)
  //         }
  //         ctx.setFillStyle('#fff')
  //         ctx.setFontSize(12)
  //         ctx.fillText(star[i].burnth, 100, 195 + s_h)
  //       }else{
  //         s_h = 65 * (i-1),s_w=180;
  //         ctx.drawImage('../images/' + star[i].img + '.png', 35 + s_w, 100 + s_h, 50, 50)
  //         ctx.setFontSize(12)
  //         ctx.setFillStyle('#B8BCCC')
  //         ctx.setTextAlign('left')
  //         ctx.fillText("我的" + star[i].name + "年龄", 100 + s_w, 120 + s_h)
  //         ctx.fillText("下一个" + star[i].name + "生日", 100 + s_w, 175 + s_h)
  //         ctx.setFillStyle('#FF33BB')
  //         ctx.setFontSize(16)
  //         if (star[i].age > 0) {
  //           ctx.fillText(star[i].age, 100 + s_w, 145 + s_h)
  //           ctx.setFillStyle('#fff')
  //           ctx.setFontSize(12)
  //           if (star[i].age > 99) {
  //             ctx.fillText("岁", 132 + s_w, 145 + s_h)
  //           } 
  //           else if (star[i].age < 10){
  //             ctx.fillText("岁", 112 + s_w, 145 + s_h)
  //           }else {
  //             ctx.fillText("岁", 122 + s_w, 145 + s_h)
  //           }
  //         } else {
  //           ctx.fillText("不满一岁", 100 + s_w, 145 + s_h)
  //         }
  //         ctx.setFillStyle('#fff')
  //         ctx.setFontSize(12)
  //         ctx.fillText(star[i].burnth, 100 + s_w, 195 + s_h)
  //       }
  //   }
    
    

  //   ctx.drawImage('../images/ewm.png', w/2-40, parseFloat(h - 90), 80, 80, );
  //   ctx.stroke();
  //   // ctx.draw();
  //   ctx.draw(false, function (e) {
  //     console.log('success')
  //     wx.canvasToTempFilePath({
  //       x: 0,
  //       y: 0,
  //       width: w,
  //       height: h,
  //       canvasId: 'firstCanvas',
  //       success: function (res) {
  //         console.log(res.tempFilePath)
  //         _this.setData({ filePath: res.tempFilePath })
  //         // _this.saveImg()
  //       },
  //       fail: function (data) {
  //         console.log('fail')
  //         console.log(data)
  //       }
  //     })
  //   })
  // },
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
  onShareAppMessage: function () {
      return{
        title:'你想知道你在其它星球里的年龄吗？快来看看吧！',
        path: '/pages/index/index'
      }
  }
})
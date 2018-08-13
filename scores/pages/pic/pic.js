// pages/pic/pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.text ="临床医学 临床医学当了几年法医后，又去做了生物老师。"
    this.setData({
      text:options.text
    })
    var name='';
    var _this = this;
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
    
    // draw()
    function draw() {
      
      var ctx = wx.createCanvasContext('firstCanvas');
      var w = 414, h = 736;
      ctx.drawImage('../images/bg3.jpg', 0, 0, w, h)
      ctx.drawImage('../images/img_blackboard.png', 20, 240, 374, 205);
      ctx.drawImage('../images/erweima.png', parseFloat(w - 82), parseFloat(h - 92), 82, 92, );
      
      ctx.setFontSize(30) 
      ctx.setFillStyle('#1A1A1A')
      ctx.fillText("当年选择的什么专业？", 37, 80)
      ctx.fillText("如今在做什么？", 37, 120)

      ctx.setStrokeStyle('#A29782')
      ctx.setLineWidth(1)
      ctx.moveTo(37, 150)
      ctx.lineTo(parseInt(w - 37), 150)

      ctx.setFontSize(18)
      ctx.setFillStyle('#1E5152')
      ctx.fillText(name+"说：", 37, 220)

      ctx.setFillStyle('#FFFFFF')
      text(_this.data.text, 60, 270,13)
      function text(str, x, y,l){
        var t = [], str = str.split('');
        s();
        function s(){
          if (str.length > l) {
            t.push(str.slice(0, l).join(''));
            str.splice(0, l)
            
            if (str.length > l){
              s()
            }else{
              t.push(str.join(''))
            }
          }else{
            t.push(str.join(''))
          }
        }
        if(t.length==2){y=280}
        if (t.length == 1) { y = 300 }
        for(var i=0;i<t.length;i++){
          ctx.setFontSize(24) 
          ctx.fillStyle = "#ffffff";
          ctx.fillText(t[i], x, y + (i + 1) * 40);
        }
      }
      function drawText(t, x, y, w) {

        var chr = t.split("");
        var temp = "";
        var row = [];

        ctx.font = "18px Arial";
        ctx.fillStyle = "#ffffff";

        for (var a = 0; a < chr.length; a++) {
          if (ctx.measureText(temp).width < w) {
            ;
          }
          else {
            row.push(temp);
            temp = "";
          }
          temp += chr[a];
        }

        row.push(temp);

        for (var b = 0; b < row.length; b++) {
          ctx.fillText(row[b], x, y + (b + 1) * 25);
        }
      }
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
    return {
      title: "说说你当年高考的段子",
      path: 'pages/base/base'
    }
  }
})
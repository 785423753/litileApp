//index.js
//获取应用实例
const app = getApp()
var position = new Array(),w,h,max;
for (var i = 0; i < 500; i++) {
  position[i] = new Array();
  for (var j = 0; j < 800; j++) {
    position[i][j] = { radius: 0, isPlanted: 0, isSet: 0 };
  }
};
var time,knock=0;
const pop = wx.createInnerAudioContext(), over = wx.createInnerAudioContext();
const ctx = wx.createCanvasContext('myCanvas');
const ctx1 = wx.createCanvasContext('myCanvas1');
const ctx2 = wx.createCanvasContext('myCanvas2');
var ball = [], length;
Page({
  data: {
    ball:[],
    left:'0',
    time:.3,
    error:0,
    start:1,
    score:1,
    act:0,
    h:0,
    min:0,
    m:0,
    img1:'',
    img2:'',
    all:51,
    tongguan:0,
    show_rule:0,
    eye:0,
    show_prop:0
  },
  tap:function(e){
    console.log(e)
  },
  onLoad: function () {
    wx.setStorage({
      key: "openGId",
      data: ''
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#203561',
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    var _this=this;
    wx.getStorage({
      key: 'info',
      success: function (res) {
        if (res.data) {
          _this.setData({
            info: JSON.parse(res.data)
          });
          wx.downloadFile({
            url: _this.data.info.avatarUrl,
            success: function (res) {
              _this.setData({
                avatarUrl: res.tempFilePath
              })
            }
          })
          wx.request({
            url: 'https://xcv.xiaorizi.me/miniGame/scoreRecord/?minigame_id=1&open_id=' + _this.data.info.openId,
            success: function (res) {
              console.log(res)
              _this.setData({
                eye: res.data.data.item[0]
              })
            }
          })
        } else {
          _this.getData()
          
        }
      },
      fail: function () {
        _this.getData()
      }
    });
    wx.getSystemInfo({
      success: function(res) {
        if (res.screenWidth<400){
          max=17;
        }else{
          max=24      
        }
        w = res.screenWidth - max*2;
        h = res.windowHeight - max*2-20;

        // _this.draw();
        _this.setData({
          width: res.screenWidth,
          height: res.windowHeight
        });
      },
    }); 
    pop.autoplay = false;
    pop.src = 'https://pic.huodongjia.com/static/video/Pop.mp3';
    over.autoplay = false;
    over.src = 'https://pic.huodongjia.com/static/video/over.mp3';
    this.start()
    this.startGame();
    this.getNowFormatDate()
    

  },
  start:function(){
    var _this=this;
    var treeRadiusMax = Math.floor(Math.random() * (max - 13) + 13);
    let treeX = Math.floor(Math.random() * w + max);
    let treeY = Math.floor(Math.random() * h + max + 20);
    let fail_time=0;
    ball.push({ x: treeX, y: treeY, r: treeRadiusMax });
    creat()
    function creat(){
        let treeX = Math.floor(Math.random() * w + max);
        let treeY = Math.floor(Math.random() * h + max+15);
        let lenArr = ball.map(c => {
          let xSpan = c.x - treeX
          let ySpan = c.y - treeY
        return Math.floor(Math.sqrt(Math.pow(xSpan, 2) + Math.pow(ySpan, 2))) - c.r;     
      })
        let minr = Math.min(...lenArr)
        let i = lenArr.indexOf(minr)
        if (minr < ball[i].r+13){
          fail_time++;
          if(fail_time > 500){
            _this.draw()
            length = ball.length
          }else{
            creat();
          }
          return false;
        }
        
        let r = minr-ball[i].r;
        
        if(r>max){
          r = Math.floor(Math.random() * (max - 13) + 13)
        }else{
          r = Math.floor(Math.random() * (r - 13) + 13)
        }
        ball.push({
          x: treeX,
          y: treeY,
          r: r
        });
        if (ball.length <51){
          creat()
        }else{
          _this.draw();
          length=ball.length
        }
    }
    
  },
  open: function () {
    this.setData({
      show_rule: 1
    })
  },
  close: function () {
    this.setData({
      show_prop: 0,
      show_rule:0
    })
  },
  pass:function(){
    this.setData({
      act: 1,
    });
    var _this=this;
    setTimeout(function () {
      _this.setData({
        act: 0,
      });
    }, 500)
  },
  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    // if(month >= 1 && month <= 9) {
    //   month = "0" + month;
    // }
    //     if (strDate >= 0 && strDate <= 9) {
    //   strDate = "0" + strDate;
    // }
        var currentdate = year + '年' + month + '月' + strDate+'日';
        this.setData({
          date: currentdate
        })
  },
  draw:function(){
    console.log(length)
    var i = Math.floor(Math.random() * (ball.length-1)),balls=this.data.ball;
      balls.push(ball[i])
      ball.splice(i,1)
      this.setData({ ball: balls})
  },
  // draw:function(){
  //   var treeRadiusMax = Math.floor(Math.random() * (max-25) + 25);
  //   if (this.data.score > 20){
  //     treeRadiusMax=25;
  //   }
  //   var treeX = Math.floor(Math.random() * w + max+5);
  //   var treeY = Math.floor(Math.random() * h + max+20);
  //   var ball=this.data.ball,fail_time=0;
  //   if (ball.length <= 0) {
  //     position[treeX][treeY].isSet = 1;
  //     position[treeX][treeY].radius = treeRadiusMax;
  //     ball.push({ x: treeX, y: treeY, r: treeRadiusMax });
  //     this.draw();
  //     this.setData({
  //       ball: ball
  //     });
  //   }

  //   if (!position[treeX][treeY].isSet) {
  //     var count = 0;
  //     for (var i = 0; i < ball.length; i++) {
  //       var distance = Math.sqrt(Math.pow(Math.abs(ball[i].x - treeX), 2) + Math.pow(Math.abs(ball[i].y - treeY), 2));
  //       if (distance - (ball[i].r + treeRadiusMax) > 0) {
  //         count++;
  //       } else {
  //         this.draw();
  //         break;
  //       }
  //       if (count == ball.length) {
  //         position[treeX][treeY].isSet = 1;
  //         position[treeX][treeY].radius = treeRadiusMax;
  //         ball.push({ x: treeX, y: treeY, r: treeRadiusMax });
  //         console.log(ball.length)
  //         if(ball.length < 40){
  //           this.draw()
  //         }else{
  //           this.setData({
  //             ball: ball
  //           })
  //         }
  //         break;
  //       }
  //     }
  //   }
    
    
  // },
  saveimg:function(){
    var ball=this.data.ball,_this=this,l=ball.length-1;
    ctx.beginPath();
    ctx.setFillStyle('#203561')
    ctx.fillRect(0, 0, 414, 672)
    for(let i=0;i<ball.length;i++){
      var r = ball[i].r;
      ctx.beginPath()
      ctx.arc(ball[i].x - r, ball[i].y - r, r, 0, 2 * Math.PI);
      ctx.setFillStyle('#ffffff')
      ctx.fill()
    }   
    ctx.draw(true,function(e){
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: _this.data.width,
        height: _this.data.height,
        canvasId: 'myCanvas',
        success: function (res) {
          _this.setData({ img1: res.tempFilePath })
          _this.saveimg1()
        },
        fail: function (data) {
          console.log('fail')
        }
      });
      
    });
    
  },
  saveimg1:function(){
    var ball = this.data.ball, _this = this, l = ball.length - 1;
    ctx1.beginPath();
    ctx1.setFillStyle('#203561')
    ctx1.fillRect(0, 0, 414, 672)
    for (let i = 0; i < ball.length - 1; i++) {
      var r = ball[i].r;
      ctx1.beginPath()
      ctx1.arc(ball[i].x - r, ball[i].y - r, r, 0, 2 * Math.PI);
      ctx1.setFillStyle('#ffffff')
      ctx1.fill()
    }
    ctx1.draw(true, function (e) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: _this.data.width,
        height: _this.data.height,
        canvasId: 'myCanvas1',
        success: function (res) {
          _this.setData({ img2: res.tempFilePath })
          _this.saveimg2();
        },
        fail: function (data) {
          console.log(data)
        }
      })
    });
  },
  saveimg2:function(){
    var w = 414, h = 736,_this=this;
    var img_h = this.data.height / this.data.width * 140, avatar;
    ctx2.beginPath();
    ctx2.drawImage('../images/bg3.png', 0, 0, w, h)
    // ctx2.drawImage('../images/logo3.png', w/2-100, 60, 200, 40)
    ctx2.setFillStyle('#203561')
    ctx2.setFontSize(17)
    ctx2.fillText(this.data.info.nickName, 85, 187)
    ctx2.setFontSize(18)
    if(this.data.tongguan){
      ctx2.fillText('我参加记忆力大作战，成功通关！', 45, 235)
      ctx2.fillText('找出新出现的圆', 45, 620)
      ctx2.fillText('看你能玩到几关？', 45, 650)
    }else{
      ctx2.fillText('参加记忆力大作战，闯到了第' + parseFloat(this.data.score - 1) + '关！', 45, 235)
      ctx2.fillText('找出新出现的圆', 45, 340)
      ctx2.fillText('看你能玩到几关？', 45, 370)
    }
    
    
    
    ctx2.save()
    ctx2.beginPath()
    ctx2.arc(60, 180, 15, 0, 2 * Math.PI)
    ctx2.clip()
    ctx2.drawImage(this.data.avatarUrl, 45, 165, 30, 30)
    ctx2.restore()

    ctx2.moveTo(45, 270)
    ctx2.lineTo(w - 45, 270)
    ctx2.setStrokeStyle('#203561')
    ctx2.stroke()
    if(this.data.tongguan){
      ctx2.drawImage('../images/bg4.png', 45, 300, 324, 216)
      ctx2.setFillStyle('#203561')
      ctx2.setFontSize(14)
      ctx2.fillText(this.data.info.nickName, 70, 380)
      ctx2.fillText(this.data.date, w-160, 480)
      ctx2.setFontSize(16)
      ctx2.fillText('在记忆力训练大作战中成功通关，经专', 70, 410)
      ctx2.fillText('家审委员会评定，特授予荣誉证书！', 70, 435)
      ctx2.drawImage('../images/erm.png', 250, 580, 100, 100)
      
    }else{
      ctx2.drawImage(this.data.img2, 45, 440, 140, img_h)
      ctx2.drawImage(this.data.img1, 205, 440, 140, img_h)
      ctx2.drawImage('../images/erm.png', 250, 300, 100, 100)
    }
    

    ctx2.draw(false,function(e){
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: w,
        height: h,
        canvasId: 'myCanvas2',
        success: function (res) {
          _this.setData({ img3: res.tempFilePath })
        },
        fail: function (data) {
          console.log(data)
        }
      })
    })

  },
  savePic: function () {
    var _this = this;
    wx.showToast({
      icon:'none',
      title: '成功保存至相册，记得分享哦！'
    })
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.img3,
      success(res) {
      }
    })
  },
  choose:function(e){    
    var ball_length = this.data.ball.length, index = e.target.dataset.index,_this=this;
    if (knock){
        return false;
    }
    if (index == ball_length -1 ){  
        pop.play();
        this.setData({
          score: this.data.score + 1
        })
        if(this.data.score >= length+1){
          knock=1
          this.postData();
          _this.setData({
            tongguan: 1
          });
          this.saveimg2()
          
          setTimeout(function () {
            _this.setData({
              error: 1,
              left: '0%',
              time: .3,
            });
          }, 1000)
          this.clear()
        }else{
          this.setData({
            left: '0%',
            time: .3,  
          });
          setTimeout(function () {
            _this.draw();
            _this.setData({
              left: '-100%',
              time: .3,
            });
          }, 1000);
          setTimeout(function () {
            _this.setData({
              time: 0,
              left: '100%'
            });
            if (_this.data.score == 2) {
              wx.showToast({
                title: '找到新出现的圆哦',
                icon: 'none',
                duration: 2000
              })
            }

          }, 1500)
        }
        
       
    }else{
      knock=1
      this.saveimg();
      this.postData();
      over.play()
      _this.setData({
        act: 1,
      });
      setTimeout(function () {
        _this.setData({
          act: 0,
        });
      }, 500)
      setTimeout(function(){
        _this.setData({
          error: 1,
          left: '0%',
          time: .3,
        }); 
      }, 1000)
      this.clear()
    }
  },
  startGame:function(){
    knock=0;
    this.setData({
      m: 0,
      h: 0,
      min: 0,
      tongguan:0
    });
    time = setInterval(this.countDown, 1000)
    var _this=this;
    setTimeout(function () {
      _this.setData({
        time: .3,
        left: '-100%'
      });
    }, 800);
    setTimeout(function () {
      _this.setData({
        time: 0,
        left: '100%'
      });
    }, 1400)
  },
  restart:function(){
    ctx.clearRect(0, 0, this.data.width, this.data.height);
    this.setData({
      ball:[],
      error:0,
      score:1,
      img:[]
    });
    this.draw();
    this.startGame();
  },
  countDown:function(){
      var m=this.data.m,min=this.data.min,h=this.data.h;
      m++;
      if(m > 59){
        m=0;
        min++;
        if(min > 59){
            min=0;
            h++
        }
      };
      this.setData({
        m:m,
        h:h,
        min:min
      })
  },
  clear:function(){
      clearInterval(time);  
  },
  getData: function () {
    var _this=this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.login({
            success: function (res) {
              var code = res.code;
              wx.getUserInfo({
                success: function (res) {
                  wx.request({
                    url: 'https://xcv.xiaorizi.me/miniGame/get_usr_info/',
                    method: "POST",
                    data: {
                      iv: res.iv,
                      encryptedData: res.encryptedData,
                      js_code: code,
                      minigame_id: 1
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                      console.log(res)
                      _this.setData({
                        info:res.data.data
                      });
                      wx.setStorage({
                        key: "info",
                        data: JSON.stringify(res.data.data)
                      });
                      wx.downloadFile({
                        url: _this.data.info.avatarUrl,
                        success: function (res) {
                          _this.setData({
                            avatarUrl: res.tempFilePath
                          })
                        }
                      })
                    }
                  });
                }
              })
            }
          })

        }
      }
    })
  },
  postData:function(){
    var _this=this,info=this.data.info,time;
    time=this.data.h*60*60+this.data.min*60+this.data.m
    wx.request({
      url: 'https://xcv.xiaorizi.me/miniGame/scoreRecord/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method:'POST',
      data:{
        minigame_id:1,
        username: info.nickName,
        avatar: info.avatarUrl,
        openid: info.openId,
        level: _this.data.score-1,
        time_cost: time
      },
      success:function(res){
        console.log(res)
      }
    });
  },
  toIndex:function(){
    wx.navigateTo({
      url: '../base/base',
    })
  },
  getDj: function () {
    var _this = this, info = this.data.info;
    wx.request({
      url: 'https://xcv.xiaorizi.me/miniGame/scoreRecord/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        minigame_id: 1,
        openid: info.openId,
        share_record: 1
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.item[0] == 1){
            _this.setData({
              eye:1,
              show_rule:0,
              show_prop:1
            })
        }
      }
    });
  },
  onShareAppMessage: function (res) {
    var _this=this;
    var openGId = [];
    wx.getStorage({
      key: 'openGId',
      success: function (res) {
        console.log(res.data)
        if (res.data){
          openGId = JSON.parse(res.data)
        }
        
      }
    })
    var id = res.target.id;
    if(id){
      this.setData({ show_rule:0})
    }
    if (res.from === 'button' && !this.data.tongguan) {
      return {
        title: '每天玩一玩，您的大脑不会老',
        path: '/pages/base/base',
        success:function(res){
          wx.showLoading({
            title: '',
          })
          if (res.shareTickets) {
            var tkt = res.shareTickets[0]
            wx.login({
              success: function (res) {
                var code = res.code;
                wx.getShareInfo({
                  shareTicket: tkt,
                  success: function (res) {
                    wx.request({
                      url: 'https://xcv.xiaorizi.me/miniGame/get_usr_info/',
                      data: {
                        iv: res.iv,
                        encryptedData: res.encryptedData,
                        js_code: code,
                        minigame_id:1
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: 'POST',
                      success: function (res) {
                        wx.hideLoading()
                        

                        if (id == 'dj'){
                          _this.getDj();
                        }else{
                          if (openGId.indexOf(res.data.data.openGId) < 0) {
                            knock = 0;
                            openGId.push(res.data.data.openGId)
                            wx.setStorage({
                              key: "openGId",
                              data: JSON.stringify(openGId)
                            });
                            _this.setData({
                              error: 0
                            });
                            time = setInterval(_this.countDown, 1000);
                            setTimeout(function () {
                              _this.setData({
                                time: .3,
                                left: '-100%'
                              });
                            }, 800);
                            setTimeout(function () {
                              _this.setData({
                                time: 0,
                                left: '100%'
                              });
                            }, 1400)
                          } else {
                            wx.showToast({
                              title: '请分享到不同的群哦！',
                              icon: 'none',
                              duration: 2000
                            })
                          };
                        }
                      }
                    })
                  },
                  fail: function () {
                    wx.showToast({
                      title: '分享到好友无效哦，请分享到微信群',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              }
            });
          } else {
            wx.showToast({
              title: '分享到好友无效哦，请分享到微信群',
              icon: 'none',
              duration: 2000
            })
          }
          
        }
      }
    }else{
      return{
        title: '每天玩一玩，您的大脑不会老',
        path: '/pages/base/base',
      }
    }
    
  }
})

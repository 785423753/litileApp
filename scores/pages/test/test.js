// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub: [],
    current:0,
    idx:'',
    school:'',
    xi:''
  },
  onLoad: function (options) {
    var items = [
          {
          ques: "Give the antonyms(反义字) of 'few' (命题人：罗念生)",
          ans: [
            "a、lot of",
            "b、more",
            "c、many",
            "d、couple",
          ]
        },
        {
          ques: "translate into English '多行不义，必自毙'(命题人：罗念生)",
          ans: [
            "a、Many lines are unrighteous, and they will kill themselves",
            "b、Give a thief enough rope and he’ll hang himself",
            "c、Will be unjust since the death",
            "d、Kill myselves",
          ]
        },
        {
          ques: "秦始皇焚书坑儒，何以至今仍有秦以前之载籍 (命题人:钱穆)",
          ans: [
            "a、儒家弟子根据记忆默写",
            "b、后世整理",
            "c、后世杜撰",
            "d、主要毁坏列国史书",
          ]
        },
        {
          ques: "战国时主明王道辨义者是：(命题人:钱穆)",
          ans: [
            "a、墨子",
            "b、韩非子",
            "c、孔子",
            "d、孟子",
          ]
        },

        {
          ques: "鸡犬共若干只，足数共320，而鸡之头数为犬之头数七分之二，问犬有几只 (命题人:华罗庚)",
          ans: [
            "a、280",
            "b、300",
            "c、40",
            "d、120",
          ]
        },
        {
          ques: "有一个猎人，朝天开枪后，子弹再也没回来，求他开枪的速度？(命题人:华罗庚)",
          ans: [
            "a、1024m/s",
            "b、340m/s",
            "c、7.9km/s",
            "d、2000m/s",
          ]
        },
        {
          ques: "“仁人之安宅也义人之正路也”,为其标注标点(命题人:朱自清)",
          ans: [
            "a、仁人之,安宅也;义人之,正路也",
            "b、仁,人之安宅也;义,人之正路也",
            "c、仁人之安宅也;义人之正路也",
            "d、仁人之,安宅也;义人之,正路也",
          ]
        },
        {
          ques: "一副扑克牌，放在台子上往前推，问最大的长度是多少(命题人:华罗庚)",
          ans: [
            "a、2.28L",
            "b、10L",
            "c、5L",
            "d、12L",
          ]
        },
        {
          ques: "六朝最盛行何种文体 (命题人:朱自清)",
          ans: [
            "a、诗歌",
            "b、戏剧",
            "c、赋",
            "d、骈文",
          ]
        },
        {
          ques: "战国时主明王道辨义者是：(命题人 钱穆)",
          ans: [
            "a、墨家",
            "b、儒家",
            "c、法甲",
            "d、道家",
          ]
        },
    ];
    function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    this.setData({
      sub: getRandomArrayElements(items, 3),
    })
  },
  tap:function(e){
    var current = this.data.current,_this=this;
    // (this.data.current > 1) ? current = this.data.current : current = this.data.current+1;
    this.setData({
      idx: e.target.dataset.index,
    })
    setTimeout(function(){
      if (current > 1){
        _this.setData({
          current: current,
        })
      }else{
        _this.setData({
          current: current+1,
          idx: ''
        })
      }
        
    },300)
  

  },
  post:function(){
    if (this.data.idx === ''){
        wx.showToast({
          title: '同学，你还没有答完题目哦',
          icon: 'none',
          duration: 2000
        })
      }else{
        var score = Math.floor(Math.random() * 50)+550,_this=this;
        wx.showModal({
          title: '考试结果',
          showCancel:false,
          confirmText:'去看看',
          content: '恭喜你取的' + score+"分，查看你的通知书",
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../result/result',
              })
            } else if (res.cancel) {
              
            }
          }
        })
      }
  },
  onShareAppMessage: function () {
    return {
      title: "我在民国考大学，快来看看吧",
      path: 'pages/base/base'
    }
  }
})
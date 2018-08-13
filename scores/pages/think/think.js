// pages/think/think.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shi: [],
    text:''
  },
  onLoad: function (options) {
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


    var items = [
      '计算机软件，现在专业给人算命。来一卦？',

      '文化产业管理，现在当风水师了。',

      '英文，现在在英国给人做家教。',

      '能源与动力工程，当了司机。',

      '学会计的，现在在给人家办贷款。',

      '学的服装设计，现在在步行街卖衣服。',

      '土木工程，现在在当厨师。',

      '临床医学，还在上学。',

      '临床医学 当了几年法医后，又去做了生物老师。',

      '差一点就考进了清华，如今在工地上搬砖。',

      '学了5年医，现在是儿科医生。',

      '金融学，现在在某公司当会计。',

      '幼师，工作后就从事软件测试。',

      '机电专业，现在秃顶程序猿一枚。',

      '城市景观设计，现在在做编辑。',

      '日语专业，如今从事商务工作多年。',

      '视觉艺术创作，现在在抠图，我就是传说中的美工。',

      '工程造价，现在在工地搬砖。',

      '商务英语，现在在做海外代购。',
      '物流管理，现在圆通送快递呢。',

      '学会计的，现在在卖车险。',

      '学音乐专业的，在地铁当流浪歌手。',

      '计算机安全，已经专业帮人修电脑好几年。',

      '汉语言文学 ，前台，好后悔没去当老师。',

      '市场营销，现在是卖房子的。',

      '学的农业，现在是养猪专业户。', 

    ];
    this.setData({
      shi: getRandomArrayElements(items, 5),
    })
  
  },
  inputChange: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  post:function(){
    if (this.data.text === '') {
      wx.showToast({
        title: '请输入你的高考故事',
        icon: 'none',
        duration: 2000
      })
      return false;
    };
    
    wx.navigateTo({
      url: '../pic/pic?text=' + this.data.text,
    })

    this.setData({ text: '' })
  },
  onShareAppMessage: function () {
    return {
      title: "说说你当年高考的段子",
      path: 'pages/base/base'
    }
  }
})
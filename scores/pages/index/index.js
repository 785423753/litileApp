//index.js
//获取应用实例
const app = getApp()
const util=[]
for(var i=1;i<17;i++){
  util.push('util'+i)
}
for (var i = 0; i < 4; i++){
  util[i] = require('../../utils/json'+parseInt(i+1)+'.js');
}
// const util1 = require('../../utils/json1.js');
// const util2 = require('../../utils/json2.js');
// const util3 = require('../../utils/json3.js');
// const util4 = require('../../utils/json4.js');
var all_data={};
Page({
  data: {
    focus:false,
    array_0:[
      {
        name: '文科',
        value:'w'
      },
      {
        name: '理科',
        value: 'l'
      }
    ],
    
    array_1: [
      {
        "name": "北京市",
        "short_name": "北京",
        "pinyin": "BeiJing"
      },
      {
        "name": "天津市",
        "short_name": "天津",
        "pinyin": "TianJin"
      },
      {
        "name": "河北省",
        "short_name": "河北",
        "pinyin": "HeBei"
      },
      {
        "name": "山西省",
        "short_name": "山西",
        "pinyin": "SanXi"
      },
      {
        "name": "内蒙古",
        "short_name": "内蒙古",
        "pinyin": "NeiMengGu"
      },
      {
        "name": "辽宁省",
        "short_name": "辽宁",
        "pinyin": "LiaoNing"
      },
      {
        "name": "吉林省",
        "short_name": "吉林",
        "pinyin": "JiLin"
      },
      {
        "name": "黑龙江省",
        "short_name": "黑龙江",
        "pinyin": "HeiLongJiang"
      },
      {
        "name": "上海市",
        "short_name": "上海",
        "pinyin": "ShangHai"
      },
      {
        "name": "江苏省",
        "short_name": "江苏",
        "pinyin": "JiangSu"
      },
      {
        "name": "浙江省",
        "short_name": "浙江",
        "pinyin": "ZheJiang"
      },
      {
        "name": "安徽省",
        "short_name": "安徽",
        "pinyin": "AnHui"
      },
      {
        "name": "福建省",
        "short_name": "福建",
        "pinyin": "FuJian"
      },
      {
        "name": "江西省",
        "short_name": "江西",
        "pinyin": "JiangXi"
      },
      {
        "name": "山东省",
        "short_name": "山东",
        "pinyin": "ShanDong"
      },
      {
        "name": "河南省",
        "short_name": "河南",
        "pinyin": "HeNan"
      },
      {
        "name": "湖北省",
        "short_name": "湖北",
        "pinyin": "HuBei"
      },
      {
        "name": "湖南省",
        "short_name": "湖南",
        "pinyin": "HuNan"
      },
      {
        "name": "广东省",
        "short_name": "广东",
        "pinyin": "GuangDong"
      },
      {
        "name": "广西",
        "short_name": "广西",
        "pinyin": "GuangXi"
      },
      {
        "name": "海南省",
        "short_name": "海南",
        "pinyin": "HaiNan"
      },
      {
        "name": "重庆市",
        "short_name": "重庆",
        "pinyin": "ChongQing"
      },
      {
        "name": "四川省",
        "short_name": "四川",
        "pinyin": "SiChuan"
      },
      {
        "name": "贵州省",
        "short_name": "贵州",
        "pinyin": "GuiZhou"
      },
      {
        "name": "云南省",
        "short_name": "云南",
        "pinyin": "YunNan"
      },
      {
        "name": "西藏自治区",
        "short_name": "西藏",
        "pinyin": "XiZang"
      },
      {
        "name": "陕西省",
        "short_name": "陕西",
        "pinyin": "ShanXi"
      },
      {
        "name": "甘肃省",
        "short_name": "甘肃",
        "pinyin": "GanSu"
      },
      {
        "name": "青海省",
        "short_name": "青海",
        "pinyin": "QingHai"
      },
      {
        "name": "宁夏",
        "short_name": "宁夏",
        "pinyin": "NingXia"
      },
      {
        "name": "新疆",
        "short_name": "新疆",
        "pinyin": "XinJiang"
      },
    ],
    array_2: ['2017', '2016','2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', 
    '2006', '2005', '2004', '2003', '2002', '2001', '2000'],
    index_0:'',
    index_1: '',
    index_2:'',
    display:'none',
    score:'',
    data:{}
  },
  onLoad: function () {
    console.log(util[0])
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.showLoading({
      title: '',
    })
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
    var data = this.data.array_1
     for(var i=0;i<data.length;i++){
       data[i].pinyin = data[i].pinyin.toLowerCase()
     }
     this.setData({ array_1: data, text: items[Math.floor(Math.random() * (items.length - 1))]})  
     var _this = this;
     setInterval(function () {
       _this.setData({
         text: items[Math.floor(Math.random() * (items.length - 1))]
       })
     }, 3000)
     var arry = {};
     for (i = 0; i < util.length;i++){
       for (var key in util[i].data) {
         arry[key] = util[i].data[key]
       }
     }
    //  this.setData({ data: arry });
     all_data = arry
     console.log(all_data)
     wx.hideLoading()
    //  console.log(util[0].data)

  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  pickChange:function(e){
    switch (e.target.dataset.type) {
      case '0':
        this.setData({index_0:e.detail.value})
        var city = this.data.array_1[this.data.index_1].pinyin
        // if ((city == 'zhejiang' || city == "shanghai") && e.detail.value != 2) {
        //   wx.showToast({
        //     title: '该省份在2017年不分文理科哦',
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   // this.setData({ index_0: 2 })
        // }
        break;
      case '1':
        this.setData({ index_1: e.detail.value })
        break;
      default:
        this.setData({ index_2: e.detail.value });
        var city = this.data.array_1[this.data.index_1].pinyin
        if ((city == 'zhejiang' || city == "shanghai") && e.detail.value == 0) {
          console.log('23333')
          this.setData({ 
            array_0: [{
              name: '不分文理',
              value: 'all'
            }]
          })
        }else{
          this.setData({
            array_0: [{
              name: '文科',
              value: 'w'
            },
            {
              name: '理科',
              value: 'l'
            },]
          })
        }
        this.setData({
          index_0:''
        })
    } 
  },
  inputChange:function(e){
    this.setData({
      score: e.detail.value
    })
  },
  close:function(){
      this.setData({
        display:'none',
        score:''
      })
  },
  post:function(){
    if(this.data.index_0 === ''){
      wx.showToast({
        title: '请选择文理科',
        icon: 'none',
        duration: 2000
      })
      return false;
    };
    if (this.data.index_1 === '') {
      wx.showToast({
        title: '请选择所在省份',
        icon: 'none',
        duration: 2000
      })
      return false;
    };
    if (this.data.index_2 === '') {
      wx.showToast({
        title: '请选择高考年份',
        icon: 'none',
        duration: 2000
      })
      return false;
    };
    var city = this.data.array_1[this.data.index_1].pinyin, sub = this.data.array_0[this.data.index_0].value;
    var year = this.data.array_2[this.data.index_2].substring(2);
    console.log(city + "  " + year + "  " + sub)
    if (city == 'xizang' || city == "xinjiang") {
      wx.showToast({
        title: '学长没有公开资料供查询哦',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.score === '') {
      wx.showToast({
        title: '请输入你的高考分数',
        icon: 'none',
        duration: 2000
      })
      return false;
    };
    
    var arry = all_data[city][year][sub];
    console.log(arry)
    
    if (this.data.score > parseInt(arry[0].s)+30) {
      this.setData({
        display: 'block'
      })
    }else{
      wx.showLoading({
        title: '',
      })
      var s = this.data.score, l = arry.length,text;
      var min=750,index;
        for(var i=0;i<arry.length;i++){
          if (Math.abs(arry[i].s - s) <= min){
            min = Math.abs(arry[i].s - s);
            index=i;
            if(min == 0){
                break;
            }
          }
        };
        console.log(index+"   "+min)
        wx.hideLoading()
        // console.log((1 - parseFloat(arry[index].r / arry[l - 1].r)).toFixed(4))
        var per = ((1 - parseFloat(arry[index].r / arry[l - 1].r)).toFixed(4) * 100).toFixed(2);
        (per == 100) ? per = 99.99 : '';
        (arry[index].r == 1) ? text = "第一名" : text = "前" + arry[index].r + "名"
        wx.navigateTo({
          url: '../logs/logs?rank=' + text + '&per=' + per + "&year=" + this.data.array_2[this.data.index_2] + "&city=" + this.data.array_1[this.data.index_1].name,
        })
    }
  },
  onShareAppMessage: function (res) {
    var _this = this;
    return {
      title:"当年高考排名大比拼",
      path: 'pages/base/base'
    }
  }
})

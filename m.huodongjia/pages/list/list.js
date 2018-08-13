// pages/list/list.js
var app = getApp(), host = app.globalData.host;
Page({
  data: {
      city_arry:[],
      date_arry:[],
      cat_arry: [],
      city_index:0,
      date_index: 0,
      cat_index: 0,
      page: 0,
      next: 1,
      next_page:'1',
      events:[],
      height:0,
      top:0,
      s_top:0,
      global:{}
  },
  onLoad:function(){
    var appInstance = getApp(), global = appInstance.globalData;
    if (global.cat == ''){
      this.event("/business/?json=1")
    }
  },
  onShow: function (options) {
    var _this=this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight-40
        });
      }
    });
    var appInstance = getApp(), global = appInstance.globalData;
    if (global.cat != ''){        //从首页带参数跳转过来
      this.setData({ global: global, events: [] });
      this.event('/' + global.cat + '/?json=1');
      global.cat='';
    }
  },
  onShareAppMessage: function () {
  
  },
  event: function (url) {
    var _this = this
    wx.request({
      url: host + url,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
            var Data = res.data.data,events= _this.data.events;
            // 只在第一页给筛选条件赋值
            var str = { name: "不限" }, str_1 = { district_name: "不限" }, str_2 = { name: "不限", ename:'business'};
            if (_this.data.page == 0){
              var city_arry = Data.main_cities,
                  date_arry = Data.months,
                  cat_arry = Data.main_cats;
              city_arry.splice(0, 0, str_1), date_arry.splice(0, 0, str), cat_arry.splice(0, 0, str_2);
              _this.setData({
                city_arry: city_arry,
                date_arry: date_arry,
                cat_arry: cat_arry
              })
            };
            // 只在第一页给筛选条件赋值
            // 具有初始条件赋值
            if (_this.data.global.cat != ''){          //分类
              for (var i = 1; i < _this.data.cat_arry.length; i++) {
                if (_this.data.global.cat == _this.data.cat_arry[i].ename) {
                  console.log(_this.data.global.cat)
                  _this.setData({
                    cat_index:parseInt(i)
                  })
                }
              } ; 
            };
            if (_this.data.global.city != '') {                 //城市
              for (var i = 0; i < Data.main_cities.length; i++) {
                if (_this.data.global.city == Data.main_cities[i].title) {       
                  _this.setData({
                    city_index: parseInt(i) + 1
                  })
                }
              };
            }
             // 具有初始条件赋值
            // 赋值会议列表
            var nextPage = '', Events = Data.events;
            if (Data.events.length <= 0){
              Events = Data.recommend;
              _this.setData({recom:true})
            }else{
              _this.setData({ recom: false })
            }
            for (var i = 0; i < Events.length;i++){
              events.push(Events[i]); 
           };
           if (Data.nextPage != 'false'){
             nextPage = Data.nextPage
           };
           _this.setData({
             events:events,
             page: Data.cur_page,
             next: parseInt(Data.cur_page)+1,
             next_page: nextPage,
           });
            // 赋值会议列表

        } else {
          wx.showModal({
            title: '服务器开小差啦',
            content: '',
            showCancel: false
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '服务器开小差啦',
          content: '',
          showCancel: false
        })
      }
    })
  },
  lower: function (e) {
    if (this.data.page != this.data.next) {
      this.data.next = this.data.page
      if (this.data.next_page) {
        this.event(this.data.next_page)
      }
    }
  },
  scroll:function(e){
      this.setData({
        s_top: e.detail.scrollTop
      })
  },
  top_back:function(){
     this.setData({
       top:0
     })
  },
  bindMonthChange: function(e) {    
    if (e.detail.value != this.data.date_index){
      this.setData({
        date_index: e.detail.value,
        events:[]
      }) 
      this.change();
    }
  },
  bindCatChange: function (e) {
    if (e.detail.value != this.data.cat_index) {
      this.setData({
        cat_index: e.detail.value,
        events: []
      })
      this.change();
    }
  },
  bindCityChange: function (e) {
    if (e.detail.value != this.data.city_index) {
      this.setData({
        city_index: e.detail.value,
        events: []
      })
      this.change();
    }
  },
  change:function(){
    var city = '', cat = '', month = '';
    if (this.data.city_arry[this.data.city_index].title) { city = '/' + this.data.city_arry[this.data.city_index].title }
    if (this.data.cat_arry[this.data.cat_index].ename) { cat = '/' + this.data.cat_arry[this.data.cat_index].ename } else {
      cat = '/business'
    }
    if (this.data.date_arry[this.data.date_index].id) { month = '/' + this.data.date_arry[this.data.date_index].id }
    var app = getApp();
    app.globalData.cat = '', app.globalData.city = '';
    this.setData({
      global:{}
    });
    this.event(city + cat + month + '/?json=1')
  },
  search: function (e) {
    if (e.detail.value.key != "") {
      wx.navigateTo({
        url: '../tag/tag?key=' + e.detail.value.key
      })
    }
  },
  enter: function (e) {
    if (e.detail.value != "") {
      wx.navigateTo({
        url: '../tag/tag?key=' + e.detail.value
      })
    };
  }
})
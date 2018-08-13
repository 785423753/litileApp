//index.js
//获取应用实例
var app = getApp(), host = app.globalData.host;
Page({
  data: {
      tags:[],
      cat:[],
      it_events:[],
      finance_events:[],
      medical_events:[],
     show_coupon:0
  },
  onLoad: function (options) {

    wx.showShareMenu({
      withShareTicket: true
    })
      var _this=this;
      wx.request({
        url: host+"/?json=1",
        success:function(res){
          if (res.statusCode == 200){
              _this.setData({
                    tags: res.data.tags_cloud,
                    cat: res.data.main_cats
                    // it_events: res.data.events[0].main_queryset,
                    // finance_events: res.data.finance,
                    // medical_events: res.data.medical
              })
          }else{
            wx.showModal({
              title: '',
              content: '服务器开小差啦！',
              showCancel: false
            })
          };
        }
      });
      // 获取openid
      wx.login({
        success: function (res) {
          //发起网络请求
          wx.request({
            url: host + '/get_wx_open_id/?js_code=' + res.code,
            success: function (res) {
              _this.getcoupon(res.data.openid);
            }
          });
        }
      });
        // 获取openid
      wx.getUserInfo({
        success: function (res) {
        }
      })
  },
  onShareAppMessage: function () {
    return {
      title:"找会议，上活动家",
      path: '/pages/index/index',
    }
  },
  getcoupon:function(id){
    var _this=this;
    wx.request({
      url: host + "/usercenter/2018welcomecoupon/?open_id=" + id,
      success: function (res) {
        console.log(res.data)
        if (res.data.data.qualification == 1){
          _this.setData({
            show_coupon:1
          });
          
        };
      }
    })
  },
  getCoupon:function(){
      wx.navigateTo({
        url: '../discount/discount',
      })
  },
  close:function(){
    this.setData({
      show_coupon: 0
    })
  },
  goto_cat:function(e){
    app.globalData.cat = e.target.dataset.id;
    // console.log(getApp())
    setTimeout(function(){
      wx.switchTab({
        url: '../list/list'
      })
    },100) 
  },
  search:function(e){
    if (e.detail.value.key != "") {
      wx.navigateTo({
        url: '../tag/tag?key=' + e.detail.value.key
      })
    }
  },
  enter:function(e){
    if (e.detail.value != ""){
        wx.navigateTo({
          url: '../tag/tag?key=' + e.detail.value
        })
      };
  }
})

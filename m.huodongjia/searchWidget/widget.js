import render_list from 'template.compile_1';
import render from 'template.compile';
import classObj_list from 'class_list';
import classObj from 'class';
import WidgetDom from 'WidgetDom/index';

Widget({
  isEncodeJson(str) {
    return typeof str === 'string' && str.trim()[0] === '%';
  },
  // 由于版本历史原因，onLoad的widgetData，wxParamData，query参数请通过此方法获取，示例：getWidgetParam('widgetData', options.query);
  getWidgetParam(paramName, data) {
    if (paramName === 'query') {
      if ('wxSearchQuery' in data) {
        return decodeURIComponent(data.wxSearchQuery);
      }
      return data.query;
    }
    if (!data[paramName]) {
      return;
    }
    if (paramName === 'widgetData' || paramName === 'wxParamData' || paramName === 'data') {
      if (this.isEncodeJson(data[paramName])) {
        return JSON.parse(decodeURIComponent(data[paramName]));
      }
      else {
        return JSON.parse(data[paramName]);
      }
    }
  },
  onLoad(options) {
    const ctx = this.getContext();
    const { width, height } = options;
    let widgetData = this.getWidgetParam('widgetData', options.query);
    console.log('2333')
    console.log(widgetData)
    // 初始绘制
    WidgetDom.init({
      windowWidth: width,
      windowHeight: height,
      render,
      classObj,
      ctx,
      // layoutDebug: true,
      // imageDebug: 'images/design.png'
    });
    WidgetDom.useDynamicHeight();

    // 有数据
    if (widgetData) {
      console.log('23333')
      
      
      let data = widgetData;
      if (data.item){
        WidgetDom.setRender(render) 
        WidgetDom.setClassObj(classObj)
      };
      if (data.item_list) {
        WidgetDom.setRender(render_list)
        WidgetDom.setClassObj(classObj_list)
      }
      data = this.processData(data);
      // 返回正常
      if (data.err_code == 0) {
        WidgetDom.setData(data);
      } else {
        // 异常处理
      }
    }
    WidgetDom.setData({
      openapp() {
        // 点击元素触发的逻辑
        console.log(widgetData.more_result_path)
        wx.openApp({
          url: widgetData.more_result_path,
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        });
      },
      openEvent(e) {    
        wx.openApp({
          url: widgetData.item.redirect_path,
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        });
      },
      openevent(e) {  
        var index = e.target.attr['data-id']
        wx.openApp({
          url: widgetData.item_list[index].redirect_path,
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    });
  },
  onDataPush(options) {
    let data;
    // 有数据
    if (options.data) {
      data = this.getWidgetParam('data', options);
      data = this.processData(data);
      WidgetDom.setData(data);
    }
  },
  onTap(options) {
    return WidgetDom.handleTap(options);
  },
  // 全局处理检查数据
  processData(data) {
    var event, list, linelist,cnt;
    if (data.item){
      event = data.item;
      linelist = data.item.price_list
    };
    if (data.item_list) {
      list = data.item_list
    };
    if (data.item_list) {
      cnt = data.result_count
    };
    return {
      'event': event,
      'list': list,
      'linelist': linelist,
      'cnt': cnt,
      'err_code': 0
    };
  }
})
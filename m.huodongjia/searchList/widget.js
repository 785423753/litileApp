import render from 'template.compile';
import classObj from 'class';
import WidgetDom from 'WidgetDom/index';

Widget({
  isEncodeJson(str) {
    return typeof str === 'string' && str.trim()[0] === '%';
  },
  // 由于版本历史原因，onLoad的widgetData，wxParamData，query参数请通过此方法获取，示例：getWidgetParam('widgetData', options.query);
  getWidgetParam(paramName, data) {
    if (paramName === 'query') {openevent
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
      let data = widgetData;
      data = this.processData(data);
      // 返回正常
      if (data.err_code == 0) {
        WidgetDom.setData(data);
      } else {
        // 异常处理
      }
    };
    WidgetDom.setData({
      openapp() {
        // 点击元素触发的逻辑
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
      openevent(e){
        console.log(e.target)
        var index = e.target.attr['data-id']
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
    console.log(data)
    return {
      'err_code': 0,
      'err_msg': '',
      'list': data.item_list,
      'path': data.more_result_path
    };
  }
})
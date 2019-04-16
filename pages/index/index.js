Page({
  data: {
    // 经度
    long: 0,
    // 维度
    lat: 0,
    // 控件
    controls: []
  },
  // 页面初始化时加载
  onLoad: function () {
    var that = this;
    // 获取设备定位的经纬度
    wx.getLocation({
      success: function (res) {
        var long = res.longitude;
        var lat = res.latitude;
        that.setData({
          long: long,
          lat: lat
        })
      }
    })
    // 获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        that.setData({
          controls: [
            {
              //中心点位置
              id: 1,
              iconPath: '/images/location.png',
              position: {
                width: 20,
                height: 35,
                left: windowWidth / 2 - 10,
                top: windowHeight / 2 - 40.
              },
              //是否可点击
              clickable: true
            },
            {
              id: 3,
              iconPath: "/images/qrcode.png",
              position: {
                width: 100,
                height: 40,
                left: windowWidth / 2 - 50,
                top: windowHeight - 60
              },
              //是否可点击
              clickable: true
            },
            {
              //定位按钮安置
              id: 2,
              iconPath: '/images/img1.png',
              position: {
                width: 40,
                height: 40,
                left: 10,
                top: windowHeight - 60.
              },
              //是否可点击
              clickable: true
            },
            {
              //定位按钮安置
              id: 4,
              iconPath: '/images/pay.png',
              position: {
                width: 40,
                height: 40,
                left: windowWidth - 45,
                top: windowHeight - 100.
              },
              //是否可点击
              clickable: true
            },
            { //报修
              id: 5,
              iconPath: "/images/warn.png",
              position: {
                width: 35,
                height: 35,
                left: windowWidth - 42,
                top: windowHeight - 60.
              },
              //是否可点击
              clickable: true
            },
          ]
        })
      }
    })
  },
  // 控件点击时触发事件
  controltap: function (e) {
    var cid = e.controlId;
    if (cid == 2) {
      this.mapCtx.moveToLocation();
    }
  },
  /**
   * 页面初次渲染完成时触发改事件
   */
  onReady: function () {
    // 创建map上下文
    this.mapCtx = wx.createMapContext("myMap");
  }
})

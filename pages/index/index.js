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
    that.setData({
      controls: [
        {
          id: 1,
          iconPath: "/images/qrcode.png",
          position: {
            width: 100,
            height: 60,
            left: 100,
            top: 400
          }
        }
      ]
    })
  }
})

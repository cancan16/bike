Page({
  data: {
    // 经度
    long: 0,
    // 维度
    lat: 0
  },
  // 页面初始化时加载
  onLoad: function () {
    var that = this;
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
  }
})

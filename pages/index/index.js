Page({
  /**
   * 页面数据
   */
  data: {
    // 经度
    long: 0,
    // 维度
    lat: 0,
    // 控件
    controls: [],
    // 车辆图标
    markers: [],
    // 当前中心点坐标信息
    locationInfo: {}
  },
  /**
   * 页面初始化时加载
   */
  onLoad: function () {
    var that = this;
    // 获取设备定位的经纬度
    wx.getLocation({
      success: function (res) {
        var long = res.longitude;
        var lat = res.latitude;
        that.setData({
          long: long,
          lat: lat,
          locationInfo: {
            long: long,
            lat: lat
          }
        });
        // 加载附近车辆
        console.log("初始化页面加载");
        that.findNearBike(long, lat);
      }
    })
    /**
     * 获取设备信息
     */
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
            // 扫码
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
            { // 添加车辆控件
              id: 6,
              iconPath: "/images/add.png",
              position: {
                width: 35,
                height: 35
              },
              //是否可点击
              clickable: true
            }
          ]
        })
      }
    })
  },
  /**
   * 控件点击时触发事件
   */
  controltap: function (e) {
    var that = this;
    var cid = e.controlId;
    switch (cid) {
      // 点击扫码
      case 3: {
        console.log("用户扫码");
        var status = getApp().globalData.status
        // 跳转到注册页面
        if (status == 0) {
          wx.navigateTo({
            url: "../register/register"
          })

        }
        break;
      }
      // 定位按钮
      case 2: {
        this.mapCtx.moveToLocation();
        break;
      }
      // 添加车辆按钮
      case 6: {
        var markers = that.data.markers;
        markers.push({
          iconPath: "/images/bike.png",
          width: 35,
          height: 40,
          longitude: that.data.locationInfo.long,
          latitude: that.data.locationInfo.lat
        })
        that.setData({
          markers: markers
        })
        this.addBike(that.data.locationInfo.long, that.data.locationInfo.lat);
        break;
      }
    }
  },
  /**
   * 页面初次渲染完成时触发改事件
   */
  onReady: function () {
    // 创建map上下文
    this.mapCtx = wx.createMapContext("myMap");
  },
  /**
   * 获取中心点经纬度
   */
  regionchange: function (e) {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          locationInfo: {
            long: res.longitude,
            lat: res.latitude
          }
        })
        that.findNearBike(res.longitude, res.latitude);
      }
    })
  },
  /**
   * 保存单车信息
   */
  addBike: function (long, lat) {
    wx.request({
      url: "http://localhost:8889/addBike",
      data: {
        location: [
          long, lat
        ]
      },
      method: "POST",
      success: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 获取中心点坐标附近的单车
   */
  findNearBike: function (long, lat) {
    var that = this;
    wx.request({
      url: "http://localhost:8889/findNearBike",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        longitude: long,
        latitude: lat
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        var bikes = res.data.map((bike) => {
          return {
            id: bike.id,
            iconPath: '/images/bike.png',
            longitude: bike.content.location[0],
            latitude: bike.content.location[1],
            width: 35,
            height: 40
          }
        })
        that.setData({
          markers: bikes
        })
      }
    })
  }
})

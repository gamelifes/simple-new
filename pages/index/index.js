//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    windowHeight: 400,
    page: 1,
    flage: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestData();

    //获取屏幕高度
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },
  requestData() {
    this.setData({
      flage: false
    })
    var that = this;
    
    var api = 'http://www.phonegap100.com/appapi.php';
    wx.request({
      url: api, //仅为示例，并非真实的接口地址
      data: {
        a: 'getPortalList',
        catid: '20',
        page: that.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        // console.log(res.data)
        if (res.data.result.length < 20) {
          var f = false;

        } else {
          var f = true;

        }
        var list = that.data.list.concat(res.data.result)

        var page = ++that.data.page;
        that.setData({

          list: list,
          page: page,
          flage: f
        })
      }
    })
  },
  loadMore() {
    if (this.data.flage) {
      this.requestData();
    }
  }
})


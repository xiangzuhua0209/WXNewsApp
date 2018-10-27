// client/pages/detail/detail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId:'',
    newsTitle:'',
    newsDate:'',
    newsSource:'',
    newsPageviews:'',
    newsDetails:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsId:options.newsId,
    })
    this.getDetailData(options.newsId);

    

  },
  getDetailData: function(options){
    var _this = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id:options,
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.result);
        let result = res.data.result;
        var newsDate = util.getDateString(result.date);
        _this.setData({
          newsDate: newsDate,
          newsSource: result.source,
          newsPageviews: result.readCount,
          newsDetails:result.content,
          newsTitle:result.title,
        })
      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    })
  },

  /**
   * 点击返回按钮
   */
  backAction:function(){
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
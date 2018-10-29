// client/pages/home/home.js
var util = require('../../utils/util.js')
const titleTips = ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'];
const idArray = ["gn", "gj", "cj", "yl", "js", "ty", "other"];
var scrollLeft = 0;
var timeStamp = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleData:'',// 所有新闻分类标签数据
    selected:0,// 当前选中的新闻类
    toView: idArray[0],// 存储要显示的新闻类的id,默认为国内，即"gn".
    newsData:'',// 除热点数据外的所有数据
    hotNewsData:'',// 热点新闻的数据
    selectedNewsId:'',// 点击的新闻id,作为跳转到下一页请求数据的参数
    requestSuccess:true,// 请求数据成功
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化新闻分类标签数据
    let titleData = [];
    for(let i = 0; i < 7; i++){
      titleData.push({
        title:titleTips[i],
        identi:idArray[i],
      })
    }
    this.setData({
      titleData: titleData,
    })

    // 获取当前选中新闻类的所有新闻数据
    this.getNewsData(idArray[0]);
  },

  /**
   * 点击新闻分类标签的事件
   */
  bindclick: function(options){
    var selectedData = options.currentTarget.dataset;
    this.getNewsData(idArray[selectedData.index]);// 根据点击的新闻分类标签获取新闻数据
    this.setData({
      selected : selectedData.index,
      toView : idArray[selectedData.index],
    })    
  },
  /**
   * 点击新闻列表某一列的事件
   */
  detailAction:function(options){
    var selectedData = options.currentTarget.dataset;
    var result;
    if(selectedData.index == 0){
      result = this.data.hotNewsData;
    }else{
      result = this.data.newsData[selectedData.index - 1];
    }
    wx.navigateTo({
      url: '/pages/detail/detail?newsId=' + result.id,
    })
  },
  /**
   * 
   */
  scrollAction:function(info){
    // 如果是整页的滑动，忽略事件，
    if(info.detail.scrollLeft % 320 == 0){
      return;
    }
    var tempScrollLeft = info.detail.scrollLeft;
    var pageWidth = info.detail.scrollWidth/idArray.length;// 获取实际一屏的宽度
    var value = tempScrollLeft - scrollLeft;
    var index = this.data.selected;
    if(value > 10 && value < 320){
      index = parseInt(tempScrollLeft / pageWidth) + 1;
      this.setData({
        selected: index,
        toView: idArray[index],
      })
      this.getNewsData(idArray[index]);
    }else if(value < -6){
      index = parseInt(tempScrollLeft / pageWidth);
      this.setData({
        selected: index,
        toView: idArray[index],
      })
      this.getNewsData(idArray[index])
    }
    scrollLeft = tempScrollLeft;
    
  },
  /*
    根据id请求新闻数据
  */ 
  getNewsData:function(options,callBack){
    var _this = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: options,
      },
      success: res => {
        var result = res.data.result;
        let newsData = [];
        var firstData = result.shift();
        firstData.date = util.getDateString(firstData.date);
        let a = "";
        for (let i = 0; i < result.length; i++) {
          var date = util.getDateString(result[i].date);
          newsData.push({
            title: result[i].title,
            date: date,
            source: result[i].source,
            firstImage: result[i].firstImage.length == 0 ? "/images/placeholderImage.png" : result[i].firstImage,
            id: result[i].id,
            requestSuccess: true,
          });
        }

        _this.setData({
          newsData: newsData,
          hotNewsData: firstData,
        })
        
      },
      fail:res => {
        _this.setData({
          requestSuccess: false,
        })
      },
      complete: res => {
        console.log(options)

        typeof callBack === "function" && callBack();
      }
    })
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let id = this.data.toView
    this.getNewsData(id,() => {
      wx.stopPullDownRefresh();
    });
  }
})
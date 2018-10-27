const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}
function getDateString(options) {
  // 日期显示规则：不是今天则显示月份和日，是今天则显示几点几分
  var newsTime = options;
  // var newsTime = "2018-10-23T01:56:27.000Z";
  newsTime = newsTime.replace(/-/g, '/');
  newsTime = `${newsTime.substr(0, 10)} ${newsTime.substr(11, 8)}`;
  var tempDate = new Date(newsTime);
  var today = new Date();
  var newsDate = '';

  if (today.getFullYear() == tempDate.getFullYear() && today.getMonth() == tempDate.getMonth() && today.getDate() == tempDate.getDate()) {
    var tempHours = tempDate.getHours();
    if (tempHours + 1 <= 9) {
      tempHours = `0${tempHours}`
    }
    var tempMinutes = tempDate.getMinutes();
    if (tempMinutes <= 9) {
      tempMinutes = `0${tempMinutes}`;
    }
    newsDate = `${tempHours}:${tempMinutes}`;
  } else {
    var tempMonth = tempDate.getMonth() + 1;
    if (tempMonth <= 9) {
      tempMonth = `0${tempMonth}`
    }
    var tempDay = tempDate.getDate();
    if (tempDay <= 9) {
      tempDay = `0${tempDay}`;
    }
    newsDate = `${tempMonth}-${tempDay}`;
  }
  return newsDate;
}

module.exports = { formatTime, showBusy, showSuccess, showModel, getDateString }

// pages/0/0.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newTime:'',
    newDate:'',
    array:['1','2','3'],
    index:0,
  },
  
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  fBindTap:function(){
    wx.navigateTo({
      url:"../4/4"
    })
  },

  dBindTap:function(){
    wx.navigateTo({
      url:"../2/2"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  onLoad: function (options) {
  var that = this;
  //获取实时时间
  setInterval(function () {
    var nowTime = new Date();
    var hour = nowTime.getHours();
    var minutes = nowTime.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    //console.log("nowTime:",nowTime)
    that.setData({
      newTime: nowTime.getFullYear() + '年' + (nowTime.getMonth() + 1) + '月'+nowTime.getDate() + "日" ,
      newDate:  hour + ':' + minutes
    })
  }, 200)
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
  onShareAppMessage: function () {}
})


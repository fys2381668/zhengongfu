// pages/0/0.js
var init;


const devicesId = "654190833" // 填写在OneNet上获得的devicesId 形式就是一串数字 例子:9939133
const api_key = "b6wmyBOSgi2KOLD=6=wiXc46H=M=" // 填写在OneNet上的 api-key 例子: VeFI0HZ44Qn5dZO14AuLbWSlSlI=


Page({

  /**
   * 页面的初始数据
   */
  data: {
    newTime:'',
    newDate:'',
    second:"0"+0,
    minute:"0"+0,
    hours:"0"+0,
    inShow:true,
    show:false,
  },

  dBindTap:function(){
    wx.navigateTo({
      url:"../4/4"
    })
  },

 

// 计时器
start:function(){
    clearInterval(init);
    var that=this;
    that.setData({
      hour:0,
      minute:0,
      second:0,
      millisecond:0
    })
    init=setInterval(function(){that.time()},50);
  },
  stop:function(){
    clearInterval(init);
  },
  Reset:function(){
    var that=this;
    clearInterval(init);
    that.setData({
      hour:0,
      minute:0,
      second:0,
      millisecond:0,
      timecount:'00:00:00'
    })
  },
  time:function(){
    var that = this;

    that.setData({
      millisecond:that.data.millisecond+5
    })
    if(that.data.millisecond>=100){
      that.setData({
        millisecond:0,
        second:that.data.second + 1
      })
    }
    if(that.data.second >= 60){
      that.setData({
        second:0,
        minute:that.data.minute+1
      })
    }
    if(that.data.minute>=60){
      that.setData({
        minute:0,
        hour:that.data.hour+1
      })
    }
    that.setData({
      timecount:that.data.hour+":"+that.data.minute+":"+that.data.second+":"+that.data.millisecond
    })
  },
  onLoad: function (options) {
        // 调用函数
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
        this.start()
        
    console.log(`your deviceId: ${devicesId}, apiKey: ${api_key}`)

    //每隔6s自动获取一次数据进行更新
    const timer = setInterval(() => {
      this.getDatapoints().then(datapoints => {
        console.log(datapoints)
        this.change(datapoints)
      })
    }, 5000)

    wx.showLoading({
      title: '加载中'
    })

    this.getDatapoints().then((datapoints) => {
      console.log(datapoints)
      this.change(datapoints)
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      console.error(err)
      clearInterval(timer)
    })
  },

  /**
   * 向OneNet请求当前设备的数据点
   * @returns Promise
   */
  getDatapoints: function () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.heclouds.com/devices/654190833/datapoints?datastream_id=Temperature,Humidity&limit=20`,
        /**
         * 添加HTTP报文的请求头, 
         * 其中api-key为OneNet的api文档要求我们添加的鉴权秘钥
         * Content-Type的作用是标识请求体的格式, 从api文档中我们读到请求体是json格式的
         * 故content-type属性应设置为application/json
         */
        header: {
          'content-type': 'application/json',
          'api-key': api_key
        },
        success: (res) => {
          const status = res.statusCode
          const response = res.data
          if (status !== 200) { // 返回状态码不为200时将Promise置为reject状态
            reject(res.data)
            return ;
          }
          if (response.errno !== 0) { //errno不为零说明可能参数有误, 将Promise置为reject
            reject(response.error)
            return ;
          }

          if (response.data.datastreams.length === 0) {
            reject("当前设备无数据, 请先运行硬件实验")
          }

          //程序可以运行到这里说明请求成功, 将Promise置为resolve状态
          resolve({
            temperature: response.data.datastreams[0].datapoints.reverse()
          })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
change:function(data){
  var that=this;
  var flag = false
  for(let i=0; i<data.temperature.length; i++){
    if(data.temperature[i].value!=2438.00){
      flag = true
      break;
    }
  }
  if(flag){
   that.setData({
    inShow:false,
    show:true, 
   }) // 不是定值
  } else {
    that.setData({
      inShow:true,
      show:false,
    })// 是定值
  }
},

})
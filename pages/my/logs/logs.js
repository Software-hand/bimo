// logs.js
const util = require('../../../utils/util.js')
// pages/my/logs/logs.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logs:[]
  },
  getlogs:function(){
    const that =this
    const ui = wx.getStorageSync('userinfo')
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/my/my',
      })
    }else{
      wx.cloud.callFunction({
        name: "getlogs",
        data: {
          openid:ui.openid
        },
        success:res=>{
          console.log("res",res)
          that.setData({
            logs:res.result.data.map(log=>{
              var date = util.formatTime(new Date(log.date))
              log.date = date
              return log
            })
          })
        },
        fail:res=>{
          console.log("res",res)
        }
      })
    }
  },
  // onLoad 页面首次加载的时候执行
  // onShow 页面每次切换的时候执行
  onShow:function(){
    this.getlogs()
  }
})
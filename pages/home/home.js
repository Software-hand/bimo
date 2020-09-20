const util = require('../../utils/util')

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    notepad:[],
    checked:[]
  
  }, 
 
  
  
  onShow:function(e){
    // 获取缓存信息
    const ui = wx.getStorageSync("userinfo")
    
    const that = this
    
    wx.cloud.callFunction({
      name:'getlist',
        // 上传
        data: {
          openid:ui.openid
        }, 
        // 下传
        success:res=>{
          that.setData({
            list:res.result.data.map(list=>{
              var date = util.formatTime(new Date(list.date))
              list.date = date
              return list
            })
          })
          },
        fail:res=>{
          console.log("res获取失败",res)
          }
    })
  
    wx.cloud.callFunction({
      name:'getnotepad',
        // 上传
        data: {
          openid:ui.openid
        },
        // 下传
        success:res=>{
          that.setData({
            notepad:res.result.data.map(notepad=>{
              var date = util.formatTime(new Date(notepad.date))
              notepad.date = date
              return notepad
            })
          })
          },
        fail:res=>{
          console.log("res获取失败",res)
          }
    })
  }
}) 
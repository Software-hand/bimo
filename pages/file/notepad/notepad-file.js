const util = require('../../../utils/util')

// pages/home/home.js
Page({

  data: {
    // 记事本
    notepad:[],
    // 底层弹窗
    show2: false,
    _id:"",
  }, 
  
  // 下拉刷新
  onPullDownRefresh:function(e){
    this.onShow()
    wx.stopPullDownRefresh()
  },

  onShow:function(e){
    this.getshow()
  },

  getshow:function(){
   
      // 获取缓存信息
      const ui = wx.getStorageSync("userinfo")
      const that = this
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
  },

  // 记事本 弹窗按钮
  sheet2:function(e){
    console.log("记事本按钮打开e:",e)
    this.setData({
      show2:true,
      _id:e.currentTarget.dataset._id
    })
    console.log("_id:",e.currentTarget.dataset._id)
  },
  onClose() {
    this.setData({ show2: false });
    this.setData({ show1: false });
  },
  cancel()  {
    this.setData({ show2: false });
    this.setData({ show1: false });
  },
 
  // 记事本删除
  delnotepad:function(e){   
    console.log("删除e:",e)
    // 删除云数据库记录
    wx.cloud.callFunction({
      name:'delnotepad',
      // 上传
      data:{
        _id:this.data._id
      },
      success:res=>{
        console.log("delnotepad:云函数调用成功",res)
        console.log("notepad的_id:",this.data._id)

      },
      fail:()=>{
        console.log("login:云函数调用失败")
      }
    })
    this.setData({ show2: false });
  },

  // 便签修改
  updatenotepad:function(e){

    this.setData({ show2: false });
    wx.setStorageSync('forid', this.data._id)
    wx.redirectTo({
      url: '/pages/home/updatenotepad/updatenotepad'
    })
  },

}) 
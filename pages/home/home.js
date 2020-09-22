const util = require('../../utils/util')

// pages/home/home.js
Page({

  data: {
    // 清单
    list:[],
    // 记事本
    notepad:[],
    // 底层弹窗
    show: false,
    actions: [
      {
        name: '修改',
      },
      {
        name: '删除',
      }
    ],
    _id:"",
  }, 
  
  // 下拉刷新
  onPullDownRefresh:function(e){
    setTimeout(wx.stopPullDownRefresh(),2000)
　　this.getshow()   
  },

  onShow:function(e){
    this.getshow()
  },

  getshow:function(){
   
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
  },
  sheet:function(e){
    console.log("按钮打开e:",e)
    this.setData({
      show:true,
      _id:e.currentTarget.dataset._id
    })
    console.log("_id:",e.currentTarget.dataset._id)
  },
  onClose() {
    this.setData({ show: false });
  },
  cancel()  {
    this.setData({ show: false });
  },
  del:function(e){   
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
    this.setData({ show: false });
    this.onShow();
  },

  update:function(e){
    console.log("修改e:",e)
    this.setData({ show: false });
  }

}) 
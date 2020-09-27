const util = require('../../utils/util')

// pages/home/home.js
Page({

  data: {
    // 清单
    list:[],
    // 记事本
    notepad:[],
    // 底层弹窗
    show2: false,
    show1: false,
    show3: false,
    _id:"",
    // 位置
    map:[],
    // 底层弹窗
    
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
   
      wx.cloud.callFunction({
        name:'getmap',
          // 上传
          data: {
            openid:ui.openid
          },
          // 下传
          success:res=>{
            that.setData({
              map:res.result.data.map(map=>{
                var date = util.formatTime(new Date(map.date))
                map.date = date
                return map
              })
            })
            },
          fail:res=>{
            console.log("res获取失败",res)
            }
      })
  },

  
  // 清单 弹窗按钮
  sheet1:function(e){
    console.log("清单打开e:",e)
    this.setData({
      show1:true,
      _id:e.currentTarget.dataset._id
    })
    console.log("_id:",e.currentTarget.dataset._id)
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
    this.setData({ show3: false });
  },
  cancel()  {
    this.setData({ show2: false });
    this.setData({ show1: false });
    this.setData({ show3: false });
  },
  // 清单删除
  dellist:function(e){   
    console.log("删除e:",e)
    // 删除云数据库记录
    wx.cloud.callFunction({
      name:'dellist',
      // 上传
      data:{
        _id:this.data._id
      },
      success:res=>{
        console.log("delnotepad:云函数调用成功",res)
      },
      fail:()=>{
        console.log("login:云函数调用失败")
      }
    })
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

  // 清单 修改
  updatelist:function(e){

    this.setData({ show1: false });
    wx.setStorageSync('forid', this.data._id)
    wx.redirectTo({
      url: '/pages/home/updatelist/updatelist'
    })
  },

  // 便签修改
  updatenotepad:function(e){

    this.setData({ show2: false });
    wx.setStorageSync('forid', this.data._id)
    wx.redirectTo({
      url: '/pages/home/updatenotepad/updatenotepad'
    })
  },

  // 位置 弹窗按钮
  sheet3:function(e){
    console.log("位置 按钮打开e:",e)
    this.setData({
      show3:true,
      _id:e.currentTarget.dataset._id
    })
    console.log("_id:",e.currentTarget.dataset._id)
  },
  
 
  // 地址
  delmap:function(e){   
    console.log("删除e:",e)
    // 删除云数据库记录
    wx.cloud.callFunction({
      name:'delmap',
      // 上传
      data:{
        _id:this.data._id
      },
      success:res=>{
        console.log("delmap:云函数调用成功",res)
        console.log("map的_id:",this.data._id)

      },
      fail:()=>{
        console.log("login:云函数调用失败")
      }
    })
    this.setData({ show3: false });
  },

  // 地址修改
  updatemap:function(e){

    this.setData({ show3: false });
    console.log("map-id:",this.data._id)
    wx.setStorageSync('forid', this.data._id)
    wx.redirectTo({
      url: '/pages/home/updatemap/updatemap'
    })
  },

}) 
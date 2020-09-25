const util = require('../../../utils/util')

// pages/home/home.js
Page({

  data: {
    // 清单
    list:[],

    // 底层弹窗
    show1: false,
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

  onClose() {
    this.setData({ show2: false });
    this.setData({ show1: false });
  },
  cancel()  {
    this.setData({ show2: false });
    this.setData({ show1: false });
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


  // 清单 修改
  updatelist:function(e){

    this.setData({ show1: false });
    wx.setStorageSync('forid', this.data._id)
    wx.redirectTo({
      url: '/pages/home/updatelist/updatelist'
    })
  },


}) 
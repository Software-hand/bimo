const util = require('../../../utils/util')

// pages/home/home.js
Page({

  data: {
    // 位置
    map:[],
    // 底层弹窗
    show3: false,
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
   
      // 获取 位置 信息
      const ui = wx.getStorageSync("userinfo")
      const that = this
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

  // 位置 弹窗按钮
  sheet3:function(e){
    console.log("记事本按钮打开e:",e)
    this.setData({
      show3:true,
      _id:e.currentTarget.dataset._id
    })
    console.log("_id:",e.currentTarget.dataset._id)
  },
  onClose() {
    this.setData({ show3: false });
  },
  cancel()  {
    this.setData({ show3: false });
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
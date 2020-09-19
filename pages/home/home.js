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
 
  // 选择清单时
  checkboxChange: function (e) {
    console.log("选择菜单e:",e)
    console.log("list",this.data.list)
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
            list:res.result.data
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
            notepad:res.result.data
          })
          },
        fail:res=>{
          console.log("res获取失败",res)
          }
    })

   
  }
})
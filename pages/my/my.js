Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userinfo:{},
    // 用户ID
    openid:""
  },
  // onGoUserInfo
  onGoUserInfo:function (e) {
    
    this.setData({
      // 返回事件中用户信息
      userinfo: e.detail.userInfo
    })
    console.log("userinfo", this.data.userinfo)

    // 云函数中 this 范围仅在云函数内 
    // 因此在外面赋值 常量 that 代入云函数
    const that = this
    // 使用云函数方法
    wx.cloud.callFunction({
      // 云函数名
      name:"login",
      // 云函数成功发出请求
      success:res=>{
        console.log("云函数调用成功")
        that.setData({
          //  返回云函数用户ID openid  res:自定义 代表云事件
          //  属性	类型	说明
          //  result	any	云函数返回的结果
          openid:res.result.openid,
          // 返回本地事件用户信息 userInfo e:自定义 代表本地事件
          userinfo:e.detail.userInfo
        })
        // 将openid 信息保存的 userinfo 内，这样后面保存到缓存只需保存一个字典字段
        // data 是页面第一次渲染使用的初始数据。去掉会报错 暂时不是完全清楚概念 9.14
        // data 就是前面定义的 data 内的 数据  9.15
        that.data.userinfo.openid = that.data.openid
 
        console.log("/my.js/openid:",that.data.openid)
        console.log("/my.js/userinfo:",that.data.userinfo)
        // 将 userinfo 保存到缓存，包含openid   Key:  Value:  键值对
        wx.setStorageSync('userinfo', that.data.userinfo)
      },
      // 云函数失败发出请求
      fail:res=>{
        console.log("云函数调用失败")
      }
    })
   
  },

  onLoad:function(){
    // 获取缓存信息
    const ui = wx.getAccountInfoSync("userinfo")
    this.setData({
      userinfo:ui,
      openid:ui.openid
    })
  },

})
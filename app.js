App({
  onLaunch:function () {
    // 云开发环境初始化
    wx.cloud.init({
      env:"bimo-hrpm6",
      // 用户信息保存到访问用户记录
      traceUser:true
    })
  }
})
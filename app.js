App({
  onLaunch:function () {
    // 云开发环境初始化
    wx.cloud.init({
      env:"bimo-hrpm6",
      // 用户信息保存到访问用户记录
      traceUser:true
    })
    // 下面闹钟
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  }
})
Page({

  data:{
    list:[],
    startX: 0, //开始坐标
    startY: 0
  },
 
  getlogs: function () {
    // 获取缓存信息
    const ui = wx.getStorageSync("userinfo")

    const that = this 
    if(!ui.openid){
      wx.switchTab({
        url:"/pages/my/my"
      })
      wx.showToast({
        title: '使用云笔记请先登录',
        icon: 'none',
        duration: 2000
      })
    }else{
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
    }
   },
  

  onShow:function(){
    this.getlogs()
    console.log("list:",this.list)
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.list.forEach(function (v) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      list: that.data.list
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var dX = end.X - start.X,
      dY = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(dY / dX) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    // splice 从数组中删除元素，如果需要，在原来的位置插入新元素，返回删除的元素。
    // 数组中的从零开始移除元素的位置。
    // @param deleteCount—要删除的元素数量。
    this.data.list.splice(e.currentTarget.dataset.index, 1)
    
    this.setData({
      list: this.data.list
    })    
    // 删除云数据库记录
    wx.cloud.callFunction({
      name:'dellist',
      // 上传
      data:{
        _id:e.currentTarget.dataset._id
      },
  
      success:res=>{
        console.log("dellist:云函数调用成功",res)
        console.log("list的_id:",e.currentTarget.dataset._id)
      },
      fail:()=>{
        console.log("login:云函数调用失败")
      }
    })

  }
 
});


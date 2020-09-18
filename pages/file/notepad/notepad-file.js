Page({

  data:{
    notepad:[],
    startX: 0, //开始坐标
    startY: 0
  },

  getlogs: function () {
    // 获取缓存信息
    const ui = wx.getStorageSync("userinfo")
    console.log("/file.js/12/ui:",ui)
    console.log("/file.js/13/ui.openid:",ui.openid)
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
          console.log("/file.js/36云数据/res:",res)
          console.log("/file.js/37云数据/res:",that.data.notepad)
          },
        fail:res=>{
          console.log("res获取失败",res)
          }
        })
    }
   },
  

  onShow:function(){
    this.getlogs()
    console.log("notepad:",this.notepad)
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.notepad.forEach(function (v) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      notepad: this.data.notepad
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
    that.data.notepad.forEach(function (v, i) {
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
      notepad: that.data.notepad
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
    this.data.notepad.splice(e.currentTarget.dataset.index, 1)
    console.log("notepad删除加载:",this.notepad)
    console.log("看这里事件",e)
    console.log("看这里notepad",this.data.notepad)
    console.log("看这里e.currentTarget.dataset.title:",e.currentTarget.dataset.title)
    this.setData({
      notepad: this.data.notepad
    })    
    // 删除云数据库记录
    wx.cloud.callFunction({
      name:'delnotepad',
      // 上传
      data:{
        _id:e.currentTarget.dataset._id
      },
  
      success:res=>{
        console.log("delnotepad:云函数调用成功",res)
        console.log("notepad的_id:",e.currentTarget.dataset._id)
      },
      fail:()=>{
        console.log("login:云函数调用失败")
      }
    })
      
      // 下传
      // success:res=>{
      //   that.setData({
      //     openid:e.openid,
          
      //   })
      //   },
      // fail:res=>{
      //   console.log("res获取失败",res)
      //   }
    
  }
 
});

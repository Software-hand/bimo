Page({
  data: {
    itemlist: [
      {
        content: '测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
    ], 
    startX: 0, //开始坐标
    startY: 0
  },
  
  // 第一次登录执行 提示操作
  onLoad:function(e){
    wx.showToast({
      title: '欢迎来到笔墨记',
      icon: 'none',
      duration: 2000
    })
  },
 
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.itemlist.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      itemlist: this.data.itemlist
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
    that.data.itemlist.forEach(function (v, i) {
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
      itemlist: that.data.itemlist
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
    this.data.itemlist.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      itemlist: this.data.itemlist
    })
  }
})
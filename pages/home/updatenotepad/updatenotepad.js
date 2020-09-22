Page({
  data: {
    // 标题
    title:'',
    // 内容
    content:'',
    // 用户openid
    openid:'',
    notepad:[]
  
  },

  addtitle: function(e) {
    console.log("失去焦点",e)
    this.setData({
      content: e.currentTarget.dataset.content,
      title: e.currentTarget.dataset.title
    })
  },

  addcontent: function(e){
    console.log("失去焦点",e),
    this.setData({
      content: e.currentTarget.dataset.content,
      title: e.currentTarget.dataset.title
    })
  },
  
  // 保存标题
  add1: function(e){
    this.setData({
      title:e.detail.value
    })
    console.log("标题:",this.data.title)
  },
   
  // 保存内容
  add2: function(e){
    this.setData({
      content:e.detail.value
    })
    console.log("内容:",this.data.content)
  },

  // onLoad 首次加载页面执行
  // onShow 每次切换页面执行
  onShow:function(e){
    this.getlogs()
    console.log('onShow执行结束',e)
  },
  // onUnlad 返回触发
  onUnload:function(e){
    if(this.data.content !== "" ){
    console.log('onUnload执行',e)
    const forid = wx.getStorageSync("forid")
    wx.showToast({
      title: '笔记保存成功',
      icon: 'success',
      duration: 2000
    }),
 
    wx.cloud.callFunction({
      name:'updatenotepad',
      data:{
        _id:forid,

        content:this.data.content,
        date:Date.now()
      }
    })
    }else if(this.data.title !== "" ){
      console.log('onUnload执行',e)
    const forid = wx.getStorageSync("forid")
    wx.showToast({
      title: '笔记保存成功',
      icon: 'success',
      duration: 2000
    }),

    wx.cloud.callFunction({
      name:'updatenotepad',
      data:{
        _id:forid,
        title:this.data.title,
        date:Date.now()
      }
    })
    }else if(this.data.title !== "" && this.data.content !== ""){
      console.log('onUnload执行',e)
    const forid = wx.getStorageSync("forid")
    wx.showToast({
      title: '笔记保存成功',
      icon: 'success',
      duration: 2000
    }),

    wx.cloud.callFunction({
      name:'updatenotepad',
      data:{
        _id:forid,
        title:this.data.title,
        content:this.data.content,
        date:Date.now()
      }
    })}
    else{
      wx.showToast({
        title: '未修改笔记',
        icon: 'none',
        duration: 2000
      })
    }
  },

  getlogs: function (e) {
    // 获取缓存信息
    
    const forid = wx.getStorageSync("forid")
    const that = this 
    wx.cloud.callFunction({
      name:'querynotepad',
      // 上传
      data: {
        _id:forid
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
      console.log('getlogs结束',e)
   }
})

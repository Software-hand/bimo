Page({
  data: {
    // 内容
    listdata:'',
    // 用户openid
    openid:'',
    //
    list:[]
  },

  addlist: function(e) {
    console.log("失去焦点",e)
  },

  // 保存待办事项
  add1: function(e){
    this.setData({
      listdata:e.detail.value
    })
    console.log("保存 listdata:",this.data.listdata)
  },
  onShow:function(e){
    this.getlogs()
  },
  onUnload:function(e){
    if(this.data.listdata !== ""){
    // 保存提示
    const forid = wx.getStorageSync("forid")
    wx.showToast({
      title: '笔记保存成功',
      icon: 'success',
      duration: 2000
    })

    wx.cloud.callFunction({
      name:'updatelist',
      data:{
        _id:forid,
        listdata:this.data.listdata,
        date:Date.now()
      },
      success:res=>{
        console.log("上传成功",res)
      },
      fail:res=>{
        console.log("上传失败:",res)
      }
    })
        
    }else{
      console.log(this.data.content)
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
      name:'querylist',
      // 上传
      data: {
        _id:forid
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
})

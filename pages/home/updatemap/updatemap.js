Page({
  data: {
    // 标题
    address:'',
    // 内容
    desc:'',
    // 用户openid
    openid:'',
    map:[]
  
  },

  
  // 保存标题
  add1: function(e){
    this.setData({
      address:e.detail.value
    })
    console.log("标题:",this.data.address)
  },
   
  // 保存内容
  add2: function(e){
    this.setData({
      desc:e.detail.value
    })
    console.log("内容:",this.data.desc)
  },

  // onLoad 首次加载页面执行
  // onShow 每次切换页面执行
  onShow:function(e){
    this.getlogs()
    console.log('onShow执行结束',e)
  },
  // onUnlad 返回触发
  onUnload:function(e){
    if(this.data.address !== "" && this.data.desc !== ""){
    console.log('onUnload执行',e)
    const forid = wx.getStorageSync("forid")
    wx.showToast({
      address: '笔记保存成功',
      icon: 'success',
      duration: 2000
    }),
 
    wx.cloud.callFunction({
      name:'updatemap',
      data:{
        _id:forid,
        address:this.data.address,
        desc:this.data.desc,
        date:Date.now()
      }
    })
    }else if(this.data.address !== "" ){
      console.log('onUnload执行',e)
    const forid = wx.getStorageSync("forid")
    wx.showToast({
      address: '笔记保存成功',
      icon: 'success',
      duration: 2000
    }),

    wx.cloud.callFunction({
      name:'updatemap',
      data:{
        _id:forid,
        address:this.data.address,
        date:Date.now()
      }
    })
    }else if(this.data.desc !== ""){
      console.log('onUnload执行',e)
    const forid = wx.getStorageSync("forid")
    wx.showToast({
      address: '笔记保存成功',
      icon: 'success',
      duration: 2000
    }),

    wx.cloud.callFunction({
      name:'updatemap',
      data:{
        _id:forid,
        desc:this.data.desc,
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
      name:'querymap',
      // 上传
      data: {
        _id:forid
      },
      // 下传
      success:res=>{
        that.setData({
          map:res.result.data
        })
        },
      fail:res=>{
        console.log("res获取失败",res)
        }
      })
      console.log('getlogs结束',e)
   }
})

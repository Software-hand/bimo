Page({
  data: {
    // 标题
    title:'',
    // 内容
    content:'',
    // 用户openid
    openid:''
  },

  addtitle: function(e) {
    console.log("失去焦点",e)
  },

  addcontent: function(e){
    console.log("失去焦点",e)
  },
  
  // 保存标题
  add1: function(e){
    this.setData({
      title:e.detail.value
    })
    console.log(this.data.title)
  },
  
  // 保存内容
  add2: function(e){
    this.setData({
      content:e.detail.value
    })
    console.log(this.data.content)
  },

  // onLoad 首次加载页面执行
  // onShow 每次切换页面执行
  // onUnlad 返回触发
  onUnload:function(e){
    const that = this
    console.log("返回触发")
    // title content 其中存在数据 保存
    wx.cloud.callFunction({
      name:'msgcheck',
      data:{
        content:that.data.content+that.data.title
      }
    }).then(ckres=>{
      console.log("审核不通过ckres",ckres)
    //写审核通过之后的操作 if == 0
      if (ckres.result.errCode == 0 ||ckres.result.errCode == 44004  ){
        if(this.data.content !== "" | this.data.title !== ""){
          // 保存提示
          console.log("标题",this.data.title)
          console.log("内容",this.data.content)
    
          wx.showToast({
            title: '笔记保存成功',
            icon: 'success',
            duration: 2000
          })
    
          // 获取用户openid
          wx.cloud.callFunction({
            // 云函数名
            name:"login",
            // 云函数成功发出请求
            success:res=>{
              console.log("login:云函数调用成功")
              this.setData({
                openid:res.result.openid,
              })
              console.log("openid:",this.data.openid)
    
              // 保存数据到云数据库
              console.log("标题",this.data.title)
              console.log("内容",this.data.content)
            
              wx.cloud.callFunction({
                name:'createnotepad',
                data:{ 
                  title:this.data.title,
                  content:this.data.content,
                  openid:this.data.openid,
                  date:Date.now()
                },
              })
              // wx.switchTab({
              //   url:"../../pages/file/file"
              // })
            },
            // 云函数失败发出请求
            fail:res=>{
              console.log("login:云函数调用失败")
            }
          })
    
          
        }else{
          console.log(this.data.content)
          wx.showToast({
            title: '已舍弃空白笔记',
            icon: 'none',
            duration: 2000
          })
    
          // wx.switchTab({
          //   url:"../../pages/file/file"
          // })
        }
      }else{
        // wx.hideLoading();
        wx.showModal({
          title: '提醒',
          content: '请注意言论,保存失败',
          showCancel:false
        })
      }
    })
    
     
  }

})

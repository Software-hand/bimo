Page({
  data: {
    // 内容
    listdata:'',
    // 用户openid
    openid:'',
    // 审核
    errCode:'',
    // 审核信息
    errMsg:''
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
  
  onUnload:function(e){
    const that = this
    console.log("listdata:",that.data.listdata)
    wx.cloud.callFunction({
      name:'msgcheck',
      data:{  
        content:that.data.listdata
      } 
    }).then(ckres=>{ 
      console.log("审核不通过ckres",ckres)
    //写审核通过之后的操作 if == 0
      if (ckres.result.errCode == 0 ||ckres.result.errCode == 44004 ){
        wx.cloud.callFunction({
          name: 'msgcheck',
          data: {
            content : that.data.listdata
          },
          success(res) {
            console.log("审核通过res",res)
          }
        })
        if(this.data.listdata !== ""){
          // 保存提示
          // console.log("判断存在:listdata",this.data.title)
          // console.log("内容",this.data.content)
    
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
              
              this.setData({
                openid:res.result.openid,
              })
              console.log("login.openid:",this.data.openid)
     
              wx.cloud.callFunction({
                name:'createlist',
                data:{
                  openid:this.data.openid,
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

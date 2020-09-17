// pages/sort/sort.js

const DB=wx.cloud.database().collection("test")
let name = ""
let age = ""
let id = ""
Page({
 
 
  // 获取输入名字
  addName(e){
      name = e.detail.value
  },
  // 获取输入年龄
  addAge(e){
      age = e.detail.value
  },

  // 获取ID
  getId(e){
    id = e.detail.value
  },
 
  // 1 添加数据
  addData() {
    DB.add( {
      data:{
        name:name,
        age:age
      },
      success(res) {
        console.log("添加成功",res)
    },
      fail(res) {
       console.log("添加失败",res)
    }
    })
  },
  // 2 查询数据
  getData() {
    DB.get({
      success(res) {
        console.log("查询数据成功",res)
    },
    })
  },
  // 3 删除数据 
  delData(){
    DB.doc(id).remove({
      success(res) {
        console.log("删除成功",res)
    },
      fail(res) {
       console.log("删除失败",res)
    }
    })
  },

  // 4.1 修改 名字
  updateName(){
    DB.doc(id).update({
      data: {
        name:name
      },
      success(res) {
        console.log("更改名字成功",res)
    },
      fail(res) {
       console.log("更改名字失败",res)
    }
    })
  },
  // 4.2 修改年龄
  updateAge(){
    DB.doc(id).update({
      data: {
        age:age
      },
      success(res) {
        console.log("更改年龄成功",res)
    },
      fail(res) {
       console.log("更改年龄失败",res)
    }
    })
  }


})
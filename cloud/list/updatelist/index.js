// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 try{
  return await db.collection("list").doc(event._id).update({
    // data 传入需要局部更新的数据
    data: {
      listdata:event.listdata,
      date:event.date,
    },
    success: function(res) {
      console.log(res.data)
    }
  })
 }catch(e){
  console.log(e)
 }
}
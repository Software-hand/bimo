// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

 try{
    return await db.collection("notepad").doc(event._id).remove()
 }catch(e){
   console.log(e)
 }
//  delData(){
//   DB.doc(id).remove({
//     success(res) {
//       console.log("删除成功",res)
//   },
//     fail(res) {
//      console.log("删除失败",res)
//   }
//   })
// },
}
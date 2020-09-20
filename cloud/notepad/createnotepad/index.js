// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 try{
    return await db.collection("notepad").add({
      // 使用云函数 形参 实参 要相同
      data:{
        title:event.title,
        content:event.content,
        openid:event.openid,
        date:event.date,
      }
    })
 }catch(e){
   console.log(e)
 }
}
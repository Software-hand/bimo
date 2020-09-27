// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 try{
    return await db.collection("map").add({
      // 使用云函数 形参 实参 要相同
      data:{
        address:event.address,
        desc:event.desc,
        openid:event.openid,
        date:event.date,
      }
    })
 }catch(e){
   console.log(e)
 }
}
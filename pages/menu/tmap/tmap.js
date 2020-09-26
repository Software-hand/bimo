let plugin = requirePlugin('routePlan');
let key = 'XBDBZ-OOC6X-SQ64X-ZJHNN-EV7CS-UUBFM';  //使用在腾讯位置服务申请的key
let referer = '笔墨记录';   //调用插件的app的名称
let endPoint = JSON.stringify({  //终点
  'name': '泸州客运中心站',
  'latitude': 28.917372,
  'longitude': 105.414558
});
let mode = 'walking' ;   // 默认不步行
// let endPoint = '';  + '&endPoint='  + endPoint
Page({
  // 接下来触发
  onLoad:function(e){
    wx.switchTab({
      url:"/pages/menu/menu"
    })
  },
  // 首先触发
  onShow:function(e){
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&mode=' + mode
    })
  }
})

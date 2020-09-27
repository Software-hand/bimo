// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../../libs/bmap-wx.js'); 
var wxMarkerData = []; 
Page({ 
    data: { 
        markers: [], 
        latitude: '', 
        longitude: '', 
        rgcData: {} ,
        // 显示保存按钮
        show:"",
        address: '',
        desc: '',
         // 用户openid
        openid:''

    }, 
    // 保存地址文本
    setmap:function(e){
        console.log(this.data.rgcData)
        this.setData({
            address :this.data.rgcData.address,
            desc:this.data.rgcData.desc
        })
        wx.cloud.callFunction({
            // 云函数名
        name:"login",
        // 云函数成功发出请求
        success:res=>{
          this.setData({
            openid:res.result.openid,
          })
          wx.cloud.callFunction({
            name:'map',
            data:{
                address : this.data.address,
                desc : this.data.desc,
                openid : this.data.openid,
                date:Date.now()
            },
          })
          wx.showToast({
            title: '保存当前地址成功',
            icon: 'none',
            duration: 2000
          })
        },
        fail:res=>{
          console.log("login:云函数调用失败")
        }
        })
        
    },
    // 刷新
    refresh:function(){
        this.onLoad(),
        this.setData({
            show:1
        })
    },
    makertap: function(e) { 
        var that = this; 
        var id = e.markerId; 
        that.showSearchInfo(wxMarkerData, id); 
    }, 
    onLoad: function() { 
        var that = this; 
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({ 
            ak: 'cjbWp9jDRp6Vul58yvWX4h6PoG9rUzlH' 
        }); 
        var fail = function(data) { 
            console.log(data) 
        }; 
        var success = function(data) { 
            wxMarkerData = data.wxMarkerData; 
            that.setData({ 
                markers: wxMarkerData 
            }); 
            that.setData({ 
                latitude: wxMarkerData[0].latitude 
            }); 
            that.setData({ 
                longitude: wxMarkerData[0].longitude 
            }); 
        } 
        // 发起regeocoding检索请求 
        BMap.regeocoding({ 
            fail: fail, 
            success: success, 
            iconPath: '../../../icon-img/marker_red.png', 
            iconTapPath: '../../../icon-img/marker_red.png' 
        }); 
    }, 
    showSearchInfo: function(data, i) { 
        var that = this; 
        that.setData({ 
            rgcData: { 
                address: '地址：' + data[i].address + '\n', 
                desc: '描述：' + data[i].desc + '\n', 
                // business: '商圈：' + data[i].business 
            } 
        })
        
        console.log('地图信息',that.data)
        ; 
        this.showSearchInfo()
    } 

})
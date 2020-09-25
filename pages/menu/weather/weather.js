// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../../libs/bmap-wx.js'); 
Page({
    data:{
      ak:"cjbWp9jDRp6Vul58yvWX4h6PoG9rUzlH",
      weatherData:'',
    //   futureWeather:[]
    },
    onShow:function(options){
      var that = this;
      // 新建bmap对象 
      var BMap = new bmap.BMapWX({ 
          ak: that.data.ak 
      }); 
      var fail = function(data) { 
          console.log(data);
      }; 
      var success = function(data) { 
            console.log("data",data);
            console.log("日期:",data.originalData.date)
            var weatherData = data.currentWeather[0]; 
            // 获取未来天气
            // var futureWeather = data.originalData.results[0].weather_data;
            //   console.log(futureWeather);  'PM2.5：' + weatherData.pm25 + '\n' 
          weatherData = '城市：' + weatherData.currentCity + '\n' + '日期：' + data.originalData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n'; 
          that.setData({ 
            weatherData: weatherData,
            // futureWeather: futureWeather
          }); 
      } 
          
          // 发起weather请求 
          BMap.weather({ 
              fail: fail, 
              success: success 
          }); 
    }
    
  })
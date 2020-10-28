const config = { 
  name: '笔墨天气', 
  version: '1.0', 
  versionInfo: '天气每30分钟更新', 
  request: { 
    host: 'https://ali-weather.showapi.com', 
    header: { 'Authorization': 'APPCODE ' + '8cf45926512c407a947ff7d400fc8988' }, 
  }, 
} 
// https://github.com/ifaswind/miniprogram-easyweather.git
export default config;
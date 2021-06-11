/* 
  包含应用中所有接口请求函数的模块
*/
import service from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd';

const base_URL = ''
// 登录
export function reqLogin(data) {
  return service.post(base_URL + '/login', data)
}
// jsonp跨域请求天气数据
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    jsonp(url, {}, (err, data) => {
      if (!err && data.desc === 'OK') {
        const weather = data.data.forecast[0]
        resolve({ weather })
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}

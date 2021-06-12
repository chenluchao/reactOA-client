/* 
  包含应用中所有接口请求函数的模块
*/
import service from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd';

const base_URL = '/manage'
// 登录
export function reqLogin(data) {
  return service.post('/login', data)
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
// 获取分类列表数据
export function reqCategory() {
  return service.get(base_URL + '/category/list')
}
// 添加商品分类
export function reqAddCategory(data) {
  return service.post(base_URL + '/category/add', data)
}
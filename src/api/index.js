/* 
  包含应用中所有接口请求函数的模块
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const base_URL = '/manage'
// 登录
export function reqLogin(data) {
  return ajax('/login', data, 'POST')
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
export function reqCategory(data) {
  return ajax(base_URL + '/category/list', data)
}
// 添加商品分类
export function reqAddCategory(data) {
  return ajax(base_URL + '/category/add', data, 'POST')
}
// 更新分类
export function reqUpdateCategory(data) {
  return ajax(base_URL + '/category/update', data, 'POST')
}
// 获取商品分页数据
export function reqProducts(data) {
  return ajax(base_URL + '/product/list', data)
}
// 上架/下架
export function reqUpdateStatus(data) {
  return ajax(base_URL + '/product/updateStatus', data, 'POST')
}
// 搜索商品
export function reqSearchProducts(data) {
  return ajax(base_URL + '/product/search', data)
}
// 删除指定名称的图片
export function reqDeleteImg(data) {
  return ajax('/manage/img/delete', data, 'POST')
}
// 添加商品
export function reqAddProduct(data) {
  return ajax(base_URL + '/product/add', data, 'POST')
}
// 更新商品
export function reqUpdateProduct(data) {
  return ajax(base_URL + '/product/update', data, 'POST')
}
// 获取角色列表
export function reqRoleList() {
  return ajax(base_URL + '/role/list')
}
// 添加角色
export function reqAddRole(data) {
  return ajax(base_URL + '/role/add', data, 'POST')
}
// 更新角色
export function reqUpdateRole(data) {
  return ajax(base_URL + '/role/update', data, 'POST')
}
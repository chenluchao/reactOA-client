/* 
  包含应用中所有接口请求函数的模块
*/
import service from "./ajax";
const base_URL = ''
// 登录
export function reqLogin(data){
  return service.post(base_URL+'/login',data)
}
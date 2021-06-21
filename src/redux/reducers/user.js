/* 
  该文件用于创建一个为组件服务的reducer,reducer本质是一个函数
  reducer函数会接收两个参数；分别是：之前的状态(preState),动作对象(action)
*/
import storageUtils from '../../utils/storageUtils'
import { RECEIVE_USER, RESET_USER, SHOW_ERROR_MSG } from '../constant'

const userInit = storageUtils.getUser()
export default function userReduser(preState = userInit, action) {
  // 从action对象中获取type及data
  const { type, data } = action
  // 根据type决定如何处理数据
  switch (type) {
    case RECEIVE_USER: //存储用户信息
      return data
    case RESET_USER: //删除用户信息
      return {}
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      return { ...preState, errorMsg } // 在原有数据的基础上扩展数据
    default:
      //初始化
      return preState
  }
}

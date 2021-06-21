/* 
  该文件用于汇总多个reducer
*/

// 引入为combineReducers用于汇总reducer
import { combineReducers } from 'redux'

/* 
  引入为每个组件服务的reducer文件
*/

// 引入为user服务的reducer
import user from './user'
// 引入头部title服务的reducer
import title from './title'

export default combineReducers({
  user,
  title,
})

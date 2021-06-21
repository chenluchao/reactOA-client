/* 
  该文件用于专门暴露store对象，整个应用只有一个store对象
*/

// 引入createStore用于创建redux最核心的store
// 引入applyMiddleware（中间件）用于加载插件
import { createStore, applyMiddleware } from 'redux'

// 引入redux-thunk用于支持异步action
import thunk from 'redux-thunk'

// 引入redux-devtools-extension，用于浏览器插件调试
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入汇总后的reducer
import reducer from './reducers'

// 暴露store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

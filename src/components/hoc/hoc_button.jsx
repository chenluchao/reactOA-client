import React from 'react';
import PropTypes from 'prop-types'
// 引入store用于获取store中的数据
import store from '../../redux/store'
/**
 * 校验当前用户是否有功能编码对应的权限
 * @param {string} functionName
 * 参考：https://www.jianshu.com/p/26d605066187
 */
const checkAuth=(functionName)=> {
  const currentUser = store.getState('user').user
  if (functionName) {
    return currentUser.username==='admin';
  } else {
    return false;
  }
}

/**
 * 权限组件封装
 */
export default class AuthWrapper extends React.Component {
  render() {
    return checkAuth(this.props.functionName) && this.props.children;
  }
}

AuthWrapper.propTypes = {
  functionName: PropTypes.string,
  menuId: PropTypes.string,
}
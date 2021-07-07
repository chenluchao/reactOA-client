import React from 'react';
import PropTypes from 'prop-types'

/**
 * 校验当前用户是否有功能编码对应的权限
 * @param {string} functionName
 * 参考：https://www.jianshu.com/p/26d605066187
 */
const checkAuth=(functionName, menuId)=> {
  if (functionName) {
    let functionsList;
    if (localStorage.getItem('user_key')) {
      functionsList = JSON.parse(localStorage.getItem('user_key'))
    } else {
      return false;
    }
    return functionsList.username==='admin';
  } else {
    return false;
  }
}

/**
 * 权限组件封装
 */
export default class AuthWrapper extends React.Component {
  render() {
    return checkAuth(this.props.functionName, this.props.menuId) && this.props.children;
  }
}

AuthWrapper.propTypes = {
  functionName: PropTypes.string,
  menuId: PropTypes.string,
}
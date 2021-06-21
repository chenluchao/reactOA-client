import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import * as Icon from '@ant-design/icons'
import './index.less'
import menuList from '../../config/menuConfig'
import Logo from '../../assets/images/logo.png'
import { saveTitle } from '../../redux/action/title'
const { SubMenu } = Menu

// UI组件
class LeftNav extends Component {
  getMenuListDOM_map = (menuList) => {
    return menuList.map((item) => {
      const icon = React.createElement(Icon[item.icon], {
        style: { fontSize: '16px' },
      })
      if (!item.children) {
        //无二级子路由
        return (
          <Menu.Item key={item.key} icon={icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        //有子路由
        return (
          <SubMenu key={item.key} icon={icon} title={item.title}>
            {this.getMenuListDOM_map(item.children)}
          </SubMenu>
        )
      }
    })
  }
  getMenuListDOM = (menuList) => {
    const currentPath = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      // 如果当前用户有item的访问权限，展示相应的路由
      if (this.hasAuth(item)) {
        const icon = React.createElement(Icon[item.icon], {
          style: { fontSize: '16px' },
        })
        // 判断item是否是当前对应的item
        if (item.key === currentPath || currentPath.indexOf(item.key) === 0) {
          // 更新redux中的headerTitle状态
            this.props.saveTitle(item.title)
        }
        if (!item.children) {
          // 无子路由
          pre.push(
            <Menu.Item key={item.key} icon={icon} onClick={() => this.props.saveTitle(item.title)}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          )
        } else {
          // if解决/product/detail类似三级路由相关nav不展开问题
          if (currentPath.indexOf('/product') > -1) {
            this.openKey = '/products'
          }
          const cItem = item.children.find((cItem) => cItem.key === currentPath)
          if (cItem) {
            this.openKey = item.key
          }
          pre.push(
            <SubMenu key={item.key} icon={icon} title={item.title}>
              {this.getMenuListDOM(item.children)}
            </SubMenu>
          )
        }
      }
      return pre
    }, [])
  }
  setDefaultSelect = () => {
    let path = this.props.location.pathname
    // 解决/product/detail类似三级路由nav不激活问题
    if (path.indexOf('/product') > -1) {
      path = '/product'
    }
    return path
  }
  // 判断当前用户对路由的权限
  hasAuth = (item) => {
    const {user} = this.props
    const { key, isPublic } = item
    const {username} = user
    const {menus} = user.role
    /* 
      1、如果当前是admin
      2、当前item是公开的
      3、当前用户有此item的权限：key有没有在menus中
    */
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      //4、如果当前用户有此item的某个子item的权限
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1)
    }
    return false
  }
  UNSAFE_componentWillMount() {
    this.menuListDOM = this.getMenuListDOM(menuList)
  }
  render() {
    const currentPath = this.setDefaultSelect()
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-logo">
          <img src={Logo} alt="logo" />
          <span>后台管理</span>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[currentPath]}
          defaultOpenKeys={[this.openKey]}
        >
          {this.menuListDOM}
        </Menu>
      </div>
    )
  }
}
// 容器组件
export default connect((state) => ({ user: state.user }), { saveTitle })(
  withRouter(LeftNav)
)

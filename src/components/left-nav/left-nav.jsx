import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  AreaChartOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  ApartmentOutlined,
} from '@ant-design/icons'
import './index.less'
import Logo from '../../assets/images/logo.png'
const { SubMenu } = Menu
export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-logo">
          <img src={Logo} alt="logo" />
          <span>后台管理</span>
        </Link>
        <Menu mode="inline" theme="dark">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
            <Menu.Item key="2">
              <Link to="/category">
                <ApartmentOutlined />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/products">
                <ShoppingOutlined />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to="/user">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SafetyCertificateOutlined />}>
          <Link to="/role">角色管理</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
            <Menu.Item key="6">
              <Link to="/bar">
                <BarChartOutlined />
                <span>柱形图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/line">
                <LineChartOutlined />
                <span>折线图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/pie">
                <PieChartOutlined />
                <span>饼状图</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

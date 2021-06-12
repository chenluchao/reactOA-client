import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'
import {reqWeather} from '../../api'
const { confirm } = Modal
class Header extends Component {
  state = {
    CurrentTime:'',
    WeatherName:'',
    WeatherTemp:''
  }
  // 获取当前路由的名称
  getCurrentTitle = () => {
    let title
    const path = this.props.location.pathname
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find((cItem) => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  showTime = () => {
    this.DateTime = setInterval(() => {
      let CurrentTime = formateDate(Date.now())
      this.setState({
        CurrentTime
      })
    }, 1000)
  }
  getWeather=async (city)=>{
    const {weather} = await reqWeather(city)
    console.log('weather',weather)
    this.setState({
      WeatherName:weather.type,
      WeatherTemp:weather.high+'——'+weather.low
    })
  }
  // 退出登录
  logout=()=>{
    const _this = this
    confirm({
      title: '您是否确认退出登录',
      cancelText:'取消',
      okText:'确认',
      icon: <ExclamationCircleOutlined />,
      content: '退出登录将删除您的登录信息！',
      onOk() {
        memoryUtils.user={}
        storageUtils.removeUser()
        _this.props.history.replace('/login')
      },
      onCancel() {},
    });
  }
  componentDidMount() {
    // 启动定时器实时获取时间
    this.showTime()
    // 获取天气
    this.getWeather('北京')
  }
  componentWillUnmount(){
    // 销毁前清除定时器
    clearInterval(this.DateTime)
  }
  render() {
    const { user } = memoryUtils
    const title = this.getCurrentTitle()
    const {CurrentTime,WeatherName,WeatherTemp} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <Button onClick={this.logout} type="text" danger>退出</Button>
        </div>
        <div className="header-bottom">
          <div className="path-name">{title}</div>
          <div className="weather">
            <span>{CurrentTime}</span>
            <span>{WeatherTemp}</span>
            <span>{WeatherName}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)

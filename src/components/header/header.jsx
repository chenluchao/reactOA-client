import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/action/user'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api'
import LinkButton from '../../components/link-button/link-button'
const { confirm } = Modal

// UI组件
class Header extends Component {
  state = {
    CurrentTime: '',
    WeatherName: '',
    WeatherTemp: '',
  }
  showTime = () => {
    this.DateTime = setInterval(() => {
      let CurrentTime = formateDate(Date.now())
      this.setState({
        CurrentTime,
      })
    }, 1000)
  }
  getWeather = async (city) => {
    const { weather } = await reqWeather(city)
    console.log('weather', weather)
    this.setState({
      WeatherName: weather.type,
      WeatherTemp: weather.high + '——' + weather.low,
    })
  }
  // 退出登录
  logout = () => {
    const _this = this
    confirm({
      title: '您是否确认退出登录',
      cancelText: '取消',
      okText: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '退出登录将删除您的登录信息！',
      onOk() {
        _this.props.logout()
        // _this.props.history.replace('/login')
      },
      onCancel() {},
    })
  }
  componentDidMount() {
    // 启动定时器实时获取时间
    // this.showTime()
    // 获取天气
    this.getWeather('北京')
  }
  componentWillUnmount() {
    // 销毁前清除定时器
    // clearInterval(this.DateTime)
  }
  render() {
    const { title,user } = this.props
    const { CurrentTime, WeatherName, WeatherTemp } = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <LinkButton
            onClick={this.logout}
            type="text"
            danger
            children={'退出'}
          ></LinkButton>
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
// 容器组件
export default connect((state) => ({ title: state.title, user: state.user }), {
  logout,
})(withRouter(Header))

import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './login.less'
// 登录路由组件
import LoginIcon from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import { Redirect } from 'react-router'
export default class Login extends Component {
  onFinish = async (values) => {
    try {
      const { status, data, msg } = await reqLogin(values)
      if (status === 0) {
        message.success('登录成功')
        memoryUtils.user = data
        storageUtils.saveUser(data)
        this.props.history.replace('/')
      } else {
        message.error(msg)
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const {user} = memoryUtils
    if(user._id){
      return <Redirect to='/'/>
    }
    return (
      <div className="LoginPage">
        <div className="header">
          <img src={LoginIcon} alt="" />
          <h1>后台管理系统</h1>
        </div>
        <div className="LoginContent">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            size="large"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名！' },
                { min: 4, message: '至少4位字符' },
                { max: 8, message: '最大8位字符' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              ></Input>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                  pattern: /^[a-zA-Z0-9_]{4,}$/,
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              ></Input>
            </Form.Item>
            <Form.Item className="login-button-box">
              <Button
                size="middle"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

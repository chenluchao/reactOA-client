import React, { Component } from 'react'
import { Spin } from 'antd'
export default class Loading extends Component {
  render() {
    return (
      <div style={{padding:'200px 0',textAlign:'center'}}>
        <Spin tip="加载中..." delay={300} size='large'/>
      </div>
    )
  }
}

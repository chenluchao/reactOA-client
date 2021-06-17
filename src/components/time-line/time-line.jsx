import React, { Component } from 'react'
import { Timeline } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
export default class TimeLineCom extends Component {
  render() {
    return (
      <Timeline mode="alternate">
        <Timeline.Item
          style={{ marginTop: '10px' }}
          dot={<SmileOutlined style={{ fontSize: '16px' }} />}
        >
          后台商品录入流程
        </Timeline.Item>
        <Timeline.Item>
          管理员登录本后台，进入商品栏目添加相关栏目
        </Timeline.Item>
        <Timeline.Item color="green">
          管理员录入栏目成功后，可以添加商品到相应的栏目中去！
        </Timeline.Item>
        <Timeline.Item>
          管理员可以在商品列表中查看已经发布的商品的详细信息
        </Timeline.Item>
        <Timeline.Item>管理员可以对已经发布的商品进行修改操作</Timeline.Item>
        <Timeline.Item>管理员可以对商品进行上架或下架操作！</Timeline.Item>
        <Timeline.Item>
          管理员可以在本后台查看销售情况以及其他一些同级分析
        </Timeline.Item>
        <Timeline.Item>
          管理员可以在本后台查看销售情况以及其他一些同级分析
        </Timeline.Item>
        <Timeline.Item>
          管理员可以在本后台查看销售情况以及其他一些同级分析
        </Timeline.Item>
        <Timeline.Item>
          管理员可以在本后台查看销售情况以及其他一些同级分析
        </Timeline.Item>
      </Timeline>
    )
  }
}

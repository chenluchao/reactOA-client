import React, { Component } from 'react'
import { Card } from 'antd'
import BarCharts from '../../../components/bar/bar'
export default class Bar extends Component {
  render() {
    return (
      <Card title="商场产品引入销售机人流量统计" style={{ width: '100%' }}>
        <div style={{ width: '100%', height: '600px' }}>
          <BarCharts />
        </div>
      </Card>
    )
  }
}

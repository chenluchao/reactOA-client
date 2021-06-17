import React, { Component } from 'react'
import { Card } from 'antd'
import PieCharts from '../../../components/pie/pie'
export default class Pie extends Component {
  render() {
    return (
      <Card title="商场人流量年龄分析" style={{ width: '100%' }}>
        <div style={{width:'100%',height:'600px'}}>
          <PieCharts/>
        </div>
      </Card>
    )
  }
}

import React, { Component } from 'react'
import { Card } from 'antd'
import LineCharts from '../../../components/line/line'
export default class Line extends Component {
  render() {
    return (
      <Card title="商品销售量分析" style={{ width: '100%' }}>
        <div style={{width:'100%',height:'600px'}}>
          <LineCharts/>
        </div>
      </Card>
    )
  }
}

import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import './index.less'

export default class Pie extends Component {
  getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 'bottom',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          center: ['50%', '45%'],
          data: [
            { value: 200, name: '幼龄儿童' },
            { value: 348, name: '少年' },
            { value: 2265, name: '青年' },
            { value: 1453, name: '中年' },
            { value: 897, name: '老年' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
  }
  render() {
    return (
      <Card title="商场人流量年龄分析" style={{ width: '100%' }}>
        <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          style={{ width: '100%', height: '600px' }}
        />
      </Card>
    )
  }
}

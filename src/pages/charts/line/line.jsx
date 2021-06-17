import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts'
import './index.less'

export default class Line extends Component {
  getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
      xAxis: {
        name:'星期',
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
        name:'销售量(单)',
      },
      series: [
        {
          data: [560, 580, 670, 718, 830, 1484, 1782],
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
              color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
              }, {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
              }])
          },
        },
      ],
    }
  }
  render() {
    return (
      <Card title="商品销售量分析" style={{ width: '100%' }}>
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

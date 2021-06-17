import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {
  seriesData = [
    {
      name: '商品进单',
      type: 'bar',
      data: [40, 60, 100, 110, 200, 80, 135, 162, 66, 90, 64, 80],
    },
    {
      name: '商品售出',
      type: 'bar',
      data: [40, 58, 75, 90, 167, 70, 175, 82, 87, 58, 60, 23],
    },
    {
      name: '人流量',
      type: 'line',
      yAxisIndex: 1,
      data: [400, 320, 331, 445, 485, 502, 583, 694, 650, 605, 568, 462],
    },
  ]
  getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      legend: {
        data: ['商品进单', '商品售出', '人流量'],
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '进单',
          min: 0,
          max: 280,
          interval: 40,
          axisLabel: {
            formatter: '{value} 单',
          },
        },
        {
          type: 'value',
          name: '人流量',
          min: 0,
          max: 700,
          interval: 100,
          axisLabel: {
            formatter: '{value} 人',
          },
        },
      ],
      series: this.seriesData,
    }
  }
  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }
}

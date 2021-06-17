import React, { Component } from 'react'
import { Calendar } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/calendar/locale/zh_CN.js'
function onPanelChange(value, mode) {
  console.log(value, mode)
}
export default class CalendarCom extends Component {
  render() {
    return (
      <div>
        <Calendar
          locale={locale}
          fullscreen={false}
          onPanelChange={onPanelChange}
        />
      </div>
    )
  }
}

import React, { Component } from 'react'
import './index.less'
import BarCharts from '../../components/bar/bar'
import PieCharts from '../../components/pie/pie'
import TimeLineCom from '../../components/time-line/time-line'
import CalendarCom from '../../components/calendar/calendar'
import { Scrollbars } from 'react-custom-scrollbars'
export default class Home extends Component {
  render() {
    return (
      <div className="home_page">
        <div className="home_line clear">
          <div className="home_item l">
            <CalendarCom />
          </div>
          <div className="home_item l">
            <BarCharts />
          </div>
        </div>
        <div className="home_line clear">
          <div className="home_item l">
            <PieCharts />
          </div>
          <div className="home_item l">
            <Scrollbars style={{overflowX:'hidden'}} className='scrollbar'>
              <TimeLineCom />
            </Scrollbars>
          </div>
        </div>
      </div>
    )
  }
}

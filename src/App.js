// 应用跟组件
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
export default class App extends Component {
  render() {
    const user = storageUtils.getUser()
    memoryUtils.user= user
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

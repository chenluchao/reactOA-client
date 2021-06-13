import React, { Component,Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductHome from './product-home/product-home'
import ProductDetail from './product-detail/product-detail'
import ProductAddUpdate from './product-addupdate/product-addupdate'
import Loading from '../../../components/loading/loading'
import './index.less'

export default class Products extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/product" component={ProductHome} exact></Route>
          <Route path="/product/detail" component={ProductDetail}></Route>
          <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
          <Redirect to="/product"></Redirect>
        </Switch>
        </Suspense>
      </div>
    )
  }
}

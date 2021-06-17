import React, { Component, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Loading from '../../components/loading/loading'
const Home = lazy(() => import('../home/home'))
const Products = lazy(() => import('../products/product/products'))
const Category = lazy(() => import('../products/category/category'))
const Role = lazy(() => import('../role/role'))
const User = lazy(() => import('../user/user'))
const Bar = lazy(() => import('../charts/bar/bar'))
const Line = lazy(() => import('../charts/line/line'))
const Pie = lazy(() => import('../charts/pie/pie'))

const { Footer, Sider, Content } = Layout
export default class Admin extends Component {
  render() {
    const { user } = memoryUtils
    if (!user._id) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content
            style={{
              backgroundColor: '#fff',
              margin: '20px 20px 0 20px',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Scrollbars autoHide>
              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route path="/home" component={Home}></Route>
                  <Route path="/product" component={Products}></Route>
                  <Route path="/category" component={Category}></Route>
                  <Route path="/role" component={Role}></Route>
                  <Route path="/user" component={User}></Route>
                  <Route path="/charts/bar" component={Bar}></Route>
                  <Route path="/charts/line" component={Line}></Route>
                  <Route path="/charts/pie" component={Pie}></Route>
                  <Redirect to="/home"></Redirect>
                </Switch>
              </Suspense>
            </Scrollbars>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#aaa' }}>
            建议使用Chrom浏览器进行浏览
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

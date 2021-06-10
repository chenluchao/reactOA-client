import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
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
          <Header>Header</Header>
          <Content style={{ backgroundColor: '#fff' }}>Content</Content>
          <Footer style={{ textAlign: 'center', color: '#aaa' }}>
            建议使用Chrom浏览器进行浏览
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

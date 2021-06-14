import React, { Component } from 'react'
import { Select, Card, Form, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'
const { Option } = Select
export default class ProductHome extends Component {
  state = {
    dataSource: [
      {
        _id: '1',
        name: '华硕笔记本电脑',
        message: '轻薄本，I9处理器，1024G固态内存——笔记本中的战斗机',
        price: '7245',
        status: '0',
      },
      {
        _id: '2',
        name: '华为MakeBook14笔记本电脑',
        message:
          '轻薄本，I7处理器，触摸屏，256G固态内存——满满黑科技,您的最佳办公笔记本',
        price: '6540',
        status: '1',
      },
    ], //表格数据
    columns: [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '商品描述',
        dataIndex: 'message',
        key: 'message',
        width: 450,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 150,
        render: (values) => {
          return <span style={{ color: 'red' }}>￥ {values}</span>
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 160,
        render: (status) => {
          return (
            <>
              <Button type='primary' danger={status==='0'?true:false} onClick={()=>this.changeStatus(status)}>{status==='0'?'下架':'上架'}</Button>
              <span style={{ margin: '0 10px',color:status==='0'?'#03ccbb':'#d9363e' }}>{status==='0'?'在售':'已下架'}</span>
            </>
          )
        },
      },
      {
        title: '操作',
        with: 100,
        render: (product) => (
          <span>
            <Button type="link" onClick={() => this.showDetail(product)}>
              详情
            </Button>
            <Button type="link" onClick={() => this.updateProduct(product)} style={{color:'red'}}>
              修改
            </Button>
          </span>
        ),
      },
    ], //表格列数据
  }
  // 点击搜索按钮回调
  dealSearch = (values) => {
    debugger
  }
  // 点击添加按钮回调
  addProtuct = () => {}
  // 上架/下架操作
  changeStatus=(status)=>{
    debugger
  }
  // 点击详情按钮回调
  showDetail=(product)=>{
    debugger
  }
  // 点击修改按钮回调
  updateProduct=(product)=>{
    debugger
  }
  render() {
    const { dataSource, columns } = this.state
    const HeaderLeft = (
      <Form
        name="search"
        layout="inline"
        onFinish={this.dealSearch}
        initialValues={{
          searchType: '0',
        }}
      >
        <Form.Item name="searchType">
          <Select style={{ width: 120 }}>
            <Option value="0">按名称搜索</Option>
            <Option value="1">按描述搜索</Option>
          </Select>
        </Form.Item>
        <Form.Item name="searchInput">
          <Input placeholder="请输入关键词" allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    )
    const extra = (
      <Button type="primary" onClick={this.addProtuct}>
        <PlusOutlined />
        添加商品
      </Button>
    )
    return (
      <Card title={HeaderLeft} extra={extra} style={{ width: '100%' }}>
        <Table
          bordered={true}
          rowKey="_id"
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 6,
          }}
        />
      </Card>
    )
  }
}

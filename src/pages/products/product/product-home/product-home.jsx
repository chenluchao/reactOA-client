import React, { Component } from 'react'
import {
  Select,
  Card,
  Form,
  Input,
  Button,
  Table,
  message,
  Pagination,
  Modal,
} from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import {
  reqProducts,
  reqUpdateStatus,
  reqSearchProducts,
} from '../../../../api'
import './index.less'
const { Option } = Select
const { confirm } = Modal
export default class ProductHome extends Component {
  state = {
    dataSource: [], //表格数据
    columns: [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
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
        render: (status, product) => {
          return (
            <>
              <Button
                type="primary"
                danger={status === 1 ? true : false}
                onClick={() => this.changeStatus(status, product)}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span
                style={{
                  margin: '0 10px',
                  color: status === 1 ? '#03ccbb' : '#d9363e',
                }}
              >
                {status === 1 ? '在售' : '已下架'}
              </span>
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
            <Button
              type="link"
              onClick={() => this.updateProduct(product)}
              style={{ color: 'red' }}
            >
              修改
            </Button>
          </span>
        ),
      },
    ], //表格列数据
    pageNum: 1, //第几页
    pageSize: 6, //单页条数
    total: 0,
    showSearch: false, //搜索视图
    searchType: '0', //搜索类型0-按名称搜索、1-按描述搜索
    searchCon: '', //搜索关键字
    loading:false//表格数据加载状态
  }
  // 点击搜索按钮回调
  dealSearch = (values) => {
    if (values.searchInput) {
      this.setState(
        {
          showSearch: true,
          searchType: values.searchType,
          searchCon: values.searchInput,
        },
        () => {
          this.doSearch()
        }
      )
    } else {
      this.setState(
        {
          pageNum: 1,
          showSearch: false,
        },
        () => {
          this.getProductsData()
        }
      )
    }
  }
  doSearch = async () => {
    this.setState({
      loading:true
    })
    let dist = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    }
    if (this.state.searchType === '0') {
      //0-按名称搜索
      dist.productName = this.state.searchCon
    } else {
      //1-按描述搜索
      dist.productDesc = this.state.searchCon
    }
    let res = await reqSearchProducts(dist)
    this.setState({
      loading:false
    })
    if (res.status === 0) {
      this.setState({
        total: res.data.total,
        dataSource: res.data.list,
      })
    } else {
      message.error('获取数据失败，请稍后重试！')
    }
  }
  // 点击添加按钮回调
  addProtuct = () => {}
  // 上架/下架操作
  changeStatus = (status, product) => {
    let _this = this
    if (status === 1) {
      confirm({
        title: '您确定要下架该商品吗？',
        icon: <ExclamationCircleOutlined />,
        content: (
          <span>
            下架后该商品将会
            <span style={{ color: 'red', fontWeight: 'bold' }}>停止售卖</span>！
          </span>
        ),
        okText: '确定',
        cancelText: '取消',
        onOk() {
          _this.doChangeStatus(status, product)
        },
      })
    } else {
      this.doChangeStatus(status, product)
    }
  }
  // 发起上架/下架请求
  doChangeStatus = async (status, product) => {
    let newStatus = 1
    if (status === 1) {
      newStatus = 0
    }
    let dist = {
      productId: product._id,
      status: newStatus,
    }
    let res = await reqUpdateStatus(dist)
    if (res.status === 0) {
      message.success('状态修改成功！')
      this.getProductsData()
    } else {
      message.error('操作失败，请稍后重试！')
    }
  }
  // 点击详情按钮回调
  showDetail = (product) => {
    debugger
  }
  // 点击修改按钮回调
  updateProduct = (product) => {
    debugger
  }
  getProductsData = async () => {
    this.setState({
      loading:true
    })
    const { pageNum, pageSize } = this.state
    let res = await reqProducts({ pageNum, pageSize })
    this.setState({
      loading:false
    })
    if (res.status === 0) {
      this.setState({
        total: res.data.total,
        dataSource: res.data.list,
      })
    } else {
      message.error('获取商品列表数据失败！')
    }
  }
  // 页码加载
  changePage = (page, pageSize) => {
    this.setState(
      {
        pageNum: page,
      },
      () => {
        if (this.state.showSearch) {
          //搜索状态下
          this.doSearch()
        } else {
          //非搜索状态下
          this.getProductsData()
        }
      }
    )
  }
  componentDidMount() {
    this.getProductsData()
  }
  render() {
    const { dataSource, columns, pageNum, total,loading } = this.state
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
        loading={loading}
          bordered={true}
          rowKey="_id"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        <Pagination
          style={{ float: 'right', marginTop: '20px' }}
          showSizeChanger={false}
          showQuickJumper={false}
          defaultPageSize={6}
          defaultCurrent={1}
          current={pageNum}
          total={total}
          onChange={this.changePage}
        />
      </Card>
    )
  }
}

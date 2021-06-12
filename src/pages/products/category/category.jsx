import React, { Component } from 'react'
import { Card, Table, Button, message, Modal, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/link-button/link-button'
import { reqCategory } from '../../../api'
import './index.less'
export default class Category extends Component {
  state = {
    categoryList: [], //一级分类列表
    columns: [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
        width: 900,
      },
      {
        title: '操作',
        with: 300,
        render: (category) => (
          <span>
            <LinkButton
              type="link"
              onClick={() => this.changeCate(category)}
              children={'修改分类'}
            ></LinkButton>
          </span>
        ),
      },
    ],
    loading: true,
    showModal: false,
    ModalTitle: '',
    inputValue: '',
    modalType: null, //0-添加1-修改
  }
  // 添加分类
  addCategory = () => {
    this.toggleShowModal(true, '添加分类', 0)
  }
  // 修改分类
  changeCate = (category) => {
    this.toggleShowModal(true, '修改分类', 1)
    this.setState({
      inputValue: category.name,
    })
  }
  toggleShowModal = (type, title = '', modalType = null) => {
    this.setState({
      showModal: type,
      ModalTitle: title,
      modalType: modalType,
    })
  }
  // modal确认回调
  handleOk = () => {
    
  }
  // modal取消回调
  handleCancel = () => {
    this.toggleShowModal(false)
    this.setState({
      inputValue: '',
    })
  }
  // 获取分类数据
  getCategoryList = async () => {
    const categoryList = await reqCategory()
    this.setState({
      loading: false,
    })
    if (categoryList.status === 0) {
      this.setState({
        categoryList: categoryList.data,
      })
    } else {
      message.error('获取分类数据失败！')
    }
  }
  componentDidMount() {
    this.getCategoryList()
  }
  render() {
    const {
      categoryList,
      columns,
      loading,
      showModal,
      ModalTitle,
      inputValue,
    } = this.state
    const title = '一级分类列表'
    const extra = (
      <Button type="primary" onClick={this.addCategory}>
        <PlusOutlined />
        <span>添加</span>
      </Button>
    )
    return (
      <>
        <Card title={title} extra={extra}>
          <Table
            loading={loading}
            scroll={{ x: '100%' }}
            rowKey="_id"
            bordered={true}
            dataSource={categoryList}
            columns={columns}
            pagination={{
              pageSize: 6,
            }}
          />
        </Card>
        <Modal
          title={ModalTitle}
          visible={showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>
            <Input value={inputValue} />
          </p>
        </Modal>
      </>
    )
  }
}

import React, { Component } from 'react'
import { Card, Table, Button, message, Modal, Input, Form, Select } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/link-button/link-button'
import { reqCategory, reqUpdateCategory,reqAddCategory } from '../../../api'
const { Option } = Select
export default class Category extends Component {
  state = {
    categoryList: [], //一级分类列表
    childCateList: [],
    columns: [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
        width: '60%',
      },
      {
        title: '操作',
        with: '40%',
        render: (category) => (
          <span>
            <LinkButton
              type="link"
              onClick={() => this.changeCate(category)}
              children={'修改分类'}
            ></LinkButton>
            {this.state.parentId === 0 ? (
              <LinkButton
                type="link"
                onClick={() => this.showCategory(category)}
                children={'查看二级分类'}
              ></LinkButton>
            ) : null}
          </span>
        ),
      },
    ],
    loading: true,
    showModalType: 0, //1-修改弹窗2-添加弹窗
    parentId: 0,
  }
  updateform = React.createRef()
  addform = React.createRef()
  // 查看二级分类
  showCategory = (category) => {
    this.ChildCate = category
    this.setState({
      parentId: category._id,
    })
    this.getCategoryList(category._id)
  }
  // 添加分类
  addCategory = () => {
    this.setState(
      {
        showModalType: 2,
      },
      () => {
        this.addform.current.resetFields()
      }
    )
  }
  // 修改分类
  changeCate = (category) => {
    this.category = category
    this.setState(
      {
        showModalType: 1,
      },
      () => {
        this.updateform.current.resetFields()
      }
    )
  }
  // modal修改目录确认回调
  handleOk = () => {
    this.updateform.current.validateFields().then(async (values) => {
      let dist = {
        categoryId: this.category._id,
        categoryName: values.name,
      }
      let res = await reqUpdateCategory(dist)
      if (res.status === 0) {
        message.success('修改成功！')
        this.getCategoryList(this.state.parentId)
        this.handleCancel()
      } else {
        message.error('修改失败！')
      }
    })
  }
  // modal添加目录确认回调
  handleAddOk=()=>{
    this.addform.current.validateFields().then(async(values)=>{
      let dist = {
        parentId:values.parentId,
        categoryName:values.name
      }
      let res = await reqAddCategory(dist)
      if(res.status===0){
        message.success('添加分类成功！')
        this.getCategoryList(this.state.parentId)
        this.handleCancel()
      }else{
        message.error('添加分类失败！')
      }
    })
  }
  // modal取消回调
  handleCancel = () => {
    this.setState({
      showModalType: 0,
    })
  }
  // 获取分类数据
  getCategoryList = async (parentId = 0) => {
    let dist = {
      parentId,
    }
    const categoryList = await reqCategory(dist)
    this.setState({
      loading: false,
    })
    if (categoryList.status === 0) {
      if (parentId === 0) {
        this.setState({
          categoryList: categoryList.data,
        })
      } else {
        this.setState({
          childCateList: categoryList.data,
        })
      }
    } else {
      message.error('获取分类数据失败！')
    }
  }
  // 返回一级列表
  backCateList = () => {
    this.setState({
      parentId: 0,
    })
    this.getCategoryList(0)
  }
  componentDidMount() {
    this.getCategoryList()
  }
  render() {
    const {
      categoryList,
      columns,
      loading,
      showModalType,
      parentId,
      childCateList,
    } = this.state
    const name = this.category ? this.category.name : ''
    const title =
      parentId === 0 ? (
        '一级分类'
      ) : (
        <span>
          <span onClick={this.backCateList} style={{ cursor: 'pointer' }}>
            一级分类列表
          </span>
          <ArrowRightOutlined style={{ margin: '0 10px' }} />
          <span>{this.ChildCate.name}</span>
        </span>
      )
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
            dataSource={parentId === 0 ? categoryList : childCateList}
            columns={columns}
            pagination={{
              pageSize: 6,
            }}
          />
        </Card>
        <Modal
          title="修改分类"
          visible={showModalType === 1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            ref={this.updateform}
            name="update-category"
            initialValues={{
              name,
            }}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please input your category name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="添加分类"
          visible={showModalType === 2}
          onOk={this.handleAddOk}
          onCancel={this.handleCancel}
        >
          <Form
            ref={this.addform}
            name="add-category"
            initialValues={{
              parentId: '0',
            }}
          >
            <Form.Item
              name="parentId"
              label="上级目录"
              rules={[
                {
                  required: true,
                  message: 'Please input your parent category !',
                },
              ]}
            >
              <Select defaultValue="0" style={{ width: '100%' }}>
                <Option value="0">一级分类</Option>
                {categoryList.map((item) => {
                  return <Option value={item._id}>{item.name}</Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="目录名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your new category name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}

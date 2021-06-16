import React, { Component } from 'react'
import { Card, Form, Input, Button, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategory, reqAddProduct } from '../../../../api'
import UploadImg from './component/upload-img'
import RichTextEditor from './component/rich-text-editor'
import './index.less'
const Item = Form.Item
export default class AddUpdate extends Component {
  state = {
    CascaderOpt: [],
  }
  uploadImg = React.createRef()
  editor = React.createRef()
  pageInfo = '商品添加'
  // 返回列表
  goBack = () => {
    this.props.history.goBack()
  }
  // 请求类别信息
  getCascaderData = async () => {
    let res = await reqCategory()
    if (res.status === 0) {
      let cascArr = res.data
      cascArr.forEach((item) => {
        item.isLeaf = false
      })
      this.setState({
        CascaderOpt: cascArr,
      })
    } else {
      message.error('获取类别信息失败，请稍后重试！')
    }
  }
  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    let res = await reqCategory({ parentId: targetOption._id })
    targetOption.loading = false
    if (res.status === 0) {
      targetOption.children = res.data
      const { CascaderOpt } = this.state
      this.setState({
        CascaderOpt: [...CascaderOpt],
      })
    } else {
      message.error('获取类别信息失败，请稍后重试！')
    }
  }
  // 添加/修改产品信息提交
  onFinish = async (values) => {
    const imgs = this.uploadImg.current.getImgs()
    const detail = this.editor.current.getDetail()
    const { name, desc, price, categoryIds } = values
    let dist = {
      name: name,
      desc: desc,
      price: price,
      imgs: imgs,
      detail: detail,
    }
    if (categoryIds.length === 1) {
      dist.pCategoryId = '0'
      dist.categoryId = categoryIds[0]
    } else {
      dist.pCategoryId = categoryIds[0]
      dist.categoryId = categoryIds[1]
    }
    let res = await reqAddProduct(dist)
    if (res.status === 0) {
      message.success('操作成功！')
    } else {
      message.error('操作失败！')
    }
  }
  UNSAFE_componentWillMount() {
    const product = this.props.location.state
    // 将product强制转换boolean
    this.isUpdate = !!product
    // 保存商品(如果没有, 保存是{})
    this.product = product || {}
  }
  componentDidMount() {
    this.getCascaderData()
  }
  render() {
    const { CascaderOpt } = this.state
    const { isUpdate, product } = this
    const { pCategoryId, categoryId, imgs, detail, name, desc, price } = product
    const CasArr = []
    // 如果是进入修改页面
    if (isUpdate) {
      this.pageInfo = '商品修改'
      if (pCategoryId === '0') {
        // 商品是一级分类下
        CasArr.push(categoryId)
      } else {
        // 商品是二级分类下
        CasArr.push(pCategoryId)
        CasArr.push(categoryId)
      }
      console.log(CasArr)
    }
    const title = (
      <>
        <Button
          style={{ fontSize: '18px' }}
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={this.goBack}
        >
          {this.pageInfo}
        </Button>
      </>
    )
    // 名称 描述 价格 分类 图片 详情
    return (
      <Card title={title} style={{ width: '100%' }}>
        <Form
          name="add-update"
          onFinish={this.onFinish}
          labelCol={{ span: 6 }}
          labelAlign="right"
          initialValues={{
            name: name,
            desc: desc,
            price: price,
            categoryIds: CasArr,
          }}
        >
          <Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: '请输入商品名称！' }]}
            className="half-item"
          >
            <Input />
          </Item>
          <Item label="商品描述" name="desc" className="half-item">
            <Input.TextArea showCount maxLength={150} allowClear />
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[{ required: true, message: '请输入商品价格！' }]}
            className="half-item"
          >
            <Input type="number" prefix="￥" suffix="元" />
          </Item>
          <Item
            label="商品类别"
            name="categoryIds"
            rules={[{ required: true, message: '请选择商品类别！' }]}
            className="half-item"
          >
            <Cascader
              fieldNames={{
                label: 'name',
                value: '_id',
                children: 'children',
              }}
              options={CascaderOpt}
              loadData={this.loadData}
              onChange={this.onChange}
              changeOnSelect
              allowClear
              placeholder="请选择产品类别"
            />
          </Item>
          <Item label="商品图片" className="half-item">
            <UploadImg ref={this.uploadImg} imgs={imgs} />
          </Item>
          <Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.editor} detail={detail}></RichTextEditor>
          </Item>
          <Item className="half-item" style={{ textAlign: 'center' }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '150px' }}
            >
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

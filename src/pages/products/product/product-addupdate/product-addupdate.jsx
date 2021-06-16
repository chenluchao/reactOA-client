import React, { Component } from 'react'
import { Card, Form, Input, Button, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategory } from '../../../../api'
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
  onFinish = (values) => {
    const imgs = this.uploadImg.current.getImgs()
    const detail = this.editor.current.getDetail()
  }
  componentDidMount() {
    this.getCascaderData()
  }
  render() {
    const { CascaderOpt } = this.state
    const title = (
      <>
        <Button
          style={{ fontSize: '18px' }}
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={this.goBack}
        >
          添加商品
        </Button>
      </>
    )
    // 名称 描述 价格 分类 图片 详情
    return (
      <Card title={title} style={{ width: '100%' }}>
        <Form
          name="add-update"
          onFinish={this.onFinish}
          initialValues={{}}
          labelCol={{ span: 6 }}
          labelAlign="right"
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
            name="categoryId"
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
          <Item label="商品图片" name="imgs" className="half-item">
            <UploadImg ref={this.uploadImg} />
          </Item>
          <Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.editor}></RichTextEditor>
          </Item>
          <Item className="half-item" style={{ textAlign: 'center' }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '150px' }}
            >
              添加商品
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

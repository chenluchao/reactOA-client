import React, { Component } from 'react'
import { message, Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqDeleteImg } from '../../../../../api'
import { BASE_IMG_URL } from '../../../../../utils/constants'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default class UploadImg extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }
  handleChange = async ({ file, fileList }) => {
    // console.log(file, file.status, fileList);
    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if (file.status === 'done') {
      const result = file.response // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
      if (result.status === 0) {
        message.success('上传图片成功!')
        const { name, url } = result.data
        // file 和 fileList 最后一个不是同一个对象
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败')
      }
    } else if (file.status === 'removed') {
      // 删除图片
      let dist = {
        name: file.name,
      }
      const result = await reqDeleteImg(dist) // 不能从fileList中删除
      if (result.status === 0) {
        message.success('删除图片成功!')
      } else {
        message.error('删除图片失败!')
      }
    }
    // 在操作(上传/删除)过程中更新fileList状态
    this.setState({ fileList })
  }
  /*
    获取所有已上传图片文件名的数组
   */
  getImgs = () => {
    return this.state.fileList.map((file) => file.name)
  }
  clear = () => {
    // 置空组件数据
    this.setState({
      fileList: [],
    })
  }
  componentDidMount() {
    let fileList = []
    const { imgs } = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: BASE_IMG_URL + img,
      }))
    }
    this.setState({
      fileList,
    })
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传照片</div>
      </div>
    )
    return (
      <div>
        <Upload
          action="/manage/img/upload" /*上传图片的接口地址*/
          accept="image/*" /*只接收图片格式*/
          name="image" /*请求参数名*/
          listType="picture-card" /*卡片样式*/
          fileList={fileList} /*所有已上传图片文件对象的数组*/
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

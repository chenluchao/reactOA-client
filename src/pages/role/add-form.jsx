import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { reqAddRole } from '../../api'
export default class AddForm extends Component {
  addRole = React.createRef()
  handleAddOk = () => {
    this.addRole.current.validateFields().then(async (values) => {
      let dist = {
        roleName: values.roleName,
      }
      let res = await reqAddRole(dist)
      if (res.status === 0) {
        message.success('添加角色成功！')
        this.handleCancel(true)
      } else {
        message.error('添加角色失败！')
      }
    })
  }
  handleCancel = (type = false) => {
    this.addRole.current.resetFields()
    this.props.toggleShow(type)
  }
  render() {
    const { isShow } = this.props
    return (
      <Modal
        title="添加角色"
        visible={isShow}
        onOk={this.handleAddOk}
        onCancel={() => this.handleCancel(false)}
      >
        <Form name="add-role" ref={this.addRole}>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: '请输入角色名称！',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

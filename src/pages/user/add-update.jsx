import React, { Component } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { reqAddUser } from '../../api'
const Item = Form.Item
const { Option } = Select
export default class AddUpdateUser extends Component {
  addUpdateUserRef = React.createRef()
  // 确定按钮
  handleOk = () => {
    this.addUpdateUserRef.current.validateFields().then(async (values) => {
      let res = await reqAddUser(values)
      if(res.status===0){
        message.success('添加用户成功！')
        this.handleCancel(true)
      }else{
        message.error('添加用户失败！')
      }
    })
  }
  // 取消按钮
  handleCancel = (type = false) => {
    this.addUpdateUserRef.current.resetFields()
    this.props.toggleModal(type)
  }
  render() {
    const { showModal, user, roles } = this.props
    const { username, password, phone, email, role } = user
    console.log(roles)
    return (
      <div>
        <Modal
          title={user ? '修改用户' : '添加用户'}
          visible={showModal}
          cancelText="取消"
          okText="确定"
          onOk={this.handleOk}
          onCancel={() => this.handleCancel(false)}
        >
          <Form
            ref={this.addUpdateUserRef}
            name="add-update-user"
            initialValues={{
              username,
              password,
              phone,
              email,
              role,
            }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
          >
            <Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名！' },
                { min: 4, message: '至少4位字符' },
                { max: 8, message: '最大8位字符' },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码！' },
                { min: 4, message: '至少4位字符' },
                { max: 8, message: '最大8位字符' },
              ]}
            >
              <Input type="password" />
            </Item>
            <Item
              label="手机号"
              name="phone"
              rules={[{ required: true, message: '请输入电话' }]}
            >
              <Input />
            </Item>
            <Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: '请输入邮箱' }]}
            >
              <Input />
            </Item>
            <Item
              label="角色"
              name="role_id"
              rules={[{ required: true, message: '请输入邮箱' }]}
            >
              <Select allowClear>
                {roles.map((role) => {
                  return <Option value={role._id} key={role._id}>{role.name}</Option>
                })}
              </Select>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

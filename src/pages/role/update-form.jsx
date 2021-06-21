import React, { Component } from 'react'
import { Modal, Form, Input, message, Tree } from 'antd'
import { reqUpdateRole } from '../../api'
import menuList from '../../config/menuConfig'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/action/user'
class UpdateForm extends Component {
  constructor(props) {
    super(props)
    const { menus } = this.props.role
    this.state = {
      treeData: [],
      checkedKeys: menus,
    }
  }
  updateRole = React.createRef()
  treeRef = React.createRef()
  // 将要挂载获取tree数据
  UNSAFE_componentWillMount() {
    const treeData = [
      {
        title: '平台权限',
        key: 'all',
        children: menuList,
      },
    ]
    this.setState({ treeData })
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { menus } = nextProps.role
    this.setState({
      checkedKeys: menus,
    })
  }
  // 更新角色权限
  handleUpdateOk = () => {
    this.updateRole.current.validateFields().then(async (values) => {
      let dist = this.props.role
      dist.auth_name = this.props.user.username
      dist.menus = this.state.checkedKeys
      let res = await reqUpdateRole(dist)
      if (res.status === 0) {
        // 如果是当前更新的是自己的角色，强制退出
        if (dist._id === this.props.user.role_id) {
          this.props.logout()
          message.warning('当前用户角色权限已更新，请重新登录！')
          // this.props.history.replace('/login')
        } else {
          message.success('设置角色权限成功！')
          this.handleCancel(true)
        }
      } else {
        message.error('设置角色权限失败！')
      }
    })
  }
  // 取消按钮回调
  handleCancel = (type = false) => {
    this.props.toggleShow(type)
  }
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
  }
  render() {
    const { isShow, role } = this.props
    const { treeData, checkedKeys } = this.state
    console.log('当前角色信息', this.props.role)
    console.log('当前权限', checkedKeys)
    return (
      <Modal
        title="设置角色权限"
        visible={isShow}
        onOk={this.handleUpdateOk}
        onCancel={() => this.handleCancel(false)}
      >
        <Form
          name="add-role"
          ref={this.updateRole}
          initialValues={{
            name: role.name,
          }}
        >
          <Form.Item label="角色名称" name="name">
            <Input disabled />
          </Form.Item>
          <Form.Item>
            <Tree
              ref={this.treeRef}
              height={260}
              checkable
              defaultExpandAll={true}
              checkedKeys={checkedKeys}
              onCheck={this.onCheck}
              treeData={treeData}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
// 容器组件
export default connect((state) => ({ user: state.user }), {
  logout,
})(withRouter(UpdateForm))

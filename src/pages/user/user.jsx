import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { reqUsersList, reqDeleteUser } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import AddUpdateUser from './add-update'
const { confirm } = Modal
export default class User extends Component {
  state = {
    dataSource: [],
    roles: [],
    loading: false,
    user: {},
    showModal: false,
  }

  // 展开关闭弹窗
  toggleModal = (type = false) => {
    this.setState((state) => ({ showModal: !state.showModal }))
    if (type) {
      this.getUserList()
    }
  }
  // 根据roles数组生成包含所有角色名的对象（属性名用角色id）
  initRoleName = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    this.roleNames = roleNames
  }
  getUserList = async () => {
    this.setState((state) => ({ loading: true }))
    let res = await reqUsersList()
    this.setState((state) => ({ loading: false }))
    if (res.status === 0) {
      const { users, roles } = res.data
      this.initRoleName(roles)
      this.setState({
        dataSource: users,
        roles,
      })
    } else {
      message.error('获取用户列表数据失败！')
    }
  }
  // 创建用户
  addUser = () => {
    this.setState(
      {
        user: {},
      },
      () => {
        this.toggleModal()
      }
    )
  }
  // 删除用户
  deleteUser = (user) => {
    const _this = this
    confirm({
      title: '您确定要删除该用户吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后该用户的一切信息将不可恢复！',
      okText: '删除',
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      cancelText: '取消',
      async onOk() {
        let dist = {
          userId: user._id,
        }
        const res = await reqDeleteUser(dist)
        if (res.status === 0) {
          message.success(
            <span>
              用户：<b style={{ color: '#ff4d4f' }}>{user.username}</b>已删除！
            </span>
          )
          _this.getUserList()
        } else {
          message.error('删除用户失败！')
        }
      },
    })
  }
  // 修改用户
  updateUser = (user) => {
    this.setState(
      {
        user,
      },
      () => {
        this.toggleModal()
      }
    )
  }
  componentDidMount() {
    this.getUserList()
  }
  render() {
    const title = (
      <Button type="primary" onClick={this.addUser}>
        创建用户
      </Button>
    )
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: formateDate,
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id],
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <Button type="link" onClick={() => this.updateUser(user)}>
              修改
            </Button>
            <Button type="link" onClick={() => this.deleteUser(user)}>
              删除
            </Button>
          </span>
        ),
      },
    ]
    const { dataSource, loading, showModal, user, roles } = this.state
    return (
      <Card title={title}>
        <Table
          loading={loading}
          rowKey="_id"
          bordered={true}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 6,
          }}
        />
        <AddUpdateUser
          showModal={showModal}
          toggleModal={this.toggleModal}
          user={user}
          roles={roles}
        />
      </Card>
    )
  }
}

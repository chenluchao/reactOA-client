import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd'
import { reqRoleList } from '../../api'
import AddRoleForm from './add-form'
import UpdateRoleForm from './update-form'
import { formateDate } from '../../utils/dateUtils'
import './index.less'

export default class Role extends Component {
  state = {
    loading: false,
    dataSource: [],
    role: {}, //选中的角色对象
    showAddRole: false,
    showUpdateRole: false,
  }
  getRoleList = async () => {
    let res = await reqRoleList()
    if (res.status === 0) {
      this.setState({
        dataSource: res.data,
      })
    } else {
      message.error('获取角色列表数据失败！')
    }
  }
  componentDidMount() {
    this.getRoleList()
  }
  clickRow = (role) => {
    return {
      onClick: (event) => {
        this.setState({
          role,
        })
      },
    }
  }
  // 展开/关闭添加角色弹窗
  toggleAddRole = (type = false) => {
    //type-是否刷新列表数据
    const { showAddRole } = this.state
    this.setState({
      showAddRole: !showAddRole,
    })
    if (type) {
      this.getRoleList()
    }
  }
  // 展开/关闭设置角色权限弹窗
  toggleUpdateRole = (type = false) => {
    //type-是否刷新列表数据
    const { showUpdateRole } = this.state
    this.setState({
      showUpdateRole: !showUpdateRole,
    })
    if (type) {
      this.getRoleList()
    }
  }
  render() {
    const { loading, dataSource, role, showAddRole, showUpdateRole } =
      this.state
    const title = (
      <>
        <Button
          type="primary"
          style={{ marginRight: '20px' }}
          onClick={() => this.toggleAddRole(false)}
        >
          添加角色
        </Button>
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.toggleUpdateRole(false)}
        >
          设置角色权限
        </Button>
      </>
    )
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time),
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate,
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ]
    return (
      <Card title={title} style={{ width: '100%' }}>
        <Table
          loading={loading}
          rowKey="_id"
          bordered={true}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 6,
          }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id], //显示选中
          }}
          onRow={this.clickRow}
        />
        <AddRoleForm isShow={showAddRole} toggleShow={this.toggleAddRole} />
        <UpdateRoleForm
          isShow={showUpdateRole}
          toggleShow={this.toggleUpdateRole}
          role={role}
        />
      </Card>
    )
  }
}

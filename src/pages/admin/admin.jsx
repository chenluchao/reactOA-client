import React, { Component } from 'react'
import { Redirect } from 'react-router'
import memoryUtils from '../../utils/memoryUtils'
export default class Admin extends Component {
  render() {
    const {user} = memoryUtils
    if(!user._id){
      return <Redirect to='/login'/>
    }
    return (
      <div>
        欢迎{user.username}
      </div>
    )
  }
}

import store from 'store'

const USER_KEY = 'user_key'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // 保存用户信息
  saveUser(user) {
    store.set(USER_KEY, user)
  },
  // 读取信息
  getUser(){
    return store.get(USER_KEY) || {}
  },
  // 删除信息
  removeUser(){
    store.remove(USER_KEY)
  }
}

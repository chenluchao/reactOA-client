import { RECEIVE_HEADER } from '../constant'

const headerInit = '首页'
export default function headerReducer(preState = headerInit, action) {
  const { type, data } = action
  switch (type) {
    case RECEIVE_HEADER:
      return data
    default:
      return preState
  }
}

import { RECEIVE_HEADER } from '../constant'
/* 
  同步action
*/
//设置header
export const saveTitle = (data) => ({ type: RECEIVE_HEADER, data })

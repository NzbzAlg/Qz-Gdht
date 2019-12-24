import axios from './myjs'
import { Message } from 'element-ui'

export function request(url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      method,
      params: method.toUpperCase() === 'GET' ? data : null,
      data: method.toUpperCase() === 'POST' ? data : null
    }).then(response => {
      let { code, msg, data } = response.data
      if (code === '0') {
        resolve(data)
      } else {
        Message.error(msg)
      }
    })
  })
}
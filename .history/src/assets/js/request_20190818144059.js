import axios from './myjs'
import { Message } from 'element-ui'

export function request(url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    let sing = new Date()
    axios.request({
      url,
      method,
      params: method.toUpperCase() === 'GET' ? data : null,
      data: method.toUpperCase() !== 'GET' ? data : null
    }).then(response => {
      let { code, msg, data } = response.data
      if (code === '0') {
        resolve(data || {})
      } else {
        Message.error(msg)
      }
    }).catch(error => {
      Message.error(error)
    })
  })
}


export function dele(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      method: 'delete',
      data
    }).then(res => {
      let { code, msg } = response.data
      if (code === '0') {
        resolve()
      } else {
        Message.error(msg)
      }
    }).catch(error => {
      Message.error(error)
    })
  })
}


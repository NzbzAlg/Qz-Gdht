import axios from './myjs'

export function request(url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      method,
      params: method.toUpperCase() === 'GET' ? data : null,
      data: method.toUpperCase() === 'POST' ? data : null
    }).then(response => {
      let { code, msg, data } = 
    })
  })
}
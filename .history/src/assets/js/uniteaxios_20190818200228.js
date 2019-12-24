import axios from 'axios'
import utils from './utils'
import * as constants from './AppConstants'
// import * as API from './request'
import querystring from 'querystring'
import { Message } from 'element-ui';
import router from '../../router/index'
var uniteaxios = {}

// let obj = {
//   userName: '111',
//   password: 1234
// }

// API.request('/dsfsj/sdfsd', this.obj).then(res => {

// })

uniteaxios.install = function (Vue) {
  // axios.defaults.baseURL='http://192.168.1.74:8888/'
  // axios.defaults.baseURL='http://47.105.207.228:8875/'
  axios.defaults.baseURL='http://e259o74592.zicp.vip:55758/'
  // axios.defaults.baseURL='http://192.168.1.68:8888/'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  Vue.prototype.$http = axios
  /**
   * 序列化对象为http标准的请求参数
   * @param reqParams 参数对象
   * @return {{}}
   */
  const serializeParams = function (reqParams) {
    let params = {}
    for (let k1 in reqParams) {
      let v1 = reqParams[k1]
      if (Array.isArray(v1)) {
        for (let i = 0; i < v1.length; i++) {
          let v2 = v1[i]
          if (typeof (v2) == 'object') {
            for (let k2 in v2) {
              let v3 = v2[k2]
              if (Array.isArray(v3)) {
                for (let j = 0; j < v3.length; j++) {
                  params[`${k1}[${i}].${k2}[${j}]`] = v3[j]
                }
              } else {
                params[`${k1}[${i}].${k2}`] = v3
              }
            }
          } else {
            params[`${k1}[${i}]`] = v2
          }
        }
      } else if (typeof (v1) == 'object') {
        for (let k2 in v1) {
          let v2 = v1[k2]
          if (Array.isArray(v2)) {
            for (let i = 0; i < v2.length; i++) {
              params[`${k1}.${k2}[${i}]`] = v1[k2][i]
            }
          } else if (typeof (v2) == 'object') {
            for (let k3 in v2) {
              let v3 = v1[k2][k3]
              params[`${k1}.${k2}.${k3}`] = v3
            }
          } else {
            params[`${k1}.${k2}`] = v1[k2]
          }
        }
      } else {
        params[k1] = v1
      }
    }
    return params
  }
  axios.interceptors.request.use(function (config) {
    // config.headers.common[constants.API_TOKEN] = Store.state.token
    // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    config.headers['api_token'] = window.sessionStorage.getItem('token')
    let sign
    if (config.method == 'get') {
      config.params = serializeParams(config.params)      // 序列化请求参数
      config.params['timestamp'] = new Date().getTime()
      sign = utils(config.params)
      if (sign) {
          config.params[constants.PARAM_SIGN_NAME] = sign
      }
  } else if (config.method == 'delete') {
      config.params = config.params || {}
      config.params['timestamp'] = new Date().getTime()
      sign = utils(config.params)
      // console.log(sign)
      config.params[constants.PARAM_SIGN_NAME] = sign
  } else {
      if (config.data instanceof FormData) {
          config.data.append('timestamp', new Date().getTime())
          let sign = utils(utils.formDataToObject(config.data, true))
          config.data.append(constants.PARAM_SIGN_NAME, sign)
          // console.log(sign)
      } else {
          config.data = config.data || {}
          config.data = serializeParams(config.data)  // 序列化请求参数
          config.data['timestamp'] = new Date().getTime()
          sign = utils(config.data)
          config.data[constants.PARAM_SIGN_NAME] = sign
          // console.log(sign)
          config.data = querystring.stringify(config.data)
      }
  }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(function (res) {
    // console.log(resp.data)
      debugger
    if (res.data.code === 2001) {
      Message.error(resp.data.code.message)
      window.sessionStorage.clear();
      window.localStorage.clear();
      router.push('/')
      return res 
    }else {
      return res
    }
    // return res.data
  }, function (error) {
    return Promise.reject(error)
  })
}


export default uniteaxios

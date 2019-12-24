import md5 from 'js-md5';
import * as constants from './AppConstants'
/**
 * API接口参数签名
 * @param  {[Object]} params [请求参数]
 * @return {[String]}        [参数签名字符串]
 */
const getSign = function (params) {
  let paramMap = new Map()
  for (let key in params) {
    if (key == constants.PARAM_SIGN_NAME) {
      continue
    }
    let value = params[key]
    if (value == null || value == undefined) {
      value = ''
      params[key] = ''
    }

    if (value instanceof File) {
      continue
    }

    paramMap.set(key, value)
  }

  if (paramMap.size < 1) {
    return null
  }

  let str = ''

  // 1、排序
  let orderParamMap = new Map([...paramMap.entries()].sort())
  // 2、用&符号拼接
  for (let [key, value] of orderParamMap) {
    str += `${key}=${value}&`
  }
  str += constants.SIGN_SECURITY_KEY  // 最后拼接加密密钥
  // 3、签名
  let sign = md5(str)
  return sign
}
export default getSign
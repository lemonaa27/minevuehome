/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function vaildPhone(phone) {
  const reg = /^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/
  return reg.test(phone)
}

/**
 * @param {string} mobile
 * @returns {Boolean}
 */
export function vaildMobile(mobile) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(mobile)
}
/**
 * @param {string} checkPhone  //电话手机
 * @returns {Boolean}
 */
export function vaildcheckPhone(str) {
  var myrega = /^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/
  var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  return myrega.test(str) || myreg.test(str)
}
/**
 * @param {string} 字母和数字
 * @returns {Boolean}
 */
export function letterNum(num) {
  const reg = /^[0-9a-zA-Z]+$/
  // const reg = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]+$/
  return reg.test(num)
}

/**
 * @param {string} 去除包裹的大括号
 * @returns {Boolean}
 */
export function removeBlock(str) {
  if (str) {
    var reg = /^\{/gi
    var reg2 = /\}$/gi
    str = str.replace(reg, '')
    str = str.replace(reg2, '')
    return str
  } else {
    return str
  }
}

/**
 * @param {string} 密码不少于8位的大小写字母，数字及特殊符号
 * @returns {Boolean}
 */
export function psdNum(num) {
  var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/
  var word = /[\u4e00-\u9fa5]/
  if (!word.test(num) && reg.test(num)) {
    return num
  }
}

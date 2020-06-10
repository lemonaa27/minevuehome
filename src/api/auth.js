
import request from '@/utils/request'

export function register(data){
    return request({
        url:'register',
        method:'post',
        data:data
    })
}
export function login(data) {
    return request({
      url: 'login',
      method: 'post',
      data: data
    })
}
  
export function getInfo(token) {
    return request({
        url: 'user',
        method: 'get'
    })
}
  
export function logout() {
    return request({
        url: 'logout',
        method: 'post'
    })
}
  
export function captcha() {
    return request({
        url: 'captcha',
        method: 'get'
    })
}
  
export function sendEmail(data) {
    return request({
        url: 'sendEmail',
        method: 'post',
        data: data
    })
}
  
export function resetPassword(data) {
    return request({
        url: 'resetPassword',
        method: 'post',
        data: data
    })
}
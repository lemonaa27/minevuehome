import axios from 'axios'
import { Message } from 'element-ui'
import {getToken,setToken,removeToken} from './auth.js'
import router from '@/router'

// Create axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000 // Request timeout
})

service.interceptors.request.use(
    config => {
      const token = getToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // Set JWT token
      }
  
      return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
      if (response.headers.authorization) {
        setToken(response.headers.authorization)
        response.data.token = response.headers.authorization
      }
      if (response.data.error === 'Unauthorized') {
        removeToken()
        router.push({ path: '/login' })
      }
      return response
    },
    error => {
      let message = error.message
      if (error.response.data && error.response.data.errors) {
        var mesObj = error.response.data.errors
        var arr = Object.values(mesObj)
        if (arr.length > 0) {
          message = arr[0][0]
        } else {
          message = ''
        }
      } else if (error.response.data && error.response.data.error) {
        message = error.response.data.error
      } else if (error.response.data && error.response.data.message) {
        message = error.response.data.message
      }
  
      Message({
        message: message,
        type: 'error',
        duration: 1000
      })
      return Promise.reject(error)
    },
)
  
export default service
  
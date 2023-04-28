import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8080/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// 请求预处理
service.interceptors.request.use(
  config => {
    // 如果浏览器存储有 Token，在请求的 header 中添加 Token
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // debug 使用
    return Promise.reject(error)
  }
)

// 响应预处理
service.interceptors.response.use(
  response => {
    const code = response.status
    const res = response.data
    if (code !== 200 || !res.success) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err:' + error) // debug 使用
    Message({
      message: error.response.data.msg || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

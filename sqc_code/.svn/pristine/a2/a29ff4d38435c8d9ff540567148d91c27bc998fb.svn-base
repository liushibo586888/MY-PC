import axios from 'axios';
import storejs from 'storejs';
// axios.defaults.baseURL = 'https://test.sqcsqc.com:3080/api'; //测试库
axios.defaults.baseURL = 'http://192.168.1.6:1188/api'; //李炎
// axios.defaults.baseURL = 'https://sf.sqcyouth.com/'; //正式库

axios.interceptors.response.use(function (response) {
  return response.data
}, function (response) {})

axios.interceptors.request.use(function (options) {
  // 登录成功后的所有请求加上access_token
  // if (localStorage.hasOwnProperty(config.TOKEN_KEY)) {
  if (storejs.has('userMessage')) {
    options.headers['Authorization'] = 'Bear ' + storejs.get('userMessage').Token
  }
  return options
}, function (error) {
  return Promise.reject(error)
})
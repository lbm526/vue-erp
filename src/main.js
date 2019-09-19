import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import error from './assets/js/error'
// import jquery from 'jquery'
import './assets/fonts/iconfont.css'
import './assets/css/style.css'
import animate from 'animate.css'
import Vuelidate from 'vuelidate'
// import Qs from 'qs'
// import Echarts from 'echarts'

require('./assets/fonts/iconfont.js')

Vue.prototype.axios = axios

Vue.use(Element)
Vue.use(animate)
Vue.use(Vuelidate)

Vue.prototype.error = new error()

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示
// http request 请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 每个账号的token根据_id(用户id)区分，所以要传_id
  let pathname = location.pathname;
  let user = JSON.parse(sessionStorage.getItem('userInfo'));

  // 用户信息是否存在（登录）
  if (user) {
    console.log(pathname)
    if (pathname != '/' && pathname != '/login') {
      // 所有请求附加token，验证要用
      config.headers.Authorization = user.accent_token;
      // 判断是get请求还是post
      // 前端axios两种请求传参不一样
      if (config.method == 'post') {
        config.data['party_id'] = user._id
      } else if (config.method == 'get') {
        // 判断请求时是否有填写params
        // 没有则补全
        if (config.params) {
          config.params['party_id'] = user._id
        } else {
          config['params'] = { party_id: user._id }
        }
      }
    }
  }
  return config;
}, err => {
  // 对请求错误做些什么
  return Promise.reject(err);
});

axios.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response) {
    switch (err.response.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 403:
        sessionStorage.removeItem('userInfo');
        router.replace({
          path: '/'
          //登录成功后跳入浏览的当前页面
          // query: {redirect: router.currentRoute.fullPath}
        })
        break
      case 503:
          Element.Message({
          type: 'error',
          message: '登录超时'
        })
    }
    // 返回接口返回的错误信息
    return Promise.reject(err);
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

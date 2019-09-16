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

// axios.defaults.transformRequest = [function (data, config) {
//   if (!config['Content-Type']) return Qs.stringify(data)
//   switch (config['Content-Type'].toLowerCase()) {
//     case 'application/json':
//       return JSON.stringify(data)
//     case 'multipart/form-data':
//       return data
//     default:
//       return Qs.stringify(data)
//   }
// }]
// Vue.prototype.$ = jquery
// Vue.prototype.echarts = Echarts 
Vue.use(Element)
Vue.use(animate)
Vue.use(Vuelidate)

Vue.prototype.error = new error()

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

/**
 * 实例请求拦截函数
 * @param  {Object} config 请求配置信息
 * @return {Object | Promise}        请求配置信息或错误信息
 */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

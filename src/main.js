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
let API_array = [];
window.isRefreshing = false;
// 刷新token请求函数
function refreshToken() {
    return axios.post('/api/token/refreshToken')
}

/*将所有的请求都push到数组中,其实数组是[function(token){}, function(token){},...]*/
function subscribeTokenRefresh(cb) {
    API_array.push(cb);
}
/*数组中的请求得到新的token之后自执行，用新的token去请求数据*/
function onRrefreshed(token) {
    API_array.map(cb => cb(token));
    window.isRefreshing = false;
}
axios.interceptors.request.use(config => {
    // 每个账号的token根据_id(用户id)区分，所以要传_id
    // 用户信息是否存在（登录）
    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    if (user) {
        config.headers.Authorization = user.accent_token;
        // 判断是get请求还是post
        // 前端axios两种请求传参不一样
        // if (config.method == 'post') {
        //     if (config.data) {
        //         config.data['party_id'] = user._id
        //     } else {
        //         config['data'] = { party_id: user._id }
        //     }
        // } else if (config.method == 'get') {
        //     // 判断请求时是否有填写params
        //     // 没有则补全
        //     if (config.params) {
        //         config.params['party_id'] = user._id
        //     } else {
        //         config['params'] = { party_id: user._id }
        //     }
        // }

    }
    console.log('aaaa',config)
    return config
}, err => {
    // 对请求错误做些什么
    return Promise.reject(err);
});

axios.interceptors.response.use(res => {
    console.log(res)
    return res;
}, err => {
    if (err.response) {
        switch (err.response.status) {
            // 返回401，清除token信息并跳转到登录页面
            case 401:
                // 验证refreshToken失败，重新登陆
                // sessionStorage.removeItem('userInfo');
                // router.replace({
                //     path: '/',
                //     //登录成功后跳入浏览的当前页面
                //     // query: { redirect: router.currentRoute.fullPath }
                // })
                break
            case 403:
                sessionStorage.removeItem('userInfo');
                router.replace({
                    path: '/',
                    //登录成功后跳入浏览的当前页面
                    // query: { redirect: router.currentRoute.fullPath }
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
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import navBar from './components/navBar'
import login from './views/login'
// import homePage from './components/homePage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    // 路由不存在时，跳转到主页面
    path: '*',
    redirect: '/'
  }, {
    path: '/',
    component: login
  }, {
    path: '/Home',
    component: Home,
    children: [{
      path: '/navBar',
      component: navBar
    },
    {
      path: '/homePage',
      component: () => import('./components/homePage.vue')
    },
    {
      path: '/materialHome',
      component: () => import('./components/materialHome.vue')
    },
    {
      path: '/materialPage',
      component: () => import('./components/materialPage.vue')
    },
    {
      path: '/materialChar',
      component: () => import('./components/materialChar.vue')
    },
    {
      path: '/produceList',
      component: () => import('./components/produceList.vue')
    },
    {
      path: '/addMaterial',
      component: () => import('./components/addMaterial.vue')
    },
    {
      path: '/purchase',
      component: () => import('./components/purchase.vue')
    },
    {
      path: '/produceList/addProduce',
      component: () => import('./components/addProduce.vue')
    },
    {
      path: '/produceSituation',
      component: () => import('./components/produceSituation.vue')
    },
    {
      path: '/orderManage',
      component: () => import('./components/orderManage.vue')
    },
    {
      path: '/stockManage',
      component: () => import('./components/stockManage.vue')
    },
    {
      path: '/incomeAndPay',
      component: () => import('./components/incomeAndPay.vue')
    },
    {
      path: '/userManage',
      component: () => import('./components/userManage.vue')
    },
    {
      path: '/producePutaway',
      component: () => import('./components/producePutaway.vue')
    },
    {
      path: '/incomeModlu',
      component: () => import('./components/incomeModlu.vue')
    },
    {
      path: '/payModlu',
      component: () => import('./components/payModlu.vue')
    },
    {
      path: '/roleManage',
      component: () => import('./components/roleManage.vue')
    },
    {
      path: '/consignmentManage',
      component: () => import('./components/consignmentManage.vue')
    },
    {
      path: '/customerManage',
      component: () => import('./components/customerManage.vue')
    },
    {
      path: '/addUserManage',
      component: () => import('./components/addUserManage.vue')
    },
    {
      path: '/editUserInfo',
      component: () => import('./components/editUserInfo.vue')
    },
    {
      path: '/addIncome',
      component: () => import('./components/addIncome.vue')
    },
    {
      path: '/editIncome',
      component: () => import('./components/editIncome.vue')
    },
    {
      path: '/addPayInfo',
      component: () => import('./components/addPayInfo.vue')
    },
    {
      path: '/editPayInfo',
      component: () => import('./components/editPayInfo.vue')
    },
    {
      path: '/editProduce',
      component: () => import('./components/editProduce.vue')
    },
    {
      path: '/editMaterial',
      component: () => import('./components/editMaterial.vue')
    },
    {
      path: '/materialStore',
      component: () => import('./components/materialStore.vue')
    }
    ]
  }]
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    changeWidth: true,
    userInfo: {
      userName: 'MR.L',
      email: '981964763@qq.com',
      phone: 15600000001,
      roleId: 1,
      roleName: '超级管理员',
      token: '',
      refreshToken: ''
    },
    echartsColor: [
      '#22c3aa',
      '#96dee8',
      '#7bd9a5',
      '#4ea397',
      '#118BD8',
      '#4dc6e3',
      '#FFCC99',
      '#339ca8',
      '#c1d643',
      '#66CC66',
      '#a8ffbb',
      '#93b7e3',
      '#53CCCC',
      '#FFCCFF',
      '#99CC99',
      '#CCFF99'
    ]
  },
  getters: {
    contentWidth: (state) => {
      return state.isCollapse
    }
  },
  mutations: {
    flexibleMenu: (state) => {
      state.isCollapse = !state.isCollapse
      state.changeWidth = !state.changeWidth
    }
  },
  actions: {
    flexibleMenu: (context, payload) => {
      context.commit('flexibleMenu')
    }
  }
})

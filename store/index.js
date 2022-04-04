import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		isLogin:false,
		email:''
  },
  mutations: {
    setisLogin(state, value) {
      state.isLogin = value;
    },
    setemail(state, value) {
      state.email = value;
    }
  },
  actions: {

  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import userInfo from './userInfo.js'
Vue.use(Vuex)
const store=new Vuex.Store({
	modules:{
		cart,
		userInfo
	}
})
export default store
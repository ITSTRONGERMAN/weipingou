import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import address from './address.js'
Vue.use(Vuex)
const store=new Vuex.Store({
	modules:{
		cart,
		address
	}
})
export default store
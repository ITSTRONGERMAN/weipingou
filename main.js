import App from './App'
import store from 'store/store.js'
import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
uni.$showMsg = (title='数据请求失败', duration = 1500) => {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
$http.beforeRequest = (option) => {
	uni.showLoading({
		title: '数据加载中',
	})
	if(option.url.indexOf('/my/')!==-1){
		option.header={
			Authorization:store.state.userInfo.token
		}
	}
}
$http.afterRequest = () => {
	uni.hideLoading()
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

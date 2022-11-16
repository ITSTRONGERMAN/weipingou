export default {
	namespaced:true,
	state:{
		address:JSON.parse(uni.getStorageSync('address')||'{}')
	},
	mutations:{
		addAddress(state,address){
			state.address=address
			this.commit('address/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	getters:{
		addressInfo(state){
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfoNew
		}
	}
}
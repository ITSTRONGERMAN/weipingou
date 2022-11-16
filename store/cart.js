export default{
	namespaced:true,
	state:{
		cartList:JSON.parse(uni.getStorageSync('cartList')||'[]')
	},
	mutations:{
		addCart(state,goods){
			const findResult=state.cartList.find(c=>c.goods_id===goods.goods_id)
			if(!findResult){
				state.cartList.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cartList',JSON.stringify(state.cartList))
		},
		uppdateGoodsState(state,{goods_id,goods_state}){
			const findResult=state.cartList.find(c=>c.goods_id===goods_id)
			if(findResult){
				findResult.goods_state=goods_state
				this.commit('cart/saveToStorage')
			}
		},
		updateGoodsCount(state,{goods_id,goods_count}){
			const findResult=state.cartList.find(c=>c.goods_id===goods_id)
			if(findResult){
				findResult.goods_count=goods_count
				this.commit('cart/saveToStorage')
			}
		},
		deleteGoodsCart(state,goods_id){
			state.cartList=state.cartList.filter(c=>c.goods_id!==goods_id)
			this.commit('cart/saveToStorage')
		},
		changeCartListGoodsState(state,newState){
			state.cartList.forEach(item=>item.goods_state=newState)
			this.commit('cart/saveToStorage')
		}
	},
	getters:{
		cartCount(state){
			return state.cartList.reduce((count,item)=>count+=item.goods_count,0)
		},
		checkoutCount(state){
			return state.cartList.filter(item=>item.goods_state).reduce((count,item)=>count+=item.goods_count,0)
		},
		totalCost(state){
			return state.cartList.filter(item=>item.goods_state).reduce((cost,item)=>cost+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	},
}
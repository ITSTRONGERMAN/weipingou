<template>
	<view class="settle">
		<label class="radio" @click="checkAll">
			<radio :checked="isCheckAll" color="#c00000"/><text>全选</text>
		</label>
		<view class="amount-box">
			合计：<text class="amount">￥{{totalCost}}</text>
		</view>
		<view class="settle-btn" @click="goToSettle">
			结算({{checkoutCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		computed:{
			...mapGetters('cart',['totalCost','cartCount','checkoutCount']),
			...mapGetters('userInfo',['addressInfo']),
			...mapState({
				token:state=>state.userInfo.token,
				cartList:state=>state.cart.cartList
			}),
			isCheckAll(){
				return this.cartCount===this.checkoutCount
			}
		},
		methods:{
			...mapMutations({
				changeCartListGoodsState:'cart/changeCartListGoodsState'
			}),
			checkAll(){
				this.changeCartListGoodsState(!this.isCheckAll)
			},
			goToSettle(){
				if(!this.checkoutCount){
					return uni.$showMsg('请选择要结算的商品')
				}
				if(!this.addressInfo){
					return uni.$showMsg('请选择收货地址')
				}
				if(!this.token){
					 uni.$showMsg('请先登录')
					 setTimeout(()=>{
						 uni.switchTab({
						 	url:'/pages/my/my'
						 })
					 },1000)
					 return
				}
				this.payOrder()
			},
		async payOrder(){
				const orderInfo={
					order_price:0.01,
					consignee_addr:this.addressInfo,
					goods:this.cartList.filter(x=>x.goods_state).map(x=>({
						goods_id:x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
					}))
				}
			let {data:res}=await uni.$http.post('/my/orders/create',orderInfo)
			console.log(res);
			if(res.meta.status!==200)return uni.$showMsg('结算失败')
			}
		}
	}
</script>

<style lang="less" scoped>
	.settle{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		font-size: 14px;
		padding-left: 5px;
		box-sizing: border-box;
		.radio{
			display: flex;
			align-items: center;
		}
		.amount-box{
			.amount{
				color: #c00000;
				font-weight: bold;
			}
		}
		.settle-btn{
			background-color: #c00000;
			color: #fff;
			height: 50px;
			text-align: center;
			min-width: 100px;
			line-height: 50px;
			padding: 0 10px;
		}
	}
</style>
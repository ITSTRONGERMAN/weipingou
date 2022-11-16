<template>
	<view class="">
		<view class="cart-container" v-if="cartList.length!==0">
			<Address></Address>
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-name">购物车</text>
			</view>
			<uni-swipe-action>
				<uni-swipe-action-item :right-options="options" v-for="item,index in cartList" :key="index" @click='deleteCartItem(item.goods_id)'>
					<CartItem :goods="item" @radioChange="changeRadio" @numChange="numChange"></CartItem>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<Settle></Settle>
		</view>
		<view class="empty-Cart" v-else @click="lookGood">
			<image src="../../static/emptytip.png" class="empty-image"></image>
		</view>
	</view>
</template>

<script>
	import badgeMixIn from '../../mixin/tab-badge.js'
	import CartItem from '../../components/cart/cart_item.vue'
	import Address from '../../components/cart/address.vue'
	import Settle from '../../components/cart/settle.vue'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			}
		},
		watch:{
			cartCount(){
				this.setBadge()
			}
		},
		components: {
			CartItem,
			Address,
			Settle
		},
		mixins: [badgeMixIn],
		computed: {
			...mapState({
				cartList: state => state.cart.cartList
			}),
			...mapGetters('cart',['checkoutCount']),
		},
		methods: {
			...mapMutations({
				uppdateGoodsState: 'cart/uppdateGoodsState',
				updateGoodsCount: 'cart/updateGoodsCount',
				deleteGoodsCart:'cart/deleteGoodsCart'
			}),
			changeRadio(goods) {
				this.uppdateGoodsState(goods)
			},
			numChange(goods) {
				this.updateGoodsCount(goods)
			},
			deleteCartItem(id){
				this.deleteGoodsCart(id)
			},
			lookGood(){
				uni.switchTab({
					url:'/pages/cate/cate'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart-container{
		padding-bottom: 50px;
	}
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-name {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.empty-Cart{
		.empty-image{
			width: 100%;
			height: 1000rpx;
			object-fit: cover;
		}
	}
</style>

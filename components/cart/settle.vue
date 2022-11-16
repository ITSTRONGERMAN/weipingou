<template>
	<view class="settle">
		<label class="radio" @click="checkAll">
			<radio :checked="isCheckAll" color="#c00000"/><text>全选</text>
		</label>
		<view class="amount-box">
			合计：<text class="amount">￥{{totalCost}}</text>
		</view>
		<view class="settle-btn">
			结算({{checkoutCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		computed:{
			...mapGetters('cart',['totalCost','cartCount','checkoutCount']),
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
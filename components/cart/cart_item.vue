<template>
	<view class="goods-item" @click="OnClick">
		<view class="left">
			<radio :checked="goods.goods_state" color="#c00000" @click="radioChange"/><text></text>
			<image :src="goods.goods_small_logo"></image>
		</view>
		<view class="right">
			<text class="txt">{{goods.goods_name}}</text>
		<view class="info">
			<text class="price">￥{{goods.goods_price|formatPrice}}</text>
			<uni-number-box :min="1" :value="goods.goods_count" @change="numChange"></uni-number-box>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['goods'],
		filters:{
			formatPrice(num){
				return num.toFixed(2)
			}
		},
		methods:{
			OnClick(){
				this.$emit('onclick')
			},
			radioChange(){
				this.$emit('radioChange',
				{
				goods_id:this.goods.goods_id,
				goods_state:!this.goods.goods_state,
				goods_count:this.goods.goods_count
				})
			},
			numChange(val){
				this.$emit('numChange',{
					goods_id:this.goods.goods_id,
					goods_count:+val
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods-item{
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		border-bottom: 1px solid #efefef;
		box-sizing: border-box;
		margin-bottom: 5px;
		.left{
			display: flex;
			align-items: center;
			margin-right: 5px;
			image{
			width: 100px;
			height: 100px;
			display: block;
			}
		}
		.right{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			.txt{
				display: -webkit-box;
				-webkit-line-clamp:2;
				-webkit-box-orient: vertical;
				word-break: break-all;
				height: 30px;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 13px;
				padding: 5px 10px;
			}
			.info{
				display: flex;
				justify-content: space-between;
				.price{
					color: #c00000;
				}
			}
		}
	}
</style>
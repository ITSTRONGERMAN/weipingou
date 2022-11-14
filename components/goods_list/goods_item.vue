<template>
	<view class="goods-item" @click="OnClick">
		<view class="left">
			<image :src="imgSrc"></image>
		</view>
		<view class="right">
			<text class="txt">{{txt}}</text>
			<text class="price">￥{{price|formatPrice}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:['imgSrc','txt','price'],
		filters:{
			formatPrice(num){
				return num.toFixed(2)
			}
		},
		methods:{
			OnClick(){
				this.$emit('onclick')
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods-item{
		display: flex;
		margin-bottom: 5px;
		.left{
			width: 100px;
			height: 100px;
			background-color: #efefef;
			margin-right: 5px;
			image{
			width: 100px;
			height: 100px;
			display: block;
			}
		}
		.right{
			display: flex;
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
			.price{
				color: #c00000;
			}
		}
	}
</style>
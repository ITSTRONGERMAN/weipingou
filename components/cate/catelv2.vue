<template>
	<view class="catelv2">
		<view class="catelv2-title">
			/{{title}}/
		</view>
		<view class="catelv3-list">
			<view class="catelv3-box" v-for="item,index in cateLv3List" :key="index" @click="goToGoodsList(item.cat_id)">
				<image :src="item.cat_icon" mode="heightFix"></image>
				<text>{{item.cat_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['title','cateLv3List'],
		methods:{
			goToGoodsList(id){
				uni.navigateTo({
					url:'/subpck/goods_list/goods_list?cid='+id
				})
			}
		}
	}
</script>

<style scoped lang="less"> 
	.catelv2{
		.catelv2-title{
			width: 100%;
			text-align: center;
			font-size: 12px;
			font-weight: bold;
			padding: 15px 0;
		}
		.catelv3-list{
			display: flex;
			flex-wrap: wrap;
			.catelv3-box{
				width: 33.33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
				image{
					width: 60px;
					height: 60px;
					object-fit: cover;
				}
				text{
					font-size: 12px;
				}
			}
		}
	}
</style>
<template>
	<view class="my-search-container">
		<view class="search-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"mysearch",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
.my-search-container{
	height: 50px;
	background-color: #f10180;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.search-box{
		width: 100%;
		height: 36px;
		background-color: #fff;
		border-radius:18px;
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
<template>
	<view class="floor">
		<view class="title">
			<image :src="floorData.floor_title.image_src"></image>
		</view>
		<view class="main">
			<navigator class="left" open-type="navigate" :url="floorData.product_list[0].url">
				<image :src="floorData.product_list[0].image_src" mode="widthFix"
					:style="{width:floorData.product_list[0].image_width+'rpx'}"></image>
			</navigator>
			<view class="right">
				<navigator v-for="(item2,index2) in floorData.product_list" :key="index2" open-type="navigate" :url="item2.url">
					<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"
						v-if="index2!=0"></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['floorData']
	}
</script>

<style lang="less">
	.floor {
		.title {
			image {
				width: 100%;
				height: 60rpx;
			}
		}

		.main {
			display: flex;
			justify-content: space-between;

			.left {
				image {}
			}

			.right {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
			}
		}
	}
</style>

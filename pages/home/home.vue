<template>
	<view>
		<view class="search">
			<MySearch @click.native="goToSearch"></MySearch>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#fff"
			circular>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'../../subpck/goods_detail/goods_detail?goods_id='+item.goods_id"
					open-type="navigate">
					<image :src="item.image_src">
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="navlist">
			<image :src="item.image_src" v-for="(item,index) in navList" :key="index" @click="goTo(item.name)"></image>
		</view>
		<!-- 楼层区域 -->
		<Floor v-for="(item,index) in floorList" :key="index" :floorData="item"></Floor>
	</view>
</template>

<script>
	import Floor from '../../components/home/floor.vue'
	import MySearch from '../../components/mysearch/mysearch.vue'
	import badgeMixIn from '../../mixin/tab-badge.js'
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				// 导航数据
				navList: [],
				// 楼层数据
				floorList: []
			};
		},
		mixins:[badgeMixIn],
		components: {
			Floor,
			MySearch
		},
		onLoad() {
			this.getSwiperList(),
				this.getNavList(),
				this.getFoorList()
		},
		methods: {
			async getSwiperList() {
				let {
					data: res
				} = await uni.$http.get('/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			async getNavList() {
				let {
					data: res
				} = await uni.$http.get('/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			async getFoorList() {
				let {
					data: res
				} = await uni.$http.get('/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				res.message.forEach(floor => {
					floor.product_list.forEach(v => {
						v.url = '/subpck/goods_list/goods_list?' + v.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			goTo(name) {
				if (name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			goToSearch(){
				uni.navigateTo({
					url:'/subpck/search/search'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search {
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.swiper-item {
		height: 330rpx;

		image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.navlist {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		image {
			width: 128rpx;
			height: 140rpx;
		}
	}
</style>

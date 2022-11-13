<template>
	<view class="cate">
		<view class="scroll-view-container">
			<view class="left">
				<scroll-view class="left-scroll-view" scroll-y :style="{height: windowHeight+'px'}">
					<block v-for="item,index in cateList" :key="item.cat_id">
						<view :class="['left-scroll-view-item',index===active?'active':'']" @click="onClick(index)">
							{{item.cat_name}}</view>
					</block>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view class="right-scroll-view" scroll-y :style="{height: windowHeight+'px'}" :scroll-top="scrollTop">
					<CateLv2 v-for="(item,index) in cateList2" :key="index" :title="item.cat_name" :cateLv3List="item.children"></CateLv2>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import CateLv2 from '../../components/cate/catelv2.vue'
	export default {
		data() {
			return {
				// 视口高度
				windowHeight: 0,
				// 一级分类
				cateList: [],
				// 二级分类
				cateList2: [],
				active: 0,
				scrollTop:0
			};
		},
		components: {
			CateLv2
		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync()
			this.windowHeight = systemInfo.windowHeight
			this.getCateList()
		},
		methods: {
			async getCateList() {
				let {
					data: res
				} = await uni.$http.get('/categories')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.cateList = res.message
				this.cateList2 = res.message[0].children
			},
			onClick(index) {
				this.active = index
				this.cateList2 = this.cateList[index].children
				this.scrollTop=this.scrollTop===0?1:0
			},
		}
	}
</script>

<style lang="less">
	.scroll-view-container {
		display: flex;
		.left-scroll-view {
			width: 120px;
			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background: #fff;
					position: relative;

					&::before {
						content: '';
						display: block;
						width: 3px;
						height: 30px;
						position: absolute;
						background-color: #c00000;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		.right{
			flex:1
		}
	}
</style>

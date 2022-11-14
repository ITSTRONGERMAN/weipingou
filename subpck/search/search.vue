<template>
	<view>
		<view class="search">
			<uni-search-bar @input="OnInput" :radius="100" ancelButton="none" v-model="keyword"></uni-search-bar>
		</view>
		<!-- 搜索历史 -->
		<view class="history-container" v-if="searchList.length===0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="deleteHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag v-for="item,index in historyList" :text="item" :key="index" @click="goToList(item)" circle inverted></uni-tag>
			</view>
		</view>
		<view class="suggestlist" v-else="searchList.length!==0">
			<!-- 搜索建议列表 -->
			<view class="suggest-item">
				<uni-list-item v-for="(item,index) in searchList" :key="index" :title="item.goods_name" showArrow clickable :ellipsis="1" @click="goToDetail(item.goods_id)">
				</uni-list-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				searchList: [],
				historyList:[],
			};
		},
		onLoad() {
			this.historyList=JSON.parse(uni.getStorageSync('searchHistory')||[])
		},
		methods: {
			OnInput(value) {
				if (this.timer != null) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.keyword == ''||this.keyword.length==0) {
					return this.searchList = []
				}
				let {
					data: res
				} = await uni.$http.get('/goods/qsearch?query=' + this.keyword)
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.searchList = res.message;
				this.saveSearch()
				this.timer = null
			},
			goToDetail(id) {
				uni.navigateTo({
					url:'/subpck/goods_detail/goods_detail?goods_id='+id
				})
			},
			deleteHistory(){
				this.historyList=[]
				uni.removeStorage({
					key:'searchHistory'
				})
			},
			saveSearch(){
				let set=new Set(this.historyList)
				set.delete(this.keyword)
				set.add(this.keyword)
				this.historyList=Array.from(set).reverse()
				uni.setStorageSync('searchHistory',JSON.stringify(this.historyList))
			},
			goToList(name){
				uni.navigateTo({
					url:'/subpck/goods_list/goods_list?query='+name
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search {
		position: sticky;
		top: 0;
		z-index: 999
	}
	.history-container{
		.history-title{
			display: flex;
			justify-content: space-between;
			padding: 5px 10px;
		}
		.history-list{
			padding: 5px 10px;
			display: flex;
			flex-wrap: wrap;
		/deep/.uni-tag{
				display: block;
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>

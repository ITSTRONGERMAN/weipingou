<template>
	<view class="goods-list">
		<GoodsItem v-for="item,index in goodsList" :key="index" :imgSrc="item.goods_small_logo" :txt="item.goods_name" :price="item.goods_price" @onclick="goToDetail(item.goods_id)"></GoodsItem>
	</view>
</template>

<script>
	import GoodsItem from '../../components/goods_list/goods_item'
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				isLoading:false
			}
		},
		components:{
			GoodsItem,
		},
		onLoad(option) {
			this.queryObj.query=option.query||''
			this.queryObj.cid=option.cid||''
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.panum=1
			this.total=0
			this.isLoading=false
			this.goodsList=[]
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		onReachBottom() {
			if(this.queryObj.pagenum*this.queryObj.pagenum>=this.total) return uni.$showMsg('没有更多数据了')
			if(this.isLoading) return
			this.isLoading=true
			this.queryObj.pagenum++
			this.getGoodsList()
			this.isLoading=false
		},
		methods: {
		async getGoodsList(fn){
				let {data:res}=await uni.$http.get('/goods/search',this.queryObj)
				fn&&fn()
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.goodsList=[...this.goodsList,...res.message.goods]
				this.total=res.message.total
			},
			goToDetail(goods_id){
				uni.navigateTo({
					url:'/subpck/goods_detail/goods_detail?goods_id='+goods_id
				})
			}
		}
	}
</script>

<style>
</style>

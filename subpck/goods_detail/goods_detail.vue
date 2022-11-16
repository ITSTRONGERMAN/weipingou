<template>
	<view class="good-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" autoplay :interval="3000" :duration="1000" circular>
			<swiper-item v-for="item,index in goodDetail.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="goodDetail.goods_name">
			<text class="price">￥{{goodDetail.goods_price}}</text>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goodDetail.goods_name}}
				</view>
				<view class="icon">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					收藏
				</view>
			</view>
			<view class="cost">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goodDetail.goods_introduce"></rich-text>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onLeftClick" @buttonClick="onRightBtnClick" />
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				goodDetail:{},
				options: [{
							icon: 'shop',
							text: '店铺',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 0
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
					  }
		},
		computed:{
			...mapGetters('cart',['cartCount'])
		},
		watch:{
			cartCount:{
				immediate:true,
				handler(newVal){
					this.options[1].info=newVal
				}
			}
		},
		onLoad({goods_id}) {
			this.getGoodDetailData(goods_id)
		},
		methods:{
		...mapMutations({
			addCart:'cart/addCart',
			saveToStorage:'cart/saveToStorage'
		}),
		async getGoodDetailData(goods_id){
				let {data:res}=await uni.$http.get('/goods/detail?goods_id='+goods_id)
				if(res.meta.status!==200) return uni.$showMsg()
				res.message.goods_introduce=res.message.goods_introduce.replace(/<img/g,'<img style="display:block"').replace(/webp/g,'jpg')
				this.goodDetail=res.message
			},
			preview(index){
				uni.previewImage({
					current:index,
					urls:this.goodDetail.pics.map(p=>p.pics_big)
				})
			},
			onLeftClick({content}){
				if(content.text==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			onRightBtnClick({content}){
				if(content.text==='加入购物车'){
					const goods={
						goods_id:this.goodDetail.goods_id,
						goods_name:this.goodDetail.goods_name,
						goods_price:this.goodDetail.goods_price,
						goods_count:1,
						goods_small_logo:this.goodDetail.goods_small_logo,
						goods_state:false
					}
					this.addCart(goods)
					uni.showToast({
						title:'加入购物车成功',
						icon:'success',
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.good-detail-container{
	padding-bottom: 50px;
}
swiper{
	height: 750rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	padding: 10px;
	padding-right: 0;
	.price{
		font-size: 18px;
		color: #c00000;
		margin: 10px 0;
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			margin-right: 10px;
		}
		.icon{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 120px;
			font-size: 12px;
			border-left: 1px solid #efefef;
			color: gray;
		}
	}
	.cost{
		font-size: 12px;
		color: gray;
	}
}
.goods-nav{
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	width: 100%;
}
</style>

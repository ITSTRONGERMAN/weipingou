<template>
	<view class="userInfo-container">
		<view class="top-box">
			<img :src="userInfo.avatarUrl" alt="" class="avator">
			<text class="nickname">{{userInfo.nickName}}</text>
		</view>
		<view class="pannel-list">
			<!-- 第一个面板 -->
			<view class="pannel">
				<view class="pannel-body">
					<view class="pannel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="pannel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="pannel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="pannel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="pannel">
				<view class="pannel-title">
					我的订单
				</view>
				<view class="pannel-body">
					<view class="pannel-item">
						<image src="../../static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="pannel-item">
						<image src="../../static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="pannel-item">
						<image src="../../static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="pannel-item">
						<image src="../../static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="pannel">
				<view class="pannel-list-item">
				<text>收货地址</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="pannel-list-item">
				<text>联系客服</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="pannel-list-item" @click="loginOut">
				<text>退出登录</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "userinfo",
		computed: {
			...mapState({
				userInfo: state => state.userInfo.userInfo
			})
		},
		methods:{
			...mapMutations('userInfo',['updateUserInfo','setToken','addAddress']),
			loginOut(){
				let _this=this
				uni.showModal({
					content:'确认要退出登录',
					success({confirm}) {
						if(confirm){
							_this.updateUserInfo({}),
							_this.setToken(''),
							_this.addAddress({})
							uni.$showMsg('退出登录成功')
						}
					},
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.userInfo-container {
		height: 100%;
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: #f10180;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avator {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				border: 2px solid #fff;
				box-shadow: 0 1px 5px #000;
			}

			.nickname {
				font-size: 16px;
				color: #fff;
				margin-top: 10px;
			}
		}

		.pannel-list {
			position: relative;
			top: -10px;
			padding: 0 10px;

			.pannel {
				background-color: #fff;
				border-radius: 3px;
				margin-bottom: 8px;

				.pannel-list-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 15px;
					padding: 0 10px;
					line-height: 45px;
					border-bottom: 1px solid #f4f4f4;
				}

				.pannel-title {
					line-height: 45px;
					padding-left: 10px;
					font-size: 15px;
					border-bottom: 1px solid #f4f4f4;
				}

				.pannel-body {
					display: flex;
					justify-content: space-around;

					.pannel-item {
						.icon {
							width: 35px;
							height: 35px;
						}

						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						padding: 10px 0;
					}
				}
			}
		}
	}
</style>

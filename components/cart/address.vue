<template>
	<view class="address-container">
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="add-address-btn" @click="chooseAddress">添加收货地址</button>
		</view>
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addressInfo}}
				</view>
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" class="line"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		computed:{
			...mapState({
				address:state=>state.userInfo.address,
			}),
			...mapGetters({
				addressInfo:'userInfo/addressInfo'
			}),
		},
		methods: {
			...mapMutations({
				addAddress:'userInfo/addAddress',
			}),
			async chooseAddress() {
				let [err,success] = await uni.chooseAddress().catch(err=>err)
				if(err==null&&success.errMsg==='chooseAddress:ok'){
					this.addAddress(success);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.address-container {
		width: 100%;
		position: relative;
		padding-bottom: 5px;

		.address-choose-box {
			height: 90px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.line {
			position: absolute;
			display: block;
			width: 100%;
			height: 5px;
			bottom: 0;
			left: 0;
		}

		.address-info-box {
			font-size: 12px;
			height: 90px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 5px;

			.row1 {
				display: flex;
				justify-content: space-between;

				.row1-right {
					display: flex;
					justify-content: space-between;
				}
			}

			.row2 {
				display: flex;
				margin-top: 10px;
				align-items: center;

				.row2-left {
					white-space: nowrap;
				}

				.row2-right {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
</style>

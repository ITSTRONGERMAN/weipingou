<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="login-btn" open-type="getUserInfo" @click="getUserInfo">一键登录</button>
		<text>登陆后，尽享更多权益</text>
	</view>
</template>

<script>
	import { mapMutations} from 'vuex'
	export default {
		name:"login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('userInfo',['updateUserInfo','setToken']),
			getUserInfo(){
				let _this=this
				uni.getUserProfile({
					desc:'账号登录',
					fail() {
						uni.$showMsg('您取消了登录')
					},
					success(e) {
						_this.updateUserInfo(e.userInfo)
						_this.getToken(e)
					}
				})
			},
			async getToken(info){
				let [err,res]=await uni.login().catch(err=>err)
				if(err||res.errMsg!=='login:ok')return uni.$showMsg('登录失败')
				const query={
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					signature:info.signature,
					rawData:info.rawData
				}
				let {data:loginResult}=await uni.$http.post('/users/wxlogin',query)
				// if(loginResult.meta.status!==200) return uni.$showMsg('登录失败')
				this.setToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
			}
		}
	}
</script>

<style lang="less" scoped>
.login-container{
	height: 750rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f8f8f8;
	position: relative;
	&::after{
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: #f8f8f8;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.login-btn{
		width: 90%;
		background-color: #f10180;
		border-radius: 100px;
		margin: 15px 0;
	}
	text{
		font-size: 12px;
		color: gray;
	}
}
</style>
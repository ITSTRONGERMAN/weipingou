<template>
	<view class="my-container">
		<UserInfo v-if="token"></UserInfo>
		<Login v-else></Login>
	</view>
</template>

<script>
	import badgeMixIn from '../../mixin/tab-badge.js'
	import Login from '../../components/login/login.vue'
	import UserInfo from '../../components/userinfo/userinfo.vue'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		mixins:[badgeMixIn],
		computed:{
			...mapState({
				token:state=>state.userInfo.token,
				userInfo:state=>state.userInfo.userInfo
			})
		},
		components:{
			Login,
			UserInfo
		}
	}
</script>

<style lang="less">
page,.my-container{
	height: 100%;
}
</style>

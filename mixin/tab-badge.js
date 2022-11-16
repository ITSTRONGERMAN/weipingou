import {mapGetters} from 'vuex'
let mixins={
	computed:{
		...mapGetters('cart',['cartCount'])
	},
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:this.cartCount+''
			})
		}
	}
}
export default mixins
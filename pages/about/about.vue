<template>
	<view class="container">
		<view class="logo">
			<view><image src="../../static/logo.png" mode=""></image></view>
			<view class="app-nv">小钉耙</view>
		</view>
		<view class="cover-container">
			<view class="history-section icon">	
				<list-cell title="用户协议" @eventClick="navTo('/pages/about/xieyi')"></list-cell>
				<list-cell title="隐私政策" @eventClick="navTo('/pages/about/ys')"></list-cell>				
				<list-cell title="微信客服" @eventClick="copyHref()" tips="微信号"></list-cell>
			</view>
		</view>
	</view>
</template>
<script>
	import listCell from '../../components/mix-list-cell';	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				
			}
		},

		onLoad() {
			
		},
		onShow() {
			

		},

		methods: {
			
			//邀请码复制
			copyHref() {
				uni.setClipboardData({
					data: 'xiaobin987',
					success: (r => {
						this.$queue.showToast("微信号复制成功")
						
					}),
				})
			},
			navTo(url) {
				
				uni.navigateTo({
					url:url
				})
			},
			


			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			
			goLoginInfo() {
				this.$queue.setData("href", '/pages/member/user');
				//#ifdef H5
				uni.navigateTo({
					url: '/pages/member/register'
				});
				//#endif
				//#ifndef H5
				uni.navigateTo({
					url: '/pages/public/login'
				});
				//#endif
			},
			

			goLogin(url) {
				let token = this.$queue.getData("token");
				if (!token) {
					this.goLoginInfo();
				}

			},

		}
	}
</script>
<style lang='scss'>
	page{
		background: #eee;
	}
	.container{
		background-color: #fff;
	}
	.logo{
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-direction: column;
		padding: 50px;
		width: 100%;		
	}
	.logo image{
		width: 72px;
		height: 72px;
	}
	.app-nv{
		color: #333;
		font-size: 16px;
		padding: 10px;
	}
</style>

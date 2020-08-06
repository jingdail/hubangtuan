<template>
	<view>
		<view class="setting-box">
			<view class="cover-container" style="border-top: 1upx solid #E7E7E9;">
				<view class="history-section icon">
					<list-cell icon="cuIcon-people" title="个人中心" image="2" @eventClick="navTo('/pages/member/myworks')"></list-cell>
					<list-cell icon="cuIcon-question" title="帮助中心" @eventClick="navTo('/pages/help/index')"></list-cell>
				    <list-cell icon="cuIcon-creative" title="意见反馈" @eventClick="navTo('/pages/feedback/index')" tips=""></list-cell>				
					<list-cell icon="cuIcon-info" title="关于我们" @eventClick="navTo('/pages/about/about')"></list-cell>
				</view>
			</view>
		</view>
		<view class="logout" @click="logout()">退出登录</view>
	</view>
</template>

<script>
	import listCell from '../../components/mix-list-cell';
	import wmPosters from '@/components/wm-poster/wm-posters.vue';
	export default {
	    components: {
	    	listCell,
	    	wmPosters
	    },
	    data() {
	        return {
	            webviewStyles: {
	                progress: {
	                    color: '#FF3333'
	                }
	            }
	
	        }
	    },
		methods:{
			navTo(url) {
				if(url=='/pages/member/yao'){
					this.$queue.showToast('跳转网页');
					return false;
				}
				uni.navigateTo({
					url
				})			
			},
			logout(){
				uni.showModal({
					title:'确认退出吗?',
					confirmColor: '#FF5000',
					success:function(e){
						if(e.confirm){
							console.log('确定退出')
							uni.reLaunch({
								url:'/pages/index/index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.setting-box{
		background: #fff;
	}
	.logout{
		margin-top: 100upx;
		text-align: center;
		color: #FF5000;	
		padding: 20upx;
	}
</style>

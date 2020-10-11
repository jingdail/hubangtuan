<template>
	<view class="container">
		<view class="cover-container" style="margin-top: 10px;">
			<view class="history-section icon">	
			<list-cell icon="cuIcon-notification" title="系统公告" @eventClick="navTo('/pages/message/sys')" tips=""></list-cell>				
			<list-cell icon="cuIcon-notification" title="任务通知" @eventClick="navTo('/pages/message/renwu')" tips="" badge="cuIcon-title"></list-cell>				
					
				
			</view>
		</view>
		
		

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
            }
        },
        onPullDownRefresh: function () {
            uni.stopPullDownRefresh(); // 停止刷新
        },
		onLoad:function(){},
		onShow:function(){},
		onUnload() {},
        methods: {
			navTo(url) {
				// this.$queue.showToast(url);
				uni.navigateTo({
					url:url,
					fail:function(e){
						console.log(e)
					}
				})	
						
			}
		}

    }
</script>
<style lang='scss'>
	page{
		--page-color-base:'#f2f2f2';
		background: $page-color-base;	
	}
	.container{		
		background-color: #fff;
	}
</style>

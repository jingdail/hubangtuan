<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				url:null,
				title:null

            }
        },
        onPullDownRefresh: function () {
            uni.stopPullDownRefresh(); // 停止刷新
        },
		onLoad(option) {
			
			let srcData = JSON.parse(option.srcData);
			console.log(srcData);
			this.title = srcData.title			
			this.url = "/../static/"+srcData.url+".html"
			
		},
		onReady(){
			uni.setNavigationBarTitle({
				title:this.title,
				success:function(e){
					console.log(e)
				}
			})
		},
        methods: {},

    }
</script>

<style>
    
</style>

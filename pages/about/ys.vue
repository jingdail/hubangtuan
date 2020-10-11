<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="https://api.hubangtuan.cn/frame/yinsi.html"></web-view>
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
                }

            }
        },
        onPullDownRefresh: function () {
            uni.stopPullDownRefresh(); // 停止刷新
        },
        methods: {},

    }
</script>

<style>
    
</style>

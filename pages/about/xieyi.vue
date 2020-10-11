<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="https://api.hubangtuan.cn/frame/xieyi.html"></web-view>
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
        
        methods: {},

    }
</script>

<style>
    
</style>

<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class="pd-list">
		<view class="pd-li" v-for="(item,index) in list" :key="index" @tap="ToDetail(item)">
			<view class="flag">
				<view class="y" v-if="item.price>=2000">优</view>
				<view class="c" v-if="item.price>=1000">推</view>
			</view>
			
			<view>
				<image class="pd-img" :src="item.avatarurl" mode="widthFix" />				
			</view>
			<view class="works-content">
				<view class="pd-name">{{item.title}}</view>
				<text class="pd-tag">剩余数量：<text class="shengyu">{{item.done_num}}/</text>{{item.num}}</text>

			</view>
			<view class="incr-gold"> 
				+{{ formatNum(item.price) }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			}
		},
		onLoad(){
			console.log(this.list)
		},
		methods: {
			formatNum(e){
				return Math.ceil(e); 
			},
			ToDetail(e) {
				
				uni.navigateTo({
					url: '/pages/index/detail?query=' + encodeURIComponent(JSON.stringify(e))
				}); 
				/*
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});*/
				
			}
		}
	}
</script>

<style lang="scss">
	/*数据列表*/
	.pd-list {
		background-color: #F2F2F2;
		// padding: 8upx;
	}

	.pd-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		border-radius: 3px;
		padding: 30upx;
		margin-bottom: 8px;
		// border-bottom: 0.5upx solid $uni-line-color;
		margin: 10px;
		position: relative;
		overflow: hidden;
	}

	.pd-li .flag {
		
		color: #fff;
		font-size: 10px;
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.pd-li .flag .y{
		padding: 3px;
		border-radius: 0 0 3upx 3upx;
		background-color: #FF5000;
	}
	.pd-li .flag .c{
		padding: 3px;
		border-radius: 0 0 3upx 3upx;
		background-color: #f0ad4e;
	}
	.pd-li .pd-img {
		width: 100upx;
		height: 100upx;
		border-radius: 1000px;

	}

	.pd-li .works-content {
		justify-content: flex-start;		
		width: 70%;
		padding-left: 25upx;
	}

	.pd-li .pd-name {
		font-size: 32upx;
		overflow: hidden;
		text-align: left;
		color: #333;
		margin-bottom: 10px;
		text-overflow: clip;
		white-space: nowrap;
		overflow: hidden;
	}

	.pd-li .pd-tag {
		font-size: $font-sm;
		color: $uni-font-color-base;
	}

	.pd-li .incr-gold {
		// margin-left: 16upx;
		color: $uni-base-color;
		font-size: 18px;

	}

	.pd-li .shengyu {
		color: $uni-base-color;

	}
</style>

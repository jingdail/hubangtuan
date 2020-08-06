<template>
	<view class="detail-box">
		<view class="pd-list">
			<view class="pd-li">
				<view class="flag">优质</view>
				<view>
					<image class="pd-img" src="../../static/lolo.png" mode="widthFix" />
					<!-- <image class="pd-img" :src="pd.url" mode="widthFix"></image> -->
				</view>
				<view class="works-content">
					<view class="pd-name">拼多多砍任务</view>
					<text class="pd-tag">剩余数量：<text class="shengyu">10/</text>20</text>

				</view>
				<view class="incr-gold">
					+888xs
				</view>
			</view>
		</view>
		<!-- tips -->
		<view class="tip-box">
			注意！所有加QQ、微信、淘宝刷单、拆红包比中，全是骗子！勿贪便宜！不要付款！
		</view>
		
		<view class="renwu-box-step">
			<view class="title">任务步骤<text></text></view>
			<view class="renwu-step">1.将链接发送给微信好友，在微信中打开链接完成助力任务！</view>
			<view class="link">https://url.cn/7K0nouQ2</view>
			<view class="send-wx"@tap="sendAppMsg()" >发送给微信好友</view>
			<view class="renwu-step">2.查看示例验证图，按照示例图到提示和要求正确截图上传。</view>
			<view class="yanzhengtu-box">
				<view class="item">示例图</view>
				<view class="item">验证图</view>
			</view>
		</view>
		<view class="yz-btn">
			<view class="huan" @tap="huan()"><text class="cuIcon-refresh">换一个</text></view>
			<view class="baoming" @tap="baoming()">报名任务</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(event) {
			this.detail = JSON.parse(decodeURIComponent(event.detailDate));
			//详情标题
			uni.setNavigationBarTitle({
				title: this.detail.url
			});
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '拼多多砍价任务'
			})
		},
		methods: {
			sendAppMsg(){
				// #ifdef APP-PLUS
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
				});
				// #endif
				// #ifdef H5
				this.$queue.showToast('复制成功')
				// #endif
				
				
			},
			baoming(){
				this.$queue.showToast('报名成功')
			},
			huan(){
				this.$queue.showToast('换一个')
			}
		}
	}
</script>

<style>
	.detail_box {
		margin: 0 20upx;
	}

	.pd-list {
		background-color: #F2F2F2;
	}
	.pd-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		border-radius: 5px;
		padding: 20px;
		margin-bottom: 8px;
		margin: 10px;
		position: relative;
	}

	.pd-li .flag {
		background-color: $uni-base-color;
		color: #fff;
		font-size: 20upx;
		position: absolute;
		right: 20upx;
		top: 0;
		padding: 3upx 6upx;
		border-radius: 0 0 6upx 6upx;
	}

	.pd-li .pd-img {
		width: 110upx;
		height: 110upx;
		border-radius: 1000px;

	}

	.pd-li .works-content {
		justify-content: flex-start;
		padding-left: 10px;
		width: 60%;
	}

	.pd-li .pd-name {
		font-size: 36upx;
		overflow: hidden;
		text-align: left;
		color: #333;
		margin-bottom: 5px;
	}

	.pd-li .pd-tag {
		font-size: $font-sm;
		color: $uni-font-color-base;
	}

	.pd-li .incr-gold {
		
		color: $uni-base-color;
		font-size: 18px;

	}

	.pd-li .shengyu {
		color: $uni-base-color;

	}
	.tip-box{
		border-radius: 10upx;
		background-color: #f0ad4e;
		color: #fff;
		margin: 20upx;
		padding: 40upx;
	}
	.renwu-box-step{
		border-radius: 10upx;
		background-color: #fff;
		color: #282828;
		margin: 20upx;
		padding: 40upx;
	}
	.link,.send-wx{
		background-color: #09BB07;
		margin: 20upx 0;
		border-radius: 10upx;
		padding: 20upx 8upx;
		font-size: 32upx;
		color: #fff;
		text-align: center;
	}
	.send-wx{
		
	}
	.renwu-step{
		font-size: 30upx;
		margin: 20upx 8upx;
	}
	.title{
		font-size: 36upx;
	}
	.yanzhengtu-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 50px;
	}
	.yanzhengtu-box .item{
		border: 1px solid #007AFF;
		border-radius: 10upx;
		height: 200px;
		width: 40%;
	}
	.yz-btn{
		position: fixed;
		bottom: 0;
		height: 50px;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-top: 0.5px solid #E7E7E9;
		font-size: 32upx;
		
	}
	.yz-btn .huan{
		width: 30%;
		background: #fff;
		color: #282828;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.yz-btn .baoming{
		width: 70%;
		height: 100%;
		background: #FF5000;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
</style>

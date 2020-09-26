<template>
	<view class="detail-box">
		<view class="media-item view">
			<view class="flex-row">
				<view class="flex-col">
					<image class="image-list1" src="http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJzg
					ueBUDbItZ7NPZbU0WJ8NEKsD5q3LpwfI2jibdHCzpnh3bURV3icETSHJ6oGyLbGFpbFDPHJm6Eg/132" 
					lazy-load=""></image>
				</view>
				<view class="flex-row image-section">
					<view class="box">
						<view><text class="media-title">{{detail.title}}</text></view>
						<view class="flex-row tag">
							<text class="tag1">剩余数量:</text>
							<text class="tag2">{{detail.done_num}}</text>
							<text class="tag3">/{{detail.num}}</text>
						</view>
					</view>
					<view class="god">
						<text class="god-text">+{{formatNum(detail.price)}}</text>
					</view>
				</view>
			</view>
			<view class="media-item-line" style="position: absolute;"></view>
		</view>
		<!-- tips -->
		<view class="tip-box">
			注意！所有加QQ、微信、淘宝刷单、拆红包比中，全是骗子！勿贪便宜！不要付款！
		</view>
         <block v-if="detail.typeid!=14 || detail.qrcode==null">
		<PDD :content="detail.content" @uploadpic="uploadpic" :slt="detail.pic"
		 yzt="" :step2="detail.picinfo" :qrimg="detail.qrcode"></PDD>
		 </block>
			 <block v-else>
		 <SCANCODE :content="detail.content" @uploadpic="uploadpic" :slt="detail.pic"
		  yzt="" :step2="detail.picinfo" :qrimg="detail.qrcode"></SCANCODE>
</block>
		<view class="yz-btn">
			<view class="renwuSubmit" @click="renwuSubmit()">提交验证</view>
		</view>
		
	</view>
</template>

<script>
	import PDD from '@/components/detail/pdd.vue';
	import SCANCODE from '@/components/detail/scancode.vue';
	var app = getApp();
	export default {
		components: {
			PDD,
			SCANCODE
		},
		data() {
			return {
				content: "",
				id: 0,
				detail: [],
				pic: '',
				isbaoming: 1,
				picinfo:""
			}
		},
		
		onLoad() {
			var that = this;
			// console.log(this.id)
			let HBTID = uni.getStorageSync('HBTID')
			uni.request({
				url: app.$Api('info') + HBTID,
				success(res) {
					// console.log(this.id)
					that.detail = res.data.data
					uni.setNavigationBarTitle({
						title: res.data.data.title
					});
				}

			})
		},
		methods: {
			
			sendAppMsg() {
				// #ifdef APP-PLUS
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				// #endif
				// #ifdef H5
				this.$queue.showToast('复制成功')
				// #endif


			},
			baoming() {
				this.isbaoming = 0;
				uni.showToast({
					title: "请在10分钟内完成任务并提交验证图片",
					icon: none
				})
			},
			renwuSubmit() {
				
				if (this.pic == '') {
					uni.showToast({
						title: "请上传验证图片",
						icon:"none"
					})
					return false;
				}
				
				let param = {}
				param.infoid = this.id
				param.pic = this.pic
				this.$http.post(this.$Api('baoming'), param, {
						isFactory: false
					})
					.then(function(response) {
						if (response.data.error == 0) {
							uni.showToast({
								title: '提交成功'
							})
							setTimeout(function() {
								uni.redirectTo({
									url: '/pages/member/renwu'
								})
							}, 2000)
						}
					}).catch(function(error) {
						//这里只会在接口是失败状态返回，不需要去处理错误提示
						console.log(error);
					});
			},
			huan() {
				this.$queue.showToast('换一个')
			},
			formatNum(e) {
				return Math.ceil(e);
			},
			uploadpic(e) {
				this.pic = e
				console.log(e)
			}

		}
	}
</script>

<style>

	@import  '../../colorui/main.css';
	@import  '../../colorui/icon.css';
	@import '../../static/css/common.css';
	@import '../../static/css/simplepro.css';
	
	
	.detail_box {
		margin: 0 20upx;
	}


	.tip-box {
		border-radius: 10upx;
		background-color:#FF5000;
		color: #fff;
		padding: 20upx;
		margin: 40upx 15upx;
		font-size: 24upx;
		display: none;
	}

	.renwu-box-step {
		border-radius: 10upx;
		background-color: #fff;
		color: #282828;
		padding: 20upx;
		margin: 10upx 15upx;
	}

	.content {
		background-color: #E7E7E9;
		margin: 20upx 0;
		border-radius: 10upx;
		padding: 20upx 10upx;
		font-size: 28upx;
		color: #282828;

		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.send-wx {
		background-color: #09BB07;
		margin: 20upx 0;
		border-radius: 10upx;
		padding: 20upx 8upx;
		font-size: 32upx;
		color: #fff;
		text-align: center;
		text-overflow: clip;

	}

	.send-wx {}

	.renwu-step {
		font-size: 28upx;
		margin: 20upx 0;
		color: #979797;
	}

	.title {
		font-size: 32upx;
	}

	.yanzhengtu-box {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 50px;
	}

	.yanzhengtu-box .item {
		border: 1px solid #FF5000;
		border-radius: 10upx;
		height: 200px;
		width: 40%;

	}

	.yz-btn {
		position: fixed;
		bottom: 0;
		height: 50px;
		width: 100%;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-top: 0.5px solid #E7E7E9;
		font-size: 36upx;

	}

	.changeImage {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #FF5000;
		z-index: 10;
		text-align: center;
		color: #fff;
		padding: 5px 0;
	}

	.yz-btn .huan {
		width: 40%;
		background: #fff;
		color: #282828;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.yz-btn .baoming {
		width: 60%;
		height: 100%;
		background: #FF5000;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}

	.renwuSubmit {
		width: 100%;
		height: 100%;
		background: #FF5000;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}

	.god {
		width: 100rpx;
	}

	.god-text {
		font-size: 32upx;
		color: #FF5000;
	}

	.media-title {
		font-size: 34upx;
		color: #333;
		margin-bottom: 10px;

	}

	.tag {
		align-items: center;
	}

	.tag1 {
		font-size: 28upx;
		color: #979797;
		
	}

	.tag2 {
		padding-left: 10upx;
		font-size: 24upx;
		color: #FF5000;
	}

	.tag3 {
		font-size: 30upx;
		color: #979797;
	}

	.box {
		width: 480rpx;
		color: red;
	}

	.media-item {
		padding: 30upx 20upx;
		margin: 10upx 15upx;
		text-overflow: clip;
		min-height: 120upx;
		border-radius: 10upx;
		background-color: #fff;
	}

	.view {
		flex-direction: column;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex-col {
		flex-direction: column;
	}




	.image-section {
		margin-left: 10px;
		justify-content: space-between;
		align-items: center;
	}

	.image-list1 {
		width: 90upx;
		height: 90upx;
		border-radius: 1000px;
	}

</style>

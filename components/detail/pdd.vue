<template>
	<view>
		<view class="renwu-box-step">
			<view class="title">
				任务步骤<text>(请参照以下步骤完成任务)</text></view>
			<view class="renwu-step">
			 
			 <text>1. 任务步骤！</text> 
			
			 </view>
			<view class="content">{{content}}</view>
			<view class="btn-box">
				<view class="send-wx" @tap="copyLink()">复制链接/口令</view>
				<view class="send-wx" @tap="sendAppMsg()">发送给微信好友</view>
			</view>
			<view class="renwu-step"><text>2.</text>任务步骤。</view>
			<view class="yanzhengtu-box">
				<view class="item">
					<view class="shiliimg">
						<view class="changeImage">示例验证图</view>
						<image  :src="slt"  @click="previewShiliImage()" mode="aspectFill">
						<!-- <image class="sss" :src="slt[0]" @click="previewShiliImage()" mode="widthFix"> -->
					</view>
				</view>
				<view class="item">
					
					<view class="del-btn-box" v-if="pic" style="">
						<view class="del-btn" @click="delPic()">删除图片</view>
						<image class="sss" :src="pic" @click="previewImage()" mode="aspectFill" v-if="pic">
					</view>
					<view class="hbt-upload" v-else>
						<view class="changeImage1" @click="chose()">
							<view class="cuIcon-camera" style="display: block;"></view>
							<view class="">提交验证图</view>
							</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	export default {
		props: {
			content: {
				type: [String],
				default: ''
			},
			slt: {
				type: [String],
				default: ''
			},			
			yzt: {
				type: [String],
				default: ''
			},			
			step2: {
				type: [String],
				default: ''
			},
			qrimg: {
				type: [String],
				default: ''
			},
			valid:{
				type: [Number],
				default: 0
			}
		},
		data() {
			return {
				pic:""
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},	
		methods: {
			// ...mapMutations(['login']),
			copyLink:function(){
				uni.setClipboardData({
					data:this.content,
					success: (res) => {
						this.$queue.showToast('复制成功')
					}
				})
			},
			delPic:function(){
				this.pic = '';
			},
			chose: function() {
				if(this.valid==1){
					uni.showToast({
						title:"任务已超有效期",
						icon:"none"
						
					})
					return false;
				}
				console.log(this.hasLogin)
				console.log(this.hasLogin)
				console.log(this.hasLogin)
				if(!this.hasLogin){
					let currentPage = "/pages/index/detail";
					let url = '/pages/login/login?query='+encodeURIComponent(JSON.stringify(currentPage))
					
					uni.showModal({
						title: '需要登录',
						content: '',
						confirmText:"去登录",
						success: function (res) {						
							if (res.confirm) {
								uni.navigateTo({url:url});
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					
					return false;
				}
				var that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						uni.showLoading({
							title: '上传中'
						})

						const uploadTask = uni.uploadFile({
							url: that.$Api('uploadpic'),
							filePath: res.tempFilePaths[0],
							name: 'file',							
							success: function(uploadFileRes) {
								console.log('uploads:')
								console.log(uploadFileRes);
								uni.hideLoading()
								let img = "https://api.hubangtuan.cn/uploads" + uploadFileRes.data
								that.pic = img
								console.log(that.pic)
								that.$emit('uploadpic', img)
								// that.pic=that.$Api('base')+"uploads/"+uploadFileRes.data
							}
						});
					}
				});
			},
			previewImage: function() {
				uni.previewImage({
					urls: [this.slt],
					current: 0
				})
			},
			previewShiliImage: function() {
				uni.previewImage({
					urls: [this.slt],
					current: 0
				})
			},
			sendAppMsg() {
				console.log("weixin")
				// #ifdef APP-PLUS
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: this.content,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log(err)
					}
				});
				// #endif
				// #ifdef H5
				this.$queue.showToast('复制成功')
				// #endif


			},
		}
	}
</script>


<style>
	image{
		width: 300px;
		height: 200px;
	}
	.btn-box{
		display: flex;
		justify-content: space-around;
	}
	.btn-box view{
		width: 45%;
	}
	.send-wx {
		background-color: #FF5000;
		margin: 20upx 0;
		border-radius: 8upx;
		padding: 20upx 8upx;
		font-size: 32upx;
		color: #fff;
		text-align: center;
		text-overflow: clip;
	}
	.btn-box view:first-child{
		background-color: #FF5000;
		opacity: .7;
	}

	.detail_box {
		margin: 0 20upx;
	}
.shiliimg,.del-btn-box{
	border: 1px solid #FF5000;
	border-radius: 10upx;
}
.del-btn-box{
	min-height: 200upx;
}
.shiliimg image,.del-btn-box image{
	border-radius: 10upx;
}
	.tip-box {
		border-radius: 10upx;
		background-color: #FF5000;
		color: #fff;
		padding: 20upx;
		margin: 10upx 15upx;
		font-size: 24upx;
	}

	.renwu-box-step {
		border-radius: 10upx;
		background-color: #fff;
		color: #282828;
		padding: 20upx;
		margin: 20upx;
	}

	.content {
		background-color: #f2f2f2;
		/* border: 1px solid #f2f2f2; */
		margin: 40upx 0;
		border-radius: 10upx;
		padding: 20upx;
		font-size: 28upx;
		line-height: 2;
		color: #282828;
		min-height: 150upx;
		text-overflow: ellipsis;
		white-space: wrap;
		overflow: hidden;
	}

	.renwu-step {
		font-size: 34upx;
		margin: 40upx 0;
		color: #282828;
	}
	.renwu-step text{
		color: #282828;
	}

	.title {
		font-size: 36upx;
	}

	.title text {
		color: #979797;
		font-size: 28upx;
		margin-left: 20upx;
	}

	.yanzhengtu-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* align-items: center; */
		margin-bottom: 50px;
	}

	.yanzhengtu-box .item {		
		border-radius: 10upx;
		width: 45%;
		/* overflow: hidden; */
	}
	
	.hbt-upload {
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		justify-items: center;
		height: 100%;
	}
	
	.changeImage1 {
		border:1px solid red;
		width: 100%;
		height: 100%;
		color: #FF5000;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34upx;
	}
	
	.del-btn-box{
		position: relative;
		/* border: 1px solid #; */
	}
	.del-btn{
		position: absolute;
		top: 0px;
		right: 0px;
		background-color: #FF5000;
		color: #fff;
		z-index: 100;
		padding: 10upx 15upx;
		border-bottom-left-radius: 5px;
		
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
		width: 60%;
		background-color: #FF5000;
		z-index: 10;
		text-align: center;
		color: #fff;
		padding: 3px;
		border-bottom-right-radius: 3px;
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
		font-size: 24upx;
		color: #333;
		margin-bottom: 10px;

	}

	.tag {
		align-items: center;
	}

	.tag1 {
		font-size: 24upx;
		color: #979797;
	}

	.tag2 {
		padding-left: 10upx;
		font-size: 24upx;
		color: #FF5000;
	}

	.tag3 {
		font-size: 24upx;
		color: #979797;
	}

	.box {
		width: 480rpx;
		color: red;
	}

	.shiliimg {
		display: flex;
		position: relative;
		justify-content: space-between;
	}
	

	.media-item {
		padding: 30upx 20upx;
		margin: 10upx 15upx;
		text-overflow: clip;
		border-radius: 10upx;
		background-color: #fff;
	}

	.view {
		flex-direction: column;
	}

	.flex-row {
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

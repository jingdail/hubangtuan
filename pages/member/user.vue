<template>
	<view class="container">
		<view class="user-section">
			<view>
				<image :src="avatarUrl" mode=""></image>
			</view>
			<view class="header">
				<view class="username" >
					<view class="name">{{username}}</view>
					<view class="vip">金币: {{xdpNum}}</view>
				</view>
				<view class="qiandao" @click="qian()">
					<view class="">{{qiandao}}</view>
				</view>
			</view>
		</view>
		<!-- yaoqing -->
		<view style="background: #fff;display: none;">
			<view class="y-box" style="padding: 0 10upx">
				<view class="text">
					邀请朋友赚0000金币
				</view>
				<view class="btn">
					<view class="item">立即邀请</view>
				</view>
			</view>
		</view>
		<view class="cover-container" style="margin-top: 10px;">		
			<view class="history-section icon">
				<list-cell icon="cuIcon-apps" title="我的接单" @eventClick="navTo('/pages/member/myworks')"></list-cell>
				<list-cell icon="cuIcon-activity" title="我的任务" @eventClick="navTo('/pages/member/renwu')"></list-cell>			   
				<list-cell icon="cuIcon-pay" title="我的钱包" @eventClick="navTo('/pages/member/wallet')"></list-cell>
				<list-cell icon="cuIcon-message" title="我的消息" @eventClick="navTo('/pages/message/message')"></list-cell>				
			</view>
		</view>
		
		<view class="cover-container" style="margin-top: 10px;">
			<view class="history-section icon">	
				<list-cell icon="cuIcon-notification" title="邀请码"  tips="JKtdi289" @eventClick="copyHref('JKtdi289')"></list-cell>				
				<list-cell icon="cuIcon-pulldown"  title="检查更新"  @eventClick="downApp()" ></list-cell>				
				<list-cell icon="cuIcon-settingsfill"  title="设置中心" border="" @eventClick="navTo('/pages/member/setting')"></list-cell>
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
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				username:'请登录',
				qiandao:'签到',
				xdpNum:0,
				avatarUrl:''

            }
        },
        onPullDownRefresh: function () {
            uni.stopPullDownRefresh(); // 停止刷新
        },
		onLoad:function(){			
			/*uni.$on('login',(userInfo)=>{			
				this.username = userInfo
				console.log('userinfo+'+userInfo)
			})*/
			/*
			let userinfo = this.checkLogin('/pages/member/user',1)	
			console.log(userinfo);
			this.username = userinfo[0]			
			this.avatarUrl = userinfo[1]
			*/
		   this.username = "zhang"
		   this.avatarUrl = "http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJzgueBUDbItZ7NPZbU0WJ8NEKsD5q3LpwfI2jibdHCzpnh3bURV3icETSHJ6oGyLbGFpbFDPHJm6Eg/132"
			// 签到
			var currentTime = this.$queue.getCurrentDate(1) //当前日期
			if(currentTime==uni.getStorageSync('qianTime')){
				this.qiandao = '已签到'
			}else{
				this.qiandao = '签到'
			}
			var that = this;
			this.$http.get(this.$Api('my'),{},{isFactory: false})
			.then(function (response) {		
				console.log(response)
				that.xdpNum = response.data.data.jinbi
			}).catch(function (error) {
			    //这里只会在接口是失败状态返回，不需要去处理错误提示
			    console.log(error);
			});
		},
		onShow:function(){
			/*
			let userinfo = this.checkLogin('/pages/member/user',1)
			console.log(userinfo);
			this.username = userinfo[0]			
			this.avatarUrl = userinfo[1]
			*/
		},
		onUnload() {
			 uni.$off('login');  
		},
        methods: {
			qian(){
				//判断是否已签到
				var currentTime = this.$queue.getCurrentDate(1) //当前日期
				if(currentTime==uni.getStorageSync('qianTime')){					
					this.$queue.showToast('今日已签到')					
				}else{
					this.qiandao = '已签到';
					this.xdpNum = this.xdpNum+10
					uni.setStorageSync('qianTime',currentTime)	
					this.$queue.showToast('签到成功')									
					//添加金币,请求接口
					this.$http.post(this.$Api('daka'),{},{isFactory: false})
					.then(function (response) {				
						console.log(response)
					}).catch(function (error) {
					    //这里只会在接口是失败状态返回，不需要去处理错误提示
					    console.log(error);
					});
					
					
					
					
				}
				
				
			},
			//跳转
			navTo(url) {
				// this.$queue.showToast(url);
				uni.navigateTo({
					url:url,
					fail:function(e){
						console.log(e)
					}
				})	
						
			},
			//邀请码复制
			copyHref(e) {
				// #ifdef H5
				this.$queue.showToast("邀请码复制成功")
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: e,
					success: (r => {
						this.$queue.showToast("邀请码复制成功")
					}),
				})
				// #endif
			},
			downApp(){
				this.$queue.showToast('暂无更新')
			}
		},

    }
</script>

<style lang='scss'>
	@import '/colorui/icon.css';
	page{
		--page-color-base:'#f2f2f2';
		background: $page-color-base;	
	}
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10px;
	}
	.y-box{
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		background: #007AFF;
		width: 94%;
		height: 60upx;
		margin: 0 auto;
		border-radius: 3px 3px 0 0;
		color: #fff;
	}
	.btn .item{
		border-radius: 100px;
		background: #fff;
		color: #007AFF;
		font-size: 12px;
		padding: 2px 4px;
	}
	.user-section{		
		display: flex;
		justify-content: flex-start;
		align-content: center;
		background: #fff;		
		padding: 20px  10px 15px 10px;
	}
	.username,.yaoqing{		
		padding: 10upx;
		margin-left: 10upx;
	}
	.username .vip{		
		color: #B5B6B8;
		font-size: 12px;
		margin-top: 5px;
	}
	.username .name{
		font-size: 18px;
		color: #282828;
	}
	.header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 85%;
	}
	.qiandao{
		float: right;
		border: 0.5px solid #FF5000;
		background-color: rgba($color: #FF5000, $alpha: .7);
		padding: 3px;
		border-radius: 100px;
		font-size: 24upx;
		padding: 3px 10px;
		color: #fff;
	}
	.yaoqing view{
		margin-right: 10px;
		font-size: 12px;
	}
	.user-section image{
		border-radius: 1000px;
		width: 50px;
		height: 50px;
	}
	.tixian {
		background: -moz-linear-gradient(left, #F15B6C, #FF6DB2 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #F15B6C), color-stop(100%, #FF6DB2));
		background: -webkit-linear-gradient(left, #F15B6C 0, #FF6DB2 100%);
		background: -o-linear-gradient(left, #F15B6C 0, #FF6DB2 100%);
		background: -ms-linear-gradient(left, #F15B6C 0, #FF6DB2 100%);
		background: linear-gradient(to left, #F15B6C 0, #FF6DB2 100%);
	}

	
	.cover-container {		 
		position: relative;
		.arc {
			position: absolute;
			left: 0;
			top: -17px;
			width: 100%;
			height: 22px;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 80px;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8px;
		}
	}

	.order-section {
		@extend %section;
		padding: 16px 0;
		margin-top: 12px;

		.order-item {
			@extend %flex-center;
			width: 70px;
			height: 70px;
			border-radius: 10px;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 24px;
			margin-bottom: 12px;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 22px;
		}
	}

	.history-section {
		background: #fff;
		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 22px;
			margin-left: 15px;

			.yticon {
				font-size: 22px;
				color: #5eba8f;
				margin-right: 10px;
				line-height: 20px;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 15px 15px 0;

			image {
				display: inline-block;
				width: 100px;
				height: 100px;
				margin-right: 12px;
				border-radius: 10px;
			}
		}
	}
</style>

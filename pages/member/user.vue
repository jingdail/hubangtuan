<template>
	<view class="container">
		<view class="user-section" v-if="hasLogin">
			<view>
				<image :src="avatarUrl" mode=""></image>
			</view>
			<view class="header">
				<view class="username">
					<view class="name">{{username}}</view>
					<view class="vip">金币: {{xdpNum}}</view>
				</view>
				<view class="qiandao" @click="qian()">
					<view class="">{{qiandao}}</view>
				</view>
			</view>
		</view>
		<view class="user-section" v-else @tap="goLogin()">
			<view>
				<image src="" mode="" style="background-color: #f2f2f2;"></image>
			</view>
			<view class="header">
				<view class="username">
					<view class="name2">立即登录</view>
					<view class="name3">登录体验更多功能</view>
				</view>

			</view>
			<view class="login-right cuIcon-right"></view>
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
				<list-cell icon="cuIcon-notification" title="邀请码" :tips="yqm" @eventClick="copyHref()"></list-cell>
				<list-cell icon="cuIcon-pulldown" title="检查更新" @eventClick="downApp()"></list-cell>
				<list-cell icon="cuIcon-settingsfill" title="设置中心" border="" @eventClick="navTo('/pages/member/setting')"></list-cell>
			</view>
		</view>

		


	</view>
</template>
<script>
	import listCell from '../../components/mix-list-cell';
	import wmPosters from '@/components/wm-poster/wm-posters.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
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
				username: '请登录',
				qiandao: '签到',
				xdpNum: 0,
				avatarUrl: '',
				yqm: ""

			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']) //对全局变量进行监控

		},
		onPullDownRefresh: function() {
			uni.stopPullDownRefresh(); // 停止刷新
		},

		onLoad: function() {
			//已经登录，有缓存
			let userInfo = uni.getStorageSync("userInfo") || "";
			if (userInfo.token) {
				this.login(userInfo)
				this.username = this.userInfo.nickname;
				this.avatarUrl = this.userInfo.avatarUrl;

			} else {
				// uni.navigateTo({url:'/pages/login/login'});
			}
			/*
			let userinfo = this.checkLogin('/pages/member/user',1)	
			console.log(userinfo);
			this.username = userinfo[0]			
			this.avatarUrl = userinfo[1]*/
			// 签到
			var currentTime = this.$queue.getCurrentDate(1) //当前日期
			if (currentTime == uni.getStorageSync('qianTime')) {
				this.qiandao = '已签到'
			} else {
				this.qiandao = '签到'
			}

		},
		onShow: function() {
			this.token = uni.getStorageSync('token') || "null";
			let userInfo = uni.getStorageSync("userInfo") || "null";
			this.token2 = userInfo.token;
			console.log(this.token2)
			this.username = this.userInfo.nickname;
			this.avatarUrl = this.userInfo.avatarUrl;
			//查询金币
			var that = this;
			this.$http.get(this.$Api('my'), {}, {
					isFactory: false
				})
				.then(function(response) {
					console.log(response)
					if (response.data.data.jinbi > 0) {
						that.xdpNum = response.data.data.jinbi
					}
					that.yqm = response.data.data.yqm

				}).catch(function(error) {
					//这里只会在接口是失败状态返回，不需要去处理错误提示
					console.log(error);
				});

			//伪邀请码
			var s = [];
			var hexDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (var i = 0; i < 6; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			var uuid = s.join("");
			this.InvitationCode = uuid
			/*
			uni.$on('login',(userInfo)=>{				
				this.username = userInfo.token;
				this.avatarUrl = userInfo.avatarUrl
			})			*/
		},
		onUnload() {
			//uni.$off('login');  
		},
		methods: {
			...mapMutations(['login']),
			goLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			qian() {
				//判断是否已签到
				var currentTime = this.$queue.getCurrentDate(1) //当前日期
				if (currentTime == uni.getStorageSync('qianTime')) {
					this.$queue.showToast('今日已签到');
					return false;
					
					
				} else {
					var that = this;
					//添加金币,请求接口
					this.$http.post(this.$Api('daka'), {}, {
							isFactory: false
						})
						.then(function(response) {
							console.log(response)
							if(response.data.daka=="1"){
								that.$queue.showToast("已签到")
								return false;
							}
							if(response.data.daka=="0"){
								that.qiandao = '已签到'
								that.xdpNum = that.xdpNum + 50
								that.$queue.showToast("签到成功");
								uni.setStorageSync('qianTime', currentTime)
							}
							
						}).catch(function(error) {
							//这里只会在接口是失败状态返回，不需要去处理错误提示
							console.log(error);
						});




				}


			},
			//跳转
			navTo(url) {
				//如果没有登录不执行任何操作
				// if(!this.hasLogin){
				// 	return false;
				// }
				uni.navigateTo({
					url: url,
					fail: function(e) {
						console.log(e)
					}
				})

			},
			//邀请码复制
			copyHref() {
				//没有登录，不执行任何操作
				if (!this.hasLogin) {
					return false;
				}
				let InvitationCode = this.yqm;
				// #ifdef H5
				this.$queue.showToast(InvitationCode)
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: InvitationCode,
					success: (r => {
						this.$queue.showToast("邀请码复制成功,去邀请好友吧！")
					}),
				})
				// #endif
			},
			downApp() {
				//#ifdef APP-PLUS
				var server = "https://www.example.com/update"; //检查更新地址  
				var req = { //升级检测数据  
					"appid": plus.runtime.appid,
					"version": plus.runtime.version
				};
				uni.request({
					url: server,
					data: req,
					success: (res) => {
						if (res.statusCode == 200 && res.data.status === 1) {
							uni.showModal({ //提醒用户更新  
								title: "更新提示",
								content: res.data.note,
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(res.data.url);
									}
								}
							})
						}
					}
				})
				//#endif  
				this.$queue.showToast('暂无更新')
			}
		},

	}
</script>

<style lang='scss'>
	@import '/colorui/icon.css';

	page {
		--page-color-base: '#f2f2f2';
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

	.y-box {
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

	.btn .item {
		border-radius: 100px;
		background: #fff;
		color: #007AFF;
		font-size: 12px;
		padding: 2px 4px;
	}

	.user-section {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		background: #fff;
		padding: 20px 10px 15px 10px;
	}

	.username,
	.yaoqing {
		padding: 10upx;
		margin-left: 10upx;
	}

	.username .vip {
		color: #B5B6B8;
		font-size: 12px;
		margin-top: 5px;
	}

	.username .name {
		font-size: 18px;
		color: #282828;
	}

	.username .name2 {
		font-size: 16px;
		font-weight: bold;
		color: #666;
	}
	.username .name3{
		padding-top: 3px;
	}
	.login-right{
		font-size: 20px;
		color: #666;
		margin-right: 5px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 85%;
	}

	.qiandao {
		float: right;
		border: 0.5px solid #FF5000;
		background-color: rgba($color: #FF5000, $alpha: .7);
		padding: 3px;
		border-radius: 100px;
		font-size: 24upx;
		padding: 3px 10px;
		color: #fff;
	}

	.yaoqing view {
		margin-right: 10px;
		font-size: 12px;
	}

	.user-section image {
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

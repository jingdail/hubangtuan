<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="hbt-close cuIcon-close" @tap="goUser()"></view>
			<!-- 主体表单 -->
			<view class="main" style="margin-top: 100upx;">
				<wInput v-model="phoneData" name="phoneData " type="text" maxlength="11" placeholder="手机"></wInput>
				<wInput v-model="verCode" type="number" maxlength="4" placeholder="验证码" name="verCode" isShowCode codeText="获取验证码"
				 setTime="30" ref="runCode" @setCode="getVerCode()"></wInput>

			</view>
			<wButton class="wbutton" text="暂仅支持微信登录" :rotate="isRotate" @click.native="startLogin()"></wButton>
			<!-- 其他登录 -->
			<view class="xieyi">
			<text class="cuIcon-roundcheckfill check"></text>
			登录即表示同意
			<text @tap="navTo('xieyi')">《用户协议》</text>
			和
			<text @tap="navTo('ys')">《隐私政策》</text>
			</view>
			<view class="or">或</view>
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<!-- <view class="login-weixin-info">微信登录</view> -->
			</view>
			

		</view>
	</view>
</template>

<script>
	var _this;
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");

	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
    import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				//logo图片 base64
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转
				verCode: "", //验证码
				confimCode: ''
			};
		},
		components: {
			wInput,
			wButton,
		},
		computed: {
			...mapState(['hasLogin','userInfo']) //对全局变量进行监控
			
		},
		mounted() {
			_this = this;
			/*
			this.isLogin();
			this.$queue.isLogin();
			*/
		},
		onBackPress: function(e) {
			if (e.from == 'backbutton') {
				console.log('点击关闭按钮')
				return false;
			}
		},
		onLoad: function() {
			//清除登录状态
			// this.$queue.loginClear()
		},
		methods: {
			...mapMutations(['login']),
			goUser(){
				uni.navigateBack({})
			},
			getVerCode() {
				//获取验证码
				var rule = [{
					name: "phoneData",
					checkType: "phoneno",
					errorMsg: "错误的手机号码"
				}];
				let phone = {}
				phone.phoneData = _this.phoneData
				var checkRes = graceChecker.check(phone, rule);
				if (checkRes) {
					// uni.showToast({title:"验证通过!", icon:"none"});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return false;
				}
				let param = {
					"mobile": _this.phoneData
				}

				//触发倒计时（一般用于请求成功验证码后调用）

				this.$http.post(this.$Api('sms'), param, {
						isFactory: false,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
					})
					.then(function(response) {
						console.log(response)
						console.log(response.data.error)
						console.log(response.data.yzm)
						_this.$refs.runCode.$emit('runCode');
						if (response.data.error == "0") {
							_this.confimCode = response.data.yzm
						} else {
							uni.showToast({
								title: response.data.errMsg,
								icon: "none"
							});
							return false;
						}
					}).catch(function(error) {
						//这里只会在接口是失败状态返回，不需要去处理错误提示
						console.log(error);
					});


			},
			startLogin() {
				//手机登录
				//监听登录状态
				/*
				uni.$emit('login', {  
				                avatarUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/nav_menu/10.jpg',  
				                token: 'user123456',  
				                userName: 'unier',  
				                login: true  
				});*/
					this.login({  
								                avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJzgueBUDbItZ7NPZbU0WJ8NEKsD5q3LpwfI2jibdHCzpnh3bURV3icETSHJ6oGyLbGFpbFDPHJm6Eg/132',  
								                token: '57f2700e444b6c0db983db5a2c57ced7',  
								                nickname: 'zhang',
												jinbi:450000
								})
								uni.switchTab({
									url: '/pages/member/user'
								});
				this.$queue.showToast("暂仅支持微信登录");
				return false;
				var rule = [{
					name: "phoneData",
					checkType: "phoneno",
					errorMsg: "错误的手机号码"
				},
				{
					name: "verCode",
					checkType: "string",
					checkRule:"4,4",
					errorMsg: "验证码错误"
				}
				];
				let phone = {}
				console.log(this.verCode)
				phone.phoneData =  this.phoneData
				phone.verCode =  this.verCode
				var checkRes = graceChecker.check(phone, rule);
				if (checkRes) {
					// uni.showToast({title:"验证通过!", icon:"none"});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return false;
				}
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				console.log(this.confimCode)
				console.log(this.verCode)
				if (this.verCode != this.confimCode) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码错误'
					});
					return false;
				}

				_this.isRotate = true

				let param = {
					"mobile": this.phoneData
				}
				this.$http.post(this.$Api('mobile'), param, {
						isFactory: false,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
					})
					.then(function(response) {
						console.log(response)
						if (response.data.error != "0") {
							uni.showToast({
								title: '登录失败',
								icon: "none"
							});
						}
						_this.isRotate = false
						let userinfo = response.data.data
						// _this.$queue.setData('username', userinfo.nickname)
						// _this.$queue.setData('avatarUrl', userinfo.avatarurl)
						// _this.$queue.setData('token', userinfo.token)
						// _this.$queue.setData('phone', _this.phoneData)
						uni.switchTab({
							url: "/pages/index/index"
						})
					}).catch(function(error) {
						//这里只会在接口是失败状态返回，不需要去处理错误提示
						console.log(error);
					});

			},
			login_weixin() {
				//微信登录
				
				uni.login({
					provider: "weixin",
					success: (res) => {
						console.log(JSON.stringify(res))
						uni.getUserInfo({
							success: (info) => {
								console.log(info)
								// console.log(JSON.stringify(info))
								/* 
								 * 用于头像转换成base64
								 */
								/*uni.request({
									url: info.userInfo.avatarUrl,
									method: 'GET',
									responseType: 'arraybuffer',
									success: ress => {
										let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
										base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
										this.$queue.setData('avatarbase64', info.userInfo.base64)
									}
								})*/
								/* 与服务器交互将数据提交到服务端数据库 */
								uni.request({
									url: this.$Api('logon'),
									method: 'POST',
									header: {
										'content-type': "application/x-www-form-urlencoded"
									},
									data: {
										access_token: res.authResult.access_token,
										openid: info.userInfo.openId,
										nickname: info.userInfo.nickName,
										avatarurl: info.userInfo.avatarUrl,
										refresh_token: res.authResult.refresh_token,
										unionid: info.userInfo.unionId,
										os: plus.os.name,
										appid: plus.runtime.appid,
										version: plus.runtime.version,
									},
									success: res => {
										console.log(JSON.stringify(res))

										if (res.data.error == 0) {
											// uni.showToast({
											// 	title: '登陆成功',
											// 	mask: false,
											// 	duration: 1500
											// });

											this.$queue.setData('username', info.userInfo.nickName)
											this.$queue.setData('avatarUrl', info.userInfo.avatarUrl)
											// this.$queue.setData('token', res.data.token)
											this.$queue.setData('phone', res.data.mobile)
											this.login({
											    avatarUrl: info.userInfo.avatarUrl,  
											    token:  res.data.token,  
											    nickname: info.userInfo.nickName,
												jinbi:''
											})
											//如果没有绑定手机，去绑定 
											if (res.data.mobile == '' || res.data.mobile == null) {
											
												setTimeout(uni.redirectTo({
													url: '/pages/login/forget'
												}),2000)
												return false;
											}
											uni.switchTab({
												url: '/pages/member/user'
											});

											//判断跳转方式
											if (options.backtype == '1') {
												uni.redirectTo({
													url: options.backpage
												});
											} else {
												uni.switchTab({
													url: '/pages/member/user'
												});
											}
										} else {

											uni.showToast({
												title: '登陆失败'
											});
										}
									},
									fail: () => {
										console.log('登陆失败')
									},
									complete: () => {}
								});

							},
							fail: () => {
								uni.showToast({
									title: "微信登录授权失败"
								});
							}
						})
					},
					fail: () => {
						uni.showToast({
							title: "微信登录授权失败"
						});
					}
				})
			},
			navTo(e){
				uni.navigateTo({
					url:'../about/'+e
				})
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
	.or{
		margin-top: 50px;
		font-size: 40upx;
		text-align: center;
		color: #555;
	}
	
	.xieyi{
		margin-left: 40px;
		margin-top: 10px;
		color: #555555;
	}
	.xieyi text{
		color: #FF5000;
	}
	.other_login {
		margin: 50px auto 0 auto;
		width: 150upx;
		height: 150upx;
		border-radius: 1000upx;
		border: 0.5px solid #eee;
	}

	page {
		background: #FFFFFF;
	}

	.wbutton {
		margin-top: 80rpx;
		font-size: 34rpx
	}
	.login_icon{
		color: #179B16;
		font-size: 100upx;
	}
	.login-weixin-info{
		text-align: center;
		/* margin-top: 10upx; */
		font-size: 22upx;
		color: #282828;
		
	}
	.hbt-close{
		font-size: 24px;
		padding-left: 20px;
	}
</style>


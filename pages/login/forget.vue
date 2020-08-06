<template>
	<view class="forget">

		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" name="phoneData" maxlength="11" placeholder="请输入手机号码"></wInput>

				<wInput v-model="verCode" type="number" name="verCode" maxlength="4" placeholder="验证码" isShowCode codeText="获取验证码"
				 setTime="30" ref="runCode" @setCode="getVerCode()"></wInput>
			</view>

			<wButton class="wbutton" text="绑定手机" :rotate="isRotate" @click.native="startRePass()"></wButton>
			<view class="skip" @tap="skip()">跳过</view>
		</view>
	</view>
</template>

<script>
	var _this;
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode: "", //验证码
				isRotate: false, //是否加载旋转
				confimCode: ''
			}
		},
		components: {
			wInput,
			wButton
		},
		mounted() {
			_this = this;
		},
		methods: {
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
			startRePass() {
				//重置密码
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
								title: '绑定失败',
								icon: "none"
							});
						}
						_this.isRotate = false
						uni.switchTab({
							url: "/pages/index/index"
						})
					}).catch(function(error) {
						//这里只会在接口是失败状态返回，不需要去处理错误提示
						console.log(error);
					});

			},
			skip() {
				console.log('skip build')
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("../login/css/main.css");

	page {
		background: #fff;
	}

	.content {
		margin-top: 100upx;
	}

	.wbutton {
		margin-top: 120rpx;
		font-size: 36rpx
	}

	.skip {
		margin-top: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #282828;
		text-decoration: underline;
	}
</style>

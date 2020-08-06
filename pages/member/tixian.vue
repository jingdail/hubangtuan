<template>
	<view>
		<view style="background-color: #fff;text-align: center;margin: 0 auto">
			<view class="tixian">
				<image src="../../static/money_icon_gold.png" mode=""></image>
			</view>
			<view class="tips">可提现余额</view>
			<view class="money">0.0<text>元</text></view>
			<view class="select-box">选择提现金额</view>
			<view class="grid">

				<view class="item" v-for="(item,index) in list" :key="index" @tap="chooseGoldNum(index)" :class="{'active':isActive==index}">
					{{item.price}}元<text>{{item.info}}</text>
				</view>

			</view>
		</view>
		<view style="background-color: #fff;">
			<view class="select-box2">提现到</view>
			<view class="to">
				<view class="weixin">
					<image src="../../static/wechat.png" mode=""></image>
					<text>微信零钱</text>
				</view>
				<view class="user">
					<image :src="avatarUrl" mode=""></image>
					<text>{{username}}</text>
				</view>
			</view>
		</view>
		<view class="btn" @tap="tixian()">立即提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						'price': '1',
						'info': '（限首次）'
					},
					{
						'price': '5',
						'info': ''
					},
					{
						'price': '10',
						'info': ''
					},
					{
						'price': '30',
						'info': ''
					},
					{
						'price': '50',
						'info': ''
					},
					{
						'price': '100',
						'info': ''
					}
				],
				price:0,
				isActive: 0,
				username:'',
				avatarUrl:''

			}
		},
		onLoad() {
			/*
			let userinfo = this.checkLogin('/pages/member/user',1)	
			console.log(userinfo);
			this.username = userinfo[0]			
			this.avatarUrl = userinfo[1]
			*/
		   let index = this.isActive;
		   this.price = this.list[index].price;
		  
		   this.username = "zhang"
		   this.avatarUrl = "http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJzgueBUDbItZ7NPZbU0WJ8NEKsD5q3LpwfI2jibdHCzpnh3bURV3icETSHJ6oGyLbGFpbFDPHJm6Eg/132"
		   
		},
		methods: {
			chooseGoldNum: function(e) {
				this.isActive = e;
				this.price = this.list[e].price
				console.log(e)
			},
			tixian:function(){
				this.$queue.showToast(this.$Api('publish'))
				let param={}
				// this.$http.post(this.$Sysconf('publish'),param,{isFactory: false})
				// .then(function (response) {
				// 	console.log(response)	
				// }).catch(function (error) {
				//     //这里只会在接口是失败状态返回，不需要去处理错误提示
				//     console.log(error);
				// });
			}
		}
	}
</script>
<style>
	.btn {
		background-color: #FF5000;
		color: #fff;
		width: 98%;
		padding: 10px;
		text-align: center;
		border-radius: 20px;
		margin: 40upx auto 0 auto;
		box-shadow: 0 0 10upx rgba(255, 80, 0, 0.3);
	}

	.to {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		align-content: center;
		padding: 0 10upx;
	}

	.weixin,
	.user {
		padding: 20upx 10upx;
		display: flex;
		align-items: center;
	}

	.to .weixin image {
		width: 50upx;
		height: 50upx;
	}

	.to .user image {
		border-radius: 10000px;
		width: 50upx;
		height: 50upx;
	}

	.to .user text,
	.to .weixin text {
		padding-left: 18upx;
		color: #666;
	}

	.view {
		margin: 0 auto;
		text-align: center;
	}

	.tixian {
		padding-top: 20px;
	}

	.tixian image {
		border-radius: 1000px;
		width: 120upx;
		height: 120upx;
	}

	.tips {
		margin-top: 20upx;
		color: #979797;
		font-size: 28upx;
	}

	.money {
		margin-top: 40upx;
		color: #282828;
		font-size: 60upx;
	}

	.money text {
		font-size: 12px;
		margin-left: 10upx;
	}

	.select-box {
		margin-top: 80upx;
		border-bottom: 0.5upx solid #E7E7E9;
		text-align: left;
		padding: 20upx 24upx;
		color: #282828;
		font-size: 32upx;
	}

	.select-box2 {

		border-bottom: 0.5upx solid #E7E7E9;
		text-align: left;
		padding: 20upx 24upx;
		color: #282828;
		font-size: 32upx;
	}

	.grid {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20upx;
		padding-bottom: 40upx;
	}

	.grid .item {
		width: 30%;
		border: 0.5upx solid #E7E7E9;
		padding: 20upx 8upx;
		border-radius: 1000px;
		margin-top: 30upx;
	}

	.grid .item.active {
		border: 0.5upx solid #FF5000;
	}

	.grid .item text {
		font-size: 12px;
		color: #FF5000;
		padding: 0 4upx;
	}
</style>

<template>
	<view>
		<view style="background-color: #fff;text-align: center;margin: 0 auto;padding: 20upx">

			<view class="grid">
				<view class="item" v-for="(item,index) in list" :key="index" @tap="chooseGoldNum(index)" :class="{'active':isActive==index}">
					<view class="goldbox">{{item.gold}}</view>
					<view class="price">{{item.price}}元</view>
				</view>
				<view class="info">{{tips}}</view>
			</view>

		</view>
		<view style="background-color: #fff;">
			<view class="select-box2">支付方式</view>
			<radio-group @change="radioChange">


				<view class="to">
					<label class="alipay-box">
						<view class="weixin">
							<image src="../../static/wechat.png" mode=""></image>
							<text>微信</text>
						</view>
						<view class="user">
							<radio value="wxpay" color="#FF5000" />
						</view>
					</label>
				</view>
				<view class="to">
					<label class="alipay-box">
						<view class="weixin">
							<image src="../../static/alipay.png" mode=""></image>
							<text>支付宝</text>
						</view>
						<view class="user">
							<radio value="alipay" color="#FF5000" />
						</view>
					</label>
				</view>
			</radio-group>
		</view>
		<view class="btn" @click="requestPayment()">确认充值{{confimPrice}}元</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive: 2,
				confimPrice: '',
				payProvider: '',
				list: [{
						'gold': '5千金币',
						'price': '5',
						'info': '赠送0金币，实际到账5千金币'
					},
					{
						'gold': '1万金币',
						'price': '10',
						'info': '赠送0金币，实际到账1万金币'
					},
					{
						'gold': '2万金币',
						'price': '20',
						'info': '赠送1000金币，实际到账2.1万金币'
					},
					{
						'gold': '5万金币',
						'price': '50',
						'info': '赠送3000金币，实际到账5.3万金币'
					},
					{
						'gold': '10万金币',
						'price': '100',
						'info': '赠送8000金币，实际到账10.8万金币'
					},
					{
						'gold': '50万金币',
						'price': '500',
						'info': '赠送50000金币，实际到账55万金币'
					}
				],
				tips: null
			}
		},
		onLoad: function() {
			let index = this.isActive;
			this.confimPrice = this.list[index].price;
			this.tips = this.list[index].info;
		},
		methods: {
			chooseGoldNum: function(e) {
				let info = this.list[e].info;
				this.tips = info;
				this.isActive = e;
				this.confimPrice = this.list[e].price;
			},
			radioChange: function(evt) {
				this.payProvider = evt.detail.value
			},			
			async requestPayment() {//发起支付
			    let orderInfo = await this.getOrderInfo(this.payProvider);
			    console.log("得到订单信息", orderInfo);
				
			    if (orderInfo.statusCode !== 200) {
			        console.log("获得订单信息失败", orderInfo);
			        uni.showModal({
			            content: "获得订单信息失败",
			            showCancel: false
			        })
			        return;
			    }
				
			    uni.requestPayment({
			        provider: this.payProvider,
			        orderInfo: orderInfo.data,
			        success: (e) => {
			            console.log("success", e);
						//支付成功
			            uni.showToast({
			                title: "感谢您的赞助!"
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            uni.showModal({
			                content: "支付失败,原因为: " + e.errMsg,
			                showCancel: false
			            })
			        },
			        complete: () => {
			            
			        }
			    })
			},
			getOrderInfo(e) {//得到信息
			    let appid = "";
			    // #ifdef APP-PLUS
			    appid = plus.runtime.appid;
			    // #endif
				let url = 'http://app.huichi-china.com/pay/Alipayapp?payid=' + e + '&appid=' + appid + '&total=0.1';
			    return new Promise((res) => {
			        uni.request({
			            url: url,
			            success: (result) => {
			                res(result);
			            },
			            fail: (e) => {
			                res(e);
			            }
			        })
			    })
			} 
		}
	}
</script>

<style>
	radio {
		transform: scale(0.7);
	}

	uni-radio-group {
		width: 100%;
	}

	.alipay-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		align-content: center;
	}

	.goldbox {
		color: #282828;
	}

	.price {
		color: #979797;
	}

	.info {
		text-align: left;
		color: #FF5000;
		margin-top: 20upx;
	}

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
		/* align-items: flex-start;	 */
		align-content: center;
		width: 100%;
		padding: 0 20upx;
	}

	.weixin,
	.user {
		padding: 20upx 10upx;
		display: flex;
		align-items: center;
	}


	.to .weixin image {
		width: 40upx;
		height: 40upx;
	}

	.to .user image {
		width: 40upx;
		height: 40upx;
	}

	.to .user text,
	.to .weixin text {
		padding-left: 18upx;
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
		width: 100px;
		height: 100px;
	}

	.tips {
		margin-top: 20upx;
		color: #979797;
		font-size: 28upx;
	}

	.money {
		margin-top: 30px;
		color: #282828;
		font-size: 60upx;
	}

	.money text {
		font-size: 12px;
		margin-left: 10upx;
	}

	.select-box {
		margin-top: 80upx;
		border-bottom: 1upx solid #E7E7E9;
		text-align: left;
		padding: 20upx 10upx;
		color: #282828;
		font-size: 32upx;
	}

	.select-box2 {
		margin-top: 20upx;
		border-bottom: 1upx solid #E7E7E9;
		text-align: left;
		padding: 20upx 24upx;
		color: #282828;
		font-size: 32upx;
	}

	.grid {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
		padding-bottom: 40upx;
	}

	.grid .item {
		width: 30%;
		border: 1upx solid #E7E7E9;
		padding: 20upx 8upx;
		border-radius: 12upx;
		margin-top: 30upx;
	}

	.grid .active {
		border: 1upx solid #FF5000;
	}

	.grid .item text {
		font-size: 12px;
		color: #FF5000;
		padding: 0 4upx;
	}
</style>

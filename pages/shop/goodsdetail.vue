<template>
	<view>
		<view class="">
			<image :src="detail.goods_image_url" mode="widthFix" style="width: 750upx;"></image>
		</view>

		<view class="title">
			
			<view class="">
				{{detail.goods_name}}
			</view>
		</view>
		<view class="unified_tags">
			<view v-for="(item,index) in detail.unified_tags">{{item}}</view>
		</view>

		<view class="goods-info">
			<view class="">
				现价：¥{{formatNum(detail.min_group_price)}}
			</view>
			<view class="realPrice">券后价：¥{{realPrice(detail.min_group_price,detail.coupon_discount)}}</view>
			<view class="sales_tip">已售：{{detail.sales_tip}}件</view>
		</view>

		<view class="coupon_discount">

			¥{{formatNum(detail.coupon_discount)}}
		</view>

		<view class="coupon-buy" @tap="cart(1)">领券购买</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				detail: null,
				ddkurl: ""
			}
		},
		onLoad(option) {
			console.log(option.query)
			this.detail = JSON.parse(option.query)

		},
		methods: {
			realPrice(a, b) {
				var c = a - b;
				return (c / 100);

			},
			formatNum(e) {
				return (e / 100);
			},
			cart(index) {
				console.log(this.ddkurl)
				let appList = [{
						pname: "com.taobao.taobao",
						action: ""
					},
					{
						pname: "com.xunmeng.pinduoduo",
						action: ""
					},
					{
						pname: "com.tencent.mm",
						action: ""
					}
				]
				if (plus.runtime.isApplicationExist(appList[index])) {

					uni.request({
						url: 'http://hubangtuan.cn/pddapi/ddk.php?act=genurl&gid=' + this.detail.goods_id,
						success(res) {

							var pdd_url = res.data.goods_promotion_url_generate_response.goods_promotion_url_list[0].mobile_url


							pdd_url = pdd_url.replace("https://mobile.yangkeduo.com/", "");
							console.log(pdd_url)
							// this.ddkurl = pdd_url
							var a = "pinduoduo://com.xunmeng.pinduoduo/" + pdd_url
							console.log(a)
							plus.runtime.openURL(a)

						}
					})


					// plus.runtime.openURL('pinduoduo://com.xunmeng.pinduoduo/app.html?use_reload=1&launch_url=duo_coupon_landing.html%3Fgoods_id%3D77903333370%26pid%3D13375587_156487163%26cpsSign%3DCC_201008_13375587_156487163_c1e7e62201dba2dc34a2d7b5200b7d76%26duoduo_type%3D2&campaign=ddjb&cid=launch_dl_force_');
					return false;
				} else {
					uni.showToast({
						title: "未安装指定应用程序",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style>
	.goods-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 15px;
	}

	.realPrice {
		color: #FF5000;
		font-size: 34upx;
	}

	.coupon-buy {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #FF5000;
		color: #fff;
		text-align: center;
		font-size: 14px;
	}

	.coupon_discount {
		height: 60px;
		line-height: 60px;
		background-color: #f0ad4e;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}

	.title {
		padding: 10px;
		font-size: 14px;
		display: flex;
		align-items: auto;

	}

	.unified_tags {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 10px;
	}

	.unified_tags view {
		padding: 3px;
		border-radius: 100px;
		background-color: #FF5000;
		color: #fff;
		font-size: 10px;
		margin-right: 5px;
	}

	.title image {
		width: 40upx;
		height: 40upx;

	}

	.goods-box {
		display: flex;
		justify-content: flex-start;
		margin: 20upx;
		background: #fff;
		padding: 20upx;

	}

	.goods-box .itempic {
		width: 30%;
		height: 200upx;
	}

	.goods-box .itempic image {
		width: 200upx;
		height: 200upx;
	}

	.itemcontent {
		padding-left: 20upx;
	}

	.top-warp {
		z-index: 9990;
		position: fixed;
		top: --window-top;
		/* css变量 */
		left: 0;
		width: 100%;
		height: 80upx;
		background-color: white;
	}

	.top-warp .tip {
		font-size: 28upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
	}

	.price {
		margin-top: 20upx;
		color: #FF5000;
		font-size: 28upx;
	}

	.buybox {
		display: flex;
		justify-content: space-between;

	}

	.gobuy {
		background-color: #FF5000;
		color: #fff;
		font-size: 30upx;
	}
</style>

<template>
	<view class="cst-product">
		<block v-if="extJson.goods_module == 1">
			<view class="goods-love-list s-row has-bg-white has-borderb" v-if="product.length > 0" v-for="(item, index) in product" :key="index" @tap="detail(item)">
				<view class="image"><image :src="item.goods_picture"></image></view>
				<view class="content">
					<view class="title">
						<text class="tag" v-if="item.goods_shoptype">{{ item.goods_shoptype }}</text>
						<text class="title-text" v-if="extJson.goods_title_diy == 1">{{ item.goods_dtitle }}</text>
						<text class="title-text" v-else>{{ item.goods_title }}</text>
					</view>
					<view class="product-amount s-row">
						<view class="cstprice">
							<text>到手价¥</text>
							{{ item.goods_yprice || item.goods_price }}
						</view>
					</view>

					<view class="product-coupon s-row">
						<view class="coupon-money" v-if="item.coupon_money && item.coupon_money > 0">
							<text>{{ item.coupon_money }}元券</text>
						</view>
						<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 1">
							<text>预估收益:¥{{ item.tkmoney }}</text>
						</view>
						<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 2">
							<text>佣金:{{ item.tkrates }}%</text>
						</view>
					</view>
				</view>
			</view>
		</block>

		<block v-else>
			<!-- 竖版商品展示 -->
			<view class="prod-lst">
				<view
					class="cst-product-Portrait s-row"
					v-if="product.length > 0"
					v-for="(item, index) in product"
					:key="index"
					:class="[extJson.show_border ? 'has-border' : '']"
					@tap="detail(item)"
				>
					<block v-if="item.advert">
						<view
							class="advertPicture"
							v-if="item.compose_image && item.compose_image != ''"
							v-bind:style="{ backgroundImage: 'url(' + item.compose_image + ')' }"
						></view>
						<view class="advertPicture notPicture" v-else></view>
					</block>

					<block v-else>
						<view class="image"><image :src="item.goods_picture" mode="widthFix" class="png"></image></view>
						<view class="Portrait-info has-pd-10">
							<view class="title is-left">
								<text class="tag" v-if="item.goods_shoptype">{{ item.goods_shoptype }}</text>
								<text class="title-text" v-if="extJson.goods_title_diy == 1">{{ item.goods_dtitle }}</text>
								<text class="title-text" v-else>{{ item.goods_title }}</text>
							</view>
							<view class="product-coupon s-row">
								<view class="coupon-money" v-if="item.coupon_money && item.coupon_money > 0">
									<text>券{{ item.coupon_money }}元</text>
								</view>
								<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 1">
									<text>预估收益:¥{{ item.tkmoney }}</text>
								</view>
								<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 2">
									<text>佣金:{{ item.tkrates }}%</text>
								</view>
							</view>
							<view class="product-price s-row has-mgt-10">
								<view class="amount">
									<text class="has-desc-color is-size-12 has-pdr-3">到手价￥</text>
									<text class="is-size-20">{{ item.goods_yprice || item.goods_price }}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
/**
 * 仓鼠团活动专题页面
 */
export default {
	name: 'cstSpecial',
	props: {
		product: {
			type: Array,
			default() {
				return [];
			}
		},
		extJson: {
			type: Object,
			default() {
				return {
					show_border: ''
				};
			}
		}
	},
	data() {
		return {};
	},
	created() {
		console.log('cstSpecial created');
	},
	methods: {
		detail(item) {
			var isAdvert = item.target && item.link || false;
			if (isAdvert) {
				getApp().globalData.request.navigateTo({
					target: item.target,
					url: item.link,
					title: item.title,
					desc: item.desc_info,
					param: item.params,
					hasLogin: item.hasLogin || 0
				});
			} else {
				this.$emit('detail', {
					itemid: item.goods_numiid || '',
					shopType: item.goods_type || ''
				});
			}
		}
	}
};
</script>

<style lang="less">
.s-row {
	position: relative;
	margin-left: 0;
	margin-right: 0;
	height: auto;
	zoom: 1;
	display: block;
}

.cst-product {
	max-width: 100%;
}

.cst-product .prod-lst {
	font-size: 0;
	text-align: left;
	margin-top: 10rpx;
	overflow: hidden;
}

.cst-product .prod-lst .cst-product-Portrait {
	margin-left: 10rpx;
	margin-right: 10rpx;
	margin-bottom: 20rpx;
	display: inline-block;
	position: relative;
	background-color: #fff;
	border-radius: 20rpx;
	color: #fb3434;
	vertical-align: top;
	overflow: hidden;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	width: 47.2%;
	height: 550rpx;
	max-height: 550rpx;
	min-height: 550rpx;
}
.cst-product .prod-lst .cst-product-Portrait .advertPicture {
	width: 100%;
	height: 100%;
	background-image: url('~@/unpackage/res/images/goods/ic_default_placeholder.png');
	background-repeat: no-repeat;
	background-attachment: center;
	background-position: center;
	background-size: 100%;
}
.cst-product .prod-lst .cst-product-Portrait .advertPicture.notPicture {
	background-size: 60%;
}
.cst-product .prod-lst .cst-product-Portrait .image {
	width: 100%;
	height: 320rpx;
	background: url('~@/unpackage/res/images/goods/ic_default_placeholder.png') center center no-repeat #ffffff;
	background-size: 50%;
	max-width: 100%;
	margin-bottom: 5rpx;
}

.cst-product .prod-lst .cst-product-Portrait .image image {
	width: 100%;
	height: 320rpx;
	min-height: 100% !important;
	max-height: 320rpx !important;
}

.cst-product .prod-lst .Portrait-info .title {
	color: #393d49;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	font-size: 28rpx;
}
.cst-product .prod-lst .Portrait-info .title .title-text {
	color: #393d49;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	font-size: 28rpx;
}
.cst-product .prod-lst .Portrait-info .title .tag {
	border-radius: 2rpx;
	padding: 1rpx 5rpx;
	padding-top: 2rpx;
	margin-right: 10rpx;
	font-size: 20rpx;
	border: 2rpx solid #fc4d52;
	color: #fc4d52;
}

.cst-product .prod-lst .Portrait-info .product-coupon {
	margin-top: 13rpx;
}

.cst-product .prod-lst .Portrait-info .product-coupon .coupon-money {
	float: left;
	width: 35%;
	text-align: left;
}

.cst-product .prod-lst .Portrait-info .product-coupon .coupon-money text {
	width: auto;
	display: inline-block;
	background: #fbeaea;
	color: #ea473e;
	border-radius: 5rpx;
	font-size: 22rpx;
	padding: 2px 5px;
}

.cst-product .prod-lst .Portrait-info .product-coupon .product-shouyi {
	float: left;
	width: 65%;
	text-align: left;
}

.cst-product .prod-lst .Portrait-info .product-coupon .product-shouyi text {
	width: auto;
	display: inline-block;
	background: #fbeaea;
	color: #ea473e;
	border-radius: 5rpx;
	font-size: 22rpx;
	padding: 2px 5px;
}

/*横版*/
.cst-product .goods-love-list {
	padding: 10px;
}

.cst-product .goods-love-list .image {
	float: left;
	width: 260rpx;
	height: 260rpx;
	background: url('~@/unpackage/res/images/goods/ic_default_placeholder.png') center center no-repeat #ffffff;
	background-size: 80%;
	max-width: 40%;
}

.cst-product .goods-love-list .image image {
	width: 260rpx;
	height: 260rpx;
	min-height: 260rpx !important;
	max-height: 260rpx !important;
	border-radius: 10rpx;
}

.cst-product .goods-love-list .content {
	float: right;
	width: 56%;
}

.cst-product .goods-love-list .content .title {
	color: #333;
	font-weight: 600;
	font-size: 26rpx;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	height: 39px;
	margin-bottom: 5px;
	overflow: hidden;
}

.cst-product .goods-love-list .content .title .tag {
	border: 1px solid #fc4d52;
	color: #fc4d52;
	border-radius: 2px;
	-moz-border-radius: 2px;
	-webkit-border-radius: 2px;
	-o-border-radius: 2px;
	-ms-border-radius: 2px;
	padding: 0 5px;
	margin-right: 10px;
	font-size: 20rpx;
	top: -2px;
}

.cst-product .goods-love-list .content .product-amount {
	margin-top: 10px;
}

.cst-product .goods-love-list .content .product-amount .cstprice {
	max-width: 90%;
	float: left;
	text-align: left;
	color: #fc4d52;
	font-size: 36rpx;
	font-weight: 600;
	padding-right: 20rpx;
}

.cst-product .goods-love-list .content .product-amount .cstprice text {
	font-weight: 400;
	padding-right: 10rpx;
	font-size: 22rpx;
}

.cst-product .goods-love-list .content .product-amount .tmprice {
	color: #888;
	font-size: 22rpx;
	margin-left: 20rpx;
	line-height: 50rpx;
}

.cst-product .goods-love-list .content .product-volume {
	text-align: left;
	color: #888;
	font-size: 28rpx;
	font-weight: 400;
}

.cst-product .goods-love-list .content .product-coupon {
	margin-top: 20px;
}

.cst-product .goods-love-list .content .product-coupon .coupon-money {
	float: left;
	width: 35%;
	text-align: left;
}

.cst-product .goods-love-list .content .product-coupon .coupon-money text {
	width: auto;
	display: inline-block;
	background: #dc4d46;
	color: #ffffff;
	border-radius: 5rpx;
	font-size: 26rpx;
	padding: 1px 5px;
	font-weight: 550;
}

.cst-product .goods-love-list .content .product-coupon .product-shouyi {
	float: right;
	width: 65%;
	text-align: right;
}

.cst-product .goods-love-list .content .product-coupon .product-shouyi text {
	width: auto;
	display: inline-block;
	background: #fbeaea;
	color: #ea473e;
	border-radius: 5rpx;
	font-size: 26rpx;
	padding: 3px 5px;
	font-weight: 550;
}
</style>

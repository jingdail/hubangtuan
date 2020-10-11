import helper from '@/common/helper.js';
import homeConfig from './indexHome.js';

export default {
	async onLoad() {
		this.statusBarHeight = getApp().globalData.statusBarHeight;
		this.tabItems = await homeConfig.cateList();
		// this.bannerAdvertLower = await homeConfig.bannerAdvertLower();
		// this.bannerAdvert = await homeConfig.bannerAdvert();
		// this.darenlist = await homeConfig.darenList();
		// this.getHomeTopIcon = await homeConfig.getHomeTopIcon();
		this.getList(0);
	},
	methods: {
		async loadAppTopBanner() {
			var topbanner = await homeConfig.loadAppTopBanner(this.$store.state.hasLogin);
			var app_home_top_banner = getApp().globalData.cache.get('app_home_top_banners');
			if (topbanner && topbanner.id && !app_home_top_banner) {
				var cacheTime = parseInt(helper.TodayEndTime() - helper.getCurrTime()); // 计算得到当前最多可缓存时间 （  每天23.59.59结束 ）
				getApp().globalData.cache.put('app_home_top_banners', true, cacheTime); // 缓存 并设置结束时间
				this.$refs.topAddDialog.open(topbanner);
			}
		},
		getClipboardDataKeywords() {
			var pinduoduo = /(.*\.?yangkeduo.com(\/|$))|(.*\.?pinduoduo.com(\/|$))/i;
			var jd = /(.*\.?jd.com(\/|$))/i;
			var taobao = /(.*\.?taobao.com(\/|$))|(.*\.?tmall.com(\/|$))/i;
			uni.getClipboardData({
				success: res => {
					var str = res.data;
					if (typeof str == "undefined" || str == null || str == "") {
						console.log("未获取到剪贴板内容");
					} else {
						console.log(str.length);
						var search_type = "";
						if (str.match(pinduoduo) || str.match(jd) || str.match(taobao)) {
							search_type = "goods";
						} else {
							if (str.length >= 2) {
								if (str.length <= 60) {
									this.$refs.searchDialog.open({
										type: "text", // goods / text
										keywords: str
									});
								} else {
									search_type = "text";
								}
							}
						}
						if (search_type != "") {
							// 搜索 
							this.super_search(search_type, str);
						}
					}
				},
				fail: err => {
					console.log('getClipboard error');
				}
			});
		},
		async super_search(type, content) {
			const res = await getApp().globalData.request.post("search/super_search", {
				type: type,
				content: content
			})
			if (res.code == 200) {
				// 商品信息获取成功 
				this.$refs.searchDialog.open({
					type: "goods", // goods / text
					title:  res.data.goods_title,
					picture: res.data.goods_picture,
					price: res.data.goods_price,
					goods_type: res.data.goods_type,
					tkmoney: res.data.tkmoney,
					couponMoney: res.data.coupon_money,
					goods_numiid: res.data.goods_numiid
				});
			}
		}
	}
}

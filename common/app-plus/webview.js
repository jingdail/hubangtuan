/**
 * webview接口抛出
 */
//let whiteApiList = ['setNavigationBarTitle']; // 白名单API接口
import simpleShare  from "@/common/app-plus/simple-share.js"
let webview = {
	parsePostMessage(params) {
		var detail = Object.assign({}, {
			action: "",
			methods: "",
			params: {},
		}, params)

		console.log(detail);
		try {
			switch (detail.action) {
				case "api":
					this.setApiFunction(detail); // 执行API接口
					break;
				case "share":
					this.share(detail); // 执行分享能力
					break;
			}
		} catch (e) {
			console.log(e);
		}
	},
	share(detail){
		if (detail.methods == "weixin") {
			// 调用微信分享接口
			var api = detail.params['api']; // api接口  
			simpleShare[api] && simpleShare[api](detail.params.params);
		}
	},
	setApiFunction(detail) {
		var methods = detail['methods'];
		var params = detail['params'];
		var params = Object.assign({}, params, {
			success: (res) => {
				console.log("res", res);
			},
			fail: (err) => {
				console.log("err", err);
			},
			complete: (complete) => {
				console.log("complete", complete);
			}
		})
		switch (detail.methods) {
			case "$getAppWebview":
				// 设置标题栏需要单独处理
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				var currentWebview = page.$getAppWebview();
				var tn = currentWebview.getStyle().titleNView;
				tn.titleText = detail.params.title || '第三方网站';
				currentWebview.setStyle({
					titleNView: tn
				});
				break;
			case "nativesupport":
				// 执行阿里百川SDK接口
				const baichuan = uni.requireNativePlugin('Html5app-Baichuan');
				var api = detail.params['api']; // api接口 
				if (api == "detailPage") {
					baichuan.detailPage({
						...detail.params.params
					}, function(res) {
						console.log(JSON.stringify(res))
					})
				} else if (api == "shopPage") {
					baichuan.shopPage({
						...detail.params.params
					}, function(res) {
						console.log(JSON.stringify(res))
					})
				} else if (api == "OpenMyCart") {
					baichuan.OpenMyCart({
						openType: detail.params.openType || 1
					}, function(res) {
						console.log(JSON.stringify(res))
					})
				}
				break;
			default:
				uni[methods](params); // 执行uniapp的内置API
				break;
		}
	}
}

export default webview

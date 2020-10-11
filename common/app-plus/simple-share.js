const share = {
	wxContentImage: function(params, callback) {
		// 微信图文分享，仅支持单个图片
		uni.share({
			provider: "weixin",
			scene: params.scene || "WXSceneSession",
			type: 0,
			href: params.href || "",
			title: params.title || "",
			summary: params.summary || "",
			imageUrl: params.imageUrl || "",
			success: function(res) {
				callback && callback({
					code: res.errMsg == "share:ok" ? 1 : 0,
					data: res
				})
			},
			fail: function(err) {
				callback && callback({
					code: 0,
					data: err
				})
			}
		});
	},
	wxContent: function(params, callback) {
		// 微信单个文分享
		uni.share({
			provider: "weixin",
			scene: params.scene || "WXSceneSession",
			type: 1,
			summary: params.summary || "",
			success: function(res) {
				callback && callback({
					code: res.errMsg == "share:ok" ? 1 : 0,
					data: res
				})
			},
			fail: function(err) {
				callback && callback({
					code: 0,
					data: err
				})
			}
		});
	},
	wxImage: function(params, callback) {
		// 微信单个图片分享
		uni.share({
			provider: "weixin",
			scene: params.scene || "WXSceneSession",
			type: 2,
			imageUrl: params.imageUrl || "",
			success: function(res) {
				callback && callback({
					code: res.errMsg == "share:ok" ? 1 : 0,
					data: res
				})
			},
			fail: function(err) {
				callback && callback({
					code: 0,
					data: err
				})
			}
		});
	},
	wxMiniProgram: function(params, callback) {
		uni.share({
			provider: 'weixin',
			type: 5,
			imageUrl: params.imageUrl || "",
			title: params.title || "",
			miniProgram: {
				id: params.wxAppid || "",
				path: params.path || '',
				type: params.type || 0, // 微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。 
				webUrl: params.webUrl || ''
			},
			success: ret => {
				console.log(JSON.stringify(ret));
			}
		});
	}
}
export default share

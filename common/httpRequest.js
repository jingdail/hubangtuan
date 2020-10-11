import configdata from './config'
import cache from './cache'
import md5 from './md5.js'

import helper from './helper.js'


var APPUUID = cache.get("plus_device_uuid");


const request = {};


request.getUserinfo = function() {
	/**
	 * 抛出用户缓存信息给nvue用
	 */
	var userinfo = cache.get("taobaoke_userinfo"); // 获取用户信息
	return userinfo || false
}

request.config = function(name) {
	var info = null;
	if (name) {
		var name2 = name.split("."); //字符分割
		if (name2.length > 1) {
			info = configdata[name2[0]][name2[1]] || null;
		} else {
			info = configdata[name] || null;
		}
		if (info == null) {
			let web_config = cache.get("web_config");
			if (web_config) {
				if (name2.length > 1) {
					info = web_config[name2[0]][name2[1]] || null;
				} else {
					info = web_config[name] || null;
				}
			}
		}
	}
	return info;
}

request.random_char = function(n) {
	var random_charset = [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
		'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];
	var res = "";
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += random_charset[id];
	}
	return res;
}

request.authorization = function(safety) {
		var string = "appid=" + request.config("appid") + "&appkey=" + request.config("appkey") + "&safety=" + safety +
			"&uuid=" + APPUUID;
		return string;
	},

	request.upload = function(url, file, data) {
		var safetyToken = request.random_char(8);
		var token = md5(request.authorization(safetyToken));
		if (url.indexOf("http") < 0) {
			url = request.config("APIHOST") + url;
		}
		return new Promise((succ, error) => {
			uni.uploadFile({
				url: url,
				filePath: file,
				name: "file",
				formData: data || {},
				header: {
					"authorization": token,
					"safetyToken": safetyToken,
					"timestamp": new Date().getTime(),
					"APPUUID": APPUUID
				},
				success: (res) => {
					console.log(res)
					if (typeof succ == "function") {
						succ(JSON.parse(res.data))
					}
				},
				fail: (err) => {
					console.log(err)
					if (typeof error == "function") {
						error(err)
					}
				}
			})
		})
	}

request.postt = function(url, data, header, complete) {
	header = header || "application/x-www-form-urlencoded";
	
	var safetyToken = request.random_char(8);
	var token = md5(request.authorization(safetyToken));
	console.log("POST-URL：" + url, data);
	var startTime = new Date();
	return new Promise((succ, error) => {
		uni.request({
			url: url,
			data: data,
			method: "POST",
			header: {
				"content-type": header,
				"authorization": token,
				"safetyToken": safetyToken,
				"timestamp": new Date().getTime(),
				"APPUUID": APPUUID
			},
			success: function(result) {
				if (typeof succ == "function") {
					succ(result.data)
				}
			},
			fail: function(e) {
				console.log(e);
				if (typeof error == "function") {
					error(e)
				}
			},
			complete: function(c) {
				var endTime = new Date();
				console.log('request time ' + new Date(endTime - startTime).getTime());
				if (typeof complete == "function") {
					complete(c);
				}
			}
		})
	})
}

request.post = function(url, data, header, complete) {
	header = header || "application/x-www-form-urlencoded";
	if (url.indexOf("http") < 0) {
		url = request.config("APIHOST") + url;
        
	}
	var safetyToken = request.random_char(8);
	var token = md5(request.authorization(safetyToken));
	console.log("POST-URL：" + url, data);
	var startTime = new Date();
	return new Promise((succ, error) => {
		uni.request({
			url: url,
			data: data,
			method: "POST",
			header: {
				"content-type": header,
				"authorization": token,
				"safetyToken": safetyToken,
				"timestamp": new Date().getTime(),
				"APPUUID": APPUUID
			},
			success: function(result) {
				if (typeof succ == "function") {
					succ(result.data)
				}
			},
			fail: function(e) {
				console.log(e);
				if (typeof error == "function") {
					error(e)
				}
			},
			complete: function(c) {
				var endTime = new Date();
				console.log('request time ' + new Date(endTime - startTime).getTime());
				if (typeof complete == "function") {
					complete(c);
				}
			}
		})
	})
}


request.get = function(url, data, header) {
	header = header || "application/x-www-form-urlencoded";
	if (url.indexOf("http") < 0) {
		url = request.config("APIHOST") + url;
	}
	var safetyToken = request.random_char(8);
	var token = md5(request.authorization(safetyToken));
	return new Promise((succ, error) => {
		uni.request({
			url: url,
			data: data,
			method: "GET",
			header: {
				"content-type": header,
				"authorization": token,
				"safetyToken": safetyToken,
				"timestamp": new Date().getTime(),
			},
			success: function(result) {
				if (typeof succ == "function") {
					succ(result.data)
				}
			},
			fail: function(e) {
				if (typeof error == "function") {
					error(e)
				}
			}
		})
	})
}


request.navigateTo = function(item, action, callback) {
	console.log(`正在执行页面跳转=>${item.target}：`,item);
	var store = helper.currPage().$store;
	if (item.hasLogin && item.hasLogin == 1 && !store.state.hasLogin) {
		uni.navigateTo({
			url: '/pages/member/ucenter/signIn'
		});
		return false;
	}
	uni.report && uni.report('adClick', {
		target: item.target,
		url: item.link,
		title: item.title,
		desc: item.desc_info,
		param: typeof item.param == 'object' ? JSON.stringify(item.param) : item.param
	})
	// 特定参数 和后台协商 打开指定页面 item = {  target:'目标页面代码',url:'打开的链接',title:'webview时的标题',desc:'页面描述' 
	try {
		switch (item.target) {
			case "code-pages":
				var apiParams = "?";
				if (typeof item.param == 'object' && item.param) {
					for (let p in item.param) {
						apiParams += p + "=" + item.param[p] + "&"
					}
				}
				var pages = item.url + apiParams;
				console.log(pages);
				// 打开系统内置页面
				uni.navigateTo({
					url: pages,
					fail: (error) => {
						console.error(`第一次打开${pages}页面失败，正在重新使用switchTab打开`);
						uni.switchTab({
							url: item.url,
						})
					}
				})
				break;
			case "code-baichuan-link":
				// 百川SDK打开链接 
				if (!helper.isTaobaoApp()) {
					uni.showToast({
						title: '请先安装淘宝APP，在体验~',
						icon: "none"
					});
					callback && callback(false);
					return false;
				}
				// #ifdef APP-PLUS
				const baichuan = uni.requireNativePlugin('Html5app-Baichuan');
				baichuan.detailPage({
					url: item.url,
					openType: 0
				}, function(res) {
					console.log(JSON.stringify(res))
				})
				// #endif
				break;
			case "code-jd-sdk":
				// 京东联盟SDK
				if (!helper.isJdApp()) {
					uni.showToast({
						title: '请先安装京东APP，在体验~',
						icon: "none"
					});
					callback && callback(false);
					return false;
				}
				const jd = uni.requireNativePlugin("Html5App-JdUnion");
				jd.openURL({
					type: "App",
					url: item.url
				}, result => {
					console.log(result);
				});
				break;
			case "code-browser-link":
				console.log(item)

				helper.openBrowser(item.url, item.param || {})
				break;
			case "code-browser-link2":
				helper.openBrowser(item.url, item.param || {})
				break;
			case "code-wxapp":

				break;
			case "code-taobao":
				if (!helper.isTaobaoApp()) {
					helper.openBrowser(item.url, item.param || {})
				} else {
					helper.openUrl("taobao:" + item.url, function(res) {
						console.log(JSON.stringify(res))
					})
				}
				break;
			case "code-alipay":
				helper.openUrl("alipay://" + item.url, function(res) {
					console.log(JSON.stringify(res))
				})
				break;
			default:
				console.log("未定义操作")
				if (action == "launchBanner") {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
				break;
		}
	} catch (e) {
		console.log(e)
		console.log(JSON.stringify(e))
		// 失败 不做任何处理
	}
}

export default request

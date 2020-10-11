import httpRequest from '@/common/httpRequest.js';

uni.getCurrentView = function(params) {
	var params = Object.assign({}, {
		index: 1
	}, params)

	return new Promise((resolve, reject) => {
		var pages = getCurrentPages();
		var page = pages[pages.length - params.index];
		if (page.$vm) {
			resolve(page.$vm)
		} else {
			reject(page);
		}
	});

}


let helper = {

};
// 判断是否安装淘宝APP 
helper.isTaobaoApp = function() {
	// #ifdef APP-PLUS
	return plus.runtime.isApplicationExist({
		pname: 'com.taobao.taobao',
		action: 'taobao://'
	})
	// #endif
	// #ifndef APP-PLUS
	return false;
	// #endif
};

// 判断是否安装拼多多
helper.isPinduoduoApp = function() {
	// #ifdef APP-PLUS
	return plus.runtime.isApplicationExist({
		pname: 'com.xunmeng.pinduoduo',
		action: 'pinduoduo://'
	})
	// #endif
	// #ifndef APP-PLUS
	return false;
	// #endif
}

// 判断是否安装京东
helper.isJdApp = function() {
	// #ifdef APP-PLUS
	return plus.runtime.isApplicationExist({
		pname: 'com.jingdong.app.mall',
		action: 'openApp.jdMobile://'
	})
	// #endif
	// #ifndef APP-PLUS
	return false;
	// #endif
}

// 调用外部浏览器打开 
helper.openUrl = function(url, callback) {
	// #ifdef APP-PLUS
	plus.runtime.openURL(url, function(res) {
		callback(res)
	});
	// #endif
}

/**
 * 获取IOS平台 idfa
 */
helper.getIdfa = function() {
	var idfa = '';
	// #ifdef APP-PLUS
	try {
		if ('iOS' == plus.os.name) {
			var manager = plus.ios.invoke('ASIdentifierManager', 'sharedManager');
			if (plus.ios.invoke(manager, 'isAdvertisingTrackingEnabled')) {
				var identifier = plus.ios.invoke(manager, 'advertisingIdentifier');
				idfa = plus.ios.invoke(identifier, 'UUIDString');
				plus.ios.deleteObject(identifier);
			}
			plus.ios.deleteObject(manager);
		}
	} catch (e) {
		console.error('exception in getIdfa@dc-idfa!!');
	}
	// #endif
	return idfa;
}

/**
 * 打开应用市场
 * @param {Object} options 应用市场参数
 *     ios: appstore中应用的id标识，应用的页面地址（如https://apps.apple.com/cn/app/id682211190）的id后面的数字
 *     android: 应用的包名，apk文件中AndroidManifest.xml中的package字段值
 *     key: 为设置id标识或包名时，打开搜索页面使用的关键词
 * 如果未设置参数，则打开应用市场的搜索页面
	market.open({
		ios:'414478124',
		android:'com.tencent.mm'
	});
 */
helper.openMarket = function(options) {
	// #ifdef APP-PLUS
	try {
		var os = plus.os.name;
		options = options || {};
		if ('iOS' == os) {
			if (options.ios && '' != options.ios) {
				//itms-apps://itunes.apple.com/app/id682211190
				plus.runtime.openURL('itms-apps://itunes.apple.com/app/id' + options.ios);
			} else {
				//itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/search?q=helloh5
				plus.runtime.openURL('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/search?q=' + options.key);
			}
		} else {
			if (options.android && '' != options.android) {
				//io.dcloud.helloh5
				var uri = plus.android.invoke('android.net.Uri', 'parse', 'market://details?id=' + options.android);
				var Intent = plus.android.importClass('android.content.Intent');
				var intent = new Intent(Intent.ACTION_VIEW, uri);
				intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				var main = plus.android.runtimeMainActivity();
				main.startActivity(intent);
			} else {
				//market://search?q=helloh5
				plus.runtime.openURL('market://search?q=' + options.key);
			}
		}
	} catch (e) {
		console.error('error @openMarket!!');
	}
	// #endif
}

// 内置浏览器打开页面 
helper.openBrowser = function(url, param) {
	if (url == "" || url == "#") {
		return false;
	}

	if (!url.substr(0, 7).toLowerCase() == "http://" && !url.substr(0, 8).toLowerCase() == "https://") {
		return false;
	}

	var params = "";
	for (let i in param) {
		params += i + "=" + param[i] + "&"
	}
	url = encodeURIComponent(url);
	var idfa = helper.getIdfa();
	uni.navigateTo({
		url: `/pages/special/webview?url=${url}&${params}&idfa=${idfa}`
	})
}

/**
 * 要复制的内容
 * NJS设置剪切板
 */
helper.setClipboardData = function(string, callback) {
	const appPlatform = uni.getSystemInfoSync().platform
	// #ifdef APP-PLUS
	if (appPlatform == "ios") {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 设置 
		generalPasteboard.setValueforPasteboardType(string, "public.utf8-plain-text");
		callback && callback({
			code: 1
		});
	} else {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", string);
		callback && callback({
			code: 1
		});
	}
	// #endif
}

/**
 * njs 获取剪切板
 */
helper.getClipboardData = function(callback) {
	const appPlatform = uni.getSystemInfoSync().platform
	// #ifdef APP-PLUS
	if (appPlatform == "ios") {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 获取 
		var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
		callback && callback({
			code: 1,
			data: value
		});
	} else {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		var value = plus.android.invoke(clip, "getText");
		callback && callback({
			code: 1,
			data: value
		});
	}
	// #endif
}

/**
 * 获取当前页的/指定页对象
 * @param len  页层级 当前页1，上一页 2 ，上上页 2+1 ... 
 */
helper.currPage = function(len) {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - (len ? len : 1)];
	return prePage.$vm;
}

/**
 * 获取今天 23.59.59 秒的时间戳  （秒单位） 
 */
helper.TodayEndTime = function() {
	var date = new Date();
	var todayYear = date.getFullYear();
	var todayMonth = date.getMonth();
	var todayDay = date.getDate();
	var todayTime = (new Date(todayYear, todayMonth, todayDay, '23', '59', '59')).getTime(); //毫秒
	return todayTime / 1000;
}

/**
 * 获取当前的时间戳 （秒单位）
 */
helper.getCurrTime = function() {
	var time = new Date().getTime();
	return time / 1000;
}

/**
 * 显示加载框
 */
helper.showLoading = function(title, type) {
	// #ifdef APP-PLUS
	var w = plus.nativeUI.showWaiting(title || "", {
		width: '80px',
		height: '80px',
		loading: {
			type: type || 'snow',
			height: '40px'
		},
		background: 'rgba(0,0,0,0.9)'
	});
	// #endif
	// #ifndef APP-PLUS
	uni.showLoading({
		title: title || '',
	});
	// #endif
}

/**
 * 隐藏加载框
 */
helper.hideLoading = function() {
	// #ifdef APP-PLUS
	plus.nativeUI.closeWaiting();
	// #endif
	// #ifndef APP-PLUS
	uni.hideLoading();
	// #endif
}

helper.getWenan = function(goods_type) {
	var wenan;
	if (parseInt(goods_type) == 3) {
		wenan = httpRequest.config("app_share_jditems_wenan") || "";
	} else if (parseInt(goods_type) == 4) {
		wenan = httpRequest.config("app_share_pdditems_wenan") || "";
	} else {
		wenan = httpRequest.config("app_share_items_wenan") || "";
	}
	return wenan;
}

helper.createWenan = function(data, goods) {
	console.log("createWenan-->", goods)
	console.log("createWenan-->data-->", data)
	var wenan = helper.getWenan(goods.goods_type);
	var dwapp = httpRequest.config("app_cst_download_link") || "";
	console.log("wenan-->" + wenan)
	wenan = wenan.replace(/{{tbpwd}}/g, data.tbpwd || "")
		.replace(/{{goods_price}}/g, goods.goods_price)
		.replace(/{{goods_yprice}}/g, goods.goods_yprice)
		.replace(/{{goods_tkmoney}}/g, goods.tkmoney)
		.replace(/{{goods_title}}/g, goods.goods_title)
		.replace(/{{buylink}}/g, data.coupon_link || "")
		.replace(/{{app_download}}/g, dwapp)
		.replace(/{{goods_type}}/g, goods.shopType)
		.replace(/{{user_yqcode}}/g, data.yqcode || "");
	goods['wenan'] = wenan;
	goods['data'] = data;
	return {
		wenan: wenan,
		goods: goods,
	}

}

helper.arrayToNewArray = function(e, proportion) {
	var num = 0,
		_data = [];
	for (let i = 0; i < e.length; i++) {
		if (i % proportion == 0 && i != 0) {
			_data.push(e.slice(num, i));
			num = i;
		}
		if ((i + 1) == e.length) {
			_data.push(e.slice(num, (i + 1)));
		}
	}
	return _data;
}


helper.getDeviceInfo = function() {
	// #ifdef APP-PLUS
	return new Promise((succ, error) => {
		plus.device.getInfo({
			success: function(e) {
				e.imei = e.imei.split(",");
				e.uuid = e.uuid.split(",");
				succ(e)
			},
			fail: function(e) {
				error(e)
			}
		});
	})
	// #endif

}

helper.date = {
	/**
	 * 是否为闫年
	 * @return {Boolse} true|false
	 */
	isLeapYear: function(y) {
		return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
	},

	/**
	 * 返回星期数
	 * @return {Number}
	 */
	getWhatDay: function(year, month, day) {
		let date = new Date(year + '/' + month + '/' + day);
		let index = date.getDay();
		let dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		return dayNames[index];
	},

	/**
	 * 返回星期数
	 * @return {Number}
	 */
	getMonthPreDay: function(year, month) {
		let date = new Date(year + '/' + month + '/01');
		let day = date.getDay();
		if (day == 0) {
			day = 7;
		}
		return day;
	},

	/**
	 * 返回月份天数
	 * @return {Number}
	 */
	getMonthDays: function(year, month) {
		if (/^0/.test(month)) {
			month = month.split('')[1];
		}
		return [0, 31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	},

	/**
	 * 补齐数字位数
	 * @return {string}
	 */
	getNumTwoBit: function(n) {
		n = Number(n);
		return (n > 9 ? '' : '0') + n;
	},

	/**
	 * 日期对象转成字符串
	 * @return {string}
	 */
	date2Str: function(date, split) {
		if (typeof date == 'string') return date;
		split = split || '-';
		let y = date.getFullYear();
		let m = this.getNumTwoBit(date.getMonth() + 1);
		let d = this.getNumTwoBit(date.getDate());
		return [y, m, d].join(split);
	},

	/**
	 * 返回日期格式字符串
	 * @param {Number} 0返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
	 * @return {string} '2014-12-31'
	 */
	getDay: function(i) {
		i = i || 0;
		let date = new Date();
		let diff = i * (1000 * 60 * 60 * 24);
		date = new Date(date.getTime() + diff);
		return this.date2Str(date);
	},

	/**
	 * 时间戳转换为日期格式
	 * @return {String}
	 */
	timestampToDate: function(timestamp) {
		if (/^(-)?\d{1,10}$/.test(timestamp)) {
			timestamp = timestamp * 1000;
		} else if (/^(-)?\d{1,13}$/.test(timestamp)) {
			timestamp = timestamp * 1;
		}

		let date = new Date(timestamp);
		return date.getFullYear() + '-' + this.getNumTwoBit((date.getMonth() + 1)) + '-' + this.getNumTwoBit(date.getDate());
	},

	/**
	 * 时间比较
	 * @return {Boolean}
	 */
	compareDate: function(date1, date2) {
		let startTime = new Date(date1.replace('-', '/').replace('-', '/'));
		let endTime = new Date(date2.replace('-', '/').replace('-', '/'));
		if (startTime >= endTime) {
			return false;
		}
		return true;
	},
	/**
	 * 时间是否相等
	 * @return {Boolean}
	 */
	isEqual: function(date1, date2) {
		let startTime = new Date(date1).getTime();
		let endTime = new Date(date2).getTime();
		if (startTime == endTime) {
			return true;
		}
		return false;
	}
};

// 计算两地之间的距离
helper.mallListSpace = function(lat1, lng1, lat2, lng2) {
	var radLat1 = (lat1 * Math.PI) / 180.0;
	var radLat2 = (lat2 * Math.PI) / 180.0;
	var a = radLat1 - radLat2;
	var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(
		b / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	return s; // 单位千米
}

/**
 * 版本号比较
 * @memberOf Utils
 * @param currVer {string}
 * @param promoteVer {string}
 * @returns {boolean}
 * @example
 * console.log(helper.compareVersion('0.1.100', '0.1.11')); // 'true'
 */
helper.compareVersion = function(currVer = '0.0.0', promoteVer = '0.0.0') {
	if (currVer === promoteVer) return true;
	const currVerArr = currVer.split('.');
	const promoteVerArr = promoteVer.split('.');
	const len = Math.max(currVerArr.length, promoteVerArr.length);
	for (let i = 0; i < len; i++) {
		const proVal = ~~promoteVerArr[i];
		const curVal = ~~currVerArr[i];
		if (proVal < curVal) {
			return true;
		} else if (proVal > curVal) {
			return false;
		}
	}
	return false;
};

/**
 * 分割数组
 * @param arr 被分割数组
 * @param size 分割数组的长度
 * @returns {Array}
 */
helper.arrayChunk = function(arr = [], size = 4) {
	let groups = [];
	if (arr && arr.length > 0) {
		groups = arr
			.map((e, i) => {
				return i % size === 0 ? arr.slice(i, i + size) : null;
			})
			.filter(e => {
				return e;
			});
	}
	return groups;
};

/*
 * 截断字符串
 * @param str 传入字符串
 * @param len 截断长度
 * @param hasDot 末尾是否...
 * @returns {String}
 */
helper.truncateString = function(str, len, hasDot = true) {
	let newLength = 0;
	let newStr = '';
	let singleChar = '';
	const chineseRegex = /[^\x00-\xff]/g;
	const strLength = str.replace(chineseRegex, '**').length;
	for (let i = 0; i < strLength; i++) {
		singleChar = str.charAt(i).toString();
		if (singleChar.match(chineseRegex) !== null) {
			newLength += 2;
		} else {
			newLength++;
		}
		if (newLength > len) {
			break;
		}
		newStr += singleChar;
	}

	if (hasDot && strLength > len) {
		newStr += '...';
	}
	return newStr;
};
/*
 * 转换 obj 为 url params参数
 * @param obj 传入字符串
 * @returns {String}
 */
helper.objToParams = function(obj) {
	let str = '';
	for (const key in obj) {
		if (str !== '') {
			str += '&';
		}
		str += key + '=' + encodeURIComponent(obj[key]);
	}
	return str;
};
/*
 * 转换 url params参数为obj
 * @param str 传入url参数字符串
 * @returns {Object}
 */
helper.paramsToObj = function(str) {
	let obj = {};
	try {
		obj = JSON.parse(
			'{"' +
			decodeURI(str)
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"') +
			'"}'
		);
	} catch (e) {
		console.log(e);
	}
	return obj;
};

helper.animation = {
	/**
	 * 返回定义页面转场动画起初的位置
	 * @param ref
	 * @param transform 运动类型
	 * @param status
	 * @param callback 回调函数
	 */
	pageTransitionAnimation(ref, transform, status, callback) {
		const animation = weex.requireModule('animation');
		animation.transition(
			ref, {
				styles: {
					transform: transform
				},
				duration: status ? 250 : 300, // ms
				timingFunction: status ? 'ease-in' : 'ease-out',
				delay: 0 // ms
			},
			function() {
				callback && callback();
			}
		);
	}
};

helper.uiStyle = {
	/**
	 * 返回定义页面转场动画起初的位置
	 * @param animationType 页面转场动画的类型 push，model
	 * @param size 分割数组的长度
	 * @returns {}
	 */
	pageTransitionAnimationStyle(animationType) {
		if (animationType === 'push') {
			return {
				left: '750px',
				top: '0px',
				height: (weex.config.env.deviceHeight / weex.config.env.deviceWidth) * 750 + 'px'
			};
		} else if (animationType === 'model') {
			return {
				top: (weex.config.env.deviceHeight / weex.config.env.deviceWidth) * 750 + 'px',
				left: '0px',
				height: (weex.config.env.deviceHeight / weex.config.env.deviceWidth) * 750 + 'px'
			};
		}
		return {};
	}
};
export default helper;

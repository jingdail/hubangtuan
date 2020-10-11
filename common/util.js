function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}
//复制
function Copy(data){
	uni.setClipboardData({
		data:data,
		success: () => {
			uni.showToast({
				title:"复制成功",
				icon:"none"
			})
		},
		fail: () => {
			uni.showToast({
				title:"复制失败",
				icon:"none"
			})
		}
	})
}
// 调用第三方程序
function openApp(index){
	let appList = [
		{
			pname:"com.taobao.taobao",
			action:""
		},
		{
			pname:"com.xunmeng.pinduoduo",
			action:""
		},
		{
			pname:"com.tencent.mm",
			action:""
		}
	]
	if(plus.runtime.isApplicationExist(appList[index])){		
		plus.runtime.launchApplication( {pname:appList[index].pname}, function ( e ) {
				uni.showToast({
					title:"应用打开失败",
					icon:"none"
				})
		} );
	}else{
		uni.showToast({
			title:"未安装指定应用程序",
			icon:"none"
		})
	}
}
export {
	friendlyDate,
	Copy,
	openApp
}

/**
 * 监听push 消息 以及后台数据恢复
 */
export default {
	newintentListener() {
		// 监听后台恢复
		plus.globalEvent.addEventListener('newintent', e => {
			console.log('globalEvent--->newintent');
			this.checkArguments(); // 检测启动参数
		});
	},
	pushListener() {
		// 开启监听推送  
		// 注意 这里需要监听应用 splashclosed 关闭后 （因为如果开了广告这些  直接执行API跳转是无效的)
		var globalEvent = weex.requireModule('globalEvent');
		globalEvent.addEventListener('splashclosed', (e) => {
			console.log('splashclosed');
			plus.push.addEventListener('click', res => {
				console.log('push--->click');
				this.addEventListenerPushMessage(res, 'click');
			});
			plus.push.addEventListener('receive', res => {
				console.log('push--->receive');
				this.addEventListenerPushMessage(res, 'receive');
			});
		});
	},
	checkArguments() {
		var launcher = plus.runtime.launcher;
		console.log('Shortcut-plus.runtime.launcher: ' + launcher);
		if (launcher == 'shortcut') {
			this.shortcutLauncher();
		}
	},
	addEventListenerPushMessage(push, type) {
		// 处理通知栏信息
		if (typeof push.payload == 'string') {
			push.payload = JSON.parse(push.payload);
		}
		console.log(`接收到推送消息，类型：${type}`, push);
		
		if (process.env.NODE_ENV === 'development') {
			uni.showModal({
				title: '提示',
				content: typeof push.payload == "string" ? push.payload : JSON.stringify(push.payload),
				showCancel: true,
				confirmText: "复制结果",
				cancelText: "不复制",
				success: (eee) => {
					if (eee.confirm) {
						uni.setClipboardData({
							data: typeof push.payload == "string" ? push.payload : JSON.stringify(push.payload)
						})
					}
				}
			});
		}
		if (push.payload && push.payload.payload.target) {
			try {
				getApp().globalData.request.navigateTo({
						target: push.payload.payload.target,
						url: push.payload.payload.link,
						title: push.title,
						desc: push.content,
						param: push.payload.payload.params || {}
					},
					push.payload.payload.target
				);
			} catch (e) {
				console.log(e);
			}
		}

	},
	shortcutLauncher() {
		// 通过快捷方式启动，iOS平台表示通过3D Touch快捷方式，Android平台表示通过桌面快捷方式启动
		try {
			var cmd = JSON.parse(plus.runtime.arguments);
			console.log('Shortcut-plus.runtime.arguments: ' + plus.runtime.arguments);
			var type = cmd && cmd.type;
			setTimeout(r => {
				switch (type) {
					case 'scan':
						uni.scanCode({
							scanType: 'qrCode'
						});
						break;
					case 'search':
						uni.navigateTo({
							url: '/pages/search/index'
						});
						break;
					case 'shouyi':
						// 我的收益
						uni.navigateTo({
							url: '/pages/member/wallet/profit'
						});
						break;
					case 'agent':
						// 邀请好友
						uni.navigateTo({
							url: '/pages/member/agent/invite'
						});
						break;
					case 'find':
						// 发现
						uni.switchTab({
							url: '/pages/find/find'
						});
						break;
				}
			}, 800);

			console.log(JSON.stringify(cmd));
		} catch (e) {
			console.log('Shortcut-exception: ' + e);
		}
	}
}

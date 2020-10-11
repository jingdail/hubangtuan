/**	
 * 针对闪验SDK进行封装
 * 切记不要在APP.vue 页面中调用 以及 page.json 启动页调用 （可能会导致getApp()失败 )
 */
const shanYanSDKModule = uni.requireNativePlugin('CLSDK-ShanYanSDKModule');
import theme from "./shanyan_theme.js"

export default {
	config() {
		return getApp().config('shanyan');
	},
	init() {
		return new Promise((resolve, reject) => {
			try {
				var shanyanConfig = this.config();
				var appid = getApp().isIos() ? shanyanConfig.ios : shanyanConfig.Android;
				//闪验SDK 初始化
				shanYanSDKModule.init({
						appid: appid
					},
					result => {
						// 注意 苹果返回是 1000  安卓是 1022 
						if (result.code == (getApp().isIos() ? 1000 : 1022)) {
							resolve(result)
						} else {
							reject(result);
						}
					}
				);
			} catch (e) {
				reject(e);
			}
		});
	},
	Ios(type = "login", click, open) {
		/**
		 * resolve() // 成功回调
		 * reject() // 失败回调  
		 * click 点击页面的控件
		 * open=窗口打开成功
		 */
		return new Promise((resolve, reject) => {
			plus.nativeUI.showWaiting();
			shanYanSDKModule.quickAuthLoginWithConfigure(theme.ios(type), result => {
				plus.nativeUI.closeWaiting();
				// 页面拉起授权回调
				open && open(result)
			}, result => {
				// 点击登录回调
				console.log(result);
			})



		});
	},
	Android(type = "login", click, open) {
		/**
		 * resolve() // 成功回调
		 * reject() // 失败回调  
		 * click 点击页面的控件
		 * open=窗口打开成功
		 */
		return new Promise((resolve, reject) => {
			plus.nativeUI.showWaiting();
			shanYanSDKModule.setAuthThemeConfig(theme.android(type), result => {
				click && click(result)
			}); // 设置模版样式
			shanYanSDKModule.openLoginAuth(
				true,
				result => {
					plus.nativeUI.closeWaiting();
					//拉起授权页回调
					open && open(result)
				},
				result => {
					//点击登录按钮及返回键回调
					if (result.code == 1000) {
						resolve(JSON.parse(result.result)); // 返回授权信息
					} else {
						reject(result);
					}
				}
			);
		});
	}
}

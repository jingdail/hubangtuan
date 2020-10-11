/**
 * 闪验SDK主题
 */
const App = getApp()
const themes = {
	android(type) {
		var typeStr = type == 'login' ? "登录" : "注册"
		return {
			//授权页已有元素配置
			uiConfig: {
				setNavColor: '#ff0000',
				setLogoImgPath: 'static/img/logo.png',
				setAppPrivacyOne: {
					title: '用户协议',
					url: App.config('html5.agreement')
				},
				setAppPrivacyTwo: {
					title: '隐私政策',
					url: App.config('html5.privacy')
				},
				setAppPrivacyThree: {
					title: '服务协议',
					url: "https://api.253.com/api_doc/yin-si-zheng-ce/ge-ren-xin-xi-bao-hu-sheng-ming.html"
				},
				setNavText: `免密${typeStr}`,
				setLogBtnText: `本机号码一键${typeStr}`,
				setPrivacyState: true, //协议是否默认选中
				setPrivacyText: {
					privacyTextOne: `${typeStr}即同意`,
					privacyTextTwo: "、",
					privacyTextThree: '、',
					privacyTextFour: '和',
					privacyTextFive: `并授权${typeStr}`,
				}
			},
			widgets: {
				widget1: {
					widgetId: type == 'login' ? "otherLogin" : "otherRegister",
					type: "TextView",
					left: "",
					top: "300",
					right: "",
					bottom: "",
					width: "",
					height: "30",
					textContent: `其它号码${typeStr}`,
					textFont: "16",
					textColor: "#1E9FFF",
					backgroundColor: "#ffffff",
					isFinish: "true"
				}
			}

		};
	},
	ios(type) {
		var typeStr = type == 'login' ? "登录" : "注册";
		// ios 全屏样式
		let screenWidth_Portrait = plus.screen.resolutionWidth; //竖屏宽
		var screenScale = screenWidth_Portrait / 375.0; //相对iphone6屏幕
		if (screenScale > 1) {
			screenScale = 1; //大屏的无需放大
		}
		//竖屏
		let clLayoutLogoTop_Portrait = screenScale * 60;
		let clLayoutLogoWidth_Portrait = 60 * screenScale;
		let clLayoutLogoHeight_Portrait = 60 * screenScale;
		let clLayoutLogoCenterX_Portrait = 0;

		let clLayoutPhoneCenterY_Portrait = -20 * screenScale;
		let clLayoutPhoneLeft_Portrait = 50 * screenScale;
		let clLayoutPhoneRight_Portrait = -50 * screenScale;
		let clLayoutPhoneHeight_Portrait = 20 * screenScale;

		let clLayoutLoginBtnCenterY_Portrait = clLayoutPhoneCenterY_Portrait + clLayoutPhoneHeight_Portrait * 0.5 *
			screenScale + 20 * screenScale + 15 * screenScale;
		let clLayoutLoginBtnHeight_Portrait = 30 * screenScale;
		let clLayoutLoginBtnLeft_Portrait = 70 * screenScale;
		let clLayoutLoginBtnRight_Portrait = -70 * screenScale;

		let clLayoutAppPrivacyLeft_Portrait = 40 * screenScale;
		let clLayoutAppPrivacyRight_Portrait = -40 * screenScale;
		let clLayoutAppPrivacyBottom_Portrait = 0 * screenScale;
		let clLayoutAppPrivacyHeight_Portrait = 45 * screenScale;

		let clLayoutSloganLeft_Portrait = 0;
		let clLayoutSloganRight_Portrait = 0;
		let clLayoutSloganHeight_Portrait = 15 * screenScale;
		let clLayoutSloganBottom_Portrait = clLayoutAppPrivacyBottom_Portrait - clLayoutAppPrivacyHeight_Portrait;
		return {
			shouldAutorotate: true,
			supportedInterfaceOrientations: 5,
			clNavigationBackgroundClear: true, //导航栏透明
			clNavBackBtnAlimentRight: true, //返回按钮居右,设置自定义导航栏返回按钮时，以自定义为准
			clLogoImage: "static/img/logo.png", //logo图片
			clLoginBtnText: "本机号一键登录", //一键登录按钮文字
			clLoginBtnTextColor: [255, 255, 255, 1], //rgba
			clLoginBtnBgColor: [30,159,255, 1], //rgba
			clLoginBtnTextFont: 15 * screenScale,

			clPhoneNumberFont: 20.0 * screenScale,

			// clAppPrivacyColor: [
			// 	[0.6, 0.6, 0.6, 1.0],
			// 	[0, 1, 0, 1.0]
			// ], //2 item,commomTextColor and appPrivacyTextColor
			clAppPrivacyTextFont: 11 * screenScale,
			clAppPrivacyTextAlignment: 0, //0: center 1: left 2: right

			clAppPrivacyFirst: ["用户协议", App.config('html5.agreement')], // 2 item, name and url
			clAppPrivacySecond: ["隐私政策", App.config('html5.privacy')], // 2 item, name and url

			clCheckBoxVerticalAlignmentToAppPrivacyCenterY: true,
			clCheckBoxSize: [30 * screenScale, 30 * screenScale], //2 item, width and height
			clCheckBoxImageEdgeInsets: [2 * screenScale, 10 * screenScale, 13 * screenScale, 5 * screenScale], //4 item, top left bottom right
			clCheckBoxUncheckedImage: "static/img/member/checkBoxNor.png",
			clCheckBoxCheckedImage: "static/img/member/checkBoxSEL.png",

			clLoadingSize: [50, 50], //2 item, width and height
			clLoadingTintColor: [0.2, 0.8, 0.2, 1],
			clLoadingBackgroundColor: [1, 1, 1, 1],
			clLoadingCornerRadius: 5,

			//竖屏布局对象
			clOrientationLayOutPortrait: {

				//控件
				clLayoutLogoWidth: clLayoutLogoWidth_Portrait,
				clLayoutLogoHeight: clLayoutLogoHeight_Portrait,
				clLayoutLogoCenterX: clLayoutLogoCenterX_Portrait,
				clLayoutLogoTop: clLayoutLogoTop_Portrait,

				clLayoutPhoneCenterY: clLayoutPhoneCenterY_Portrait,
				clLayoutPhoneHeight: clLayoutPhoneHeight_Portrait,
				clLayoutPhoneLeft: clLayoutPhoneLeft_Portrait,
				clLayoutPhoneRight: clLayoutPhoneRight_Portrait,

				clLayoutLoginBtnCenterY: clLayoutLoginBtnCenterY_Portrait,
				clLayoutLoginBtnHeight: clLayoutLoginBtnHeight_Portrait,
				clLayoutLoginBtnLeft: clLayoutLoginBtnLeft_Portrait,
				clLayoutLoginBtnRight: clLayoutLoginBtnRight_Portrait,

				clLayoutAppPrivacyLeft: clLayoutAppPrivacyLeft_Portrait,
				clLayoutAppPrivacyRight: clLayoutAppPrivacyRight_Portrait,
				clLayoutAppPrivacyBottom: clLayoutAppPrivacyBottom_Portrait,
				clLayoutAppPrivacyHeight: clLayoutAppPrivacyHeight_Portrait,

				clLayoutSloganLeft: clLayoutSloganLeft_Portrait,
				clLayoutSloganRight: clLayoutSloganRight_Portrait,
				clLayoutSloganHeight: clLayoutSloganHeight_Portrait,
				clLayoutSloganBottom: clLayoutSloganBottom_Portrait,
			},

			//自定义控件
			widgets: {
				widget0: {
					widgetId: "customView_two", //字符标记
					type: "TextView", // 类型：Button：按钮，ImageView:图片 TextView:文本
					textContent: "自定义控件文本自定义控件文本自定义控件文本自定义控件文本自定义控件文本自定义控件文本自定义控件文本", //文字
					textFont: 10, //字体
					textColor: [1, 0.5, 0.6, 1], //文字颜色[r,g,b,a]
					backgroundColor: [0, 1, 0, 1], //控件背景色[r,g,b,a]
					numberOfLines: 0, //行数：默认单行， 0:无限，自动换行，其他：指定行数
					textAlignment: 2, //0: center 1: left 2: right //仅TextView有效

					clLayoutLeft: 80,
					// clLayoutTop:60,
					clLayoutRight: -80,
					clLayoutBottom: -120,
					// clLayoutWidth:150,
					clLayoutHeight: 60,
					// clLayoutCenterX:0,
					// // clLayoutCenterY:0,
				}
			},
		}
	}
}

export default themes

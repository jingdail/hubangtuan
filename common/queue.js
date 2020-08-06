/**
 * 队列封装
 * @author maxd
 * @date 2019.8.1
 */
module.exports = {
	//微信的appId
	getWxAppid() {
		return uni.getStorageSync("weixinAppid") ? uni.getStorageSync("weixinAppid") : ''
	},
	//淘宝的appid
	getTaoBaoAppid() {
		return uni.getStorageSync("taobaoAppid") ? uni.getStorageSync("taobaoAppid") : ''
	},
	//淘宝的Secret
	getTaoBaoSecret() {
		return uni.getStorageSync("taobaoSecret") ? uni.getStorageSync("taobaoSecret") : ''
	},
	//淘宝h5授权地址
	getTaoBaoRedirect() {
		return uni.getStorageSync("taobaoUrl") ? uni.getStorageSync("taobaoUrl") :
			'https://www.gomyorder.cn/pages/member/publisher'
	},
	//好单库接口淘宝名 必须英文的 tb_name
	getTaoBaoName() {
		return uni.getStorageSync("taobaoName") ? uni.getStorageSync("taobaoName") : ''
	},
	//淘宝设置的PID
	getTaoBaoPid() {
		return uni.getStorageSync("taobaoPid") ? uni.getStorageSync("taobaoPid") : ''
	},
	//好单库Key
	getTaoBaoKey() {
		return uni.getStorageSync("haodankuKey") ? uni.getStorageSync("haodankuKey") : ''
	},
	//全局邀请码
	getInvitation() {
		return uni.getStorageSync("publicRelation") ? uni.getStorageSync("publicRelation") : ''
	},
	//获取拼多多商城地址
	getPingDuoDuo(){
		return uni.getStorageSync("pinduoduo") ? uni.getStorageSync("pinduoduo") : 'https://mobile.yangkeduo.com/duo_cms_mall.html?pid=8948958_104234125&cpsSign=CM_190809_8948958_104234125_05e68780da621fd572b728c3ae1ee027&range_items=1%3A0%3A10000%2C2%3A10%3A1000&duoduo_type=2'
	},
	//获取拼多多默认地址
	getPingDuoDuoPid(){
		return uni.getStorageSync("pinduoduopid") ? uni.getStorageSync("pinduoduopid") : ''
	},
	//京东默认pid
	getJDPid(){
		return uni.getStorageSync("jingdongpid") ? uni.getStorageSync("jingdongpid") : ''
	},
	//获取APP下载地址
	getAppDownUrl(){
		return uni.getStorageSync("appurl") ? uni.getStorageSync("appurl") : ''
	},
	//全局域名 部分html中需要单独替换 需要修改config中的网络请求域名
	publicYuMing() {
		return 'https://www.gomyorder.cn'
	},
    isLogin(){
		//判断缓存中是否登录过，直接登录
		try {
			const value = uni.getStorageSync('setUserData0');
			if (value) {
				//有登录信息
				console.log("已登录用户：",value);
				_this.$store.dispatch("setUserData",value); //存入状态
				console.log('开始跳转')
				// uni.reLaunch({
				// 	url: '../../../pages/index',
				// });
			}else{
				console.log('需要登录');
				uni.reLaunch({
					url: '/pages/login/login',
				});
				// this.setData("setUserData",'zhang');
			}
		} catch (e) {
			console.log(e);
		}
	},
	logout() {
		this.remove("username");
		this.remove("avatarUrl");
		this.remove("token");
		this.remove("phone");
	},
	loginClear() {
		this.remove("username");
		this.remove("avatarUrl");
		this.remove("token");
		this.remove("phone");
		this.remove("qianTime");
		
	},
	showLoading(title) {
		uni.showLoading({
			title: title
		});
	},
	showToast(title) {
		uni.showToast({
			title: title,
			mask: false,
			duration: 2000,
			icon: "none"
		});
	},	
	setJson: function(key, value) {
		let jsonString = JSON.stringify(value);
		try {
			uni.setStorageSync(key, jsonString);
		} catch (e) {
			// error
		}
	},
	setData: function(key, value) {
		try {
			uni.setStorageSync(key, value);
		} catch (e) {
			// error
		}
	},
	getData: function(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return value;
			}
		} catch (e) {
			// error
		}

	},
	getJson: function(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return JSON.parse(value);
			}
		} catch (e) {
			// error
		}

	},
	clear: function() {
		uni.clearStorage();
	},
	get: function(key) { //获取队列里面全部的数据
		let data = this.getJson(key);
		if (data instanceof Array) {
			return data;
		}
		return [];
	},
	insert: function(param) { //队列插入数据
		param.capacityNum = param.capacityNum || 100; //队列容量 默认队列中超过100条数据，自动删除尾部
		let data = this.getJson(param.key);
		if (data instanceof Array) {
			if (data.length > param.capacityNum) {
				let total = data.length - param.capacityNum;
				for (let i = 0; i < total; i++) {
					data.pop();
				}
			}
			data.unshift(param.value);
		} else {
			data = [];
			data.push(param.value);
		}
		this.setJson(param.key, data);
	},
	removeItem: function(key, itemIds) { //提供itemIds数组 批量删除队列中的某项数据
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let i = 0; i < itemIds.length; i++) {
				for (let p = 0; p < data.length; p++) {
					if (itemIds[i] === data[p].itemid) {
						data.splice(p, 1);
						break;
					}
				}
			}
			this.setJson(key, data);
		}
	},
	isExist: function(key, itemId) { //检测某条数据在队列中是否存在
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let p = 0; p < data.length; p++) {
				if (itemId === data[p].itemid) {
					return true;
				}
			}
		}
		return false;
	},
	isExistPdd: function(key, itemId) { //检测某条数据在队列中是否存在
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let p = 0; p < data.length; p++) {
				if (itemId === data[p].goodsId) {
					return true;
				}
			}
		}
		return false;
	},
	isExistJd: function(key, itemId) { //检测某条数据在队列中是否存在
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let p = 0; p < data.length; p++) {
				if (itemId === data[p].skuId) {
					return true;
				}
			}
		}
		return false;
	},
	remove: function(key) { //删除某条队列
		try {
			uni.removeStorageSync(key);
			//localStorage.removeItem(key)
		} catch (e) {
			// error
		}
	},
	getCount: function(key) { //获取队列中全部数据数量

		let data = this.getJson(key);
		if (data instanceof Array) {
			return data.length;
		}
		return 0;
	},
	getCurrentDate:function(format) {
	      var now = new Date();
	      var year = now.getFullYear(); //得到年份
	      var month = now.getMonth();//得到月份
	      var date = now.getDate();//得到日期
	      var day = now.getDay();//得到周几
	      var hour = now.getHours();//得到小时
	      var minu = now.getMinutes();//得到分钟
	      var sec = now.getSeconds();//得到秒
	      month = month + 1;
	      if (month < 10) month = "0" + month;
	      if (date < 10) date = "0" + date;
	      if (hour < 10) hour = "0" + hour;
	      if (minu < 10) minu = "0" + minu;
	      if (sec < 10) sec = "0" + sec;
	      var time = "";
	      //精确到天
	      if(format==1){
	        time = year + "-" + month + "-" + date;
	      }
	      //精确到分
	      else if(format==2){
	        time = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
	      }
	      return time;
	}
	
};

import Vue from 'vue'
import App from './App'


// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

import $http from '@/js_sdk/zhouWei-request/requestConfig';
Vue.prototype.$http = $http;


import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'

import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;
Vue.prototype.$Api = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;


/* 登录状态检查
 * backpage, backtype 2个参数分别代表：
 * backpage : 登录后返回的页面
 * backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
 * 返回:已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户头像]
 */

Vue.prototype.checkLogin = function(backpage, backtype){
	var xdpName  = uni.getStorageSync('username');
	var xdpAvatarUrl = uni.getStorageSync('avatarUrl');
	var xdpToken = uni.getStorageSync('token');
	var xdpPhone = uni.getStorageSync('phone');
	if(xdpName == '' || xdpAvatarUrl == '' || xdpToken == '' || xdpPhone == ''){
		uni.navigateTo({url:'/pages/login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return [xdpName, xdpAvatarUrl, xdpToken, xdpPhone];
}
/*  */
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

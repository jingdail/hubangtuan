import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
    	hasLogin: false, // 登录状态
    	userInfo:{}
    },
    mutations: {
		login(state, provider) {
			console.log("登录了");
			console.log(provider)
			state.hasLogin = 1;
			console.log(state.hasLogin);
			state.userInfo = provider
			uni.setStorage({
				key:"userInfo",
				data:provider
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.openid = null;
			state.userinfo = {};
			uni.removeStorage({
				key:"userInfo"
			})
		}
	},
    actions: {}
})
export default store
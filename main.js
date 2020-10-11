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
import helper from "@/common/helper.js"
import store from './store'
//把vuex定义成全局组件


Vue.config.productionTip = false

// Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;
Vue.prototype.$Api = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;
Vue.prototype.$store = store
Vue.prototype.$Helper = helper



/*  */
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

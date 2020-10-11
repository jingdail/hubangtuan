	 
import helper from '@/common/helper.js';

const cateList = async function() {

	var res = await  getApp().globalData.request.get("https://api.hubangtuan.cn/json/categories.json", {
		pid: 0
	});
    console.log(res)
	// if (res.code && res.code == 200) {
        if (200) {
		var catedata = [];
		catedata.push({
			id: 0,
			title: '推荐',
			data: [],
			page: 1,
			limit: 20,
			refreshing: false,
			refreshFlag: false,
			refreshText: "",
			isLoading: false,
			loadingText: '加载中...',
			showHeader: true
		});
		res.categories.forEach(item => {
			catedata.push({
				id: item.typeid,
				title: item.name,
				data: [],
				page: 1,
				limit: 20,
				refreshing: false,
				refreshFlag: false,
				refreshText: "",
				isLoading: false,
				loadingText: '加载中...',
				showHeader: true
			})
		});
		 getApp().globalData.cache.put('appNvueGoodsCates', catedata, 43200);
		return catedata;
	} else {
		return []
	}
}

/**
 * 获取首页banner下方宫格小菜单
 */
const bannerAdvertLower = async function() {
	var res = await  getApp().globalData.request.post("index/navlist", {
		limit: 80
	});
	if (res.code && res.code == 200) {
		var navdata = helper.arrayToNewArray(res.data, 10);
		return navdata;
	} else {
		return []
	}
}

/**
 * 获取首页banner广告
 */
const bannerAdvert = async function() {
	var res = await  getApp().globalData.request.post("index/banner");
	if (res.code && res.code == 200) {
		return res.data;
	} else {
		return []
	}
}

/**
 * 获取达人文章
 */
const darenList = async function() {
	var res = await  getApp().globalData.request.post("daren/toplist");
	if (res.code && res.code == 200) {
		return res.data;
	} else {
		return []
	}
}

const setClipboardData = function(str) {
	helper.setClipboardData(str)
}


const loadAppTopBanner = async function(hasLogin = false) {
	console.log(hasLogin)
	var pdata = {
		action: 'home_top',
		limit: 1,
		hasLogin: hasLogin ? 1 : 2
	};
	var res = await  getApp().globalData.request.post("index/banner", pdata);
	if (res.code && res.code == 200) {
		return res.data;
	} else {
		return []
	}
}

const getHomeTopIcon = async function(){
	var res = await  getApp().globalData.request.post("config/getHomeTopIcon", {});
	console.log(res);
	return res.data;
}
export default {
	cateList: cateList,
	bannerAdvertLower: bannerAdvertLower,
	bannerAdvert: bannerAdvert,
	darenList: darenList,
	setClipboardData: setClipboardData,
	loadAppTopBanner: loadAppTopBanner,
	getHomeTopIcon:getHomeTopIcon
}


 /*[
				{
					nodeCount: 1,
					bgImg: 'http://images.huasheng100.com/public/1569299154841657.gif',
					height: 178,
					width: 750
				},
				{
					bgImg: 'linear-gradient(to top, #44b2ed, #44b2ed);',
					height: 184,
					width: 750,
					nodeCount: 2,
					nodeDTOList: [
						{
							posImage: 'http://images.huasheng100.com/public/1569298826577723.png',
							height: 184,
							width: 360
						},
						{
							posImage: 'http://images.huasheng100.com/public/1569298830018655.png',
							height: 184,
							width: 360
						}
					]
				},
				{
					nodeCount: 3,
					bgImg: 'linear-gradient(to top, #44b2ed, #44b2ed);',
					height: 253,
					width: 750,
					nodeDTOList: [
						{
							posImage: 'http://images.huasheng100.com/public/1569298987273128.png',
							height: 253,
							width: 240
						},
						{
							posImage: 'http://images.huasheng100.com/public/1569298989733809.png',
							height: 253,
							width: 240
						},
						{
							posImage: 'http://images.huasheng100.com/public/1569298992856530.png',
							height: 253,
							width: 240
						}
					]
				},
				{
					nodeCount: 1,
					bgImg: 'http://images.huasheng100.com/public/1569299116772690.jpg',
					height: 35,
					width: 750,
					nodeDTOList: [
						{
							posImage: 'http://images.huasheng100.com/public/1569299119941853.png',
							height: 35,
							width: 750
						}
					]
				}
			] */
		
<template>
	<view>
		<!-- 菜单 -->
		<view class="top-warp">
			<me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange" :tab-width="140" :height="80"></me-tabs>
		</view>
		
		<!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		 <mescroll-body ref="mescrollRef" @init="mescrollInit"  @down="downCallback" :top="80" :up="upOption"  @up="upCallback" @emptyclick="emptyClick">
			<!-- 数据列表 --> 
			<good-list :list="dataList"></good-list>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				upOption:{
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10// 每页数据的数量
					},
					noMoreSize: 4, 
					empty:{
						tip: '~ 暂无数据 ~', // 提示
						btnText: '发布任务'
					}
				},
				dataList: [], //列表数据
				tabs: ['推荐','拼多多','京融','百度','快手','京喜','淘宝','自定义'],
				tabndex: ['0','1','4','6','8','10','12','14'],
				tabIndex: 0 ,// tab下标
				cateid:0
			}
		},
		methods: { 
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				
				var that = this;
				var url = this.$Api('list');
				this.$http.get(url,{page:pageNum,typeid:this.cateid},{isFactory: false}).then(function (res) {
					// 接口返回的当前页数据列表 (数组)
					console.log("okok");
					console.log(res)
					let curPageData = res.data.data
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length; 
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					// let totalPage = 100; 
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = res.list_num; 
					// let totalSize = 10000;
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = data.xxx;					
					if(page.num == 1) that.dataList = []; //如果是第一页需手动置空列表					
					that.dataList = that.dataList.concat(curPageData); //追加新数据											
					that.mescroll.endBySize(curPageLen, totalSize); 					
				}).catch(function (error) {
				    //这里只会在接口是失败状态返回，不需要去处理错误提示
				    console.log(error);
					// this.mescroll.endErr()
				});
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.switchTab({
					url:'../fabu/fabu'
				})
			},
			
			
			formatNum(e){
				return (e/100);
			},
			gobuy(e){
				uni.navigateTo({
					url:'./detail?query=' + encodeURIComponent(JSON.stringify(e))
				})
			},
			realPrice(a,b){
				var c = a-b;
				return (c/100);
				
			},
			tabChange(e) {
				this.cateid = this.tabndex[e]
				this.dataList = []// 先置空列表,显示加载进度
				this.mescroll.resetUpScroll() // 再刷新列表数据
			}
		}
	}
</script>

<style>
	.goods-box{
		display: flex;
		justify-content: flex-start;
		margin: 20upx;
		background: #fff;
		padding: 20upx;
		
	}
	.goods-box .itempic{
		width: 30%;
		height: 200upx;
	}
	.goods-box .itempic image{
		width: 200upx;
		height: 200upx;
	}
	.itemcontent{
		padding-left: 20upx;
	}
	.top-warp{
		z-index: 9990;
		position: fixed;
		top: --window-top; /* css变量 */
		left: 0;
		width: 100%;
		height: 80upx;
		background-color: white;
	}
	.top-warp .tip{
		font-size: 28upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
	}
	.price{
		margin-top: 20upx;
		color: #252525;
		font-size: 30upx;
	}
	.realPrice{
		color: #FF5000;
		font-size: 34upx;
	}
	.buybox{
		display: flex;
		justify-content:space-between;
		align-items: center;
		
	}
	.gobuy{
		background-color: #FF5000;
		color: #fff;
		font-size: 30upx;
		padding: 10upx 40upx;
		border-radius: 5px;
		
	}
</style>

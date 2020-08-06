<template>
	<view>
		<!-- 菜单 -->
		<view class="top-warp">
			<me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange" :tab-width="140" :height="80"></me-tabs>
		</view>
		
		<!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		 <mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" @down="downCallback" :up="upOption" :top="80" @up="upCallback" @emptyclick="emptyClick">
			<!-- 数据列表 --> 
			<view class="goods-box" v-for="(item,index) in dataList" :key="item.itemid">
				<view class="itempic">
					<image :src="item.itempic" mode="aspectFit"></image>
				</view>
				<view class="itemcontent">
					<view class="">
						{{item.itemtitle}}
					</view>
					<view class="price">
						{{item.itemprice}}
					</view>
				</view>
			</view>
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
						size: 20// 每页数据的数量
					},
					noMoreSize: 4, 
					empty:{
						tip: '~ 搜索无数据 ~', // 提示
						btnText: '去看看'
					}
				},
				dataList: [], //列表数据
				tabs: ['男装','女装','美妆','手机','食品','数码','电器'],
				tabIndex: 0 ,// tab下标
				cateid:0//当前分类ID
			}
		},
		onReady() {
			uni.showTabBarRedDot({
				index:3,
				success() {					
				},
				fail() {
					console.log('blue')
				}
			})
		},
		methods: { 
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				var url ='https://www.gomyorder.cn/tao/commodity/selectCommodityList?page=0&size=10'
				var that = this;
				
				this.$http.get(url,{pid:0},{isFactory: false}).then(function (res) {
					// 接口返回的当前页数据列表 (数组)
					console.log(res)
					let curPageData = res.data.data.content
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length; 
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					// let totalPage = data.xxx; 
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = res.data.list_num; 
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
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
			
			// 切换菜单
			tabChange(e) {			
				this.cateid = this.tabs[e].typeid
				this.dataList = []// 先置空列表,显示加载进度
				this.mescroll.resetUpScroll() // 再刷新列表数据
			},
			onLoad() {
				
				// 需要固定swiper的高度uni.showTabBarRedDot(OBJECT)
				this.height = uni.getSystemInfoSync().windowHeight + 'px';				
				var url = this.$Api('category');
				var that = this;
				
				let category = uni.getStorageSync('category')	
				console.log(category)
				if(category){
					// that.tabs = category
					// that.tabs = category.data.categories;					
				}else{
					this.$http.get(url,{pid:0},{isFactory: false}).then(function (res) {						
						uni.setStorageSync('category',JSON.stringify(res))		
						console.log(res)
						// that.tabs = res.data.categories;
					    //这里只会在接口是成功状态返回
					}).catch(function (error) {
					    //这里只会在接口是失败状态返回，不需要去处理错误提示
					    console.log(error);
					});
				}
				
				/*
				var socketOpen = false;
				    var socketMsgQueue = [];
				     
				    uni.connectSocket({
				      url: 'ws://122.152.221.74:8282', 
					  success:function(e){
					  	console.log(e)
					  },
					  fail:function(e){
					  	console.log(e)
					  }
				    });
				     
				    uni.onSocketOpen(function (res) {
					  console.log('WebSocket连接已打开！');
				      socketOpen = true;
				      for (var i = 0; i < socketMsgQueue.length; i++) {
				        sendSocketMessage(socketMsgQueue[i]);
				      }
				      socketMsgQueue = [];
				    });
					
				     uni.onSocketMessage(function (res) {
				           console.log('收到服务器内容：' + res.data);
				    });
					 uni.onSocketError(function (res) {
						console.log('WebSocket连接打开失败，请检查！');
						console.log(res)
					});
				    function sendSocketMessage(msg) {
				      if (socketOpen) {
				        uni.sendSocketMessage({
				          data: msg
				        });
				      } else {
				        socketMsgQueue.push(msg);
				      }
				    }
					uni.onSocketClose(function (res) {
					  console.log('WebSocket 已关闭！'); 
					  uni.closeSocket();
					});
				*/
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
		color: #FF5000;
		font-size: 36upx;
	}
</style>

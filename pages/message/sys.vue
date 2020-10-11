<template>
	<view class="container"> 
		<mescroll-body ref="mescrollRef" @init="mescrollInit"  @down="downCallback" :up="upOption"  @up="upCallback" @emptyclick="emptyClick">
		
		<view class="message-box" v-for="(item,i) in dataList" :key="i">
			<view class="message-header">
				<view class="left">
					<image src="../../static/logo.png" mode=""></image>
					<text>公告</text>
				</view>
				<view class="date">{{item.date}}</view>
				
			</view>
			<view class="">
				<view class="title">{{item.title}}</view>
				<view class="content">
					{{item.content}}
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
						size: 10// 每页数据的数量
					},
					noMoreSize: 4, 
					empty:{
						tip: '~ 搜索无数据 ~', // 提示
						btnText: '去看看'
					}
				},
				dataList: [],
				TotalGold:0,
				today_jinbu:0
				
			}
		},
		onLoad() {},
		methods: { 
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// this.$Api('jinbi')
				// var url = 'https://api.hubangtuan.cn/index/notice/page/'+pageNum;
				var url = this.$Api('notice')+"page/"+pageNum
				console.log(url)
				var that = this;
				this.$http.get(url,{},{isFactory: false}).then(function (res) {
					// 接口返回的当前页数据列表 (数组)
					console.log(res)
					
					let curPageData =res.data.data
					
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
			tixian:function(){
				uni.navigateTo({
					url:'/pages/member/tixian'
				})
			},
			chongzhi:function(){
				uni.navigateTo({
					url:'/pages/member/chongzhi'
				})
			}
		}
	}
</script>

<style>
	.container{		
		margin: 20upx;
	}
	.message-box{		
		width: 100%;
		padding: 20upx 30upx;
		margin-bottom: 20upx;
		background-color: #fff;
	}
	.message-header{
		display: flex;
		justify-content:space-between;
		align-items: center;
		width: 98%;
		
	}
	.message-header image{
		width: 70upx;
		height: 70upx;
	}
	.message-header .left{
		display: flex;
		align-items: center;		
	}
	.left text{
		font-size: 30upx;
		margin-left: 20upx;
		color: #282828;
	}
	.date{		
		color: #979797;
		font-size: 22upx;
		text-align: center;
	}
	.title{
		font-size: 32upx;
		color: #282828;
		padding: 30upx 0;
		font-weight: bold;
	}
	.content{
		color: #282828;
		font-size: 28upx;
		line-height: 1.8;
		
	}
</style>

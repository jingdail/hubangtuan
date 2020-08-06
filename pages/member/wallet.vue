<template>
	<view>
		<view class="bg">
			<view class="wallet-box">
				<view class="goldNum">
					<text class="jinbi">{{TotalGold}}</text>
					<view class="span">我的金币(个)</view>
					<view class="btn" @click="tixian()">可提现0.0元</view>
				</view>
				<view class="goldNum">
					<text class="jinbi">25</text>
					<view class="span">今日金币(个)</view>
					<view class="btn" @click="chongzhi()">立即充值</view>
				</view>
			</view>
		</view>
		<view class="mingxiTitle"><text class="cuIcon-move"></text>明细<text class="cuIcon-move"></text></view>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit"  @down="downCallback" :up="upOption"  @up="upCallback" @emptyclick="emptyClick">
			<!-- 数据列表 --> 
			<view class="mingxiList" v-for="(item,i) in dataList" :key="i">
				<view class="item">
					<text>{{item.msg}}</text>
					<view class="date">{{item.date}}</view>
				</view>
				<view class="gold">
					<image src="../../static/money_icon_gold.png" mode=""></image>
					+{{item.jbnum}}
					</view>
			</view>
			
		</mescroll-body>
		
		
	</view>
</template>


<style>
	page{background-color: #fff;}
	.wallet-box{		
		border-radius: 5px;
		height: 140px;
		background: #fff;
		width: 95%;	
		display: flex;		
		margin: 0 auto;
		align-items: center;
		justify-content: space-between;		
	}
	.goldNum{
		text-align: center;
		color: #333;
		width: 50%;
		font-size: 16px;	
		position: relative;		
	}
	.goldNum:last-child{
		border-left: 0.5px solid #E7E7E9;
	}
	.goldNum .span{
		margin-top: 10px;
		color: #CFCFCF;
		font-size: 10px;
	}
	.jinbi{
		font-size: 34upx;
	}
	.goldNum .btn{
		background-color: #FF5000;
		color: #fff;
		width: 80%;
		padding: 10px;
		border-radius: 20px;
		position: absolute;
		left: 10%;
		top:  70px;	
		box-shadow: 0 0 16upx rgba(255,80,0, .3);
	}
	.goldNum text{
		font-size: 36upx;
		color: #282828;
	}
	.mingxiTitle{
		text-align: left;
		font-size: 36upx;
		padding-left: 30px;
		padding: 10px;
		margin-top: 50px;
		text-align: center;
	}
	
	.mingxiList{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10px;
		border-bottom: 0.5px solid #eee;
	}
	.mingxiList .item{padding: 10px;}
	.mingxiList text{
		font-size: 10px;
		color: #282828;
	}
	.mingxiList .date{
		font-size: 12px;
		margin-top: 5px;
		color: #979797
	}
	.gold{
		color: #FF5000;
		font-size: 28upx;
		display: flex;
		align-items: center;
	}
	.gold image{
		width: 40upx;
		height: 40upx;
		margin: 10upx;
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
</style>
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
				TotalGold:0
				
			}
		},
		onLoad() {
			var that = this;
			this.$http.get(this.$Api('my'),{},{isFactory: false})
			.then(function (response) {				
				that.TotalGold = response.data.data.jinbi
			}).catch(function (error) {
			    //这里只会在接口是失败状态返回，不需要去处理错误提示
			    console.log(error);
			});
		},
		methods: { 
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				var url = this.$Api('jinbi')+'/page/'+pageNum;
				var that = this;
				this.$http.get(url,{},{isFactory: false}).then(function (res) {
					// 接口返回的当前页数据列表 (数组)
					console.log(res)
					let curPageData = res.data.data
					console.log(res)
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
<template>
	<view>
		
		<!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		 <mescroll-body ref="mescrollRef" @init="mescrollInit"  @down="downCallback" :up="upOption"  @up="upCallback" @emptyclick="emptyClick">
			
			<view class="pd-list">
				<block v-for="(item,index) in dataList" :key="item.id">
					<view class="pd-li">
						<!-- <view class="flag">优质</view> -->
						<view>
							<image class="pd-img" :src="item.avatarurl" mode="widthFix" />				
						</view>
						<view class="works-content">
							<view class="pd-name">{{item.title}}</view>
							<text class="pd-tag">剩余数量：<text class="shengyu">{{item.done_num}}/</text>{{item.num}}</text>
								
						</view>
						<view class="incr-gold">
							+{{ item.price}}
						</view>						
					</view>
					
					<view class="action-box" style="margin: 0 10px;background-color: #fff;padding: 10px;">
						<view class="btn" @click="closeRenwu(1,item.id)">关闭任务</view>
						<view class="btn" @click="setTop(2)">置顶推荐</view>
						<view class="btn" @click="goShenhe(item.id)">去审核</view>
					</view>
				</block>
				
				
			</view>
			
			
			<!-- 数据列表 --> 
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";	
	import RenwuList from "@/components/renwu/renwu-list.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			RenwuList
		},
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
				tabs: [],
				tabIndex: 0 ,// tab下标
				cateid:0,//当前分类ID
				info:"close"
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
			closeRenwu(e,id){
				var that = this;
				var url = 'https://api.hubangtuan.cn/my/infoclose/close/1/id/'+id;
				this.$http.get(url,{},{isFactory: false}).then(function (res) {
					that.$queue.showToast('已关闭');
					
				}).catch(function (error) {
				    
				    console.log(error);
					
				});
				
			},
			goShenhe(id){				
				uni.navigateTo({url:'/pages/member/shenheList?id='+id});
			},
			setTop(e) {		
				var that = this;
				this.$http.get(this.$Api('my'),{},{isFactory: false})
				.then(function (response) {					
					that.jinbi = response.data.data.jinbi
				}).catch(function (error) {				    
				    console.log(error);
				}); 
				
				if(that.jinbi<1000){
					uni.showModal({
						title: '金币不足',
						content: '',
						confirmText:"前去充值",
						success: function (res) {						
							if (res.confirm) {
								uni.navigateTo({url:'/pages/member/chongzhi'});
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					this.$queue.showToast('已置顶');
				}
			
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				var url = this.$Api('myinfo')+'page/'+pageNum;
				var that = this;
				this.$http.get(url,{},{isFactory: false}).then(function (res) {
					// 接口返回的当前页数据列表 (数组)					
					let curPageData = res.data.data
					console.log(curPageData)
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
			}
		}
	}
</script>

<style>
	/*数据列表*/
	.pd-list {
		background-color: #F2F2F2;
		// padding: 8upx;
	}
	
	.pd-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		border-radius: 3px;
		padding: 25upx;
		/* margin-bottom: 8px; */
		// border-bottom: 0.5upx solid $uni-line-color;
		margin: 10px;
		margin-bottom: 0;
		position: relative;
	}
	.action-box,.header{
		display: flex;
		justify-content: space-between;		
	}
	.btn{
		border-radius: 3px;
		border: 0.5px solid #FF5000;
		padding: 8upx 20upx;
		color: #FF5000;
	}
	.pd-li .flag {
		background-color: $uni-base-color;
		color: #fff;
		font-size: 10px;
		position: absolute;
		right: 20upx;
		top: 0;
		padding: 3upx;
		border-radius: 0 0 3upx 3upx;
	}
	
	.pd-li .pd-img {
		width: 90upx;
		height: 90upx;
		border-radius: 1000px;
	
	}
	
	.pd-li .works-content {
		justify-content: flex-start;		
		width: 70%;
		padding-left: 25upx;
	}
	
	.pd-li .pd-name {
		font-size: $font-base;
		overflow: hidden;
		text-align: left;
		color: #333;
		margin-bottom: 10px;
		text-overflow: clip;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.pd-li .pd-tag {
		font-size: $font-sm;
		color: $uni-font-color-base;
	}
	
	.pd-li .incr-gold {
		/* margin-left: 16upx; */
		color:#FF5000;
		font-size: 18px;
		
	
	}
	
	.pd-li .shengyu {
		color: $uni-base-color;
	
	}
	.border-bottom{
		height: 1px;
		background-color: #282828;
	}
	
</style>

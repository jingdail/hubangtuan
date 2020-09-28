<template>
	<view>
		
		
		<!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		 <mescroll-body ref="mescrollRef" @init="mescrollInit" top="0" @down="downCallback" :up="upOption" :top="10" @up="upCallback" @emptyclick="emptyClick">
			<!-- 数据列表 --> 
<!-- 			<good-list :list="dataList"></good-list>-->			
			<view class="shenhe">
				<view class="item"  v-for="(item,index) in dataList" :key="index">
					<view>
						<image :src="item.pic" mode="" @click="previewImage(item.pic)"></image>
						<view>
							bun
						</view>
					</view>
					<!-- <view class="">{{item.nickname}}</view> -->
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
				tabs: ['全部', '待提交', '审核中','未通过','已完成'],
				tabIndex: 0 ,// tab下标
				cateid:0,//当前分类ID,
				id:0
			}
		},
		onLoad(option){
			this.id = option.id
			console.log(this.id);
		},		
		methods: { 
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				var url = this.$Api('donelist');
				var that = this;
				this.$http.get(url,{page:pageNum,id:that.id},{isFactory: false}).then(function (res) {
					// 接口返回的当前页数据列表 (数组)
					console.log(res)
					let curPageData = res.data.data
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
			previewImage: function(image) {
				uni.previewImage({
					urls: [image],
					current: 0
				})
			}
			
		}
	}
</script>

<style>
	.shenhe{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
	.shenhe .item{
		width: 50%;
		height: 450px;
		display: flex;
		justify-content: center;
		
		
	}
	.shenhe image{
		width: 360upx;
		height: 400px;
		margin: 0 auto;
	}
</style>

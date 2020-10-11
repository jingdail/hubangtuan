<template>
	<view>
		<!-- 菜单 -->
		<view class="top-warp">
			<me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange" :tab-width="140" :height="80"></me-tabs>
		</view>
		
		<!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		 <mescroll-body ref="mescrollRef" @init="mescrollInit"  @down="downCallback" :top="80" :up="upOption"  @up="upCallback" @emptyclick="emptyClick">
			<!-- 数据列表 --> 
			<view class="goods-box" v-for="(item,index) in dataList" :key="item.goods_id">
				<view class="itempic">
					<image :src="item.goods_thumbnail_url" mode="aspectFit"></image>
				</view>
				<view class="itemcontent">
					<view class="">
						{{item.goods_name}}
					</view>
					<view class="price">
						优惠券：¥{{formatNum(item.coupon_discount)}}
						
						
					</view>
					<view class="buybox">
					<view class="realPrice">券后: ¥
					{{realPrice(item.min_group_price,item.coupon_discount)}}
					</view>
					<view class="gobuy" @tap="gobuy(item)">
						去看看
					</view>
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
				dataList: [], //列表数据
				tabs: ['百货','母婴','食品','女装','电器','鞋包','内衣','美妆','男装','水果','家纺','文具','运动','虚拟','汽车','家装','家具','医药'],
				tabndex: ['15','4','1','14','18','1281','1282','16','743','13','18','2478','1451','59909','2048','1917','2974','3279'],
				tabIndex: 0 ,// tab下标
				cateid:15
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
				var url ='http://hubangtuan.cn/pddapi/ddk.php?act=list&page='+page.num+"&cateid="+this.cateid
				console.log(url)
				var that = this;
				
				this.$http.get(url,{pid:0},{isFactory: false}).then(function (res) {
					// 接口返回的当前页数据列表 (数组)
					console.log(res)
					let curPageData = res.data.goods_search_response.goods_list
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length; 
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					// let totalPage = 100; 
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					// let totalSize = res.data.list_num; 
					let totalSize = 10000;
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
			
			
			formatNum(e){
				return (e/100);
			},
			gobuy(e){
				uni.navigateTo({
					url:'./goodsdetail?query=' + encodeURIComponent(JSON.stringify(e))
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

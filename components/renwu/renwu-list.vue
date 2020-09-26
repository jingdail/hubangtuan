<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view>
		<!-- @tap="ToDetail(item) -->
		<view class="renwu"  v-for="(item,index) in list" :key="index">
			<view class="logo">
				<image :src="item.avatarurl" mode=""></image>
			</view>
			<view class="content">
				<view class="header">
					<view class="title">
					
					{{item.nickname}}
					
					</view>
					
				</view>
				<view class="renwu-item">
					<view class="">{{item.title}}</view>
					<view class="">{{item.price}}</view>
					<view class="done-num">{{item.done_num}}/{{item.num}}</view>
				</view>
				<view class="action-box">
					<view class="btn" @click="closeRenwu(1,item.id)">关闭任务</view>
					<view class="btn" @click="actionMenu(2)">置顶推荐</view>
					<view class="btn" @click="goShenhe(item.id)">去审核</view>
				</view>
			</view>
		</view>
		<view class="border-bottom"></view>
	</view>
</template>

<script>
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			}
		},
		onLoad(){
			console.log(this.list)
		},
		methods: {
			closeRenwu(e,id){
				uni.request({
					url:'https://api.hubangtuan.cn/my/infoclose/close/1/id/'+id,
					success:function(result){
						console.log(result)
					}
				})
			},
			goShenhe(id){
				uni.navigateTo({
					url:'/pages/member/shenheList?id='+id
				})
			},
			ToDetail(e) {				
				uni.navigateTo({
					url: '/pages/index/detail?query=' + encodeURIComponent(JSON.stringify(e))
				}); 
			
			}
		}
	}
</script>

<style lang="scss">
	.renwu-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 50upx 0; 
	}
	.renwu{
		position: relative;
		background-color: #fff;
		display: flex;
		justify-content: flex-start;		
		margin: 20upx;
		padding: 20upx 20upx;
		
	}
	.border-bottom{
		position: absolute;
		height: 1px;
		background-color: #000;
	}
	.content{		
		flex: 8
	}
	.logo{
		flex:1
	}
	.logo image{
		width: 50upx;
		height: 50upx;
	}
	.header{
		// min-height: 200upx;		
		font-weight: bold;
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
	
</style>

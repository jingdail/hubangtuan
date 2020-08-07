<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view>
		<view class="renwu"  v-for="(item,index) in list" :key="index" @tap="ToDetail(item)">
			<view class="logo">
				<image src="../../static/alipay.png" mode=""></image>
			</view>
			<view class="content">
				<view class="header">
					<view class="title">{{item.title}}</view>
					<view class="done-num">{{item.num}}</view>
				</view>
				<view class="action-box">
					<view class="" @click="actionMenu(1)">1</view>
					<view class="" @click="actionMenu(2)">1</view>
					<view class="" @click="actionMenu(3)">1</view>
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
			actionMenu(e){
				console.log(e)
				uni.showToast({
					title: ''+e+''
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
	page{
		background-color: #fff;
	}
	.renwu{
		position: relative;
		background-color: #fff;
		display: flex;
		justify-content: flex-start;		
		margin: 15upx;
		padding: 20upx 10upx;
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
		min-height: 200upx;				
	}
	.action-box,.header{
		display: flex;
		justify-content: space-between;		
	}
	
</style>

<template>
	<view class="container">
		<view class="message-box">
			<view class="message-header">
				<view class="left">
					<image src="../../static/lolo.png" mode=""></image>
					<text>公告</text>
				</view>
				<view class="date">20:06</view>
				
			</view>
			<view class="">
				<view class="title">任务审核成功</view>
				<view class="content">
					任务审核成功通知！
				</view>
			</view>
		</view>
		<view class="message-box">
			<view class="message-header">
				<view class="left">
					<image src="../../static/lolo.png" mode=""></image>
					<text>公告</text>
				</view>
				<view class="date">08/01 20:06</view>
				
			</view>
			<view class="">
				<view class="title">任务审核成功</view>
				<view class="content">
					任务审核成功通知！任务审核成功通知任务审核成功通知任务审核成功通知任务审核成功通知任务审核成功通知任务审核成功通知任务审核成功通知
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
		width: 80upx;
		height: 80upx;
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

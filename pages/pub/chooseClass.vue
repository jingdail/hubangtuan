<template>
	<view>
		<text></text>
		<view class="class-box">
			<view class="class-item"  v-for="(item,index) in categoryList" :key="item.typeid">{{item.name}}</view>
		</view>
		<view class="class-box">
			<view class="class--item"  v-for="(item,index) in categoryList[0]['subclass']" :key="item.typeid">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	export default {
		components: {
			uniSteps,
			uniIcons
		},
		data() {
			return {
				categoryList: []
			}
		},		
		onLoad() {
			
		},
		onShow() {
			var that = this;
			uni.request({
				url:this.$Api('cate'),
				success(res) {
					that.categoryList = res.data.categories
					console.log(res.data.categories)
				}
			})
		},
		computed: {},
		methods: {}
	}
</script>
<style style="">
	page {
		background-color: #F2F3F6;
	}
	.class-box{
		display: flex;		
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin: 20upx;
		padding: 20upx;
		background-color: #fff;
		margin-bottom: 30px;
	}
	.class-item{
		border-radius: 100upx;
		border: 1px solid #FF5000;
		padding: 20upx;
		text-align: center;
		font-size: 32upx;
		color: #000000;
		width: 220rpx;
		margin-bottom: 20upx;
	}
	.class--item{
		border-radius: 100upx;
		border: 1px solid #FF5000;
		padding: 20upx;
		text-align: center;
		font-size: 32upx;
		color: #000000;
		width: 300rpx;
		margin-bottom: 20upx;
	}
</style>

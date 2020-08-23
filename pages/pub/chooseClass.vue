<template>
	<view>
		<text></text>
		<view class="class-box">
<<<<<<< HEAD
			<view class="class-item"  v-for="(item,index) in categoryList" 
			:key="item.typeid"
			:class="{'active':isActive==index}"
			@tap="chooseC(index)"
			>
			{{item.name}}
			</view>
=======
			<view class="class-item"  v-for="(item,index) in categoryList" :key="item.typeid">{{item.name}}</view>
		</view>
		<view class="class-box">
			<view class="class--item"  v-for="(item,index) in categoryList[0]['subclass']" :key="item.typeid">{{item.name}}</view>
>>>>>>> cd542449e6d9d8814a804a223e7053f6853e478b
		</view>
		<view class="line-blue"></view>
		<view class="class-box" v-if="isActive<6">
			<view class="class-item sub-item"  v-for="(item,index) in categoryList[isActive]['subclass']" 
			:key="item.typeid"
			:class="{'active':issubActive==index}"
			@tap="chooseS(index)"
			>
			{{item.name}}
			</view>
		</view>
		<view class="btn" @click="next()">下一步</view>
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
				categoryList: [],
				isActive: 0,
				issubActive: 0,
				type:{
					typeid:0,
					subclassid:0
				}
			}
		},		
<<<<<<< HEAD
		onReady() {
		 this.categoryList = uni.getStorageSync('category')
		 console.log(this.categoryList)
=======
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
>>>>>>> cd542449e6d9d8814a804a223e7053f6853e478b
		},
		computed: {},
		methods: {
			chooseC(e){
				uni.showToast({
					title:'"'+e+'"'
				})
				this.isActive = e;
				this.type.typeid = e
			},
			chooseS(e){
				uni.showToast({
					title:'"'+e+'"'
				})
				this.issubActive = e;
				this.type.subclassid = e
			},
			next(){
				uni.switchTab({
					url: '/pages/fabu/fabu?query=' + encodeURIComponent(JSON.stringify(this.type))
				})
			}
		}
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
<<<<<<< HEAD
		flex-wrap: wrap;
		margin: 10px;
		padding: 10px;
		background-color: #fff;
		border-radius: 10upx;
		
=======
		margin: 20upx;
		padding: 20upx;
		background-color: #fff;
		margin-bottom: 30px;
>>>>>>> cd542449e6d9d8814a804a223e7053f6853e478b
	}
	.class-item,.sub-item{
		border-radius: 100upx;
		border: 1px solid #FF5000;
		padding: 20upx;
		text-align: center;
<<<<<<< HEAD
		font-size: 34upx;
		font-weight: bold;
		width: 200rpx;
		color: #282828;
		margin-bottom: 10px;
	}
	.sub-item{
		margin-top: 10px;
		width: 320rpx;
	}
	.class-item.active{
		background-color: #f0ad4e;
		color: #fff;
	}
	.btn {
		background-color: #FF5000;
		color: #fff;
		width: 96%;
		padding: 15px;
		text-align: center;
		border-radius: 100px;
		font-size: 30upx;
		margin: 40upx auto 0 auto;
		box-shadow: 0 0 10upx rgba(255, 80, 0, 0.3);
=======
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
>>>>>>> cd542449e6d9d8814a804a223e7053f6853e478b
	}
</style>

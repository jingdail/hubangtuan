<template>
	<view>
		<view class="class-box">
			<view class="class-item"  v-for="(item,index) in categoryList">{{item.pdName}}</view>
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
			uni.request({
				url:"",
				success(res) {
					console.log(res)
				}
			})
		}
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
		justify-content: space-between;
		align-items: center;
		
	}
	.class-item{
		border-radius: 100upx;
		border: 1px solid #FF5000;
		padding: 20upx;
		text-align: center;
		font-size: 34upx;
		font-weight: bold;
	}
</style>

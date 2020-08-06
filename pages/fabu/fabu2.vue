<template>
    <view style="position: relative;">
		<view class="step">
			<uni-steps :options="[{title: '填写任务要求'}, {title: '设置任务详情'}]" :active="1" active-color="#FF5000"></uni-steps>
		</view>
		
		<view class="u-box">
			<view class="form-label">
				<textarea placeholder="请添加任务链接和完整任务口令(删减文字口令会失效)"  @input="getText"/>
			</view>			
		</view>
		
		<view class="form-box">
			
			<view style="text-align: center;padding: 5px;font-size: 16px;">添加示例验证图</view>
			<view style="font-size: 12px;color: #666;text-align: center;padding: 5px;line-height: 1.5;">
				下图为系统自动为您匹配的验证图
				<view>您也可以点击<text style="color: red;">[更换验证图]</text>来换成自己的验证图</view>
			</view>
			<view class="shiliimg">
				<view class="changeImage" @click="chose()">更换验证图</view>
				<image :src="detail.yanzhengtu" @click="previewImage()" mode="widthFix">
			</view>
		</view>
		
		<button @click="submit()" hover-class="none">发布任务</button>       
    </view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"   
	export default {
		components: {uniSteps,uniIcons},
	    data() {	        
	        return {	           
				detail: {  
					gold: null,  
					timex: null,  
					danshu:null,
					xiangqing:null,
					yanzhengtu:null,
					typeid:null,
					subclassid:null
				},
				
	        }
	    },
		onLoad: function(option) {
			console.log(option.srcData)
			if(option.srcData == 'undefined'){
				uni.switchTab({
					url:'/pages/fabu/fabu'
				})
				return false;
			}
			let srcData = JSON.parse(option.srcData);
			this.detail= srcData
			console.log(this.detail);
		},
		onNavigationBarButtonTap:function(e){
			uni.navigateTo({
				url:'/pages/member/renwushuoming'
			})
		},
	    computed: {},
	    methods: {
			getText:function(event){
				this.detail.xiangqing = event.target.value				
			},
	        chose:function(){
			    var that = this				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						uni.showLoading({
							title:'上传中'
						})
						that.detail.yanzhengtu=res.tempFilePaths[0];
				        const uploadTask = uni.uploadFile({
				              url : that.$Sysconf('publish'),
				              filePath: res.tempFilePaths[0],
				              name: 'file',
				              formData: {
				               'user': 'test'
				              },
				              success: function (uploadFileRes) {
								  uni.hideLoading()								
								  // that.detail.yanzhengtu=uploadFileRes.data
				              }
				             });
				    }
				});
			},
			previewImage:function(){
				uni.previewImage({
					urls: [this.detail.yanzhengtu],
					current:0
				})
			},			
			submit(){
				if(this.detail.yanzhengtu==null || this.detail.yanzhengtu==''){
					this.$queue.showToast("请添加验证示例图片");
				}
				if(this.detail.xiangqing.length<=0){
					this.$queue.showToast("请填写任务详情");
				}
				let param={}
				let detail = this.detail
				/* 
				 gold: null,
				 timex: null,  
				 danshu:null,
				 xiangqing:null,
				 yanzhengtu:null
				 */
				param.typeid = detail.typeid
				param.num = detail.danshu
				param.title = detail.title
				param.content = detail.xiangqing
				param.pic = detail.yanzhengtu
				param.valid_date = detail.timex
				param.price = detail.gold
				param.subclassid = detail.subclassid
				this.$http.post(this.$Sysconf('publish'),param,{isFactory: false})
				.then(function (response) {
					console.log(response)	
				}).catch(function (error) {
				    //这里只会在接口是失败状态返回，不需要去处理错误提示
				    console.log(error);
				});
				this.$queue.showToast('发布成功');
			}
	    }
	}
</script>
<style style="">
	page{
		background-color: #F2F3F6;
	}
	.u-box{
		margin: 0px 5px 20px 5px;
		background-color: #fff;
		border-radius: 4px;
		padding: 8px;
	}
	.u-box view{
		border-bottom: 1px solid #F2F3F6;
		padding: 10px 0;
	}
	.u-box view:last-child{
		border:none
	}
	.form-box{
		margin: 20px 5px 0px 5px;
		padding: 8px;
		background-color: #fff;
		border-radius: 4px;
	}
	.form-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;		
		/* margin: 20px 0; */
		padding: 10px 0;
		border-bottom: 1px solid #F2F3F6;
	}
	.form-item:last-child{
		border:none
	}
	
	.placeholderstyle{
		font-size: 28upx;
		color: #666;
		text-align: right;		
	}
	.uni-list-cell-db{
		text-align: right;
		width:60%;
		color: #666;
	}
	.form-item{
		margin-bottom: 10px;
		
	}
	.form-label{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;	
		width: 40%;
	}
	.u-box .form-label{
		width: 100%;
	}
	
	uni-icons{
		margin-right: 10px;
	}
	button{
		position: fixed;
		bottom: 30upx;		
		border-radius: 100px;
		color: #fff;
		width: 90%;
		left: 5%;
		background-color: #FF5000;
		box-shadow: 0 0 16upx rgba(255,80,0, .3);
	}
	.text-left{
		padding-left: 10px;
	}
	.step{		
		padding-top: 20px;
		padding-bottom: 10px;
		background-color: #fff;
		margin-bottom: 15px;
	}
	.radio-group{
		width: 100%;		
	}
	uni-radio-group{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		width: 100%;
	}
	uni-label{
		width: 50%;
	}	
	.uni-input{
		text-align: right;
	}
	.shiliimg{
		border:1px solid #FF5000;
		padding: 1px;
		width: 70%;
		margin: 0 auto;
		position: relative;
		border-radius: 5px;
		overflow: hidden;
	}
	.changeImage{
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
		background-color: #FF5000;
		z-index: 10;
		text-align: center;
		color: #fff;
		padding: 5px 0;
	}
	image{
		width: 100%;
		border-radius: 5px;
	}
	textarea{
		height: 200px;
	}
</style>
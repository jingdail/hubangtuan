<template>
	<view style="position: relative;">
		<view class="step">
			<uni-steps :options="[{title: '填写任务要求'}, {title: '设置任务详情'}]" :active="1" active-color="#FF5000"></uni-steps>
		</view>
		<!-- 非自定义 -->
		<view class="u-box">
			<view class="form-label">
				<textarea placeholder="请填写文字向接单人说明,如何打开网址,如何完成您的任务,并详细说明注意事项." @input="getRenwuInfo" />
				</view>	
					
			<view class="qrcode-box">
				<view class="shiliimg">
					<view class="changeImage" @click="qrcodeImg()">添加二维码</view>
					<image :src="qrcodeimg" @click="qrcodepreviewImage()" class="yzt" mode="widthFix">
				</view>
				<!-- <view class="qrcode">
					<view class="title">添加二维码</view>
				</view>
				<image src="../../static/alipay.png" mode="widthFix"></image> -->
			</view>	
		</view>
		
		
		
		<view class="form-box">
			<view class="form-label" style="width: 100%;border-bottom: 1px solid #F2F3F6;">
				<textarea placeholder="请填写文字向接单人说明,完成您的任务后,需要向您提供什么样的验证图,并详细说明注意事项."  @input="getYztinfo"/>
			</view>	
			
			<view style="text-align: left;padding: 5px;font-size: 16px;">添加示例验证图</view>
			
			<view style="font-size: 12px;color: #666;text-align: center;padding: 5px;line-height: 1.5;">
				下图为系统自动为您匹配的验证图
				<view>您也可以点击<text style="color: red;">[更换验证图]</text>来换成自己的验证图</view>
			</view>
			<view class="shiliimg">
				<view class="changeImage" @click="chose()">更换验证图</view>
				<image :src="Temp_yanzhengtu" @click="yztpreviewImage()" class="yzt" mode="widthFix">
			</view>
		</view>
		
		<button @click="submitRenwu()" hover-class="none">发布任务</button>       
    </view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"   
	export default {
		components: {uniSteps,uniIcons},
	    data() {	        
	        return {	           
				detail:{
					
				},
				qrcodeimg:'',
				Temp_yanzhengtu:''
	        }
	    },
		onLoad: function(option) {
			
			if(option.srcData == 'undefined'){
				uni.switchTab({
					url:'/pages/fabu/fabu'
				})
				return false;
			}
			let srcData = JSON.parse(option.srcData);
			
			this.detail = srcData
			this.detail.zdy_field_1='';
			this.detail.zdy_field_2='';
			this.detail.zdy_field_3='';
			console.log(this.detail)
			
		},
		onNavigationBarButtonTap:function(e){
			uni.navigateTo({
				url:'/pages/member/renwushuoming'
			})
		},
	    computed: {},
	    methods: {
			getRenwuInfo:function(event){
				this.detail.zdy_field_1 = event.target.value				
			},
			getRenwuUrl:function(event){//任务网址
				this.detail.zdy_field_2 = event.target.value
			},
			
			getYztinfo:function(event){//验证图说明
				this.detail.zdy_field_3 = event.target.value
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
						that.Temp_yanzhengtu=res.tempFilePaths[0];
				        const uploadTask = uni.uploadFile({
				              url : that.$Api('uploadpic'),
				              filePath: res.tempFilePaths[0],
				              name: 'file',
				              formData: {
				               'user': 'test'
				              },
				              success: function (uploadFileRes) {
								  uni.hideLoading()	
								  that.Temp_yanzhengtu=that.$Api('base')+"uploads/"+uploadFileRes.data
				              }
				             });
				    }
				});
			},
			qrcodeImg:function(){
			    var that = this				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						uni.showLoading({
							title:'上传中'
						})
						// that.qrcodeimg = res.tempFilePaths[0];
				        const uploadTask = uni.uploadFile({
				              url : that.$Api('uploadpic'),
				              filePath: res.tempFilePaths[0],
				              name: 'file',
				              formData: {
				               'user': 'test'
				              },
				              success: function (uploadFileRes) {
								  uni.hideLoading()		
								  that.qrcodeimg = that.$Api('base')+"uploads/"+uploadFileRes.data;
								  
				              }
				             });
				    }
				});
			},
			qrcodepreviewImage:function(){
				uni.previewImage({
					urls: [this.qrcodeimg],
					current:0
				})
			},	
			yztpreviewImage:function(){
				uni.previewImage({
					urls: [this.Temp_yanzhengtu],
					current:0
				})
			},			
			submitRenwu(){
				
				if(this.detail.zdy_field_1.length<=0){
					this.$queue.showToast("请填写任务详情");
					return false;
				}
				if(this.Temp_yanzhengtu==null || this.Temp_yanzhengtu==''){
					this.$queue.showToast("请添加验证图片");
					return false;
				}
				
				let param={}
				let detail = this.detail
				
				param.typeid = detail.typeid
				param.num = detail.danshu
				param.title = detail.typeinfo
				param.content = detail.zdy_field_1
				param.pic = this.Temp_yanzhengtu
				param.picinfo = detail.zdy_field_3
				param.renwuurl = detail.zdy_field_2
				param.qrcode = this.qrcodeimg
				param.valid_date = detail.timex
				param.price = detail.gold
				param.subclassid = detail.subclassid
				console.log(param)
				/*
				this.$http.post(this.$Api('publish'),param,{isFactory: false})
				.then(function (response) {
					console.log(response)
					if(response.data.error=="0"){
						uni.showToast({
							title:'发布成功'
						})
						setTimeout(function(){
							uni.redirectTo({
								url:'/pages/member/renwu'
							})
						},2000)
					}else{
						uni.showModal({
							title:'金币不足，前去充值',
							cancelText:'取消',
							confirmText:'确定',
							success: (e) => {
								console.log(e)
							}
						})
						return false;
					}
				}).catch(function (error) {
				    //这里只会在接口是失败状态返回，不需要去处理错误提示
				    console.log(error);
				});
				*/
				// this.$queue.showToast('发布成功');
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
		width: 60%;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}
	.yzt{
		border: 1px solid #FF5000;
		
	}
	.changeImage{
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
		background-color: #FF5000;
		z-index: 10;
		height: 40px;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		text-align: center;
		color: #fff;
		padding: 5px 0;
	}
	
	textarea{
		height: 120px;
		width: 100%;
	}
	
</style>

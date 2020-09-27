<template>
	<view>
		<view class="step">
			<uni-steps :options="[{title: '填写任务要求'}, {title: '设置任务详情'}]" :active="0" active-color="#FF5000"></uni-steps>
		</view>

		
		<view class="form-box">
			<view class="form-item">
				<view class="form-label">
					<view class="form-icon cuIcon-title"></view>
					<text class="text-left">任务类型</text>
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChangeC" :value="dindex" :range="dalei">
						<view class="uni-input">
							{{dalei[dindex]}}
							<!-- <text v-if="goldindex==null">选择类型</text> -->
						</view>
					</picker>
				</view>
				<view>
					<uni-icons type="forward" size="18" color="#888"></uni-icons>
				</view>
			</view>
			<view v-if="detail.typeid!=14">
				
				<radio-group @change="radioChange">
					<label class="ss" v-for="(item, index) in zilei" :key="item.typeid">
						<radio color="#FF5000" :value="tostr(index)" :checked="index === current" /> {{item.name}}
					</label>
				</radio-group>
			</view>
			<view v-else>
				<input class="uni-input title" name="input" v-model="title" placeholder="请填写任务名称(12个字符以内容哦)" placeholder-class="placeholderstyle1"
				  @input="diytitle" />
			</view>
	</view>

		<view class="form-box">
			<view class="form-item" style="padding-right: 20px;">
				<view class="form-label">
					<view class="form-icon cuIcon-rank"></view>
					<text class="text-left">任务单数</text>
				</view>
				<input class="uni-input" name="input" v-model="danshu" placeholder="需要多少人帮你完成" placeholder-class="placeholderstyle"
				 type="number" @input="getdanshu" />
			</view>


			<view class="form-item">
				<view class="form-label">
					<view class="form-icon cuIcon-recharge"></view>
					<text class="text-left">任务价格</text>
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChangeG" :value="goldindex" :range="goldarray">
						<view class="uni-input">
							{{goldarray[goldindex]}}
							<text v-if="goldindex==null">为每人支付多少金币</text>
						</view>
					</picker>
				</view>
				<view>
					<uni-icons type="forward" size="18" color="#888"></uni-icons>
				</view>
			</view>

			<view class="form-item">
				<view class="form-label">
					<view class="form-icon cuIcon-time"></view>
					<text class="text-left">有效时间</text>
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChangeT" :value="tindex" :range="tarray">
						<view class="uni-input">
							{{tarray[tindex]}}
							<text v-if="tindex==null">选择任务有效时间</text>
						</view>
					</picker>
				</view>
				<view>
					<uni-icons type="forward" size="18" color="#888"></uni-icons>
				</view>
			</view>

		</view>
		<!--  -->
		<view class="form-box" v-if="detail.typeid==14">
				<view class="form-item">
					<view class="form-label">
						<view class="form-icon cuIcon-title"></view>
						<text class="text-left">助力方式</text>
					</view>
				</view>
				<view >
					
					<radio-group @change="zlfs">
						<label class="ss" v-for="(item, index) in zhuli" :key="index">
							<radio color="#FF5000" :value="tostr(index)" :checked="index === zhuindex" /> {{item}}
						</label>
					</radio-group>
				</view>
				
		</view>
		<!-- " -->
		<button @click="nextstep()" hover-class="none" class="fixed-btn-next">下一步</button>







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
				goldarray: ['500金币/单', '600金币/单', '700金币/单', '800金币/单', '900金币/单', '1000金币/单', '1200金币/单', '1500金币/单', '1800金币/单',
					'2000金币/单', '2500金币/单', '3000金币/单', '3500金币/单', '4000金币/单'
				],
				goldindex: null,
				tarray: ['30分钟', '1小时', '6小时', '1天', '2天', '3天'],
				zhuli:['网址助力任务','二维码助力任务','自定义口令任务'],
				zhuindex:0,
				categoryList: null,
				dalei:[],
				zilei:[],
				dindex:0,
				zindex:0,
				tindex: null,
				danshu: null,
				title:null,
				detail: {
					gold: null,
					timex: null,
					danshu: null,
					typeid: null,
					subclassid: null,
					typeinfo:'',
					subclassinfo:'',
					zdy:null
				},
				items: [],
				current: 0,
				
				currCateIndex: 1
			}
		},
		onShow:function(event){
			
			var that =  this;
			let category = {}
			// var url = this.$Api('category');
			var url = "http://app.wolewan.com/json/categories.json";
			uni.request({
				url:url,
				success: (res) => {
					console.log(res.data.categories)
					var data = res.data.categories
					that.categoryList = data
					const type = data.map(x => {
						return x.name
					});
					
					that.dalei = type
					console.log(that.dalei)
					
					let a = that.categoryList[0]['subclass']
					console.log(a)
					that.zilei = a
					that.detail.subclassid = a[0].typeid
					that.detail.typeid = 1
				}
			})
			
			this.$http.get(this.$Api('my'),{},{isFactory: false})
			.then(function (response) {					
				that.jinbi = response.data.data.jinbi
			}).catch(function (error) {				    
			    console.log(error);
			});
			
		},		
		computed: {

		},
		methods: {
			tostr(item){
			      return item.toString();
			 },
			bindPickerChangeC:function(e) {
				this.dindex = e.target.value
				this.detail.typeid = this.categoryList[e.target.value]['typeid']
				console.log(this.categoryList[e.target.value]['typeid'])
				if(this.detail.typeid != 14)
				 {
					let a = this.categoryList[e.target.value]['subclass']
					this.zilei = a
					this.detail.subclassid = a[0].typeid
					this.detail.zdy = null
				 }else{
					 
					 this.detail.zdy = 0
				 }
				
				
				

			},
			bindPickerChangeG: function(e) {
				var that = this;
				this.goldindex = e.target.value
				let godnum = this.goldarray[e.target.value]
				this.detail.gold = godnum.replace("金币/单","");
				console.log(this.detail.gold);
			},
			getJinbiNum(){
				var xuyaojinbu = this.detail.danshu*this.detail.gold	
				if(xuyaojinbu>10){
					uni.showModal({
						title: '金币不足',
						content: '',
						confirmText:"前去充值",
						success: function (res) {						
							if (res.confirm) {
								uni.navigateTo({url:'/pages/member/chongzhi'});
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			bindPickerChangeT: function(e) {
				this.tindex = e.target.value
				let t = this.tarray[e.target.value]
				//['30分钟', '1小时', '6小时', '1天', '2天', '3天'],
				let text = 0
				switch (e.target.value) {
				    case 0:
				        text = 1800;
				        break; 
				    case 1:
				        text = 3600;
				        break;
					case 2:
					    text = 3600*6;
					    break; 
					case 3:
					    text = 3600*24;
					    break; 
					case 4:
					    text = 3600*48;
					    break;
					case 5:
					    text = 3600*72;
					    break; 
				   
				} 
				this.detail.timex = text
			},
			getdanshu: function(event) {
				this.detail.danshu = event.target.value				
			},
			diytitle: function(event) {
				this.detail.typeinfo = event.target.value
			},
			nextstep: function() {
				

				if (this.danshu == null || this.danshu < 10) {
					this.$queue.showToast('任务单数必须大于10');
					return false;
				}
				if (this.goldindex == null) {
					console.log('请选择为每人支付多少金币');
					this.$queue.showToast('请选择支付多少金币');
					return false;
				}
				//是否足够
				this.getJinbiNum();
				
				if (this.tindex == null) {
					console.log('请选择任务有效时间');
					this.$queue.showToast('请选择任务有效时间');
					return false;
				}
				if(this.detail.typeid!=14){
					this.detail.typeinfo = this.categoryList[this.dindex]['name']
					this.detail.subclassinfo= this.categoryList[this.dindex]['subclass'][this.zindex]['name']
				}else{
					
				}
				

				
				let url = "?srcData=" + encodeURIComponent(JSON.stringify(this.detail))
				let redirectrUrl = '';
				if(this.detail.zdy==null){
					redirectrUrl = '/pages/fabu/fabu2'+url;
				}
				if(this.detail.zdy==0){
					redirectrUrl = '/pages/fabu/zdy1'+url;
				}
				if(this.detail.zdy==1){
					redirectrUrl = '/pages/fabu/zdy2'+url;
				}
				if(this.detail.zdy==2){
					redirectrUrl = '/pages/fabu/zdy3'+url;
				}
				console.log(redirectrUrl)
				uni.navigateTo({
					url: redirectrUrl
				})

			},
			radioChange: function(evt) {
				this.zindex = evt.target.value
				this.detail.subclassid = this.categoryList[this.dindex]['subclass'][this.zindex].typeid
				
			},
			zlfs: function(evt) {
				this.detail.zdy = evt.target.value
			}
		}
	}
</script>
<style style="">
	page {
		background-color: #F2F3F6;
	}

	.form-icon {
		font-size: 18px;
		color: #FF5000;
		padding-left: 5px;
	}

	.u-box {
		margin: 0px 5px 20px 5px;
		background-color: #fff;
		border-radius: 4px;
		padding: 8px;
	}

	.u-box view {
		border-bottom: 1px solid #F2F3F6;
		padding: 10px 0;
	}

	.u-box view:last-child {
		border: none
	}

	.form-box {
		margin: 20px 5px 0px 5px;
		padding: 8px;
		background-color: #fff;
		border-radius: 4px;
	}

	.form-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		/* margin: 20px 0; */
		padding: 10px 0;
		border-bottom: 1px solid #F2F3F6;
	}
	

	.form-item:last-child {
		border: none
	}

	.placeholderstyle {
		font-size: 28upx;
		color: #666;
		text-align: right;
	}
.placeholderstyle1 {
		font-size: 28upx;
		color: #666;
		text-align: left;
	}
	
	.uni-list-cell-db {
		text-align: right;
		width: 60%;
		color: #666;
	}

	.form-item {
		margin-bottom: 10px;
	}

	.form-label {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		width: 40%;
	}

	.u-box .form-label {
		width: 100%;
	}

	uni-icons {
		margin-right: 10px;
	}

	button {
		position: absolute;
		bottom: 40px;
		border-radius: 100px;
		color: #fff;
		width: 90%;
		left: 5%;
		background-color: #FF5000;
		box-shadow: 0 0 16upx rgba(255, 80, 0, .3);
	}
	.fixed-btn-next{
		
	}

	.btnactive {
		position: absolute;
		bottom: 40px;
		border-radius: 100px;
		color: #fff;
		width: 90%;
		left: 5%;
		background-color: #FF5000;
		box-shadow: 0 0 16upx rgba(255, 80, 0, .3);
		opacity: .8;
	}

	.text-left {
		padding-left: 10px;
	}

	.step {
		border-top: 1px solid #F2F3F6;
		padding-top: 20px;
		padding-bottom: 10px;
		background-color: #fff;
		margin-bottom: 15px;
	}

	.radio-group {
		width: 100%;
	}

	uni-radio-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		width: 100%;
	}

	uni-label {
		width: 50%;

	}

	radio {
		transform: scale(0.6)
	}

	.uni-input {
		text-align: right;
	}

	.ss {
		display: flex;
		align-items: center;
	}

	.uni-picker-action-confirm {
		float: right;
		color: #FF5000;
	}
	.title{
		text-align: left;
		padding-left: 15upx;
	}
	
	.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
	    float: right;
	    color: #FF5000!important;
	}
</style>

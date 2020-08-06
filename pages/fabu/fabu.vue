<template>
	<view>
		<view class="step">
			<uni-steps :options="[{title: '填写任务要求'}, {title: '设置任务详情'}]" :active="0" active-color="#FF5000"></uni-steps>
		</view>

		<view class="u-box">
			<view class="form-label">
				<text class="form-icon cuIcon-filter"></text>
				<text class="text-left">任务类型：{{cate.pdName}}</text>
			</view>
			<view class="form-label">
				<radio-group @change="radioChange">
					<label class="ss" v-for="(item, index) in cate.pdPrice" :key="item.value">
						<radio color="#FF5000" :value="item.value" :checked="index === current" /> {{item.name}}
					</label>
				</radio-group>
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
		<!-- " -->
		<button @click="nextstep()" hover-class="none">下一步</button>







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
				categoryList: [{
						"id": "3",
						"pdName": "拼夕夕",
						"pdPrice": [{
								value: '1',
								name: '拼夕夕砍价任务',

							},
							{
								value: '2',
								name: '拼夕夕领现金任务'
							}
						]
					},
					{
						"id": "7",
						"pdName": "淘宝",
						"pdPrice": [{
								value: '1',
								name: '淘宝口令任务',

							}

						]
					},
					{
						"id": "9",
						"pdName": "快手",
						"pdPrice": [{
								value: '1',
								name: '快手口令任务',

							}

						]
					}
				],
				tindex: null,
				danshu: null,
				detail: {
					gold: null,
					timex: null,
					danshu: null,
					typeid: null,
					subclassid: null
				},
				items: [],
				current: 0,
				currCateIndex: 1
			}
		},
		onLoad:function(){
			this.cate = this.categoryList[this.currCateIndex]
			console.log(this.cate)
		},
		computed: {

		},
		methods: {
			bindPickerChangeG: function(e) {
				this.goldindex = e.target.value
				this.detail.gold = this.goldarray[e.target.value]

			},
			bindPickerChangeT: function(e) {
				this.tindex = e.target.value
				this.detail.timex = this.tarray[e.target.value]
			},
			getdanshu: function(event) {
				this.detail.danshu = event.target.value
				console.log(this.danshu)
			},
			nextstep: function() {


				if (this.danshu == null || this.danshu < 10) {
					this.$queue.showToast('任务单数必须大于10');
				}
				if (this.goldindex == null) {
					console.log('请选择为每人支付多少金币');
					this.$queue.showToast('请选择支付多少金币');
					return false;
				}
				if (this.tindex == null) {
					console.log('请选择任务有效时间');
					this.$queue.showToast('请选择任务有效时间');
					return false;
				}

				let url = "?srcData=" + encodeURIComponent(JSON.stringify(this.detail))
				uni.navigateTo({
					url: '/pages/fabu/fabu2' + url
				})

			},
			radioChange: function(evt) {
				console.log(evt)
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						console.log(this.items[i].value)
						break;
					}
				}
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
</style>

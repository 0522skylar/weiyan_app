<template>
	<view class="bg">
		 
			<view class="mask" v-if="isShow">
				<view :class="isFlag ? 'last' : 'content-close'">
					{{text[4-num]}}
				</view>
			</view>

			
		
		
		<view class="content" v-if="questions.length!=0">
			<h3>{{count+1}}.{{questions[count].name}}</h3>
			<view class="title">
				{{count+1}}.{{questions[count].questext}}
			</view>
			<ol>
				<li 
				v-for="(tt,ii) in questions[count].list" 
				:key='ii' 
				@click="myclick(tt,ii)"
				:class="[isTrue[ii]==0 ? 'error' : '', isTrue[ii]==1 ? 'true' : '']"
				>{{ii+1}}.{{tt}}</li>
			</ol>
		</view>
		
		<view class="next"  v-if="isClick">
			<view class="aysnc" >答案：{{questions[count].ans}}</view>
			<view class="aysnc" v-if="questions[count].res">分析：{{questions[count].res}}</view>
			<view class="btn" @click="nextQuest()">下一个</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				num:4,
				text:[3,2,1,'Go!'],
				isShow: true,
				isFlag:true,
				timer:null,// 定时器
				questions:[],
				count:0, // 记录当前是第几题
				isClick: false, // 当前题目是否选择了答案
				isTrue:[-1,-1,-1,-1],// 判断选择是否为正确答案
				status:1,// 用户等级
			}
		},
		methods: {
			countDown() {
				let _self = this;
				this.timer = setInterval(()=> {
					
					_self.num--;
					if(_self.num==0) {
						_self.isFlag = false;
						
					}
					if(_self.num==-1) {
						_self.isShow = false;
						clearInterval(_self.timer);
					}
				},500);
			},
			nextQuest() {
				this.count++;
				if(this.count === 8) {
					uni.redirectTo({
						url:'../mystatus/mystatus?mystatus='+this.status,
					})
				}
				this.isTrue = [-1,-1,-1,-1];
				this.isClick = false;
			},
			myclick(text, index) {
				this.isClick = true;
				if(text === this.questions[this.count].ans) {
					this.status ++;
					this.isTrue[index] = 1;
				}
				else {
					this.isTrue[index] = 0;
				}
			},
			async getQuestions() {
				
				const res = await this.$myRuquest({
					url: '/home/test-all'
				});
				let dd = res.data.rows.allegorical;
				let obj = {};
				obj.name = '歇后语';
				obj.list = [];
				dd.forEach((item,index) => {
					if(index == 0) {
						obj.questext = item.riddle+'，结果是什么？';
						obj.ans = item.answer;
					}
					obj.list.push(item.answer);
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				//---------------------------------catchphrase
				dd = res.data.rows.catchphrase;
				obj = {};
				obj.name = '名言警句';
				obj.list = [];
				dd.forEach((item,index) => {
					if(index == 0) {
						obj.questext =item.content + '，这句名言警句的出处是？';
						obj.ans = item.mrname;
						
					}
					obj.list.push(item.mrname);
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				
				//---------------------------challenge
				dd = res.data.rows.challenge;
				obj = {};
				obj.name = '一战到底';
				obj.list = [];
				dd.forEach((item,index) => {
					if(index == 0) {
						obj.questext =item.quest;
						obj.ans = item.result;
					}
					obj.list.push(item.result);
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				
				//---------------------------charade
				dd = res.data.rows.charade;
				obj = {};
				obj.name = '猜字谜';
				obj.list = [];
				dd.forEach((item,index) => {
					if(index == 0) {
						obj.questext = item.content;
						obj.ans = item.answer;
						obj.res = item.reason;
					}
					obj.list.push(item.answer);
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				//----------------------------proverb
				dd = res.data.rows.proverb;
				obj = {};
				obj.name = '谚语';
				obj.list = [];
				dd.forEach((item,index) => {
					if(index == 0) {
						obj.questext = item.front+'，这句谚语的下句是？';
						obj.ans = item.behind;
					}
					obj.list.push(item.behind);
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				//------------------------riddle
				dd = res.data.rows.riddle;
				obj = {};
				obj.name = '谜语';
				obj.list = [];
				dd.forEach((item,index) => {
					if(index == 0) {
						obj.questext = item.quest+'，猜猜谜语吧';
						obj.ans = item.answer;
					}
					obj.list.push(item.answer);
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				//---------------------------truefalse
				dd = res.data.rows.truefalse;
				obj = {};
				obj.name = '判断句';
				obj.list = [];
				dd.forEach((item,index) => {
					if(index == 0) {
						obj.questext = item.title+'判断一下正确与错误吧';
						if(item.answer===1) {
							obj.ans = '正确';
						}
						else {
							obj.ans = '错误';
						}
						obj.res = item.analyse;// 分析
					}
					obj.list.push('正确');
					obj.list.push('错误');
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				//-------------------------wikipedia
				dd = res.data.rows.wikipedia;
				obj = {};
				obj.name = '百科题库';
				obj.list = [];
				dd.forEach((item,index) => {
					
					obj.questext = item.title;
					let inde = item.answer;
					obj.ans = item['answer'+inde];
					obj.res = item.analytic;// 分析
					obj.list.push(item.answerA);
					obj.list.push(item.answerB);
					obj.list.push(item.answerC);
					obj.list.push(item.answerD);
					
				})
				obj.list.sort((a,b)=> {
					return Math.random()-0.5;
				})
				this.questions.push(obj);
				
				console.log(this.questions);
			}
		},
		mounted() {
			this.countDown();
			this.getQuestions();
		}
	}
</script>

<style lang="scss">
	@import url("../../static/css/stylesheet.css");
	
	page{
		width: 100%;
		height: 100%;
	}
	.bg {
		width: 100%;
		height: 100%;
		// background: url('../../static/yueliang.jpg')  no-repeat center center;
		// background-size: contain;
		box-sizing: border-box;
	}
	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
		background-color: rgba(0,0,0, .8);
		
		.last {
			width: 200rpx;
			height: 200rpx;
			position: absolute;
			top: 31%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #000;
			border-radius: 50%;
			line-height: 200rpx;
			font-size: 30px;
			font-weight: bold;
			text-align: center;
			color: #fff;
			transition: all 0.4s cubic-bezier(0.25, 1.0, 0.25, 1.0);
		}
		.content-close{
			width: 200rpx;
			height: 200rpx;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #000;
			border-radius: 50%;
			line-height: 200rpx;
			font-size: 30px;
			font-weight: bold;
			text-align: center;
			transition: all 0.4s cubic-bezier(0.25, 1.0, 0.25, 1.0);
		}
	}
	.content{
		color: #000;
		padding: 20rpx;
		h3 {
			text-align: center;
			margin-bottom: 20rpx;
		}
			
		.title {
			color: #209E85;
			font-weight: 400;
			font-size: 18px;
			margin: 20rpx;
			// font-family: "qiantubifengshouxieti";
		}
		ol {
			margin: 0;
			padding: 0;
			list-style: none;
			// font-family: "qiantubifengshouxieti";
			li {
			
				border-bottom: 1px dashed #ccc;
				padding-left: 40rpx;
				line-height: 40px;
			}
			.true {
				background-color: green;
				color: #fff;
			}
			.error{
				background-color: red;
				color: #fff;
			}
		}
	}
	.next {
		text-align: center;
		.aysnc {
			color: red;
		}
		.btn {
			padding: 10px 30px;
			display: inline-block;
			background-color: #9fd6b7;
			font-weight: 400;
			border-radius: 20px;
			margin: 30px auto;
		}
	}
	
</style>

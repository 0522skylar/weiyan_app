<template>
	<view class="content">
		<view class="total-progress">{{activeIndex+1}} / {{mongoList.length}}</view>
		<!-- <view class="mask animate__animated animate__bounceInDown" :class="isMask?'':'visiblity'">
			<text class="before">上一个</text>
			<text class="after">下一个</text>
		</view> -->
		<view class="tt-html">
			<view class="kuang">
				<view>{{mongoList[activeIndex]['title']}}</view>
				<view v-if="mongoList[activeIndex]['answerA']">A:{{mongoList[activeIndex]['answerA']}}</view>
				<view v-if="mongoList[activeIndex]['answerB']">B:{{mongoList[activeIndex]['answerB']}}</view>
				<view v-if="mongoList[activeIndex]['answerC']">C:{{mongoList[activeIndex]['answerC']}}</view>
				<view v-if="mongoList[activeIndex]['answerD']">D:{{mongoList[activeIndex]['answerD']}}</view>
				<view class="redcolor" v-if="mongoList[activeIndex]['answer']">答案:{{mongoList[activeIndex]['answer']}}</view>
			</view>
			<view class="left text">{{listKey[1]}}：</view>
			
			<view v-if="mongoList[activeIndex]['analytic']">
				<view class="myanswer">{{mongoList[activeIndex]['analytic']}}</view>
				<view class="right text">{{listKey[listKey.length-2]}}：</view>
			</view>
		</view>
		
		<view class="footer">
			<view :class="isCount?'isCount':'count'" @click="addCount">
				<image src="../../static/my/star.png" mode=""></image>
				{{countTxt}}
			</view>
			<view :class="isAdd ? 'isAdd':'add'" @click="addNotes">
				<image src="../../static/my/export.png" mode=""></image>
				{{addTxt}}
			</view>
		</view>
		
		<view class="foot">
			<button @click="beforeIndex" class="before">上一个</button>
			<button @click="afterIndex" class="after">下一个</button>
		</view>
		<!-- <view class="animate__animated animate__bounce">动画</view> -->
		<view class="markdown"v-if="isMask">
			<view class="hiddenBox" @click="closeMask()"></view>
			<view class="mynoteBox" :class="isShow ? 'show' : ''">
				<view class="topbox">
					<input type="text" placeholder="快来添加你记忆的小技巧吧" v-model="inpVal">
				</view>
				
				<view class="btn" @click="saveNote()">
					保存
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCount:false,
				isAdd:false,
				countTxt:"收藏",
				addTxt:"笔记",
				index:1, // 当前是哪个
				mongoList:[],
				activeIndex:0,
				title:"",
				listKey:[],
				kind:'',// 当前页面是哪种类型
				idKey:'',// 当前项目的主键
				email:'',// 用户唯一标识
				collection:[],// 收藏
				notes:[],// 笔记
				isMask:false, // 是否显示添加笔记遮罩层
				isShow:false, // 是否显示笔记框
				inpVal:'',// 添加到笔记的文字
				isEnd: false,// 判断是否已经点击过最后一个了
			}
		},

		onLoad(options) {
	
			if(this.$store.state.email.length == 0){
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						this.email = res.data.email;
					}
				});
			}
			else {
				this.email = this.$store.state.email;
			}
			
			let ff = options.item;
			this.title = options.title;
			
			uni.setNavigationBarTitle({
			    title: this.title
			});
			this.index = Number(ff);
			this.activeIndex = this.index;
			if(this.title == '名言警句') {
				this.kind = 'catchphrase';
				this.idKey = 'title';
				this.listKey = ["id",'内容','名人姓名',"_v"];
			}
			else if(this.title == '一战到底') {
				this.kind = 'challenge';
				this.idKey = 'title';
				this.listKey = ["id",'问题','答案',"_v"];
			}
			else if(this.title == '判断题') {
				this.kind = 'truefalse';
				this.idKey = 'title';
				this.listKey = ["id",'判断题','答案','分析',"_v"];
			}
			else if(this.title == '百科全书') {
				this.kind = 'wikipedia';
				this.idKey = 'title';
				this.listKey = ["id",'问题','A','B','C','D','答案','分析',"_v"];
			}
		
		},
		onShow() {
			//this.getData();
			uni.getStorage({
			    key: 'current_obj',
			    success:  (res) => {
					let arr = res.data;
					let curArr = [];
					// console.log(arr);
					arr.forEach((item)=> {
						let obj = {};
						obj.title = item['title'] || item['quest'] || item['content'];
						obj.answerA = item.answerA;
						obj.answerB = item.answerB;
						obj.answerC = item.answerC;
						obj.answerD = item.answerD;
						obj.answer = item.answer;
						if(item.answer == 0) {
							obj.answer = '错'
						}
						if(item.answer == 1) {
							obj.answer = '对'
						}
						obj.analytic = item['analytic'] || item['analyse'] || item['mrname'] || item['result'];
						curArr.push(obj);
					})
					this.mongoList = curArr;
			    }
			});
		},
		methods: {
			async addCount() {
				this.isCount = !this.isCount;
				let kind = this.kind;
				let email = this.email;
				let text = this.mongoList[this.activeIndex][this.idKey];
				if(this.email.length == 0) {
					uni.redirectTo({
						url:'../login/login'
					})
					return;
				}
				// console.log(kind,this.mongoList);
				if(this.isCount) {
					
					this.collection.push(text);
					const res = await this.$myRuquest({
						url: '/other/my-collection/add',
						data: {
							email:email,
							kind:kind,
							text:text
						}
					});
					uni.showToast({
						title:res.data.msg
					})
				}
				else {
					
					let ind = this.collection.indexOf(text);
					if(ind != -1) {
						this.collection.splice(ind, 1);
					}
					const res = await this.$myRuquest({
						url: '/other/my-collection/delete',
						data: {
							email:email,
							kind:kind,
							text:text
						}
					});
					uni.showToast({
						title:res.data.msg
					})
				}
				this.countTxt = this.isCount ? '已收藏' : '收藏';
				
			},
			addNotes() {
				
				this.isMask = true;
				setTimeout(()=>{
					this.isShow = true;
				},0.5)
				// uni.showActionSheet({
				// 	title:'显示',
				// 	itemList:[1,2,3,4]
				// })
			},
			async saveNote() {
				if(this.inpVal.trim().length == 0) {
					uni.showToast({
						icon:'error',
						title:'输入框不能为空哟'
					})
					return;
				}
				if(this.email.length == 0) {
					uni.redirectTo({
						url:'../login/login'
					})
					return;
				}
				let kind = this.kind;
				let email = this.email;
				let mysay = this.inpVal;
				let text = this.mongoList[this.activeIndex][this.idKey];
				this.notes.push(text);
				const res = await this.$myRuquest({
					url: '/other/my-note/add',
					data: {
						email:email,
						kind:kind,
						key:text,
						text:mysay
					}
				});
				uni.showToast({
					title:res.data.msg
				})
				this.isShow = false;
				this.isAdd = true;
				this.addTxt = '已添加';
				setTimeout(()=>{
					this.isMask = false;
				},1)
			},
			closeMask() {
				this.isShow = false;
				setTimeout(()=>{
					this.isMask = false;
				},1)
			},
			beforeIndex() {
				this.InShow = 'Left';
				this.inpVal = '';
				if(this.activeIndex == 0) {
					uni.showToast({
						title: '第一个啦',
						icon:'none',
						duration: 1000
					});
					return;
				}
				this.activeIndex--;
				let text = this.mongoList[this.activeIndex][this.idKey];
				let ind = this.collection.indexOf(text);
				let mysay = this.notes.indexOf(text);
				
				if(mysay != -1) {
					this.isAdd = true;
					this.addTxt = '已添加';
				}
				else {
					this.isAdd = false;
					this.addTxt = '笔记';
				}
				if(ind != -1) {
					this.isCount = true;
					this.countTxt = '已收藏';
				}
				else {
					this.isCount = false;
					this.countTxt = '收藏';
				}
			
				
			},
			async afterIndex() {
				this.InShow = 'Right';
				this.OutShow = 'Left';
				this.inpVal = '';
				if(this.activeIndex == this.mongoList.length-1) {
					// uni.showToast({
					// 	title: '最后一个啦,今日学习任务已完成，去做题吧',
					// 	icon:'none',
					// 	duration: 1000
					// });
					let ee = this.email;
					let month = new Date().getMonth()+1;
					let yaer = new Date().getFullYear();
					let day = new Date().getDate();
					let obj = {
						study:this.mongoList.length,
						challenge:0,
						time:yaer + '-' +month+'-'+day
					}
					if(!this.isEnd) {
						const res = await this.$myRuquest({
							url: '/info/my-analyse/study',
							data: {
								email:ee,
								total:obj
							}
						});
						this.isEnd = true;
						const ans = await this.$myRuquest({
							url: '/info/study-log/add',
							method: 'POST',
							data: {
								email: ee,
								kind: this.kind,
								num: this.activeIndex+1
							}
						});
						console.log(ans)
					}
					uni.showModal({
						title: '最后一个啦,今日学习任务已完成，去做题吧',
						confirmText: '去挑战',
						success: (res) => {
							if(res.confirm) {
								this.goOtherPage()
							}
						}
					});
					return;
				}
				this.activeIndex++;
				let text = this.mongoList[this.activeIndex][this.idKey];
				let ind = this.collection.indexOf(text);
				let mysay = this.notes.indexOf(text);
				if(mysay != -1) {
					this.isAdd = true;
					this.addTxt = '已添加';
				}
				else {
					this.isAdd = false;
					this.addTxt = '笔记';
				}
				if(ind != -1) {
					this.isCount = true;
					this.countTxt = '已收藏';
				}
				else {
					this.isCount = false;
					this.countTxt = '收藏';
				}
				
			},
			goOtherPage() {
				uni.switchTab({
					url: '../challenge/challenge'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../static/css/animate.css';

.content {
	position: relative;
	
	.total-progress {
		text-align: center;
		height: 20px;
		line-height: 56px;
		margin-bottom: 50px;
	}
	.text {
		font-size: 16px;
		color: #83af9b;
		font-weight: bold;
		padding: 10px 20px;
	}
	.left {
		text-align: left;
	}
	.right {
		text-align: right;
	}
	.tt-my {
		display: flex;
		justify-content: right;
	}
	.redcolor {
		color: red;
	}
.kuang {
    position: relative;
	margin: 0 30px;
	margin-bottom: 66px;
    padding: 20px;
	white-space: wrap;
    background-color: #ECE5CE;
    border-radius: 11px;
    box-shadow: 20px 20px #83af9b;
	transition: height .5s;
	&::after,&::before {
		position: absolute;
		content: '';
		height: 11px;
		left: 0px;
		background-color: #ECE5CE;
		border-radius: 11px;
		box-shadow: 20px 20px #83af9b;
	}
	
	&::after{
		width: 50px;
		bottom: -25px;
	}
	&::before {
		width: 11px;
		bottom: -50px;
	}
}

.myanswer {
    position: relative;
	margin: 0 30px;
	margin-bottom: 66px;
    padding: 20px;
	white-space: wrap;
    background-color: #ECE5CE;
    border-radius: 11px;
    box-shadow: 20px 20px #83af9b;
	&::after,&::before {
		position: absolute;
		content: '';
		height: 11px;
		right: 0px;
		background-color: #ECE5CE;
		border-radius: 11px;
		box-shadow: 20px 20px #83af9b;
	}
	
	&::before {
		width: 11px;
		bottom: -50px;
		z-index: 1;
	}
	&::after{
		width: 50px;
		bottom: -25px;
	}
}
	.foot {
		width: 100%;
		display: flex;
		padding: 30px 0;
		justify-content: space-around;
		button {
			height: 40px;
			width: 100px;
			border-radius: 40px;
			line-height: 40px;
			color: #fff;
			font-size: 16px;
			border: 1px solid #a0c3bd;
		}
		.before {
			background-color: #9fd6b7;
			box-shadow: 0 0 0 .25rem rgba(13, 188, 121, .25);
		}
		.after{
			background-color:#0dbc79;
			box-shadow: 0 0 0 .25rem rgba(13, 188, 121, .25);
		}
	}
	
	.title h3 {
		text-align: center;
	}
	.footer {
		height: 10vh;
		border: 2px solid #9fd6b7;
		justify-content: space-around;
		align-items: center;
		border-radius: 100rpx;
		display: flex;
		image {
			width: 16px;
			height: 16px;
		}
		.count {
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #dd524d;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
		.isCount{
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #9fd6b7;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
		.add{
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #dd524d;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
		.isAdd{
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #9fd6b7;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
	}
	
	.markdown {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,.5);
		.hiddenBox {
			height: 408px;
		}
		.mynoteBox {
			position: fixed;
			left: 6px;
			right: 6px;
			bottom: 6px;
			backface-visibility: hidden;
			visibility: hidden;
			transform: translateY(100%);
			z-index: 999;
			transition: transform .3s, visibility .3s,-webkit-tansform .3s;
			
			.topbox {
				background-color: #fcfcfd;
				height: 200px;
				border-radius: 5px;
				
			}
			.btn {
				margin-top: 10px;
				background-color: #fcfcfd;
				border-radius: 5px;
				text-align: center;
				padding: 10px 0;
			}
			input {
				padding-top: 10px;
				padding-left: 10px;
			}
		}
		.show {
			visibility: visible;
			transform: translate(0);
		}
		
	}
}
</style>

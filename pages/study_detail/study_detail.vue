<template>
	<view class="content">
		<view class="total-progress">{{activeIndex+1}} / {{mongoList.length}}</view>
		<view class="animate__animated" :class="'animate__backIn'+InShow">
			<view class="tt-html">
				<view class="card">
					<view class="question" v-for="(item,index,ind) in mongoList[activeIndex]" :key="index" v-if="ind!=0 && ind !=listKey.length-1">
						<text class="txt">{{listKey[ind]}}:</text>
						<text class="data">{{item}}</text>
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
				isCount:false, //是否收藏
				isAdd:false,// 是否添加到笔记
				countTxt:"收藏",
				addTxt:"笔记",
				index:1, // 当前是哪个
				mongoList:[],
				activeIndex:0,
				title:"",
				listKey:[],
				OutShow:'Right',
				InShow:'Left',
				kind:'',// 当前页面是哪种类型
				idKey:'',// 当前项目的主键
				email:'',// 用户唯一标识
				collection:[],// 收藏
				notes:[],// 笔记
				isMask:false, // 是否显示添加笔记遮罩层
				isShow:false, // 是否显示笔记框
				inpVal:'',// 添加到笔记的文字
			}
		},
		onLoad(options) {
			let ff = options.item;
			this.title = options.title;
			
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
			uni.setNavigationBarTitle({
			    title: this.title
			});
			this.index = Number(ff);
			this.activeIndex = this.index;
			if(this.title == '成语') {
				this.kind = 'idiom';
				this.idKey = 'word';
				this.listKey = ["id",'成语','拼音','拼音首字母','解释','出自','例子',"_v"];
			}
			else if(this.title == '谚语') {
				this.kind = 'proverb';
				this.idKey = 'front';
				this.listKey = ["id",'上句','下句',"_v"];
			}
			else if(this.title == '歇后语') {
				this.kind = 'allegorical';
				this.idKey = 'riddle';
				this.listKey = ["id",'歇后语','答案',"_v"];
			}
			else if(this.title == '谜语') {
				this.kind = 'riddle';
				this.idKey = 'quest';
				this.listKey = ["id",'谜语','答案',"_v"];
			}
			else if(this.title == '对联') {
				this.kind = 'couplets';
				this.idKey = 'content';
				this.listKey = ["id",'对联',"_v"];
			}
			else if(this.title == '字谜') {
				this.kind = 'charade';
				this.idKey = 'content';
				this.listKey = ["id",'字谜','答案','解释',"_v"];
			}
			
		},
		onShow() {
			//this.getData();
			uni.getStorage({
			    key: 'current_obj',
			    success:  (res) => {
					this.mongoList = res.data;
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
				if(ind != -1) {
					this.isCount = true;
					this.countTxt = '已收藏';
				}
				else {
					this.isCount = false;
					this.countTxt = '收藏';
				}
				let mysay = this.notes.indexOf(text);
				if(mysay != -1) {
					this.isAdd = true;
					this.addTxt = '已添加';
				}
				else {
					this.isAdd = false;
					this.addTxt = '笔记';
				}
				
			},
			async afterIndex() {
				this.InShow = 'Right';
				this.OutShow = 'Left';
				this.inpVal = '';
				if(this.activeIndex == this.mongoList.length-1) {
					uni.showToast({
						title: '最后一个啦,今日学习任务已完成，去做题吧',
						icon:'none',
						duration: 1000
					});
					let ee = this.email;
					let month = new Date().getMonth()+1;
					let yaer = new Date().getFullYear();
					let day = new Date().getDate();
					let obj = {
						study:20,
						challenge:0,
						time:yaer + '-' +month+'-'+day
					}
					const res = await this.$myRuquest({
						url: '/info/my-analyse/study',
						data: {
							email:ee,
							total:obj
						}
					});
					return;
					
				}
				this.activeIndex++;
				let text = this.mongoList[this.activeIndex][this.idKey];
				let ind = this.collection.indexOf(text);
				let mysay = this.notes.indexOf(text);
				if(ind != -1) {
					this.isCount = true;
					this.countTxt = '已收藏';
				}
				else {
					this.isCount = false;
					this.countTxt = '收藏';
				}
				if(mysay != -1) {
					this.isAdd = true;
					this.addTxt = '已添加';
				}
				else {
					this.isAdd = false;
					this.addTxt = '笔记';
				}
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
	.visiblity {
		display: none;
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
	.card {
		border: 2px solid #9fd6b7;
		margin-bottom: 50px;
		border-radius: 30px;
	}
	.question,.answer {
		margin: 20rpx;
		padding: 20rpx;
		.txt {
			font-weight: 700;
			color: #9fd6b7;
		}
		.data {
			padding-left: 20rpx;
			
		}
	}
	.footer {
		height: 100rpx;
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

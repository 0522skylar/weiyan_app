<template>
	<view class="content">
		
			<view class="tt-html">
				<view class="card">
					<view class="question" v-for="(item,index,ind) in mongoList" :key="index" v-if="ind!=0 && ind !=listKey.length-1">
						<text class="txt">{{listKey[ind]}}:</text>
						<text class="data">{{item}}</text>
					</view>
				</view>
				
				<view class="card notes">
					我的记录为：{{mynote}}
					
				</view>
				<view class="footer">
					<view :class="isCount?'isCount':'count'" @click="addCount">
						<image src="../../static/my/star.png" mode=""></image>
						{{countTxt}}
					</view>
					<view class="isCount" @click="addNotes()">
						<image src="../../static/my/star.png" mode=""></image>
						更改
					</view>
					
				</view>
			</view>
			
			
			<view class="markdown"v-if="isMask">
				<view class="hiddenBox" @click="closeMask()"></view>
				<view class="mynoteBox" :class="isShow ? 'show' : ''">
					<view class="topbox">
						<input type="text" placeholder="快来添加你记忆的小技巧吧" v-model="inpVal">
					</view>
					<view class="btn" @click="updateNote()">
						更改
					</view>
				</view>
				
			</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCount:true, //是否添加到笔记
				countTxt:"已添加",
				mongoList:{},	
				mynote:'',
				title:"",
				kind:'',// 当前页面是哪种类型
				idKey:'',// 当前项目的主键
				email:'',// 用户唯一标识
				isMask:false, // 是否显示添加笔记遮罩层
				isShow:false, // 是否显示笔记框
				inpVal:'',// 添加到笔记的文字
			}
		},
		onLoad(options) {
			this.kind = options.kind;
			this.title = options.title;
			
			uni.getStorage({
			    key: 'userInfo',
			    success:  (res) => {
					this.email = res.data.email;
			    }
			});

		
			if(this.kind == 'idioms') {
				this.idKey = 'word';
				this.listKey = ["id",'成语','拼音','拼音首字母','解释','出自','例子',"_v"];
			}
			else if(this.kind == 'proverb') {
			
				this.idKey = 'front';
				this.listKey = ["id",'上句','下句',"_v"];
			}
			else if(this.kind == 'allegorical') {
				this.idKey = 'riddle';
				this.listKey = ["id",'歇后语','答案',"_v"];
			}
			else if(this.kind == 'riddle') {
				
				this.idKey = 'quest';
				this.listKey = ["id",'谜语','答案',"_v"];
			}
			else if(this.kind == 'couplets') {
				
				this.idKey = 'content';
				this.listKey = ["id",'对联',"_v"];
			}
			else if(this.kind == 'charade') {
				this.idKey = 'content';
				this.listKey = ["id",'字谜','答案','解释',"_v"];
			}
			else if(this.kind == 'catchphrase') {
				this.idKey = 'content';
				this.listKey = ["id",'名言警句','作者',"_v"];
			}
			else if(this.kind == 'truefalse') {
				this.idKey = 'title';
				this.listKey = ["id",'题目','答案','分析',"_v"];
			}
			else if(this.kind == 'challenge') {
				this.idKey = 'quest';
				this.listKey = ["id",'题目','答案',"_v"];
			}
			else if(this.kind == 'wikipedia') {
				this.idKey = 'title';
				this.listKey = ["id",'题目','A.','B.','C.','D.','答案','分析',"_v"];
			}
			this.getContent();
		},
		
	
		methods: {
			async addCount() {
				let self = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除这条记录吗？',
				    success: function (res) {
				        if (res.confirm) {
				            self.deleteOne();
							uni.redirectTo({
								url:'../my_notes/my_notes'
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
				
			},
			closeMask() {
				this.isShow = false;
				setTimeout(()=>{
					this.isMask = false;
				},1)
			},
			addNotes() {
				
				this.isMask = true;
				setTimeout(()=>{
					this.isShow = true;
				},0.5)
			},
			async deleteOne() {
				this.isCount = !this.isCount;
				let kind = this.kind;
				let email = this.email;
				let text = this.mongoList[this.idKey];
				const res = await this.$myRuquest({
					url: '/other/my-note/delete',
					data: {
						email:email,
						kind:kind,
						key:text
					}
				});
				uni.showToast({
					title:res.data.msg
				})
				
				this.countTxt = this.isCount ? '已添加' : '笔记';
			},
			async updateNote() {
				let kind = this.kind;
				let email = this.email;
				let text = this.mongoList[this.idKey];
				let mysay = this.inpVal;
					
					
					let pushtext = ''
					if(kind == 'idioms') {
						pushtext = 'idiom';
					}
					else {
						pushtext = kind;
					}
				const res = await this.$myRuquest({
					url: '/other/my-note/add',
					data: {
						email:email,
						kind:pushtext,
						text:mysay,
						key:text
					}
				});
				uni.showToast({
					title:res.data.msg
				})
				this.closeMask();
				this.getContent();
			},
			async getContent() {
				let kind = this.kind;
				let ee = this.email;
				let title = this.title;
				
				let pushtext = ''
				if(kind == 'idioms') {
					pushtext = 'idiom';
				}
				else {
					pushtext = kind;
				}
				let url = '/other/my-note/findone';
				const res = await this.$myRuquest({
					url: url,	
					data:{
						email: ee,
						kind: pushtext,
						text: title
					}
				})
				this.mynote = res.data.infos;
				this.inpVal = this.mynote;
				
				url = '/home/'+kind+'-one';
				const montext = await this.$myRuquest({
					url: url,	
					data:{
						index:title
					}
				})
				this.mongoList = montext.data.rows[0];
				
				if(this.kind == 'truefalse'){
					if(this.mongoList.answer == 0) {
						this.mongoList.answer = '错误';
					}
					else {
						this.mongoList.answer = '正确';
					}

				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.content {
	position: relative;
	
	.tt-html {
		margin-top: 30px;
	}
	
	
	.title h3 {
		text-align: center;
	}
	.card {
		border: 2px solid #9fd6b7;
		margin-bottom: 50px;
		border-radius: 30px;
	}
	.notes {
		padding: 20px 10px;
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

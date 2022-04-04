<template>
	<view class="content">
		
			<view class="tt-html">
				<view class="card">
					<view class="question" v-for="(item,index,ind) in mongoList" :key="index" v-if="ind!=0 && ind !=listKey.length-1">
						<text class="txt">{{listKey[ind]}}:</text>
						<text class="data">{{item}}</text>
					</view>
				</view>
				
				<view class="footer">
					<view :class="isCount?'isCount':'count'" @click="addCount">
						<image src="../../static/my/star.png" mode=""></image>
						{{countTxt}}
					</view>
	
				</view>
			</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCount:true, //是否收藏
				countTxt:"已收藏",
				mongoList:{},	
				title:"",
				kind:'',// 当前页面是哪种类型
				idKey:'',// 当前项目的主键
				email:'',// 用户唯一标识
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
			uni.setNavigationBarTitle({
			    title: '我的收藏'
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
				this.isCount = !this.isCount;
				let kind = this.kind;
				let email = this.email;
				let text = this.mongoList[this.idKey];
				// console.log(kind,this.mongoList);
				if(this.isCount) {
					
					
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

			async getContent() {
				let kind = this.kind;
				let title = this.title;
				let url = '/home/'+kind+'-one';
				const res = await this.$myRuquest({
					url: url,	
					data:{
						index:title
					}
				})
				this.mongoList = res.data.rows[0];
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
	
}
</style>

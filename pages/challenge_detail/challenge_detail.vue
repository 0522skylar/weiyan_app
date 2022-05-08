<template>
	<view class="container">
		<view class="status_bar"></view>
		<h3>
			{{title}}
		</h3>
		<view class="content animate__animated animate__bounceInDown">
			<view class="num">{{curIndex}}/{{totalCount}}</view>
			<view class="line">
				<view class="curPro" :style="{width:curIndex/totalCount*100+'%'}"></view>
			</view>
			<view class="qname">{{listKey[0]}}</view>
			<view class="text">{{question[firstVal]}}</view>
			
			<view class="qname questitle">{{listKey[1]}}请选择：</view>
			
			<view class="quesBox">
				<view v-for="(item,index) in list" :key="index">
					<view class="list-item" 
					:class="[{success:item.isTrue},{error:item.isErr}]" 
					@click="isResult(item.text,index)">
						{{index+1}}.{{item.text}}
					</view>
				
				</view>
			</view>
			
			<view class="btn" v-if="flag">
				<view 
				@click="goNext" 
				class="button animate__animated animate__bounceInDown">
					下一个
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad(options) {
			let name = options.name;
			this.title = name;
			if(this.title == '猜谚语') {
				this.listKey = ['上句','下句'];
				this.getUrl = '/home/proverb-challenge';
				this.egtitle = 'proverb';
				this.firstVal = 'front';
				this.secondVal = 'behind';
			}
			else if(this.title == '猜歇后语') {
				this.listKey = ['歇后语','答案'];
				this.getUrl = '/home/allegorical-challenge';
				this.egtitle = 'allegorical';
				this.firstVal = 'riddle';
				this.secondVal = 'answer';
			}
			else if(this.title == '猜谜语') {
				this.listKey = ['谜语','答案'];
				this.getUrl = '/home/riddle-challenge';
				this.egtitle = 'riddle';
				this.firstVal = 'quest';
				this.secondVal = 'answer';
			}
			else if(this.title == '名言警句') {
				this.listKey = ['名言警句','作者'];
				this.getUrl = '/home/catchphrase-challenge';
				this.egtitle = 'catchphrase';
				this.firstVal = 'content';
				this.secondVal = 'mrname';
			}
			else if(this.title == '猜字谜') {
				this.listKey = ['字谜','答案'];
				this.getUrl = '/home/charade-challenge';
				this.egtitle = 'charade';
				this.firstVal = 'content';
				this.secondVal = 'answer';
			}
			else if(this.title == '一战到底') {
				this.listKey = ['问题','答案'];
				this.getUrl = '/home/challenge-challenge';
				this.egtitle = 'challenge';
				this.firstVal = 'quest';
				this.secondVal = 'result';
			}
			let ee = '';
			if(this.$store.state.email.length == 0){
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						ee = res.data.email;
					}
				});
				this.email = ee;
			}
			else {
				this.email = this.$store.state.email;
			}
			if(this.email.length != 0) {
				this.getDate();
			}
			else {
				uni.redirectTo({
					url:'../login/login'
				})
				return;
			}
		},
	
		data() {
			return {
				title:"",//是什么标题
				question:{},//当前的问题
				list:[],//获取的4个数组数据
				curIndex:0,//当前第几个
				count:0,//赢了多少个
				totalCount:5,//总共多少个
				flag:false,//判断当前是否已经点击过了
				listKey:[],//页面显示的是什么内容
				getUrl:'',//请求路径
				firstVal:'',//数据库中的字段，
				secondVal:'',//数据库的第二个字段
				egtitle:'',//英文标题
				email: '',//邮箱
			}
		},
		methods: {
			async getDate() {
				let uurl = this.getUrl;
				const res = await this.$myRuquest({
					url: uurl,
				})
				this.list = [];
				let sec = this.secondVal;
				res.data.rows.forEach((item,index) => {
					if(index == 0) {
						this.question = res.data.rows[0];
					}
					let obj = {};
					
					obj.isTrue = false;
					obj.isErr = false;
					obj.text = item[sec];
					this.list.push(obj);
					
				})
				this.list.sort(()=> {
					return Math.random()-0.5;
				})
				console.log(this.question[this.secondVal]);
			},
			isResult(text,index) {
				if(!this.flag) {
					if(text == this.question[this.secondVal]) {
						this.list[index].isTrue = true;
						this.count++;
					}
					else {
						this.list[index].isErr = true;
					}
					this.flag = true;
				}
				else {
					uni.showToast({
						title:'不能再点击了哟,下一个吧',
						duration:2000,
						icon:'none'
					})
					return;
				}
				this.curIndex++;
				
			},
			goNext() {
				this.getDate();
				this.flag = false;
				if(this.curIndex == this.totalCount) {
					let ans = Math.floor(this.count / this.totalCount*100);
					let egtitle = this.egtitle;
					uni.redirectTo({
						url:'../challenge_over/challenge_over?count='+ans+'&kind='+egtitle
					})
				}
			}
		},
		onShow() {

		}
	}
</script>

<style lang="scss" scoped>
@import '../../static/css/animate.css';
.container {
	background-color: #def1e6;
}
.status_bar {
	height: 50px;
	width: 100%;
}
h3 {
	text-align: center;
}
.content {
	padding: 20px;
	min-height: 600px;
	.num {
		text-align: center;
	}
	.line {
		position: relative;
		width: 100%;
		height: 4px;
		margin: 15px 0;
		background-color: #fff;
		.curPro {
			height: 100%;
			background-color: #27be9f;
			transition: all .5s;
		}
	}
	.text {
		font-size: 20px;
		color: #333;
		font-weight: bold;
	}
	.qname {
		font-size: 12px;
		color: #999;
	}
	.questitle {
		margin-top: 20px;
	}
	.quesBox{
		margin-top: 20px;
	}
	.list-item {
		padding: 15px;
		border: 1px solid #ddd;
		box-shadow: 0 1px 6px 0px rgba(0, 69, 189, .1);
		border-radius: 10px;
		box-sizing: border-box;
		margin-bottom: 20px;
	}
	.success {
		border-color: #28bfa0;
		border-width: 2px;
		position: relative;
	}
	.success::after {
		content: "✔";
		width: 30px;
		height: 30px;
		color: #28bfa0;
		position: absolute;
		font-size: 25px;
		font-weight: bold;
		top: 17%;
		right: 20px;
	}
	.error {
		border-color: #fe935b;
		border-width: 2px;
		position: relative;
	}
	.error::after {
		content: "✖";
		width: 30px;
		height: 30px;
		color: #fe935b;
		position: absolute;
		font-size: 25px;
		font-weight: bold;
		top: 17%;
		right: 20px;
	}
	.btn {
	    width: 80%;
	    margin-top: 20px;
	    margin:0 auto  50px auto;
	    .button {
	        width: 100%;
	        height: 50px;
	        line-height: 50px;
	        text-align: center;
	        border-radius: 50px;
	        background-color: #28bfa0;
	        color: #fff;
	    }
	}
}

</style>

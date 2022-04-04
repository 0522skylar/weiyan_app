<template>
	<view class="container">
		<view class="status_bar"></view>
		<h3>
			判断题
		</h3>
		<view class="content">
			<view class="num">{{curIndex}}/{{totalCount}}</view>
			<view class="line">
				<view class="curPro" :style="{width:curIndex/totalCount*100+'%'}"></view>
				<!-- <view class="curPro" style="width:20%"></view> -->
			</view>
			<view class="tt-html">
				<text class="before" :style="'display:'+ttshow">✔</text>
				<text class="after" :style="'display:'+ffshow">✖</text>
				<view class="title">{{dataList.title}}</view>
				<view class="list">
					<view class="sele" 
					v-for="(item,index) in selected" 
					:key="index" 
					:class="[ {success: item.isTrue},{error: item.isError}]"
					@click="myquest(item.answer,index)">
						{{item.text}}
					</view>
				</view>
			</view>
			
			<view class="btn" v-if="flag">
				<view 
				@click="goNext" 
				class="button">
					下一个
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:{},
				curIndex:1,//当前第几个
				count:0,//赢了多少个
				totalCount:5,//总共多少个,
				flag: false,
				selected:[],
				ttshow:'none',
				ffshow:'none',
				email:''
			};
		},
		onLoad() {
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
		methods:{
			async getDate() {
				
				const res = await this.$myRuquest({
					url: '/home/truefalse-challenge',
				})
				this.selected = [];
				this.dataList = res.data.rows[0];
				for(let i = 0; i < 2; i++) {
					
					let obj = {};
					obj.isTrue = false;
					obj.isError = false;
					if(i == 0) {
						obj.text = '对';
						obj.answer = 1;
					}
					else {
						obj.text = '错';
						obj.answer = 0;
					}
					this.selected.push(obj);
				}
			
			},
			myquest(str,index) {
					
					if(!this.flag) {
						if(str == this.dataList.answer) {
							this.count++;
							this.ttshow = 'block';
							this.selected[index].isTrue= true;
						}
						else {
							this.ffshow = 'block';
							this.selected[index].isError= true;
						}
						this.flag = true;
						
					}
					else {
						uni.showToast({
							title:'不能再答此题了下{{{(>_<)}}}，下一题吧'
						})
					}
				
			},
			goNext() {
				this.curIndex++;
				if(this.curIndex > this.totalCount) {
					let ans = Math.floor(this.count / this.totalCount*100);
					uni.redirectTo({
						url:'../challenge_over/challenge_over?count='+ans+'&kind=truefalse'
					})
				}
				this.getDate();
				this.flag = false;
				this.ttshow='none';
				this.ffshow='none';
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.status_bar {
		height: 50px;
		width: 100%;
	}
	background-color: #9fd6b757;
	min-height: 100vh;
}
h3 {
	text-align: center;
	color: #27BF9F;
	padding: 10px 0;
}
.content {
	.num {
		text-align: center;
	}
	.line {
		position: relative;
		width: 80%;
		height: 10px;
		margin: 15px auto;
		border-radius: 10px;
		background-color: #9fd6b7;
		box-shadow: 0 0 0 .25rem rgba(13, 188, 121, .25);
		.curPro {
			height: 100%;
			border-radius: 10px;
			background-color: #27be9f;
			transition: all .5s;
		}
	}
	.tt-html {
		padding: 50px 20px;
		background-color: #fff;
		border-radius: 10px;
		height: 50vh;
		box-sizing: border-box;
		margin: 0px 20px;
		margin-top: 50px;
		position: relative;
		color: #333;
		.before {
			content: "✔";
			// content: "✖";
			display: none;
			width: 40px;
			height: 40px;
			border: 5px solid #fff;
			border-radius: 50%;
			background-color: #55c06a;
			position: absolute;
			top: -20px;
			text-align: center;
			line-height: 40px;
			color: #fff;
			left: 50%;
			transform: translateX(-50%);
		}
		.after {
			// content: "✔";
			content: "✖";
			display: none;
			width: 40px;
			height: 40px;
			border: 5px solid #fff;
			border-radius: 50%;
			background-color: #dd524d;
			position: absolute;
			top: -20px;
			text-align: center;
			line-height: 40px;
			color: #fff;
			left: 50%;
			transform: translateX(-50%);
		}
		.title {
			border-bottom: 1px solid #def1e6;
			margin-bottom: 30px;
			padding: 20px 0;
		}
		.sele {
			padding: 10px 0;
			text-align: center;
			border-radius: 20px;
			box-shadow: 0 1px 6px 0px rgba(0, 69, 189, .1);
			border: 1px solid #ccc;
			margin-bottom: 20px;
		}
		.success {
			box-shadow: 0 0 0 .25rem rgba(13, 188, 121, .25);
			background-color: #0dbc79;
			color: #fff;
		}
		.error {
			box-shadow: 0 0 0 .25rem rgba(188, 61, 13, .25);
			background-color: #dd524d;
			color: #fff;
		}
	}
	.btn {
	    width: 80%;
	    margin-top: 20px;
	    margin:30px auto  50px auto;
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

<template>
	<view class="container">
		<h3>
			百科题库
		</h3>
		<view class="content">
			<view class="num">{{curIndex}}/{{totalCount}}</view>
			<view class="line">
				<view class="curPro" :style="{width:curIndex/totalCount*100+'%'}"></view>
				<!-- <view class="curPro" style="width:20%"></view> -->
			</view>
			<view class="tt-html">
				<view class="question">
					{{dataList.title}}
				</view>
				<view class="selet">
					<view class="one" 
					v-for="(item,index) in selected"
					:key='index'
					@click="myquest(item.nkey,index)" 
					:class="[ {success: item.isTrue},{error: item.isError}]"
					>{{item.nkey}}.{{item.sele}}</view>
					
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
				selected:[]
			};
		},
		onLoad() {
			this.getDate();
		},
		methods:{
			async getDate() {
				
				const res = await this.$myRuquest({
					url: '/home/wikipedia-challenge',
				})
				this.selected = [];
				this.dataList = res.data.rows[0];
				for(let i = 0;i < 4; i++) {
					let obj = {};
					obj.isTrue = false;
					obj.isError = false;
					if(i == 0){
						obj.nkey = 'A';
						obj.sele = this.dataList.answerA;
					}
					else if(i == 1) {
						obj.nkey = 'B';
						obj.sele = this.dataList.answerB;
					}
					else if(i == 2) {
						obj.nkey = 'C';
						obj.sele = this.dataList.answerC;
					}
					else {
						obj.nkey = 'D';
						obj.sele = this.dataList.answerD;
					}
					this.selected.push(obj);
				}
			
			},
			myquest(str,index) {
					
					if(!this.flag) {
						if(str == this.dataList.answer) {
							this.count++;
							this.selected[index].isTrue= true;
						}
						else {
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
					uni.navigateTo({
						url:'../challenge_over/challenge_over?count='+ans
					})
				}
				this.getDate();
				this.flag = false;
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
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
		padding: 10px 20px;
		color: #333;
	}
	.question {
		width: 100%;
		background-color: #9fd6b7;
		box-shadow: 0 0 0 .25rem rgba(13, 188, 121, .25);
		border-radius: 10px;
		padding: 10px 20px;
		box-sizing: border-box;
	}
	.selet {
		margin-top: 40px;
		.one {
			width: 90%;
			margin: 20px auto;
			background-color: #ffffff;
			padding: 10px 0;
			text-align: center;
			border-radius: 10px;
			font-size: 14px;
			box-shadow: 0px 1px 6px 0px rgba(0, 69, 189, .1);
		}
		.success {
			background-color: #27be9f;
			box-shadow: 0 0 0 .25rem rgba(13, 188, 121, .25);
			color: #fff;
		}
		.error {
			background-color: #e16e4d;
			box-shadow: 0 0 0 .25rem rgba(188, 86, 13, .25);
			color: #fff;
		}
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

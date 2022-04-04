<template>
	<view class="container">
		<view  class="your">
			亲爱的{{username}},您好
		</view>
		<view class="your">现在你的等级是：
			<text class="redcolor">{{mystatus}}级{{status[dengji]}}</text>
		</view>
		<view class="your">
			当前积分为：
			<text class="redcolor">{{jifen}}</text>
		</view>
		<image :src="'../../static/status/'+ dengji + 'th.jpg'" class="status"></image>
		<view class="rule">
			<view class="title">积分说明：</view>
			<view>每浏览一篇文章，积分就减二</view>
			<view>每挑战胜利一题，积分就加一</view>
		</view>
		<view class="rule">
			<view class="title">
				等级划分：
			</view>
			<view>1~9级 是魂士境界</view>
			<view>10~19级 是魂师境界</view>
			<view>20~29级 是大魂师境界</view>
			<view>30~39级 是魂尊境界</view>
			<view>40~49级 是魂宗境界</view>
			<view>50~59级 是魂王境界</view>
			<view>60~69级 是魂帝境界</view>
			<view>70~79级 是魂圣境界</view>
			<view>80~89级 是魂斗罗境界</view>
			<view>90~99级 是封号斗罗境界</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:['魂士','魂师','大魂师','魂尊','魂王','魂帝','魂圣','魂斗罗','封号斗罗'],
				mystatus:0,
				dengji:1,
				email:'',
				myAnalyse: {},
				allTotal:'',
				challengeCount:0,
				challengeTotal:0,
				jifen:0,
				username:""
			}
		},
		methods: {
			async getDate() {
				let ee = this.email;
				const res = await this.$myRuquest({
					url: '/info/my-analyse/list',
					data: {
						email:ee,
						total:'all'
					}
				});
				if(res.data.code != 200) {
					uni.showModal({
						content:res.data.msg
					})
					return;
				}
				this.myAnalyse = res.data.infos;
				this.allTotal = res.data.allTotal;
				this.handlerDate();
			},
			handlerDate() {
				let allnum = this.allTotal.reduce((a,b) => a+b);// 全部题目
				
				let isStudy = this.myAnalyse.todaytotal.reduce((a,b) => {
					return a+b.study
				},0);
			
				let arr = [];
				arr.push(this.myAnalyse.idiom);
				arr.push(this.myAnalyse.proverb);
				arr.push(this.myAnalyse.riddle);
				arr.push(this.myAnalyse.charade);
				arr.push(this.myAnalyse.truefalse);
				
				let challengenum = arr.reduce((a,b) => a+b);// 完成挑战的数量
				let arrtest = [];
				arrtest.push(this.myAnalyse.catchphrase);
				arrtest.push(this.myAnalyse.challenge);
				arrtest.push(this.myAnalyse.wikipedia);
				arrtest.push(this.myAnalyse.allegorical);
				challengenum += arrtest.reduce((a,b) => a+b);
				this.challengeCount = challengenum;
				this.challengeTotal = allnum - challengenum;
				this.mystatus = Math.floor(this.challengeCount / this.challengeTotal * 100 ) + 10;
				this.dengji = Math.floor(this.mystatus / 10);
			},
			async getUserInfo() {
				let ee = this.email;
				const res = await this.$myRuquest({
					url: '/info/userInfo',
					data: {
						email:ee
					}
				});
				let data = res.data.myans;
				this.username = data.username;
				this.jifen = data.state;
			},
		},
		onLoad(option) {
			
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
				this.getUserInfo();
			}
			else {
				uni.redirectTo({
					url:'../login/login'
				})
				return;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #9fd6b7;
		
	}
	.your {
		text-align: center;
		font-size: 20px;
		font-weight: 400;
		padding: 20px 0;
		.redcolor {
			color: red;
		}
	}
	.status {
		width: 100%;
	}
	.title {
		text-align: center;
		font-size: 20px;
		font-weight: 400;
	}
	.rule {
		line-height: 40px;
		text-align: center;
	}
</style>

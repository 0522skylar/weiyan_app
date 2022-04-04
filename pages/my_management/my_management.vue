<template>
	<view class="container">
		<view class="charts-box">
		  <qiun-data-charts
		    type="line"
		    :chartData="chartData"
		    :echartsH5="true"
		    :echartsApp="true"
		    background="none"
		  />
		</view>
		
		<view class="charts-box">
		  <qiun-data-charts
		    type="column"
		    :chartData="chartData_test"
			:echartsH5="true"
			:echartsApp="true"
		    background="none"
		  />
		</view>
		
		<view class="card">
			<view class="head">当前进度</view>
			<view class="box">
				<view>已学习总数：{{studyCount}}</view>
				<view>已挑战总数：{{challengeCount}}</view>
				<view>未学习总数：{{studyTotal}}</view>
				<view>未挑战总数：{{challengeTotal}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				myAnalyse:{},
				chartData:{
					"categories": ["成语","谚语","谜语","字谜","判断"],
					"series": [
						{
							"name": "目标值",
							"data": []
						},
						{
							"name": "完成量",
							"data": []
						}
					]
				},
				chartData_test:{
					"categories": ["名言警句","一战到底","百科全书","歇后语"],
					"series": [
						{
							"name": "目标值",
							"data": []
						},
						{
							"name": "完成量",
							"data": []
						}
					]
				},
				studyTotal:0,
				challengeTotal:0,
				studyCount:0,
				challengeCount:0,
				allTotal:[]
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
				
				// console.log(this.myAnalyse.todaytotal.reduce((a,b) => a+b.study,0)
				let isStudy = this.myAnalyse.todaytotal.reduce((a,b) => {
					return a+b.study
				},0);
				this.studyTotal = allnum - isStudy;
				this.chartData.series[0].data = this.allTotal.slice(0,5);
				this.chartData_test.series[0].data = this.allTotal.slice(5);
				let arr = [];
				arr.push(this.myAnalyse.idiom);
				arr.push(this.myAnalyse.proverb);
				arr.push(this.myAnalyse.riddle);
				arr.push(this.myAnalyse.charade);
				arr.push(this.myAnalyse.truefalse);
				this.chartData.series[1].data = arr;
				
				let challengenum = arr.reduce((a,b) => a+b);// 完成挑战的数量
				let arrtest = [];
				arrtest.push(this.myAnalyse.catchphrase);
				arrtest.push(this.myAnalyse.challenge);
				arrtest.push(this.myAnalyse.wikipedia);
				arrtest.push(this.myAnalyse.allegorical);
				challengenum += arrtest.reduce((a,b) => a+b);
				this.challengeCount = challengenum;
				this.challengeTotal = allnum - challengenum;
				this.studyCount = isStudy;
				this.chartData_test.series[1].data = arrtest;
			}
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
			uni.setNavigationBarTitle({
			    title: '进度管理'
			});
			
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		// background-color: rgba(0,10,32,0.05);
		width: 280px;
		border: 1px solid #f2f2f3;
		margin: 50px auto;
		border-radius: 5px;
		.head {
			// width: 100%;
			padding: 14px 15px;
			border-bottom: 1px solid #f2f2f3;;
			display: flex;
			
			background-color: #e6f2ff;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}
		.box {
			margin: 16px;
			border: 1px solid #f2f2f3;
			border-radius: 5px;
			view {

				    display: flex;
				    -webkit-box-align: center;
					border-bottom: 1px solid #f2f2f3;;
				    align-items: center;
				    -webkit-box-pack: justify;
				    justify-content: space-between;
				    padding: 10px 15px;
			}
		}
	}
.charts-box{
  width: 100%;
  height:300px;
}
.title {
	margin-top: 20px;
	text-align: center;
}
	
.card {
	
}
</style>

<template>
	<view>
		<view class="title">所做题目统计图</view>
		<view class="charts-box">
		  <qiun-data-charts
		    type="pie"
		    :chartData="chartData1"
			:echartsH5="true"
			:echartsApp="true"
		    background="none"
		  />
		</view>
		<view class="title">近日做题统计图</view>
		<view class="charts-box">
		  <qiun-data-charts
		    type="line"
		    :chartData="chartData"
		    :echartsH5="true"
		    :echartsApp="true"
		    background="none"
		  />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				chartData1:{
				  categories:[],
				  series:[
					  {
						  "data": [
							  {
								  "name": "谜语",
								  "value": 0
							  },
							  {
								  "name": "谚语",
								  "value": 0
							  },
							  {
								  "name": "歇后语",
								  "value": 0
							  },
							  {
								  "name": "名言警句",
								  "value": 0
							  },
							  {
								  "name": "字谜",
								  "value": 0
							  },
							  {
									"name": "一战到底",
									"value": 0
							  },
							  {
									"name": "成语接龙",
									"value": 0
							  },
							  {
									"name": "百科题库",
									"value": 0
							  },
							  {
									"name": "判断句",
									"value": 0
							  }
						  ]
					  }
				  ],
				},
				chartData:{
					categories:[],
					series:[
					   {
							"name": "学习量",
							"data": []
						},
						{
							"name": "挑战量",
							"data": []
						}
					]
				},
				myAnalyse:{}
			}
		},
		methods: {
			async getDate() {
				let ee = this.email;
				const res = await this.$myRuquest({
					url: '/info/my-analyse/list',
					data: {
						email:ee
					}
				});
				
				if(res.data.code != 200) {
					uni.showModal({
						content:res.data.msg
					})
					return;
				}
				this.myAnalyse = res.data.infos;
				this.handlerList();
			},
			handlerList() {
				
				this.chartData1.series[0].data.forEach((item) => {
					if(item.name == '谜语') {
						item.value = this.myAnalyse.riddle;
					}
					else if(item.name == '谚语') {
						item.value = this.myAnalyse.proverb;
					}
					else if(item.name == '字谜') {
						item.value = this.myAnalyse.charade;
					}
					else if(item.name == '歇后语') {
						item.value = this.myAnalyse.allegorical;
					}
					else if(item.name == '名言警句') {
						item.value = this.myAnalyse.catchphrase;
					}
					else if(item.name == '一战到底') {
						item.value = this.myAnalyse.challenge;
					}
					else if(item.name == '成语接龙') {
						item.value = this.myAnalyse.idiom;
					}
					else if(item.name == '百科题库') {
						item.value = this.myAnalyse.wikipedia;
					}
					else if(item.name == '判断句') {
						item.value = this.myAnalyse.truefalse;
						
					}
				})
				let len = this.myAnalyse.todaytotal.length;
				let arr = this.myAnalyse.todaytotal;
				if(len > 5) {
					arr = arr.reverse().slice(0,5);
				}
				else {
					arr = arr.reverse();
				}
				arr.forEach((item) => {
					this.chartData.series[0].data.push(item.study);
					let datime = item.time.slice(5);
					this.chartData.categories.push(datime);
					this.chartData.series[1].data.push(item.challenge);
				})
				 // console.log(this.chartData.categories);
			}
		},
		onLoad() {
			// this.email = this.$store.state.email;
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
		onShow() {
			
		}
	}
</script>

<style lang="scss" scoped>
.charts-box{
  width: 100%;
  height:300px;
}
.title {
	margin-top: 20px;
	text-align: center;
}
</style>

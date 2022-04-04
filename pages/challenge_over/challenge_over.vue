<template>
	<view class="container">
		<h3>挑战结束</h3>       
		<view class="res">
		   <view class="left">
			   <p class="text">恭喜你,完成本次挑战</p>
				<p class="small">每天努力一点点,知道你在改变</p>
				<image src="../../static/girl.png" mode="" class="girl"></image>
		   </view>
		   
	
		   <view class="right">
			   <view class="top">
				   获得积分为：
			   </view>
			   <p class="count animate__animated animate__rubberBand">{{result}}</p>
		   </view>
		   
		</view> 
		
		<view class="huan">
		  <view class="charts-box">
		    <qiun-data-charts
		      type="arcbar"
		      :chartData="chartData"
		      background="none"
		    />
		  </view>
		  
		  <view class="myprogress">{{progress}}</view>
		</view>
		<view class="body">
	
			<view class="btn">
				<button class="again" @click="gotoAgain">再测一次</button>
				<button class="gohome" @click="gotoHome">完成挑战</button>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:'',
				result:'',
				email:'',
				chartData:{
					"series": [
						{
							"name": "正确率",
							"data": 0,
							"color": "#2fc25b"
						}
					]
				},
				progress:''
			}
		},
		methods: {
			gotoHome() {
				uni.switchTab({
					url:'../index/index'
				})
			},
			gotoAgain() {
				uni.switchTab({
					url:'../challenge/challenge'
				})
			},
			async getnote() {
				let ee = this.email;
				let num = this.count / 20;
				let kind = this.kind;
				let mouth = new Date().getMonth()+1;
				let day = new Date().getDate();
				let year = new Date().getFullYear();
				let time = year + '-'+mouth +'-'+day;
				let obj = {};
				obj.study =0;
                obj.challenge=num;
                obj.time=time;
				// console.log(obj);
				const res = await this.$myRuquest({
					url: '/info/my-analyse/add',
					data: {
						email:ee,
						num:num,
						kind:kind,
						total:obj
					}
				});
				// console.log(res);
			},
			async getSum() {
				let addsum = Number(this.result);
				let ee = this.email;
				const res = await this.$myRuquest({
					url: '/info/add-statu',
					data: {
						email:ee,
						addCount: addsum
					}
				});
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
 			
			this.count = options.count;
			this.result = '+' + (this.count / 20);
			this.chartData.series[0].data = (this.count / 100);
			this.progress = this.count + '%';
			
			this.kind = options.kind;
			this.getSum();
			this.getnote();
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.huan {
		position: relative;
		width: 100%;
		height: 250px;
		.myprogress {
			position: absolute;
			top: 39%;
			left: 40%;
			background-color: #fff;
			color: #f00;
			text-align: center;
			font-size: 28px;
		}
	}
	h3 {
	    text-align: center;
	}
	.res {
	    height: 100px;
	    background-color: #fe7f48;
	    border-radius: 20px;
	    margin: 20px 10px;
	    color: #fff;
	    display: flex;
	    .left {
	        padding-left: 20px;
			.girl {
				width: 50px;
				height: 50px;
			}
	        .text {
	            font-size: 18px;
	            padding-top: 10px;
	        }
	        .small {
	            font-size: 12px;
	        }
	    }
	    .right {
	        position: relative;
	        flex: 1;
	        .top {
	            width: 75px;
	            padding: 5px;
	            position: absolute;
	            top: 15px;
	            right: 0;
	            border-top-left-radius: 20px;
	            border-bottom-left-radius: 20px;
	            background-color: #f05419;
	            font-size: 12px;
	        }
	        .count {
	            font-size: 30px;
	            position: absolute;
	            bottom: 10px;
	            width: 100px;
	            right: 0;
	        }
	    }
	}
	.body {
	    text-align: center;
	    .btn {
	        display: flex;
	        justify-content: space-around;
	    }
	    button {
	        width: 150px;
	        border-radius: 38px;
	    }
	    .again {
	        border: 1px solid $lingColor;
	        color: $lingColor;
	        background-color: #fff;
	    }
	    .gohome {
	        background-color: $lingColor;
	        color: #fff;
	    }
		.challenge {
			width: 240px;
			height: 240px;
		}
	}
}
</style>

<template>
	<view class="container">
		<h3>挑战结束</h3>       
		<view class="res">
		   <view class="left">
			   <p class="text">恭喜你,完成本次挑战</p>
				<p class="small">每天努力一点点,知道你在改变</p>
				<img src="https://iconfont.alicdn.com/t/fd2fe95e-e379-4b51-97f2-0af8a33129b4.png" alt="">
		   </view>
		   <view class="right">
			   <view class="top">
				   本次正确率为
			   </view>
			   <p class="count animate__animated animate__rubberBand">{{result}}</p>
		   </view>
		   
		</view> 
		<view class="body">
			<view>
				<img src="https://iconfont.alicdn.com/t/a572e6b9-a323-4a47-9886-2b5745df4373.png" alt="">
			</view>
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
				result:''
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
			}
		},
		onLoad(options) {
			
			this.count = options.count;
			this.result = this.count + '%';
			
		}
	}
</script>

<style lang="scss" scoped>
@import '../../static/css/animate.css';
.container {
	
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
	        .text {
	            font-size: 18px;
	            padding-top: 10px;
	        }
	        .small {
	            font-size: 12px;
	        }
	        img {
	            width: 50px;
	            height: 50px;
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
	}
}
</style>

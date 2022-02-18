<template>
	<view class="content">
		<view class="head">
			<h3>欢迎来到 记艺App</h3>
			<view class="inputLine"></view>
		</view>
		<view class="body">
			<view class="banner">
				<view class="img">
					<swiper indicator-dots circular class="imgs">
						<swiper-item v-for="item in swipers" :key="item.id">
							<image :src="item" mode=""></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="title">
					准备变得学识渊博
				</view>
				<view class="info">
					这个App会让你变得更爱学习中国的传统文化,中国的文字,中国的诗词,中国的成语,这些都能变得很有意思
				</view>
			</view>
			<view class="inputLine"></view>
		</view>
		
		<view class="navto">
			<view class="line">it's for free!</view>
			<navigator url="../login/login" hover-class="navigator-hover">
			<view class="login">登录</view>
			</navigator>
			
			<navigator url="../register/register" hover-class="navigator-hover">
			<view class="register">注册</view>
			</navigator>
		</view>
		
		<view class="details">
			<view class="title">
				app包含的内容有且不限于
			</view>
			<ul>
				<li>成语</li>
				<li>谚语</li>
				<li>歇后语</li>
				<li>谜语</li>
				<li>励志古言</li>
				<li>经典对联</li>
			</ul>
		</view>
		
		<view class="footer">
			此app的一切归属权属于天天
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [
					"../../static/bgc.png",
					"../../static/deng.jpg",
					"../../static/zhong.jpg"
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../static/css/stylesheet.css");
	.content {
		font-family: "qiantubifengshouxieti";
		padding: 0 0 30rpx 0;
		h3 {
			font-size: 20px;
			font-weight: 700;
			text-align: center;
			
		}
		.head {
			background-color: #9fd6b7;
			height: 400rpx;
			border-bottom: 2px solid #000;
			.inputLine {
				width: 700rpx;
				height: 100rpx;
				background-color: #fff;
				border-radius: 100rpx;
				margin: 20rpx auto;
				border: 2px solid #000;
			}
		}
		
		.body {
			position: relative;
			height: 300px;
			.banner {
				position: absolute;
				top: -151px;
				left: 20px;
				width: 334px;
				height: 400px;
				border: 2px solid #000;
				border-radius: 25px;
				background-color: #fff;
				padding-top: 20px;
				.imgs {
					height: 275px;
					uni-image {
						width: 335px;
					}
				}
				
				.title  {
					text-align: center;
					font-size: 20px;
					font-weight: 700;
					
				}
				.info {
					font-size: 14px;
					text-align: center;
					padding: 20rpx;
					
				}
			}
			
				
			.inputLine {
				width: 700rpx;
				height: 100rpx;
				background-color: #fff;
				border-radius: 100rpx;
				margin: 20rpx auto;
				border: 2px solid #000;
				position: absolute;
				top: 225px;
				left: 11px;
				z-index: -1;
			}
		}
		
		.navto {
			text-align: center;
			.login  {
				width: 334px;
				height: 80rpx;
				background-color: #ffae85;
				border-radius: 80rpx;
				border: 2px solid #000;
				margin: 30rpx auto;
				line-height: 80rpx;
			}
			.register {
				color: #fff;
				width: 334px;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #5dbee7;
				border-radius: 80rpx;
				border: 2px solid #000;
				margin: 30rpx auto;
			}
		}
		.details {
			padding: 40rpx;
		}
		.footer {
			padding: 40rpx;
			text-align: center;
			font-size: 12px;
		}
	}
</style>

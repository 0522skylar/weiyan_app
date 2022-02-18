<template>
	<view>
		<view class="container">
			<view class="logo">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			
			<h1>诗词歌赋</h1>
			<view class="buttons_irzW">
				<view class="info" 
				@click="gotoLogin()"
				>登录
					<image src="/static/icon/right-arrow.svg" width="20" height="20" class="start-arrow_3MeT"></image>
				</view>
				<view class="btn" @click="gotoStudy()">快速开始</view>
				<view class="btn" @click="gotoChallenge()">测试</view>
			</view>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				islogin:true
			}
		},
		onLoad() {
			uni.getStorage({
			    key: 'userInfo',
			    success:  (res) => {
					uni.redirectTo({
						url:'../browse/browse'
					})
			    }
			});
		},
		methods: {
			gotoLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			gotoStudy() {
				console.log(111);
				uni.navigateTo({
					url:"/pages/introduce/introduce",
					
				})
			},
			gotoChallenge() {
				uni.navigateTo({
					url:"/pages/test/test"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
		align-items: center;
		background-image: url(https://lf-cdn-tos.bytescm.com/obj/static/webinfra/modern-js-website/assets/images/banner-mobile-bg-9d94c86efc8d6cf60c026b28f4536fa6.png);
		padding: 2rem;
		
		background-position: bottom;
		background-size: cover;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: 691px;
		justify-content: flex-start;
		overflow: hidden;
		
		position: relative;
		.logo {
			margin-top: 60px;
			.logo_3-YD {
			    width: 70vw;
			}
			image {
				width: 370px;
				height: 30px;
			}
		}
		h1 {
			color: #fff;
			font-family: Noto Sans SC;
			font-size: 8vw;
			font-style: normal;
			font-weight: 700;
			margin-top: 21px;
		}
		.buttons_irzW {
			align-items: center;
			flex-direction: column;
			justify-content: center;
			margin-top: 30px;
			width: 65%;
			.info {
				background: linear-gradient(274.85deg,#4ecaff 3%,#64cfde 97.17%);
				border-radius: 39px;
				
				display: flex;
				height: 96rpx;
				justify-content: center;
				line-height: 48px;
				opacity: .8;
				width: 100%;
				align-items: center;
				.start-arrow_3MeT {
					margin-left: 8px;
					width: 40rpx;
					height: 40rpx;
					
					line-height: 48px;
				}
			}
			.info:hover {
				color: #000;
				transition: opacity .3s;
			}
			.btn {
				align-items: center;
				background: hsla(0,0%,100%,.07);
				border: 1px solid #4ecaff;
				border-radius: 39px;
				box-sizing: border-box;
				color: #00b3ff;
				cursor: pointer;
				display: flex;
				height: 49px;
				justify-content: center;
				margin-left: 0;
				margin-top: 42px;
				transition: .3s;
				width: 100%;
			}
		}
		
	}
	.map {
		width: 750rpx;
		height: 750rpx
	}
</style>

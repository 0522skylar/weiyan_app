<template>
	<view class="tabbar">
		<view class="footer">
			<view>
				<image src="../../static/icon/home-active.png" mode=""></image>
				<view class="text current">
					首页
				</view>
			</view>
			<view @click="tostudy">
				<image src="../../static/icon/study.png" mode=""></image>
				<view class="text">
					学习
				</view>
			</view>
			<view @click="tochallenge()">
				<image src="../../static/icon/pk.png" mode=""></image>
				<view class="text">
					挑战
				</view>
			</view>
			<view @click="tomypage()">
				<image src="../../static/icon/my.png" mode=""></image>
				<view class="text">
					我的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"mytabbar",
		data() {
			return {
				
			}
		},
		methods:{
			tostudy() {
				
				uni.switchTab({
					url:'../../pages/study/study',
				})
			},
			tochallenge() {
				uni.switchTab({
					url:'../../pages/challenge/challenge'
				})
			},
			tomypage() {
				uni.switchTab({
					url:'../../pages/my/my'
				})
			}
		}
	}
</script>

<style lang="scss">
	
.tabbar {
	position: fixed;
	background-color: #fff;
	bottom: 0;
	left: 0;
	width: 100vw;
	z-index: 30;
	height: 50px;
	border: 1px solid #ccc;
	padding-top: 5px;
	box-sizing: border-box;
	.footer {
		display: flex;
		justify-content: space-around;
	}
	image {
		width: 24px;
		height: 24px;
	}
	.text {
		font-size: 12px;
		color: #666;
	}
	.current {
		color: #4ea5b6;
	}
}
</style>

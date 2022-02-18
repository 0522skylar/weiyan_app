<template>
	<view class="content">
		<view class="myhead">
			<image src="../../static/author.png" mode="" class="myimg"></image>
			<navigator url="../login/login" class="login">
				<text>{{isLogin ? '已登录' : '登录'}}</text>
			</navigator>
			<text v-if="!isLogin">初次登录可获得100积分</text>
			<text v-if="isLogin">天天，您当前的等级是：</text>
			
		</view>
		<view class="study" >
			<view class="title">
				<navigator url="../my_collection/my_collection">
					<text class="icon">
						<image src="../../static/my/collection.png" mode=""></image>
					</text>
					<text class="txt">
						我的收藏
					</text>
					<text class="arrow-right">
						<image src="../../static/my/arrow-right.png" mode=""></image>
					</text>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_notes/my_notes">
					<text class="icon">
						<image src="../../static/my/note.png" mode=""></image>
					</text>
					<text class="txt">
						我的笔记
					</text>
					<text class="arrow-right">
						<image src="../../static/my/arrow-right.png" mode=""></image>
					</text>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_analyse/my_analyse">
					<text class="icon">
						<image src="../../static/my/analyse.png" mode=""></image>
					</text>
					<text class="txt">
						做题分析
					</text>
					<text class="arrow-right">
						<image src="../../static/my/arrow-right.png" mode=""></image>
					</text>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_management/my_management">
					<text class="icon">
						<image src="../../static/my/proces.png" mode=""></image>
					</text>
					<text class="txt">
						进度管理
					</text>
					<text class="arrow-right">
						<image src="../../static/my/arrow-right.png" mode=""></image>
					</text>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_person/my_person">
					<text class="icon">
						<image src="../../static/my/person.png" mode=""></image>
					</text>
					<text class="txt">
						个人资料
					</text>
					<text class="arrow-right">
						<image src="../../static/my/arrow-right.png" mode=""></image>
					</text>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_integral/my_integral">
					<text class="icon">
						<image src="../../static/my/jifen.png" mode=""></image>
					</text>
					<text class="txt">
						积分
					</text>
					<text class="arrow-right">
						<image src="../../static/my/arrow-right.png" mode=""></image>
					</text>
				</navigator>
			</view>
			<view class="title" v-on:click="layout(e)">
				
					<text class="icon">
						<image src="../../static/my/layout.png" mode=""></image>
					</text>
					<text class="txt">
						退出
					</text>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
			}
		},
		methods: {
			layout(e) {
				
				if(!this.isLogin) {
					uni.showModal({
						content:'请先登录'
					})
				}
				else {
					uni.removeStorage({
					    key: 'userInfo',
					    success: function (res) {
					        uni.showToast({
					        	title:'您已退出，当前不能进入浏览页面'
					        })
					    }
					});
				}
			}
		},
		onLoad() {
			uni.getStorage({
			    key: 'userInfo',
			    success:  (res) => {
					this.isLogin = true;
			    }
			});
		}
	}
</script>

<style lang="scss" scoped>
body,html {
	margin: 0;
	padding: 0;
}
.content {
	
	.myhead {
		display: flex;
		
		line-height: 100rpx;
		padding: 20rpx 0 20rpx 40rpx;
		color: #fff;
		background-color: #9fd6b7;
		.login{
			width: 100px;
		}
		.myimg {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			border: 2px solid #333;
			vertical-align: middle;
			margin-right: 20rpx;
		}
	}
	.study {
		padding: 20rpx;
		.title{
			display: flex;
			align-items: center;
			cursor: pointer;
			font-size: 14px;
			line-height: 40rpx;
			height: 44px;
			padding: 0px 15px;
			color: rgb(69,77,89);
		}
		image {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
	}
}
</style>

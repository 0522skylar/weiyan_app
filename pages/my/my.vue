<template>
	<view class="content">
		<view class="myhead">
			<image :src="imgurl" mode="" class="myimg"></image>
			<navigator url="../login/login" class="login">
				<text>{{isLogin ? '已登录' : '登录'}}</text>
			</navigator>
			<text v-if="!isLogin">初次登录可获得10积分</text>
			
			
		</view>
		<view class="study" >
			<view class="title">
				<navigator url="../my_collection/my_collection">
						<image src="../../static/my/collection.png" mode=""></image>
					<text class="txt">
						我的收藏
					</text>
						<image src="../../static/my/arrow-right.png" mode=""></image>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_notes/my_notes">
						<image src="../../static/my/note.png" mode=""></image>
					<text class="txt">
						我的笔记
					</text>
						<image src="../../static/my/arrow-right.png" mode=""></image>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_analyse/my_analyse">
						<image src="../../static/my/analyse.png" mode=""></image>
					<text class="txt">
						做题分析
					</text>
						<image src="../../static/my/arrow-right.png" mode=""></image>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_management/my_management">
						<image src="../../static/my/proces.png" mode=""></image>
					<text class="txt">
						进度管理
					</text>
						<image src="../../static/my/arrow-right.png" mode=""></image>
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_person/my_person">
					
						<image src="../../static/my/person.png" mode=""></image>
					
					<text class="txt">
						个人资料
					</text>
					
						<image src="../../static/my/arrow-right.png" mode=""></image>
					
				</navigator>
			</view>
			<view class="title">
				<navigator url="../my_integral/my_integral">
			
						<image src="../../static/my/jifen.png" mode=""></image>
	
					<text class="txt">
						积分
					</text>
				
						<image src="../../static/my/arrow-right.png" mode=""></image>
		
				</navigator>
			</view>
			<view class="title" v-on:click="layout">
				
					
						<image src="../../static/my/layout.png" mode=""></image>
					
					<text class="txt">
						退出
					</text>
				
			</view>
		</view>
	</view>
</template>

<script>
	 import store from '@/store/index.js'
	export default {
		data() {
			return {
				isLogin:false,
				email:'',
				imgurl:'http://192.168.43.249:80/img/author.png'
			}
		},
		methods: {
			layout() {
				
				if(!this.isLogin) {
					uni.showModal({
						content:'请先登录'
					})
				}
				else {
					let _self = this;
					uni.removeStorage({
					    key: 'userInfo',
					    success: function (res) {
							store.commit('setemail','');
							store.commit('setisLogin',false);
							_self.isLogin = false;
							_self.imgurl = 'http://localhost:80/img/author.png';
					        uni.showToast({
					        	title:'您已退出，当前不能进入浏览页面'
					        })
					    }
					});
				}
			},
			async getPhoneInfo() {
				if (!window.performance && !window.performance.getEntries) {
					return false; 
				 } 
				 var result = []; 
				 // 监控类型为xmlhttprequest并且请求端口是3000的urL
				window.performance.getEntries().forEach((item) => {
					if(item.initiatorType  == 'xmlhttprequest') {
						result.push(
							{ 
								'url': item.name,
								'entryType': item.entryType, 
								'type': item.initiatorType, 
								'duration(ms)': item.duration 
							}
						); 
					}
				}); 
				console.table(result);
				result = JSON.stringify(result);
				
				const obj = await this.$myRuquest({
					url: '/info/getUserInfo',
					method: 'POST',
					data: {
						result
					}
				})
				
				console.log(obj)
				if(obj.data.code === 200) {
					console.log('监听数据成功')
					uni.showModal({
						content:'监听数据成功'
					})
				}
			},
			
			async getNew() {
				let ee = this.email;
				const res = await this.$myRuquest({
					url: '/info/userInfo',
					data: {
						email:ee
					}
				});
				uni.setStorage({
					key:'userInfo',
					data:res.data.myans
				});
			}
		},
		onShow() {
			if(this.$store.state.email.length == 0){
				uni.getStorage({
				    key: 'userInfo',
				    success:  (res) => {
						this.email = res.data?.email;
						if(res.data != null) {
							if(res.data.avatorImg.length != 0) {
								this.imgurl = 'http://localhost:80/img/'+res.data.avatorImg;
							}
							if(this.email.length != 0) {
								this.isLogin = true;
							}
						}
						else {
							this.imgurl = 'http://192.168.43.249:80/img/author.png';
						}
						
				    }
				});
			}
			else {
				this.email = this.$store.state.email;
				this.isLogin = true;
			}
			this.getNew();
		},
		onLoad() {
		},
		onHide() {
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
			border: 2px solid #e8f3ff;
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

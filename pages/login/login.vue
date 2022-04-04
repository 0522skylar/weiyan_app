<template>
	<view>
		<view class="header">
			<image src="../../static/author.png" alt="">
			</image>
		</view>
		 <form @submit="formSubmit" @reset="formReset">
			
			<view class="column">
				<view class="title">email</view>
				<input class="uni-input" name="email" placeholder="邮箱" v-model="email"/>
				<view class="icon-success" v-if="vale[0]==1"></view>
				<view class="icon-error" v-if="vale[0]==2"></view>
			</view>
			<view class="column">
				<view class="title">password</view>
				<input class="uni-input" name="password" placeholder="密码" v-model="password"/>
				<view class="icon-success" v-if="vale[1]==1"></view>
				<view class="icon-error" v-if="vale[1]==2"></view>
			</view>
			<view class="mybtn">
				<button form-type="submit" class="btn">登录</button>
				<button form-type="reset" class="btn" @click="gotoRegiter">没有账号</button>
			</view>
		</form>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				email:'',
				password:"",
				vale:[0,0]
			}
		},
		methods: {
			async formSubmit(){
				let uemail = this.email;
				let upsw = this.password;
				const res = await this.$myRuquest({
					url: '/other/login',
					method: 'POST',
					data:{
						email: uemail,
						password: upsw,
					}
				});
			
				if(res.data.code != 200) {
					uni.showModal({
						content:res.data.msg
					});
					this.formReset();
				}
				else {
					uni.setStorage({
						key:'userInfo',
						data:res.data.userInfo
					});
					store.commit('setemail',uemail);
					
					
					store.commit('setisLogin',true);
					
					uni.redirectTo({
						url:'../browse/browse'
					});
				}
			},
			formReset: function(e) {
				this.email = '';
				this.password = '';
			},
			gotoRegiter() {
				uni.navigateTo({
					url:"/pages/register/register"
				})
			}
		},
		watch:{
			email: function(newval,oldval){
				if(newval == '') {
					this.vale[0] = 0;
				}
				else {
					let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
					//正则表达式
					if(reg.test(newval)) {
						this.vale[0] = 1;
					}
					else {
						this.vale[0] = 2;
					}
				}
			},
			password: function(newval,oldval){
				if(newval == '') {
					this.vale[1] = 0;
				}
				else {
					if(newval.length < 6) {
						this.vale[1] = 2;
					}
					else {
						this.vale[1] = 1;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.header{
		height: 200rpx;
		text-align: center;
		padding-top: 20rpx;
		image {
			width: 150rpx;
			height: 150rpx;
			border: 2px solid #6c6c6c;
			border-radius: 50%;
		}
	}
	form {
		padding: 0 20rpx;
		.column {
			height: 100rpx;
			border: 2px solid #6c6c6c;
			border-radius: 10rpx;
			margin: 0 40rpx;
			margin-bottom: 80rpx;
			position: relative;
			
			.uni-input {
				padding: 0 20rpx;
				margin-top: 25rpx;
			}
			.title {
				position: absolute;
				top : -14px;
				left: 10px;
				background-color: #fff;
			}
			.icon-error {
				width: 40rpx;
				height: 40rpx;
				border: 2px solid #6c6c6c;
				border-radius: 50%;
				background-color: #f00;
				position: absolute;
				top: 35%;
				right: 20rpx;
				&::after{
					content: "✖";
					color: #fff;
					display: block;
					width: 20rpx;
					height: 20rpx;
					position: absolute;
					top: -2px;
					left: 4px;
				}
			}
			.icon-success {
				width: 40rpx;
				height: 40rpx;
				border: 2px solid #6c6c6c;
				border-radius: 50%;
				background-color: #63d564;
				position: absolute;
				top: 35%;
				right: 20rpx;
				
				&::after{
					content: "✔";
					display: block;
					color: #fff;
					width: 20rpx;
					height: 20rpx;
					position: absolute;
					top: 0;
					left: 4px;
				}
			}
			
			&:hover {
				border-color: #9fd6b7;
			}
		}
	}
	.mybtn{
		height: 200rpx;
		border-radius: 40px;
		border: 1px solid #6c6c6c;
		display: flex;
		align-items: center;
		background-color: #9fd6b7;
		.btn {
			width: 250rpx;
			height: 100rpx;
			border-radius: 100rpx;
			border: 2px solid #6c6c6c;
			background-color: #5dbee7;
		}
	}
</style>

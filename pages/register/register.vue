<template>
	<view class="content">
		<view class="header">
			<image src="../../static/author.png" alt="">
			</image>
		</view>
		 <form @submit="saveUserInfo" @reset="formReset">
			<view class="column">
				<view class="title">email</view>
				<input class="uni-input" name="email" placeholder="邮箱" v-model="email"/>
				<view class="icon-success" v-if="vale[0] == 1"></view>
				<view class="icon-error" v-if="vale[0] == 2"></view>
			</view>
			<view class="column">
				<view class="title">uername</view>
				<input class="uni-input" name="uername" placeholder="用户名,长度最小2位"  v-model="username"/>
				<view class="icon-success" v-if="vale[1] == 1"></view>
				<view class="icon-error" v-if="vale[1] == 2"></view>
			</view>
			<view class="column">
				<view class="title">password</view>
				<input class="uni-input" name="password" placeholder="密码,长度最小6位"  v-model="password"/>
				<view class="icon-success" v-if="vale[2] == 1"></view>
				<view class="icon-error" v-if="vale[2] == 2"></view>
			</view>
			<view class="column">
				<view class="title">repassword</view>
				<input class="uni-input" name="repsw" placeholder="确认密码"  v-model="repas"/>
				<view class="icon-success" v-if="vale[3] == 1"></view>
				<view class="icon-error" v-if="vale[3] == 2"></view>
			</view>
			<view class="mybtn">
				<view class="save">保存并继续</view>
				<view class="remeber">记住你的账号和密码呦ヾ(≧▽≦*)o</view>
				<button form-type="submit" class="btn">
					<span class="arrow"></span>
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				username:'',
				password:'',
				repas:'',
				vale:[0,0,0,0]
			}
		},
		methods: {
			async saveUserInfo() {
				let uname = this.username;
				let uemail = this.email;
				let upsw = this.password;
				const res = await this.$myRuquest({
					url: '/other/register',	
					method: 'POST',
					data:{
						username:uname,
						email: uemail,
						password: upsw,
						role:'normal',
						state:0
					}
				});
				if(res.data.code != 200) {
					uni.showModal({
						content:res.data.msg
					});
					this.formReset();
				}
				else {
					uni.redirectTo({
						url:'../login/login'
					})
				}
				
			},
			formReset() {
				this.username = '';
				this.email = '';
				this.password = '';
				this.repas = '';
				
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
			username: function(newval,oldval){
				if(newval == '') {
					this.vale[0] = 0;
				}
				else {
					if(newval.length < 3) {
						this.vale[1] = 2;
					}
					else {
						this.vale[1] = 1;
					}
				}
				
			},
			password: function(newval,oldval){
				if(newval == '') {
					this.vale[2] = 0;
				}
				else {
					if(newval.length < 6) {
						this.vale[2] = 2;
					}
					else {
						this.vale[2] = 1;
					}
				}
			},
			repas: function(newval,oldval){
				if(newval == '') {
					this.vale[3] = 0;
				}
				else {
					if(newval == this.password) {
						this.vale[3] = 1;
					}
					else {
						this.vale[3] = 2;
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
					color: #6c6c6c;
					display: block;
					line-height: 24px;
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
					color: #6c6c6c;
					line-height: 20px;
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
		position: relative;
		background-color: #9fd6b7;
		.save {
			font-size: 20px;
			font-weight: 700;
			position: absolute;
			top: 20%;
			left: 30px;
		}
		.remeber {
			font-size: 12px;
			font-weight: 400;
			position: absolute;
			top: 60%;
			left: 30px;
		}
		.btn {
			position: absolute;
			top: 25%;
			right: 20px;
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			border: 2px solid #6c6c6c;
			background-color: #5dbee7;
			
			.arrow {
				width: 30px;
				height: 30px;
				background: url(../../static/icon/arrow.png) no-repeat 0 0; 
				position: absolute;
				top: 18%;
				left: 16%;
			}
			
		}
	}
</style>

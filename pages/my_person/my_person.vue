<template>
	<view class="container">
		<view class="author">
			<!-- <image src="../../static/author.png" mode=""></image> -->
			<view class="box" :style="'background-image: url('+imgUrl+');'"></view>
			<view class="imgBox" :style="'background-image: url('+imgUrl+');'"></view>
			<view class="title" @click="checkImg()">更改头像</view>
		</view>
		
		<view class="myform">
			<view class="col" @click="changeName('昵称')">
				<text>昵称：</text>
				<text>{{username}} &gt;</text>
			</view>
			<view class="col" @click="changeName('签名')">
				<text>签名：</text>
				<text>{{markup}}  &gt;</text>
			</view>
			<view class="col" @click="changeAgeInfo()">
				<text>年龄：</text>
				<text>{{age}} &gt;</text>
			</view>
			<view class="col" @click="changeSexInfo()">
				<text>性别：</text>
				<text>{{sex}} &gt;</text>
			</view>
		</view>
		<view class="foot">
			<view class="btn" @click="saveInfo()">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'"http://localhost:80/img/author.png"',
				email:'',
				username:'',
				sex:"无",
				age:'无',
				markup:"无",
			}
		},
		methods: {
			checkImg() {
				let that = this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						let ee = that.email;
				        uni.uploadFile({
				            url: 'http://192.168.43.249:80/info/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
							formData:{
								email:ee
							},
				            success: (uploadFileRes) => {
								let obj = JSON.parse(uploadFileRes.data);
								let index = obj.url.indexOf('g');
								let url = obj.url.slice(index+2);
								let oldindex = this.imgUrl.indexOf('g');
								let oldUrl = this.imgUrl.slice(0,oldindex+2);
								this.imgUrl = oldUrl + url +'"';
								uni.showToast({
									title:'更改成功！'
								})
				            }
				        });
				    }
				});
			},
			async getUserInfo() {
				let ee = this.email;
				const res = await this.$myRuquest({
					url: '/info/userInfo',
					data: {
						email:ee
					}
				});
				let data = res.data.myans
				this.username = data.username;
				this.sex = data.sex || "无";
				this.age = data.age || "无";
				this.markup = data.markup || "无";
				let oldindex = this.imgUrl.indexOf('g');
				let oldUrl = this.imgUrl.slice(0,oldindex+2);
				if(data.avatorImg != '') {
					this.imgUrl = oldUrl + data.avatorImg +'"';
				}
			},
			changeSexInfo() {
				let _self = this;
				uni.showActionSheet({
					itemList: ['男', '女', '无'],
					    success: function (res) {
							let index = res.tapIndex + 1;
							if(index == 1) {
								_self.sex = '男';
							}
							else if(index == 2) {
								_self.sex = '女';
							}
							else {
								_self.sex = '无';
							}
							
					    },
					    fail: function (res) {
					        console.log(res.errMsg);
					    }
				})
			},
				
			changeAgeInfo() {
				let _self = this;
				uni.showActionSheet({
					itemList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,
					32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,
					68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
					    success: function (res) {
							let index = res.tapIndex + 1;
							_self.age = index;
							
					    },
					    fail: function (res) {
					        console.log(res.errMsg);
					    }
				})
			},
			changeName(name) {
				let _self = this;
				let text = '';
				if(name == '昵称') {
					text = this.username;
				}
				else {
					text = this.markup;
				}
				uni.showModal({
				    title: '请输入'+name,
				    content: text,
					editable:true,
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							console.log(res.content);
							if(name == '昵称') {
								_self.username = res.content;
							}
							else {
								_self.markup = res.content;
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			async saveInfo() {
				let obj = {
					email: this.email,
					username: this.username,
					sex: this.sex,
					age: this.age,
					markup: this.markup
				}
				
				const res = await this.$myRuquest({
					url: '/info/usersave',
					data: {
						obj
					}
				});
				if(res.data.code== 200) {
					uni.showToast({
						title: '保存成功！'
					});
				}
			}
		},
		onLoad() {
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
					this.getUserInfo();
				}
				else {
					uni.redirectTo({
						url:'../login/login'
					})
				}
		},
		onShow() {
		}
	}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	margin: 0;
	overflow: hidden;
	.author {
		position: relative; 
		height:40%;
		width: 100%;
		border: 1px solid #ebebeb;
		text-align: center;
	}
	
	 .box{
		position: absolute;
		z-index: -1;
		top:0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url(../../static/author.png) no-repeat center;
		background-size: cover;
		-webkit-filter: blur(10px);
		-moz-filter: blur(10px);
		-ms-filter: blur(10px);
		filter: blur(10px);
		border: 1px solid #000;
	}
	.imgBox{
		position: relative;
		z-index: 999;
		background: url(../../static/author.png) no-repeat center;
		background-size: cover;
		width: 100px;
		height: 100px;
		margin: 40px auto;
		border-radius: 50%;
		border: 1px solid #fff;
	}
	.title {
		text-align: center;
		color: #fff;
		display: inline-block;
		padding: 5px 20px;
		background-color: #9fd6b7;
		border-radius: 16px;
	}
	.myform {
		margin-top: 30px;
		border-top: 1px dashed #ccc;
		padding: 0 20px;
		box-sizing: border-box;
		.col {
			display: flex;
			justify-content: space-between;
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid #ccc;
		}
	}
	.foot {
		margin-top: 20px;
		text-align: center;
		.btn {
			display: inline-block;
			padding: 5px 20px;
			border-radius: 5px;
			background-color: #9fd6b7;
			color:#fff;
		}
	}
}
</style>

<template>
	<view class="container">
		<h3>{{title}}</h3>
		<h4>{{author}}</h4>
		<h4>
			{{kind}}
		</h4>
		<p v-for="(item,index) in content" :class='[select==2 ? "center" : "",select==0 ? "why" : ""]'>
			{{item}}
		</p>
		<p v-for="(item,index) in intor">{{item}}</p>
		
		
		<view class="footer">
			<view :class="isCount?'isCount':'count'" @click="addCount">
				<image src="../../static/my/star.png" mode=""></image>
				{{countTxt}}
			</view>
			<view :class="isZan?'isCount':'count'"  @click="addZan">
				<image src="../../static/my/zan.png" mode=""></image>
				{{zanTxt}}
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				content:[],
				type:'',
				select:'',// 为0是十万个为什么， 1是故事， 2是唐诗三百首
				author:'', // 作者
				kind:'', // 种类
				intor:[],// 注释
				isCount:false,
				isZan:false,
				countTxt:"收藏",
				zanTxt:'点赞',
				email:'',// 用户唯一标识
				mytext:''
			}
		},
		methods: {
		    async getTitle() {
				let text = this.title;
				const res = await this.$myRuquest({
					url: '/other/brower-find',
					data: {
						title:text
					}
				});
				let arr = res.data.rows[0];
				let str = arr.content.replace(/&hellip;/g,'...');
				if(this.select == 2){
					str = str.replace(/　　/,'');
					this.content = str.split('。');
					this.content.forEach((item,index) => {
						if(index != this.content.length-1) {
							this.content[index] += '。';
						}
					})
					this.author = arr.author;
					this.kind = arr.kind;
					this.intor = arr.intro.split('【');
					this.intor.forEach((item,index) => {
						this.intor[index] = item.replace(//g,'')
						// console.log(item.indexOf(''));
						if(index != 0) {
							this.intor[index] = '【'+this.intor[index];
						}
						
					})
				}
				else if(this.select == 1){
					str = str.replace(/&lsquo;/g,'‘');
					str = str.replace(/&rsquo;/g,'’');
					str = str.replace(/&mdash;/g,'——');
					this.content = str.split('\n');
				}
				else {
					str = str.replace(/　　/,'');
					this.content = str.split('。');
					this.content.forEach((item,index) => {
						if(index != this.content.length-1) {
							this.content[index] += '。';
						}
					})
				}
				
				this.type = arr.typeid;
			},
			async addCount() {
				this.isCount = !this.isCount;
				let kind = this.mytext;
				let email = this.email;
				let text = this.title;
				// console.log(kind,this.mongoList);
				if(this.isCount) {
					
					
					const res = await this.$myRuquest({
						url: '/other/my-collection/add',
						data: {
							email:email,
							kind:kind,
							text:text
						}
					});
					uni.showToast({
						title:res.data.msg
					})
				}
				else {
					
					const res = await this.$myRuquest({
						url: '/other/my-collection/delete',
						data: {
							email:email,
							kind:kind,
							text:text
						}
					});
					uni.showToast({
						title:res.data.msg
					})
				}
				this.countTxt = this.isCount ? '已收藏' : '收藏';
				
			},
			addZan() {
				this.isZan = !this.isZan;
				this.addTxt = this.isZan?'已点赞':'点赞';
			},
		},
		onLoad(option) {
			this.title = option.title;
			this.select = option.type;
			if(option.isout || option.isout) {
				this.isCount = true;
				this.countTxt = '已收藏';
			}
			if(this.select == 0) {
				this.mytext = 'thousandwhy';
			}
			else if(this.select == 1) {
				this.mytext = 'story';
			}
			else {
				this.mytext = 'poetry';
			}
			this.getTitle();
			uni.getStorage({
			    key: 'userInfo',
			    success:  (res) => {
					this.email = res.data.email;
			    }
			});
		}
	}
</script>

<style lang="scss" scoped>
.container {
	padding: 20px;
	h3 {
		text-align: center;
	}
	h4 {
		text-align: center;
		margin-top: 20px;
	}
	.center {
		text-align: center;
		border-bottom: 1px dashed #ccc;
	}
	.why {
		text-indent: 2em;
	}
	
	.footer {
		height: 100rpx;
		border: 2px solid #9fd6b7;
		justify-content: space-around;
		align-items: center;
		border-radius: 100rpx;
		display: flex;
		image {
			width: 16px;
			height: 16px;
		}
		.count {
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #dd524d;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
		.isCount{
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #9fd6b7;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
		.add{
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #dd524d;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
		.isAdd{
			width: 120rpx;
			line-height: 50rpx;
			height: 50rpx;
			background-color: #9fd6b7;
			color:#fff;
			border-radius: 100rpx;
			font-size: 14px;
			text-align: center;
		}
	}
}
p {
	line-height: 40px;
}
</style>

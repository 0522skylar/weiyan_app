<template>
	<view class="container">
		<h3>成语接龙</h3>
		<view class="mask" v-if="misShow"> 
			<image src="https://img.soogif.com/xNZrf2i9tW1iO574XzGyNoaaTMEAawHz.gif_s400x0"></image>
		</view>
		<view class="scroll" v-if="!misShow">
			<view v-for="(item,index) in finishArr" :key='index' :style="`transform:scale(${1-(finishArr.length-index)*0.1})`">
				<text>{{item[0]}}</text>
				<text>{{item[1]}}</text>
				<text>{{item[2]}}</text>
				<text>{{item[3]}}</text>
			</view>
			
			<view class="selecting">
				<text>{{seleWord[0]}}</text>
				<text>{{seleWord[1]}}</text>
				<text>{{seleWord[2]}}</text>
				<text>{{seleWord[3]}}</text>
			</view>
		</view>
		
		<view class="select">
			<view class="col" v-for="(item,index) in bottomWord" :key='index'>
				<view class="column" v-for="(tt,indd) in item" :key='indd' @click="myseletion(tt)">{{tt}}</view>
			</view>	
			<view class="col">
				<view class="column special" @click="MyMessage">
					<image src="../../static/icon/message.png" mode=""></image>
				</view>
				<view class="column special" @click="returnBefore">
					<image src="../../static/icon/return.png" mode=""></image>
				</view>
				<view class="column special" @click="MyKeyAns">
					<image src="../../static/icon/answer.png" mode=""></image>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				misShow:true,//是否加载完成
				randList:[],// 随机成语数组
				ansList:[],// 接龙成语6个
				currentIndex:[false,false,false,false,false],// 当前第几个显示
				bottomWord:[],// 下面随机的文字，供选择
				curWord:'', // 当前选择的成语
				finishArr:[], // 已经选择完成的成语
				seleWord:'',// 当前选择的词
				curIndex: 1,// 当前第几个词
				rightcount:5,// 选对多少个成语，没有出现答案都为选对
				isNext:false,// 判断是否下一个成语
			};
		},
		onLoad() {
			
			this.getIdiom();
		},
		methods:{
			async getIdiom() {
				const res = await this.$myRuquest({
					url: '/home/idioms-challenge',
				});
				console.log(res.data.rows);
				this.randList = res.data.randList;
				this.ansList = res.data.rows;
				this.curWord = this.ansList[1];
				this.finishArr.push(this.ansList[0]);
				this.handleRandWord();
				
			},
			handleRandWord() {
				this.bottomWord = [];
				let seleStr = this.randList.slice(0,4).join(',');
				seleStr = seleStr.replace(/,/g,'');//去除所有逗号
				seleStr = seleStr.slice(0, 14);
				console.log(this.curWord);
				seleStr += this.curWord;
				let seleArr = seleStr.split('');
				seleArr = seleArr.sort(function(){
					return Math.random() - 0.5;
				})
				let count = 0;
				for(let i = 0; i < 6; i++){
					let arr = [];
					for(let j = 0; j < 3; j++) {
						arr.push(seleArr[count++]);
					}
					this.bottomWord.push(arr);
				}
				this.isNext = false;
				this.misShow = false;
			},
			myseletion(char) {
				this.seleWord += char;
				let mystr = this.seleWord;
				if(this.seleWord.length == 4 && mystr == this.curWord) {
					this.finishArr.push(this.curWord);
					this.curIndex++;
					this.curWord = this.ansList[this.curIndex];
					this.seleWord = '';
					if(this.curIndex == 6) {
						let ans = Math.floor(this.rightcount / 5*100);
						uni.navigateTo({
							url:'../challenge_over/challenge_over?count='+ans
						})
					}
					this.handleRandWord();
				}
				else {
					if(this.seleWord.length >= 4) {
						this.seleWord = this.seleWord.slice(0,4);
						uni.showToast({
							title:'答案错误',
							icon:'error'
						})
					}
				}
				
			},
			returnBefore() {
				this.seleWord = this.seleWord.slice(0,this.seleWord.length-1);
			},
			async MyMessage() {
				let findmsg = this.curWord;
				const msg = await this.$myRuquest({
					url:'/home/idioms-find',
					data: {
						val: findmsg
					}
				});
				let message = msg.data.rows[0].explanation;
				uni.showModal({
					title:'该成语解释：',
					content:message
				})
			},
			MyKeyAns() {
				if(!this.isNext) {
					this.rightcount--;
				}
				this.isNext = true;
				uni.showToast({
					title:this.curWord,
					duration:3000,
					image:'../../static/icon/key.png'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	background-color: #9fd6b7;
	width: 100vw;
	height: 94vh;
	h3 {
		text-align: center;
	}
	.mask {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top:0;
		left: 0;
		background-color: #85b0a6;
		z-index: 10;
		image {
			position: absolute;
			top: 20%;
			left: 0;
			width: 100%;
			height: 281px;
		}
	}
	.scroll {
		background-color: rgba(255,255,255,.4);
		margin-top: 10px;
		height: 60vh;
		width: 100%;
		view {
			height: 50px;
			box-sizing: border-box;
			
			transition: transform .5s;
			text-align: center;
			text {
				display: inline-block;
				width: 40px;
				height: 40px;
				line-height: 40px;
				padding: 5px;
				font-size: 25px;
				margin: 10px;
				background-color: rgba(255,255,255,.4);
			}
		}

		.selecting {
			margin-top: 20px;
		}
	}
	
	.select {
		display: flex;
		padding: 20px 30px;
		justify-content: space-around;
		.col {
			flex: 1;
			text-align: center;
			.column {
				padding: 5px;
				display: inline-block;
				border: 1px solid #000;
				border-radius: 5px;
				margin-top: 10px;
				background-color: rgba(255,255,255,.4);
			}
		}
		.special {
			border: 1px solid red;
			image {
				width: 16px;
				height: 16px;
			}
		}
	}
	
}
</style>

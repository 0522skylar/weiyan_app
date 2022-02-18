<template>
	<view class="content">
		<view class="head">
			<view class="hello">Hello Ameliani</view>
			<view class="text">
				learn Leadership Training <text class="strong">Now</text>
			</view>
			<searchInput/>
		</view>
		<br/>
		<view class="list">
			<view id="miyu">谜语</view>
			<navigator url="../study_list/study_list?id=谜语" hover-class="none">
				<view class="card">
					<view class="question">
						破天竹(打一字)
					</view>
					<text class="answer">笑</text>
					<image src="/static/smile.png"></image>
					
				</view>
			</navigator>
			<view id="yanyu">谚语</view>
			<navigator url="../study_list/study_list?id=谚语" hover-class="none">
				<view class="card">
					<view class="question">
						有雨天边亮，无雨顶上光
					</view>
					<text class="answer">地平线上特显光明，表示还要继续下雨；反之,如果地平线上比较灰暗，天顶上显得光亮,这是天气转晴的预兆</text>
				
					<image src="/static/sky.png"></image>
				</view>
			</navigator>
			<view id="xiehouyu">歇后语</view>
			<navigator url="../study_list/study_list?id=歇后语" hover-class="none">
				<view class="card">
					<view class="question">
						大年初一拜年
					</view>
					<text class="answer">你好我也好</text>
					
					<image src="/static/xinnian.png"></image>
				</view>
			</navigator>
			<view id="chengyu">成语</view>
			<navigator url="../study_list/study_list?id=成语" hover-class="none">
				<view class="card">
					<view class="question">
						前程似锦
					</view>
					<text class="answer">锦绣前程</text>
				
					<image src="/static/chengyu.png"></image>
				</view>
			</navigator>
			
			<view id="mingyanjingju">名言警句</view>
			<navigator url="../stu_secondlist/stu_secondlist?id=名言警句" hover-class="none">
				<view class="card">
					<view class="question">
						比自己生命更为可贵的是理想
					</view>
					<text class="answer">理想能使人勇敢而无所畏惧</text>
					
					<image src="/static/lixiang.png"></image>
				</view>
			</navigator>
			
			<view id="panduanti">判断题</view>
			<navigator url="../stu_secondlist/stu_secondlist?id=判断题" hover-class="none">
				<view class="card">
					<view class="question">
						好望角在非洲的南非
					</view>
					<text class="answer">对</text>
					
					<image src="/static/haowangj.png"></image>
				</view>
			</navigator>
			
			<view id="yizhandaodi">一战到底</view>
			<navigator url="../stu_secondlist/stu_secondlist?id=一战到底" hover-class="none">
				<view class="card">
					<view class="question">
						桂林山水甲天下，哪儿的山水甲桂林？
					</view>
					<text class="answer">阳朔</text>
				
					<image src="/static/guilin.png"></image>
				</view>
			</navigator>
			
			
			<view id="caizimi">猜字谜</view>
			<navigator url="../study_list/study_list?id=字谜" hover-class="none">
				<view class="card">
					<view class="question">
						太阳的儿子(打一字)
					</view>
					<text class="answer">星（太阳 = 日,太阳“生”的:星）</text>
					
					<image src="/static/star.png"></image>
				</view>
			</navigator>
			
			<view id="diulian">对联</view>
			<navigator url="../study_list/study_list?id=对联" hover-class="none">
				<view class="card">
					<view class="question">
						贵有恒何必三更起五更睡
					</view>
					<text class="answer">最无益只怕一日曝十日寒</text>
					
					<image src="/static/chizhiyih.png"></image>
				</view>
			</navigator>
			
			<view id="baiketiku">百科题库</view>
			<navigator url="../stu_secondlist/stu_secondlist?id=百科全书" hover-class="none">
				<view class="card">
					<view class="question">
						刚生下来的鸡蛋为什么不好吃？
					</view>
					<text class="answer">含有很多的二氧化碳</text>
					
					<image src="/static/jidan.png"></image>
				</view>
			</navigator>
			
			
		</view>
		<view>{{list}}</view>
		<button @click="getList()">测试获取</button>
	</view>
</template>

<script>
	import searchInput from "../../components/search_input/search_input.vue";
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			
		},
		methods: {
			async getList() {
				const res = await this.$myRuquest({
					url: '/home/riddle-challenge'
				})
				this.list = res.data.rows;
				console.log(res);
			}
		},
		components : {
			searchInput
		}
	}
</script>

<style lang="scss" scoped>
	scroll-view {
		.drawerBtn {
			background-color: #9fd6b7;
		}
	}
	.head {
		padding: 20px;
		.hello {
			font-weight: 700;
			font-size: 30px;
		}
		.text {
			font-size: 14px;
			color: #999;
			margin: 10px 0;
			.strong {
				color: #000;
				font-weight: 700;
			}
		}
	
	}
		
	.list {
		padding: 40rpx;
		background-color: #b7e0c9;
		
		.card {
			height: 400rpx;
			border-radius: 40rpx;
			border: 2px solid #333;
			position: relative;
			margin: 40px 0;
			image {
				position: absolute;
				top: 8rpx;
				left: 8rpx;
				height: 380rpx;
				width: 97%;
				border-radius: 40rpx;
				z-index: 1;
			}
			.answer {
				position: absolute;
				width: 90%;
				bottom: 2%;
				right: 2%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				padding: 5px 10px;
				height: 60rpx;
				background-color: #fead85;
				text-align: center;
				border: 2px solid #333;
				border-radius: 40rpx;
				line-height: 60rpx;
				z-index: 2;
				font-size: 12px;
			}
			.question {
				position: absolute;
				top: -50rpx;
				left: 0;
				padding: 5px 10px;
				
				height: 100rpx;
				border: 2px solid #333;
				border-radius: 40rpx;
				text-align: center;
				line-height: 100rpx;
				background-color: #fff;
				z-index: 2;
			}
		}
	}
</style>

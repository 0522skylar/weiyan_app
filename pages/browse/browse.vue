<template>
	<view class="container">
		<view class="myhead">
			<image src="../../static/icon/search.png" class="glass"></image>
			<input type="text" v-model="sreachText" @focus="searchTitle()">
		</view>
		<view class="tabSele">
			<text v-for="(item,index) in tabName" 
			:key='index'
			:class="index==clickCount?'curent':''" 
			@click="changeContent(index)">{{item}}</text>
		 	
		</view>
		
		<view class="hot">
			<view class="title">记艺热榜</view>
			<view class="rank">
				<view v-for="(item,index) in hotList" 
				:key='item._id' 
				class="columnList"
				@click="gotoRead(item.title)"
				>{{index+1}}.{{item.title}}</view>
				
				<view style="text-align: center;">查看更多~~~</view>
			</view>
		</view>
		<scroll-view class="list">
			
			<view class="nape" v-for="(item,index) in dataList" :key='index' @click="gotoRead(item.title)">
				<view class="name">
					{{item.title}}
				</view>
				<view class="imgbox">
					<image :src="item.img1"></image>
					<image :src="item.img2"></image>
					<image :src="item.img3"></image>
				</view>
				<view class="comment">
					<text>{{item.kind}}</text>
					<!-- <text>3021阅读</text>
					<text>23评</text> -->
				</view>
				
			</view>
		</scroll-view>
		
		<uni-load-more :status="more" v-if="dataList.length > 4"></uni-load-more>
		
		<mytab></mytab>
	</view>
</template>

<script>
	import mytab from '../../components/mytabbar/mytabbar.vue';
	export default {
		data() {
			return {
				dataList:[], // 浏览下滑部分
				showName:'one',
				sreachText:'',
				tabName:['十万个为什么','故事大全','唐诗三百首'],
				clickCount:0,// 当前点击的是哪个tab，用于判断高亮
				hotList:[], // 热点排行榜
				more:'more',// 触底加载更多文本变化
			};
		},
		components:{
			mytab
		},
		onShow() {
			this.getList();
			this.getHotList();
			uni.setNavigationBarTitle({
			    title: '首页'
			});
		},
		methods:{
			async getList() {
				let curUrl = '/other/brower-why';
				let folder = 'why';
				let kindName = 'typeid';
				if(this.showName == 'one') { // 十万个为什么
					curUrl = '/other/brower-why';
					folder = 'why';
					kindName = 'typeid';
				}
				else if(this.showName == 'two') {
					curUrl = '/other/brower-story';
					folder = 'story';
					kindName = 'storytype';
				}
				else if(this.showName == 'three'){
					curUrl = '/other//brower-poetry';
					folder = 'three';
					kindName = 'kind';
				}
				else {
					curUrl = '';
					folder = 'hot';
					kindName = 'typeid';
				}
				const res = await this.$myRuquest({
					url: curUrl
				})
				let arr = res.data.rows;
				arr.forEach((item,index) => {
					arr[index].kind = item[kindName];
					arr[index].img1 = 'http://120.55.191.178:8080/images/'+folder+'/'+Math.ceil(Math.random()*10)+'.jpg';
					arr[index].img2 = 'http://120.55.191.178:8080/images/'+folder+'/'+Math.ceil(Math.random()*10)+'.jpg';
					arr[index].img3 = 'http://120.55.191.178:8080/images/'+folder+'/'+Math.ceil(Math.random()*10)+'.jpg';
				})
				this.dataList.push(...arr);
				// console.log();
			},
			async getHotList() {
				let curUrl = '/other/hot-why';
				if(this.showName == 'one') { // 十万个为什么
					curUrl = '/other/hot-why';
				}
				else if(this.showName == 'two') {
					curUrl = '/other/hot-story';
				}
				else if(this.showName == 'three'){
					curUrl = '/other//hot-poetry';
				}
				else {
					curUrl = '';
				}
				const res = await this.$myRuquest({
					url: curUrl
				})
				this.hotList = res.data.rows;
				// console.log(this.hotList);
			},
			changeContent(dd) {
				this.clickCount = dd;
				if(dd == 0) {
					this.showName = 'one';
				}
				else if(dd == 1) {
					this.showName = 'two';
				}
				else if(dd == 2) {
					this.showName = 'three';
				}
				else  {
					this.showName = 'four';
				}
				this.dataList = [];
				this.hotList = [];
				this.getList();
				this.getHotList();
			},
			
			onReachBottom() {// 触底加载更多
				// console.log(111111);
				this.status = 'loading';
				setTimeout(() => {
						this.getList();//执行的方法
				}, 1000)//这里我是延迟一秒在加载方法有个loading效果，如果接口请求慢的话可以去掉
				this.status = 'more';
			},
			gotoRead(title) {
				let tt = this.clickCount;
				uni.navigateTo({
					url:'../read_content/read_content?title='+title+'&type='+tt
				})
			},
			searchTitle() {
				uni.redirectTo({
					url:'../search_browse/search_browse'
				})
			}
 		}
	}
</script>

<style lang="scss">

.myhead {
	height: 50px;
	padding: 10px 30px;
	position: relative;
	.glass {
		position: absolute;
		top: 25%;
		left: 36px;
		width: 20px;
		height: 20px;
	}
	input{
		border: 1px solid #ccc;
		padding-left: 36px;
		height: 30px;
		border-radius: 5px;
		background-color: #fafafa;
	}
}
.tabSele {
	display: flex;
	justify-content: space-around;
	padding-bottom: 20px;
	border-bottom: 1px solid #ccc;
	color: #666;
	.curent {
		color: #60b0b7;
		font-size: 17px;
	}
	
}

.hot {
	margin-top: 10px;
	padding: 0 20px;
	.title {
		height: 50px;
		line-height: 50px;
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		padding-left: 20px;
		background-image: linear-gradient(to right,#9fd6b7, #4ea5b6);
	}
	.rank {
		view {
			height: 40px;
			line-height: 40px;
			border-bottom: 1px dashed #ccc;
		}
		.columnList {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
.list{
	// padding-bottom: 84px;
	.nape {
		border-bottom: 1px solid #f0f0f0;
		padding: 10px;
	}
	.comment {
		font-size: 12px;
		color: #999;
		text {
			border: 1px solid #666;
			border-radius: 10px;
			margin-right: 10px;
			padding: 0px 10px;
		}
	}
	
	.name {
		font-size: 16px;
		color: #444;
	}
	.imgbox {
		display: flex;
		justify-content: space-between;
		margin: 10px;
		image {
			height: 100px !important; 
		}
	}
}
</style>

<template>
	<view class="column">
		<view class="searchbtn">
			<span class='icon'></span>
			<input type="text" class="input" placeholder="Search" v-model="inpVal"/>
		</view>
		<button class="drawer" @click="showDrawer">
			<img src="../../static/icon/drawer.png" class="icon"/>
		</button>
		<uni-drawer ref="showRight" mode="right" :mask-click="false">
			<scroll-view style="height: 100%;" scroll-y="true">
				<button @click="closeDrawer" class="drawerBtn">关闭</button>
				<view v-for="(item,index) in gameLiat" :key="item.id" class="drawName" @click="jump(item.cid)">{{index+1}}. {{ item.name }}</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	export default {
		name:"search_input",
		data() {
			return {
				inpVal:"",
				gameLiat:[
				{
					name:"谜语",
					id:1,
					cid:'miyu'
				},
				{
					name:"谚语",
					id:2,
					cid:'yanyu'
				},
				{
					name:"歇后语",
					id:3,
					cid:'xiehouyu'
				},
				{
					name:"成语",
					id:4,
					cid:'chengyu'
				},
				{
					name:"名言警句",
					id:5,
					cid:'mingyanjingju'
				},
				{
					name:"判断题",
					id:6,
					cid:'panduanti'
				},
				{
					name:"一战到底",
					id:7,
					cid:'yizhandaodi'
				},
				{
					name:"猜字谜",
					id:8,
					cid:'caizimi'
				},
				{
					name:"对联",
					id:9,
					cid:'diulian'
				},
				{
					name:"百科题库",
					id:10,
					cid:'baiketiku'
				},
				]
			};
		},
		methods: {
			showDrawer() {
			    this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			// 锚点跳转
			jump(id){
				uni.createSelectorQuery().select('#'+id).boundingClientRect(data => {// 需要跳转到的节点，我这里的选择的节点是动态传入的
					uni.createSelectorQuery().select('.list').boundingClientRect(res => { // 当前页面最外层节点
						// 可以输出data、res 查看信息
						uni.pageScrollTo({
							scrollTop: data.top-res.top,
							duration: 100
						});
					}).exec()
				}).exec()
			}

		}
	}
</script>

<style lang="scss" scoped>
scroll-view {
	.drawerBtn {
		background-color: #9fd6b7;
	}
	.drawName {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-bottom: 1px dashed #ccc;
	}
}

	.column {
			height: 100rpx;
			
			display: flex;
			.searchbtn {
				border: 2px solid #333;
				border-radius: 20px;
				flex: 1;
				margin-right: 10rpx;
				background-color: #f0f0f0;
				display: flex;
				align-items: center;
				.icon {
					display: block;
					width: 100rpx;
					height: 100%;
					background: url(../../static/icon/search.png) no-repeat 13px 12px;
					background-size: 50rpx;
					border-right: 2px solid #333;
				}
				.input {
					// background-color: skyblue;
					margin-left: 20rpx;
				}
				
				
			}
			.drawer {
				width: 100rpx;
				border: 2px solid #333;
				border-radius: 20px;
				background-color: #5dbee7;
				position: relative;
				.icon {
					position: absolute;
					top: 20%;
					left: 17%;
				}
			}
		}
</style>

<template>
	<view class="content">
		<view class="searchInput">
			挑战打卡
		</view>
		<view>
		    <uni-calendar 
		    :insert="true"
		    :lunar="true" 
		   
		    @change="change"
			:selected="selected"
		    />
		</view>
		<view class="list">
			<view class="column" v-for="(item,index) in listName" :key="index">
				<view class="row" v-for="(title, ind) in item" :key="title" @click="gotoNav(title)">
					<text>{{title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchInput from '../../components/search_input/search_input.vue'
	export default {
		data() {
			return {
				listName:[
					[
						"猜谜语","猜谚语","猜歇后语"
					],
					[
						"名言警句","猜字谜","一战到底"
					],
					[
						"成语接龙","百科题库","判断句"
					]
				],
				selected: [{
						date: '2022-1-1'
				   }, {
					   date: '2022-1-3'
				   }, {
					   date: '2022-1-5'
				   }, {
					   date: '2022-1-6'
				   }]
				}

			
		},
		methods: {
			gotoNav(name) {
				if(name=='成语接龙'){
					uni.navigateTo({
						url:"../idiom/idiom?name="+name
					})
				}
				else if(name == '判断句'){
					uni.navigateTo({
						url:'../true_false/true_false'
					})
				}
				else if(name == '百科题库') {
					uni.navigateTo({
						url:'../wikipedia/wikipedia'
					})
				}
				else {
					uni.navigateTo({
						url:"../challenge_detail/challenge_detail?name="+name
					})
				}
				
			},
			change(e) {
			    console.log(e);
			}

		},
		components:{
			searchInput
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		
		.searchInput {
			padding: 20rpx;
			text-align: center;
			margin: 20rpx auto;
			color: #4CD964;
			font-size: 20px;
			font-weight: 700;
			border-radius: 20px;
			border: 2px solid #333;
		}
		
		.list {
			margin-top: 40rpx;
			display: flex;
			width: 100%;
			flex-direction: column;
			border: 2px solid  #9fd6b7;
			box-sizing: border-box;
			.column {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				.row {
					flex:1;
					line-height: 120px;
					text-align: center;
					height: 240rpx;
					border: 1px solid #9fd6b7;
				}
			}
			
		}
	}
	
</style>

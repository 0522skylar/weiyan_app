<template>
	<view class="container">
		<view class="your">现在你的等级是：<text class="redcolor">
		{{mystatus}}级{{status[dengji-1]}}</text></view>
		<image :src="'../../static/status/'+ dengji + 'th.jpg'" class="status"></image>
		<view class="rule">
			<view class="title">
				等级划分：
			</view>
			<view>1~9级 是魂士境界</view>
			<view>10~19级 是魂师境界</view>
			<view>20~29级 是大魂师境界</view>
			<view>30~39级 是魂尊境界</view>
			<view>40~49级 是魂宗境界</view>
			<view>50~59级 是魂王境界</view>
			<view>60~69级 是魂帝境界</view>
			<view>70~79级 是魂圣境界</view>
			<view>80~89级 是魂斗罗境界</view>
			<view>90~99级 是封号斗罗境界</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:['魂士','魂师','大魂师','魂尊','魂王','魂帝','魂圣','魂斗罗','封号斗罗'],
				mystatus:0,
				dengji:1,
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.mystatus = option.mystatus;
			this.dengji = option.dengji || 1;
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #9fd6b7;
		
	}
	.your {
		text-align: center;
		font-size: 20px;
		font-weight: 400;
		padding: 20px 0;
		.redcolor {
			color: red;
		}
	}
	.status {
		width: 100%;
	}
	.title {
		text-align: center;
		font-size: 20px;
		font-weight: 400;
	}
	.rule {
		line-height: 40px;
		text-align: center;
	}
</style>

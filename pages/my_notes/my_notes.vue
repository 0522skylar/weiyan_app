<template>
	<view class="container">
		<view  class="mysearch">
			<image  class="close"
			v-if="inpVal.length > 0"
			@click="clearVal()"
			src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAThJREFUSA3dlbFuAjEQRIGkSIEipQz8RQoKCrp8e7oU+YMUEYIuiiiOBuYVe1o5Xq+FhJBYaTifPTvj3bszk8m9xsMFhVVzapNziW+EQfjrNFqKtxL2wtHnlAaIr4Un4VU4CJkJ4m/Co7AQdsJo4g0Ys3PELTITEzc+JuR8CycmvQETtAWCj8ikFLecLw1+7cYbMEc7aEtmEol/KvdHGKM0YCEzeRaHnpfxTxzCtGS5+2iXjjIOq+Ks1iqwrKgSW7drKA6hZcB6ZtIUR2DGzzUjqyB7DtErPO65ZZCJm0jTJDKIxOn5Vsi+EzOvPuSWOB9R9OCrlZQVZOK2s24Tb8CYI5cDy0f0KkYmL0oODzvOc45cM4nEbQOlyaCFD4FrGPwnvAu0qzfgkkNuV/jWdSWIdElOr/YNeWcRF0xRXjSheQAAAABJRU5ErkJggg==" mode=""></image>
			<input type="text" placeholder="回车可搜索" class="myinput" v-model="inpVal" @confirm="startSearch"/>
			<text class="seaBtn" @click="startSearch">搜索</text>
		</view>
		<view class="msg list">
			<text v-if="serAns.length==0">可点击查看详情</text>
			<view class="itttn" v-for="(item,index) in serAns" :key='index'>
				<navigator :url="'../note_detail/note_detail?title='+item.text.key+'&kind='+item.kind">
					{{item.text.key}}-----{{item.kind}}
				</navigator>
			</view>
			
		</view>
		<uni-collapse accordion class="list">
		    <uni-collapse-item title="谜语">
		        <view v-for="(item,index) in riddle" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=riddle'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
		    </uni-collapse-item>
		    <uni-collapse-item title="谚语">
				
		        <view v-for="(item,index) in proverb" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=proverb'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
		    </uni-collapse-item>
			
			<uni-collapse-item title="歇后语">
			    <view v-for="(item,index) in allegorical" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=allegorical'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="成语">
			    <view v-for="(item,index) in idiom" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=idioms'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
			</uni-collapse-item>
			
			<uni-collapse-item title="名言警句">
			    <view v-for="(item,index) in catchphrase" :key='index' class="itttn">
				<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=catchphrase'">
					{{index+1}}. {{item.key}}
				</navigator>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="判断句">
			    <view v-for="(item,index) in truefalse" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=truefalse'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
			</uni-collapse-item>
			
			<uni-collapse-item title="一战到底">
			    <view v-for="(item,index) in challenge" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=challenge'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="猜字谜">
			    <view v-for="(item,index) in charade" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=charade'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
			</uni-collapse-item>
			
			<uni-collapse-item title="对联">
			    <view v-for="(item,index) in couplets" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=couplets'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="百科题库">
			    <view v-for="(item,index) in wikipedia" :key='index' class="itttn">
					<navigator :url="'../note_detail/note_detail?title='+item.key+'&kind=wikipedia'">
						{{index+1}}. {{item.key}}
					</navigator>
				</view>
			</uni-collapse-item>
			
		</uni-collapse>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				riddle:[], // 谜语
				proverb:[], // 谚语
				allegorical:[],//歇后语
				idiom:[],//成语
				catchphrase:[],//名言警句
				truefalse:[],//判断题
				challenge:[],//一战到底
				charade:[],//猜字谜
				couplets:[],//对联
				wikipedia:[],//百科题库
				inpVal:'',
				serAns:[],
			}
		},
		methods: {
			async getnote() {
				let ee = this.email;
				const res = await this.$myRuquest({
					url: '/other/my-note/list',
					data: {
						email:ee,
					}
				});
				this.riddle = res.data.infos.riddle;
				this.proverb = res.data.infos.proverb;
				this.allegorical = res.data.infos.allegorical;
				this.idiom = res.data.infos.idiom;
				this.catchphrase = res.data.infos.catchphrase;
				this.truefalse = res.data.infos.truefalse;
				this.challenge = res.data.infos.challenge;
				this.charade = res.data.infos.charade;
				this.couplets = res.data.infos.couplets;
				this.wikipedia = res.data.infos.wikipedia;
				this.story = res.data.infos.story;
				this.thousandwhy = res.data.infos.thousandwhy;
				this.poetry = res.data.infos.poetry;
			},
			startSearch() {
				let mytext = this.inpVal;
				if(mytext.trim().length == 0) {
					uni.showModal({
						content:'请输入文字',
					})
					return;
				}
				let ssr = this.riddle.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'riddle';
					this.serAns.push(obj);
				});
				
				ssr = this.proverb.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'proverb';
					this.serAns.push(obj);
				});
				
				
				ssr = this.allegorical.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'allegorical';
					this.serAns.push(obj);
				});
				
				
				ssr = this.idiom.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'idiom';
					this.serAns.push(obj);
				});
				
				
				ssr = this.catchphrase.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'catchphrase';
					this.serAns.push(obj);
				});
				
				ssr = this.truefalse.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'truefalse';
					this.serAns.push(obj);
				});
				
				
				ssr = this.challenge.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'challenge';
					this.serAns.push(obj);
				});
				
				ssr = this.charade.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'charade';
					this.serAns.push(obj);
				});
				
				ssr = this.couplets.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'couplets';
					this.serAns.push(obj);
				});
				
				ssr = this.wikipedia.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'wikipedia';
					this.serAns.push(obj);
				});
				
				ssr = this.story.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'story';
					this.serAns.push(obj);
				});
				
				ssr = this.thousandwhy.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'thousandwhy';
					this.serAns.push(obj);
				});
				
				ssr = this.poetry.filter(function (t) {
					return t.key.search(mytext) > -1 ;
				});
				ssr.forEach((item) => {
					let obj = {};
					obj.text = item;
					obj.kind = 'poetry';
					this.serAns.push(obj);
				});
				
				if(this.serAns.length == 0) {
					uni.showToast({
						icon:'error',
						title:'未搜索到相关内容'
					})
				}
			},
			clearVal() {
				this.inpVal = '';
				this.serAns = [];
			}
		},
		onLoad() {
			uni.getStorage({
			    key: 'userInfo',
			    success:  (res) => {
					this.email = res.data.email;
			    }
			});
			uni.setNavigationBarTitle({
			    title: '我的笔记'
			});
			this.getnote();
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.mysearch {
		display: flex;
		margin-top: 30px;
		position: relative;
		.close {
			width: 16px;
			height: 16px;
			position: absolute;
			top: 12px;
			right: 112px;
		}
		.myinput {
			width: 60%;
			border: 1px solid #9fd6b7;
			padding: 10px 20px;
		}
		.seaBtn {
			flex: 1;
			text-align: center;
			line-height: 40px;
			background-color: #209E85;
			color: #fff;
		}
	}
	.msg {
		font-size: 13px;
		text-align: center;
		padding: 20px;
		
	}
	.list {
		.itttn {
			
			border-bottom: 1px dashed #ccc;
			padding: 10px 20px;
		}
	}
}
</style>

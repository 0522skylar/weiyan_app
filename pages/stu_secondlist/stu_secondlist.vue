<template>
	<view class="content">
		<h3>
			学习列表
		</h3>
		<uni-search-bar @confirm="search" bgColor="rgb(159, 214, 183 , 53%)" placeholder="搜索" @blur="clearList()"></uni-search-bar>
		<uni-list>
		    <uni-list-item v-for="(item,index,ind) in list" :title="item[key]" note="点击查看详情" 
			:key="index"
			:to="'../stu_seconddetail/stu_seconddetail?item='+index+'+&title='+title">
			</uni-list-item>
		    
		</uni-list>
		<uni-load-more :status="more" v-if="list.length > 0"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				list:[],
				more:"more",
				pageNum:1,
				totalCount:500,
				key:"",
				userAnalyse: null,
				data_index: null
			}
		},
		onLoad(options) {
			
			this.title = options.id;
			uni.setNavigationBarTitle({
			    title: this.title
			});
			
			// this.getList();
		},
		onShow() {
			let myMap = new Map();
			myMap.set('名言警句', 'catchphrase');
			myMap.set('判断题', 'truefalse');
			myMap.set('一战到底', 'challenge');
			myMap.set('百科全书', 'wikipedia');

			let indexKey = myMap.get(this.title);
			this.data_index = indexKey;
			uni.getStorage({
				key: 'userAnalyse',
				success: (res) => {
					this.userAnalyse = res.data;
					this.pageNum =res.data[indexKey]===undefined ? 1 : (res.data[indexKey] / 20) + 1;
					console.log('res.data', this.pageNum, res.data[indexKey])
				}
			})
			console.log(this.userAnalyse)
			this.getList();
		},
		methods: {
			navgoto(item) {
				
				uni.navigateTo({
					url:"../stu_seconddetail/stu_seconddetail?item="+item+"&title"+this.title
				})
			},
			clearList() {
				this.list = [];
				this.pageNum = 1;
				this.getList();
			},
			async getList() {
				let findUrl = '';
				if(this.title =="名言警句") {
					findUrl = '/home/catchphrase';
					this.key = 'content';
				}
				else if(this.title == '判断题') {
					findUrl = '/home/truefalse';
					this.key = 'title';
				}
				else if(this.title == '一战到底') {
					findUrl = '/home/challenge';
					this.key = 'quest';
				}
				else if(this.title == '百科全书') {
					findUrl = '/home/wikipedia';
					this.key = 'title';
				}
			
				
				let pageNum = this.pageNum;
				const res = await this.$myRuquest({
					url: findUrl,	
					data:{
						page:pageNum
					}
				})
				console.log(res.data.rows)
				this.list.push(...res.data.rows);
				
			
			},
			clickLoadMore(e) {
				console.log(e);
			},
			onReachBottom() {
				if (this.totalCount > this.list.length) {
					this.status = 'loading';
					setTimeout(() => {
							this.pageNum++
							this.getList();//执行的方法
					}, 1000)//这里我是延迟一秒在加载方法有个loading效果，如果接口请求慢的话可以去掉
				} else { //停止加载
					this.status = 'noMore'
				}
			},
			search(e) {
				let val = e.value;
				// console.log(val);
				this.searchList(val);
				console.log(val);
			},
			async searchList(str) {
				let findUrl = '';
				if(this.title =="名言警句") {
					findUrl = '/home/catchphrase-find';
					
				}
				else if(this.title == '判断题') {
					findUrl = '/home/truefalse-find';
					
				}
				else if(this.title == '一战到底') {
					findUrl = '/home/challenge-find';
				
				}
				else if(this.title == '百科全书') {
					findUrl = '/home/wikipedia-find';
					
				}
				
				const res = await this.$myRuquest({
					url: findUrl,	
					data:{
						val:str
					}
				})
				
				this.list=res.data.rows;
				
				if(this.list.length == 0) {
					uni.showToast({
						title: '暂无数据',
						icon:'none',
						duration: 1000
					});
				}
			},

		},
		watch:{
			list: function(newVal,oldVal) {
				uni.setStorage({
				    key: 'current_obj',
				    data: newVal,
				    success: function () {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style scoped>
.content {
	text-align: center;
	h3 {
		text-align: center;
	}
}
</style>

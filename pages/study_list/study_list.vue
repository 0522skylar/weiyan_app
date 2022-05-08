<template>
	<view class="content">
		<h3>
			学习列表
		</h3>
		<uni-search-bar @confirm="search" bgColor="rgb(159, 214, 183 , 53%)" placeholder="搜索" @blur="clearList()"></uni-search-bar>
		<uni-list>
		    <uni-list-item v-for="(item,index,ind) in list" :title="item[key]" note="点击查看详情" 
			:key="index"
			:to="'../study_detail/study_detail?item='+index+'+&title='+title">
			</uni-list-item>
		    
		</uni-list>
		<uni-load-more :status="state" v-if="list.length > 0"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				list:[],
				state:"more",
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
		},
		onShow() {
			let myMap = new Map();
			myMap.set('成语', 'idiom');
			myMap.set('谚语', 'proverb');
			myMap.set('歇后语', 'allegorical');
			myMap.set('谜语', 'riddle');
			myMap.set('字谜', 'charade');
			myMap.set('对联', 'couplets');
			let indexKey = myMap.get(this.title);
			this.data_index = indexKey;
			uni.getStorage({
				key: 'userAnalyse',
				success: (res) => {
					this.userAnalyse = res.data;
					
					this.pageNum =res.data[indexKey]===undefined ? 1 : (res.data[indexKey] / 20) + 1;
					console.log('res.data', this.pageNum, res.data[indexKey])
					this.getList();
				}
			})
		},
		methods: {
			navgoto(item) {
				
				uni.navigateTo({
					url:"../study_detail/study_detail?item="+item+"&title"+this.title
				})
			},
			clearList() {
				this.list = [];
				this.pageNum =this.userAnalyse[this.data_index]===0 ? 1 : (this.userAnalyse[this.data_index] / 20) + 1;
				this.getList();
			},
			async getList() {
				let findUrl = '';
				if(this.title =="成语") {
					findUrl = '/home/idioms';
					this.key = 'word';
				}
				else if(this.title == '谚语') {
					findUrl = '/home/proverb';
					this.key = 'front';
				}
				else if(this.title == '歇后语') {
					findUrl = '/home/allegorical';
					this.key = 'riddle';
				}
				else if(this.title == '谜语') {
					findUrl = '/home/riddle';
					this.key = 'quest';
				}
				else if(this.title == '字谜') {
					findUrl = '/home/charade';
					this.key = 'content';
				}
				else if(this.title == '对联') {
					findUrl = '/home/couplets';
					this.key = 'content';
				}
				
				let pageNum = this.pageNum;
				// console.log(222, pageNum)
				const res = await this.$myRuquest({
					url: findUrl,	
					data:{
						page:pageNum,
						obj: this.userAnalyse
					}
				})
				
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
					this.status = 'noMore';
				}
			},
			search(e) {
				let val = e.value;
				// console.log(val);
				this.searchList(val)
			},
			async searchList(str) {
				let findUrl = '';
				if(this.title =="成语") {
					findUrl = '/home/idioms-find';
					
				}
				else if(this.title == '谚语') {
					findUrl = '/home/allegorical-find';
					
				}
				else if(this.title == '歇后语') {
					findUrl = '/home/proverb-find';
					
				}
				else if(this.title == '谜语') {
					findUrl = '/home/riddle-find';
					
				}
				else if(this.title == '字谜') {
					findUrl = '/home/charade-find';
					
				}
				else if(this.title == '对联') {
					findUrl = '/home/couplets-find';
					
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

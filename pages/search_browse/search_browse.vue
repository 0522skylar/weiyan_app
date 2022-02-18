<template>
	<view class="container">
		<view class="header">
			<view class="goback" @click="goBack()">
				<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAoCAYAAAGTCgrDAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAGKADAAQAAAABAAAAKAAAAABg3O8RAAABi0lEQVRIDe1WS04DMQxt096g4gLtqCB2cAVu1W6hF+sedohFD4AEmgsUZZg3lSu7+TmToG6YRRM7fu95nMTTycT3NM3dZvCfJ7CWy3UnooWjae4fJEaABZAbU25g7sDgcJxC+5ICdnmAYPXS/YWTVL3c9RadshM1H1F1a+2LMfNH7nfmCETCzjZdRl4xkKeCXKMF5sF8fn2gauOQMlJNbhx/N7rBc+4MzcFu7Q+W0xllVe0/mNc8pxqGdtAYs+Ukofmsbb8+F4ubIy45xrb93oeC4Z/hB0Fa0ADIAZ0BWpAAaEAOIAXyAmKgICAGwlr0odaJoPSVi1LJRRDjAMCLhnE4vL+peoCkcS0i7smHRRxLkMMoegMiJskT8ceO7NECGmISyXqDHOIsgTHEKoES4qhADWKvQE1iIYC22n/rXsnpO260ljsOvYLacNd1TyDAqGnHGjHnmNYukyNAWdUSCgrUEkoKlAqpBcYKZQvkCo0W0AoVC5DQanW77e/PM9n0RSO72oiuQH+4QPoLGO1ld+H+VqgAAAAASUVORK5CYII=" mode=""></image>
			</view>
			<view class="searchInput">
				<input type="text" value="猫" v-model="sreachText" @confirm="searchTitle()"/>
				<text class="btn-query" v-if="showAns" @click="clearText()"></text>
			</view>
			<view class="clickbtn" @click="searchTitle()">
				搜索
			</view>
		</view>
		<view class="searAns" v-if="showAns">
			<view class="item" v-for="(item,index) in ansList" :key="index" @click="gotoRead(item.title)">{{item.title}}</view>
			
		</view>
		
		
		<view class="content" v-if="!showAns">
			<hr/>
			<view class="history"  v-if="history.length != 0">
				<view class="your">
					<h3>搜索历史</h3>
					<view class="yourrabash" @click="clearHistory()">
						<text class="clear"></text>
						清空
					</view>
				</view>
				<view class="lisBox">
					<view class="lis" v-for="(item,index) in history" :key='index'>
						<text class="yourtext" @click="changeTitle(item)">{{item}}</text>
						<text class="remove" @click="removeHistory(index)"></text>
					</view>
					
				</view>
			</view>
			<hr/>
			<view class="hot" >
				<view class="hottext">热门搜索</view>
				<view class="boxhot">
					<view class="lisitem" 
					v-for="(item,index) in hotList"
					:key="index"
					@click="changeTitle(item)">
						<text class="num" :class="[index==0 ? 'one' : '', index==1 ? 'two' : '', index==2 ? 'three' : '']">
							{{index+1}}
						</text>
						<text class="searchText">
							{{item}}
						</text>
						<text class="iconhot"></text>
					</view>
					
				</view>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sreachText:'',
				showAns: false,
				ansList:[],
				history:['猪','兔子','人','青蛙'],// 历史记录
				hotList:['猪八戒','鸡与狐狸','孔雀和天后赫拉','老人和树'], // 热门搜索
			}
		},
		methods: {
			async searchTitle() {
				
				let search = this.sreachText;
				if(search.length != 0) {
					this.showAns = true;
					this.history.unshift(search);
				}
				const res = await this.$myRuquest({
					url: '/other/brower-search',
					data: {
						title:search
					}
				})
				this.ansList = res.data.rows;
				// console.log(res);
			},
			goBack() {
				uni.redirectTo({
					url:'../browse/browse'
				});
			},
			clearText() {
				this.sreachText = '';
				this.ansList = [];
				this.showAns = false;
			},
			gotoRead(title) {
				let tt = this.clickCount;
				uni.navigateTo({
					url:'../read_content/read_content?title='+title+'&type='+tt
				})
			},
			changeTitle(text) {
				this.sreachText = text;
				this.ansList = [];
				this.searchTitle();
			},
			clearHistory() {
				this.history = [];
			},
			removeHistory(index) {
				this.history.splice(index,1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searAns {
		.item {
			height: 48px;
			padding: 0 16px;
			line-height: 48px;
			box-shadow: 0 0 0 0 #e8e8ed;
			border-bottom: 1px solid rgba(232,232,238,.5);
			position: relative;
			overflow: hidden;
			cursor: pointer;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-decoration: none;
			&::before {
				content: "";
				width: 16px;
				height: 16px;
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAAGtemweAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAGKADAAQAAAABAAAAFgAAAAB+zen2AAABqklEQVRIDa1Uu04DMRC0DR01+QMUHqFJTqJBSIgO8QH8KG2oaNApUgRRgqClgY424o5Z362zts+X5IilnNfrGY8fs1F5/vaQ54tSoRmlylsKvGZn6cMwBc6rB3EDhkQIniCkjB1TBgTQEpVlx1oCbBxq7FMWybkx5spDM3IyeT+knzfJAzkZiTmW3BUzaXmW4Bz3dlM8APlHKf2ZZf0TzoV9fW49owkAByRdFL9fxuz1hsOj74gQJnicIkaHYwL3IdF7CgZRr7Uej0b9G5mj2B5avhmvqLW5D8E0hvFWjcGpAxPSETYBOwKDse95URSPK804sgp87zjkKWoDFZAyfr0luWdcwPk6UqyLDGzy0qa0S1LauY0qlJR2T1ojybYT+hnOvmjHVLOufqSdJLF6U3rL8gyOnKH4r5vKRHJk7ARkkmJeGB6oF26uv5AXjiMBf2FbRQsUxla7liLuDch8la1XV0FAnGCMbtDleojvBGiQWqSurU5CJACiPsDj3a17vC5Ca//yqpP5322EOgmwHBuizcL/EthEaCcCLDSdfvSWS3KddeITqv3yD3k5OumqwUJmAAAAAElFTkSuQmCC) no-repeat;
				background-size: 100% auto;
				position: absolute;
				right: 16px;
				top: 16px;
			}
		}
	}
.container {
	padding: 0 16px;
	.header {
		display: flex;
		justify-content: space-between;
		height: 50px;
	}
	.goback {
		width: 24px;
		image {
			margin-top: 16px;
			width: 11px;
			height: 20px;
		}
	}
	.searchInput {
		flex: 1;
		background-color: #f0f0f5;
		height: 32px;
		margin-top: 11px;
		border-radius: 4px;
		padding-left: 10px;
		padding-top: 5px;
		box-sizing: border-box;
		margin-right: 10px;
		line-height: 32px;
		position: relative;
		.btn-query {
			position: absolute;
			top: 8px;
			right: 8px;
			z-index: 10;
			width: 18px;
			height: 18px;
			cursor: pointer;
			background: url(data:image/png;base64,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) no-repeat 50%;
			background-size: 18px;
			-webkit-tap-highlight-color: transparent;
		}
	}
	.clickbtn {
		width: 56px;
		height: 28px;
		background-color: #fc5531;
		border-radius: 3px;
		text-align: center;
		line-height: 28px;
		margin-top: 14px;
		color: #fff;
	}
}
.your {
	margin: 20px 0;
	display: flex;
	justify-content: space-between;
	h3 {
		font-weight: 400;
		display: inline-block;
	}
	.yourrabash {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		font-size: 12px;
		font-weight: 400;
		color: #ccccd8;
		line-height: 50px;
		.clear {
			display: inline-block;
			    width: 16px;
			    height: 16px;
			    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACl0lEQVRYR+2WTUhUURTH/+c+HUcNXIk0NZbBzNMcHJn70BYughaBIRW1cBG0CAraRLuwFkVQizZCq6AgCCQyUPqAtq0Efff5tZkZK0GzxIgg+gBn5p540oPBj+a9gUkK7/adc/4//ufc+w5hmw9tsz7+TQBmNpTKXiDCEWZuJ6J5Zow1NIjBWCz2NYirgR2w7bfNQH4Y4C5XiAjfmLHrt+iCEEZ/KhUb8wsRCICZhVLZ1wD3ENHjqioeSCZb5x1nrpG5cImZrgC8EgrVtnd07PviByIQgFLpM8x4BNCoZZkn1ws4Tvaa1vomkRiUMn65LIDJyUyv1ujdLJkZhwG358YTQH9aH0NEQmt9nog+AxjeHIBmpYzf875tcECp9BIzIn7oy40Jh2t2JxIty2sztL6I5wAz9gN8DKD7ROJBuWLM3APoOwCNE2ECKOGAJ6TUXB9z4RkRXZfSvFEuQKk6Ww5hqUS/QKXq7ACU5cDERPq0EFSQ0hzxWjE1lenSmrpTqfjd4vZUpAW2nf4IUM6yzGZPzLYzIwCfEKJuTyrV/MHvMJflgG1n3DvsAkSLAEYBPl5dbUSTydj7HYD/3oF3AOcsq9UsmoEhIvTX1dU3trXtdX9Ga6cit0CpuUOGoXVnpznuCU1Pp1vyeSMhZex5xa+h32e4Yg78LYCjzIVXRHRLSvNqENHiWMfJntJaPwVowLLM2xuWmK0KO85CROsfSwBmm5rqu6PR6M+gEMxMjpMdYuZ+ItEnZfyFbwA30LYzDwE+C5D7siki6IAQJjMfBGgSiHdbFuUCASwuLtaurHx3bTtXtHr7ZiDCKkAva2pCF70VLBCAF+yu4zMzbyK5nBC+1QGEwweWEwla/VNOoLU8iLjf2B2AX9aG6zDKiTBBAAAAAElFTkSuQmCC) no-repeat;
			    background-size: 100%;
			    vertical-align: top;
			    margin-top: 17px;
		}
	}
	
}
.lisBox {
	.lis {
		display: inline-block;
		background-color: #f6f7f9;
		border-radius: 14px;
		margin-right: 8px;
		margin-bottom: 8px;
		height: 28px;
		.yourtext {
			max-width: 90vw;
			white-space: normal;
			overflow: hidden;
			line-height: 28px;
			vertical-align: middle;
			padding-right: 8px;
			text-overflow: ellipsis;
			display: inline-block;
			height: 28px;
			padding: 0 16px;
			font-size: 14px;
			
		}
		.remove{
			display: inline-block;
			width: 12px;
			height: 28px;
			font-size: 0;
			margin-right: 6px;
			vertical-align: middle;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAThJREFUSA3dlbFuAjEQRIGkSIEipQz8RQoKCrp8e7oU+YMUEYIuiiiOBuYVe1o5Xq+FhJBYaTifPTvj3bszk8m9xsMFhVVzapNziW+EQfjrNFqKtxL2wtHnlAaIr4Un4VU4CJkJ4m/Co7AQdsJo4g0Ys3PELTITEzc+JuR8CycmvQETtAWCj8ikFLecLw1+7cYbMEc7aEtmEol/KvdHGKM0YCEzeRaHnpfxTxzCtGS5+2iXjjIOq+Ks1iqwrKgSW7drKA6hZcB6ZtIUR2DGzzUjqyB7DtErPO65ZZCJm0jTJDKIxOn5Vsi+EzOvPuSWOB9R9OCrlZQVZOK2s24Tb8CYI5cDy0f0KkYmL0oODzvOc45cM4nEbQOlyaCFD4FrGPwnvAu0qzfgkkNuV/jWdSWIdElOr/YNeWcRF0xRXjSheQAAAABJRU5ErkJggg==) no-repeat;
			background-position: 50%;
			background-size: 12px;
		}
	}
}
.hottext {
	font-size: 16px;
	margin: 20px 0;
}
.boxhot{
	.lisitem {
		width: 100%;
		display: flex;
		margin: 10px 0;
		border-bottom: 1px dashed #ccc;
		padding: 10px 0;
		.num {
			display: inline-block;
			width: 16px;
			font-size: 12px;
			line-height: 18px;
			text-align: center;
			height: 18px;
			color: #222226;
			background: #f0f0f5;
			vertical-align: top;
			margin-right: 8px;
			margin-top: 1px;
		}
		.searchText {
			flex: 1;
			height: 20px;
			vertical-align: top;
			font-size: 16px;
			line-height: 18px;
			color: #222226;
			overflow: hidden;
			cursor: pointer;
			display: inline-block;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-decoration: none;
		}
		.one {
			background-color: #fe2d46;
			color: #fff;
		}
		.two {
			background-color: #f60;
			color: #fff;
		}
		.three {
			background-color: #faa90e;
			color: #fff;
		}
		.iconhot{
			margin-left: 4px;
			margin-right: 4px;
			width: 16px;
			height: 16px;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA75JREFUWAntWF1IVEEUPmf9WX9K0jQjJe3BXX/QrIjCUqiIigLJVRTEggLpoSDwLYqEnuspIoKoh5BiUYno3f6gH+zBfk0Eg+ihSANZ3dS9pzN33fXu7py7uxefogG9M98535lvzpmZvbsA/0Kjjup68lXdJl9N1Wqvx+UoYN3GT0DQBbD0mXye++TzNjiKoyGhBksJYiFjQFRvOiMucr8XhybupkS2cXKWoXDAP9G4RFncv0Ptnv4o5rDjXBBBccKcBl2mNu/NBDwNwFHJqMNTBiH6Js6TAcfQP/FYtNsYnGXIgD6bmAAhvE69O/JsfQRj2oL4uO/iWGeFeMswVcKv2Uv2PnprWoKoraaCj/tDPlFqEydr56ijLtvqRF3Vldaxrp+yILMEGHrEQUp1gRIwonygxWaFU3dDOV8Tz2HRuJrgFwekLIhLcCN678QFsRke4SwVQTD4lLl72G/Gxtc0ZSZzUHZq93aDYZxMxTfGh+gwZ2kdi9myjFfE2DWDpMeeehryIRD8wrI2afgpQLjE3PDCEWfAtbUE/f6QRBRLxnfNXpM0N3/euRgVYVmM2aVCgLGDZlzhn1YQb+AsCMEwl6oVADsFrjPYMHrsiFpBMD3bwisr5tr3OdjIdvOxDVvNbSB46QUZEC4XkXlsBa4zWF0H8/OHJLJeEFKTRFgVnDC8YE0wvSCAco2vDOWQbNNaqFYLMygIwiKJoMV386vRzpXXI62PFST0WofWvnQxpieojK+VQgNAfb4/cVvj6/sIBXqDlCGi3xIhAd+8FBajDPULAI38l6wR5UguUsmmJEIMnstZORBXqiYer2fcriEsSma9IISvEiGK5/FGPh4EyI+bXEVsZty24YRk1gsCeiMRTFydqtY5gCLhI6mc8RLBpgIQjUvx9YIy3UOKJpFgewpl8fDekpoLnskmjQUfvJ8ExGGNKQzZTRYhqZOna4gBwGy/zqQwfYZMC15gUYEEYgYja+TkRf1z4vZWxEB0Df0fpiPD+KcoCP3jXGc8w4TY2dXCxTNiCU/aV62XUFxwxeKV0BUFKU8cHL8H6DrBmYq9XKak+9QS/7tKpaUhvoCM7KN4a9R2ObaCVDhTVCY1AsJINPxrvo0XtBkIu6gpR6NfOOaYexFcWfvtShWJbRM14rLyJF/tNv7F4zRXcR9sCFVDS9AFpXF75SdnZsQ9Bz8yXzFzENzuARx4l/TlPjJLWoIiJPWkU961EHBVgSdYC8VGNX+1DsGs6yOM5b6F+s5J7O+PU2pl/+87z8BfdgUMkVdwcjgAAAAASUVORK5CYII=) no-repeat;
			background-size: 16px;
		}
	}
}
</style>

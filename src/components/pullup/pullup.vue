<!-- 上拉加载组件 -->
<template>
	<div class="pullup-container">
		<div v-for="(item,index) in lists" v-bind:key="index">
			<slot :item="item"></slot> 
		</div>
		<div class="bottom" v-show='bottomShow'>
			<div class="bottom-text" v-if="this.pageCount > 0"><i class="line"></i><p>{{bottomText}}</p><i class="line"></i></div>
			<div v-else>
				<div class="empty-wrapper" v-if="!isEmptyTemp">暂无数据</div>
				<slot name="empty"></slot>	
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'pullup',
		data(){
			return {
				lists:[],
				pageCount:0,
				pageSize:10,
				pageIndex:1,
				bottomText:'正在加载...',
				// 是否有空数据的模板
				isEmptyTemp:false,
				// 底部显示时机
				bottomShow:false,
				bottomShowTimer:null
			}
		},
		props:{
			api:{
				type:String,
				require:true
			},
			params:{
				type:Object,
				default:null
			}
		},
		mounted(){
			this.getInitData()
			this.throttleLoad=comm.throttle(()=>{
				this.scrollEvent()
			},50)
			window.addEventListener('scroll',this.throttleLoad)
		},
		updated(){
			if(this.$slots.empty){
				this.isEmptyTemp = true;
			}
		},
		destroyed(){
			window.removeEventListener('scroll',this.throttleLoad)
			clearTimeout(this.bottomShowTimer)
		},
		methods:{
			getInitData(){
				this.pageIndex = 1;
				this.getData();
			},
			loadmoreData(){
				if(this.pageIndex >= this.pageCount) return
				this.pageIndex++;
				this.getData()
			},
			getData(){
				var http  = this.$axios;
				http.isShowLoading = true;
				http.post(this.api,{
					pageIndex:this.pageIndex,
					pageSize:this.pageSize,
					...this.params
				}).then(response=>{
					this.lists = this.lists.concat(response.datas);
					this.pageCount = response.pageCount;
					this.$emit('transferData',response)
					if(this.pageIndex >= this.pageCount){
						this.bottomText = '没有更多了'
					}else{
						this.bottomText = '上拉加载更多'
					}
					this.bottomShowTimer = setTimeout(()=>{
						this.bottomShow = true;
					},200)
				},errors=>{
					console.log(errors)
				})
			},
			scrollEvent(){
				var scrollTop = comm.scrollTop()
				var clientHeight = document.documentElement.clientHeight;
				var scrollHeight = document.documentElement.scrollHeight;
				if( scrollHeight-clientHeight - scrollTop <= 50){
					this.loadmoreData()
				}
			}
		}
	}
</script>
<style>
	.pullup-container .empty-wrapper{
		text-align: center;
		padding-top: 1rem;
		font-size: .24rem;
		color: #999;
		padding-bottom: 1rem;
	}
	.pullup-container .bottom-text{
		width: 100%;
		height: 1.1rem;
		background: #f0eff4;
		display:flex;
		justify-content: center;
		font-size: .24rem;
		line-height: 1;
		padding-top: .3rem;
		color: #999;
	}
	.pullup-container .bottom-text .line{
		width: 1.1rem;
		height: 0;
		border-bottom: 1px solid #dcdcdc;
		padding-top:.12rem;
	}
	.pullup-container .bottom-text p{
		padding: 0 .2rem;
	}
</style>
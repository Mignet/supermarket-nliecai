<template>
	<div class="list-container">
		<div>
			<loadmore
				v-on:initData="_initData"
				v-on:loadmore = "loadData"
				:isLoadingEnd = 'loadingEnd'
			>
				<ProductList  v-for="(pageListData,index) in pageListDatas"  :list="pageListData" :key="index"></ProductList>
				<div class="loadmore-wrapper" slot='bottom' v-show="bottomShow">
					<b></b><span>{{bottomText}}</span><b></b>
				</div>
			</loadmore>

		</div>
	</div>

</template>
<script>
	import loadmore from './../../components/loadmore/loadmore.vue'
	import service from "./../../resource/service";
	import ProductList from './../../components/productList/productList'
	export default{
		data(){
			return{
				pageIndex:0,
				pageListDatas : [],
				pulldown:true,
				pullup:true,
				pageCount:0,
				loadingEnd:false,
				isLoading:false,
				bottomShow:false,
				bottomText:'上拉加载更多'
			}
		},
		methods:{
			_initData(){
				if(this.isLoading) return
				this.pageIndex = 1;
				this.$store.dispatch('showLoading')
				this.isLoading = true
				service.serverRequest('productPageList',{
					pageIndex:this.pageIndex,
					order : 1,
					sort:1
				},(result)=>{
					this.pageListDatas = result.datas;
					this.isLoading = false
					this.bottomShow = true
					if(this.pageIndex >= result.pageCount){
						this.loadingEnd = true;
						this.bottomText = '暂无更多项目'
					}
				})
			},
			loadData(){
				if(this.isLoading) return
				if(this.loadingEnd) return
				this.pageIndex ++ ;
				this.$store.dispatch('showLoading')
				service.serverRequest('productPageList',{
					pageIndex:this.pageIndex,
					order : 1,
					sort:1
				},(result)=>{
					this.isLoading = false;
					this.pageListDatas = this.pageListDatas.concat(result.datas);
					this.pageCount = result.pageCount
					if(this.pageIndex >= result.pageCount){
						this.loadingEnd = true;
						this.bottomText = '暂无更多项目'
					}
				})
			}
		},
		components:{
			ProductList,
			loadmore
		}
	}
</script>
<style scoped>
	.list-container{
		height: 100%;
	}
	.wrapper{
		height: 100%;
	}
	.loading-wrapper{
		text-align: center;
		line-height: 2;
	}
	.refresh-wrapper{
		line-height: .3rem;
		height: .3rem;
		text-align: center;
		margin-top: -.3rem;
	}
	.loadmore-wrapper{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items :center;
		font-size: .24rem;
		color: #999;
		padding: .3rem 0;
		background-color: #ebebeb;
	}
	.loadmore-wrapper b{
		display: block;
		width: 16%;
		height: 1px;
		background-color: #dcdcdc;
	}
	.loadmore-wrapper span{
		display: block;
		padding: 0 .16rem;
	}
</style>

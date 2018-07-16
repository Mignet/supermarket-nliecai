<template>
	<div class="empty-share-container">
		<img src="./../../assets/share-empty.png">
		<p>空空如也~ 赶紧去晒单吧</p>
		<button @click='goShare'>去晒单</button>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default{
		name:'emptyShare',
		methods:{
			goShare(){
				this.getData()
			},
			getData(){
				let http  = this.$axios;
				http.post('orginfoaUnrecordPageList',{
					pageIndex:1,
					pageSize:10,
					order:1
				}).then(response=>{
					if(response.totalCount <= 0){
	    				Vue.popup.tips('暂无可晒的报单,<br />赶紧去报单吧');
					}else{
						this.$router.push('/post')
					}
				},errors=>{
					console.log(errors)
				})
			},
		}
	}
</script>
<style scoped>
	.empty-share-container{
		padding-top: 3.85rem;
	}
	.empty-share-container img{
		display: block;
		margin: 0 auto;
		width: 1.72rem;
	}
	.empty-share-container p{
		text-align: center;
		color: #9197a6;
		font-size: .24rem;
		line-height: 1.4;
		padding-bottom: .5rem;
	}
	.empty-share-container button{
		display: block;
		width:1.8rem;
		height: .6rem;
		margin: 0 auto;
		color: #fff;
		font-size: .26rem;
		background-color: #4e8cef;
		border-radius: .3rem; 
	}
</style>
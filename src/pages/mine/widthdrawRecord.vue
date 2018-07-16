<!-- 提现记录页面 -->
<template>
	<div class="widthdrawRecord-container">
		<div class="top">
			<p>累计提现(元)</p>
			<h2>{{widthdrawMoney}}</h2>
		</div>
		<pullup 
			api="queryWithdrawLog"
		>	
			<widthdraw-item :item="slotProps.item" slot-scope="slotProps"/>
			<empty-temp msg="暂无记录" slot="empty"/>
		</pullup>
	</div>
</template>
<script>
	import pullup from './../../components/pullup/pullup.vue'
	import widthdrawItem from './components/widthdrawItem.vue'
	const emptyTemp = () => import('./../../components/emptyTemp/emptyTemp.vue')
	export default {
		name:"widthdrawRecord",
		data(){
			return{
				// 累计提现金额
				widthdrawMoney:'0.00'
			}
		},
		created(){
			// 获取累计提现金额
			let http = this.$axios;
			http.post('getWithdrawSummary').then(res => {
				this.widthdrawMoney = res.outTotalAmount
			})
		},
		components:{
			pullup,
			widthdrawItem,
			emptyTemp
		}
	}
</script>
<style scoped>
	.widthdrawRecord-container .top{
		background-color: #fff;
		padding: .3rem .3rem .4rem .3rem;
		margin-bottom: .2rem;
	}
	.widthdrawRecord-container .top p{
		font-size: 12px;
		color: #9197a6;
		padding-bottom: .2rem;
	}
	.widthdrawRecord-container .top h2{
		font-size:24px;
		color: #4e8cef;
		font-family: DINOTMedium;
	}
</style>
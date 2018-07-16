<!-- 提现记录元素组件 -->
<template>
	<div class="widthdrawItem-container">
		<div class="top border-bottom-1px">
			<div class="left">
				<p><span>{{itemResult.bisName}}&nbsp;</span></p>
				<h3>{{itemResult.transDate}}</h3>
			</div>
			<h2 class="right">{{itemResult.amount}}</h2>
		</div>
		<div class="bottom">
			<p :class="{active:itemResult.status == 6 || itemResult.status == 7}">
				<span>{{itemResult.statusText}}</span>
				<img v-if="itemResult.remark" @click.stop="questionTips" src="./../../../assets/question-icon-blue.png" />
			</p>
			<p>{{itemResult.paymentDate}}</p>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		name:'widthdrawItem',
		props:{
			item:{
				type:Object,
				default:null,
			},
		},
		data(){
			return {
				itemResult:this.item,
			}
		},
		created(){
			this.itemResult = this._filter(this.itemResult)
		},
		methods:{
			_filter(result){
				// 1=提现中| 2、8=已提交银行，待到账| 3审核不通过| 5=提现成功| 、6、7=提现失败
				let statusText = "";
				let status = result.status;
				if(status == 1){
					statusText = '提现中'
				}else if(status == 2 || status == 8){
					statusText = '已提交银行，待到账'
				}else if(status == 3){
					statusText = '审核不通过'
				}else if(status == 5){
					statusText = '提现成功'
				}else if(status == 6 || status == 7){
					statusText = '提现失败'
				}
				result.statusText = statusText;
				return result
			},
			questionTips(){
				if(this.itemResult.remark){
					Vue.popup.alert({
						msg:this.itemResult.remark,
						btnText:'关闭'
					})
				}

			}
		},
	}
</script>
<style scoped>
	.widthdrawItem-container{
		background-color: #fff;
		padding-left: .3rem;
		margin-bottom: .2rem;
	}
	.widthdrawItem-container .top{
		padding-top: .3rem;
		display: flex;
		justify-content: space-between;
		padding-right: .3rem;
		padding-bottom: .14rem;
	}
	.widthdrawItem-container .top .left p{

		padding-bottom: .14rem;
	}
	.widthdrawItem-container .top .left p:first-child{
		font-size: .24rem;
		color: #3b4257;
	}
	.widthdrawItem-container .top .left span:last-child{
		font-size: .24rem;
		color: #9197a6;
	}
	.widthdrawItem-container .top .left h3{
		font-size: .24rem;
		color: #9197a6;
	}
	.widthdrawItem-container .top .right{
		font-size: 14px;
		color: #3b4257;
		font-family: DINOTMedium;
	}
	.widthdrawItem-container .bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: .3rem;
		padding-top: .14rem;
		padding-bottom: .14rem;
		font-size: 12px;
		color: #9197a6;
	}
	.widthdrawItem-container .bottom p{
		display: flex;
		align-items: center;
	}
	.widthdrawItem-container .bottom p img{
		width: .28rem;
		box-sizing: content-box;
		padding-left: .2rem;
	}
	.widthdrawItem-container .bottom .active{
		color: #fd5d5d;
	}

</style>
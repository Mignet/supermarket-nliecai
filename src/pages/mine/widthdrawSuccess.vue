<!-- 提现成功页 -->
<template>
	<div class="widthdraw-success-container">
		<div class="top border-bottom-1px">
			<div class="icon-wrap">
				<img src="./../../assets/application-widthdraw-icon.png">
				<img src="./../../assets/end-progress-line.png">
				<img src="./../../assets/widthdraw-bank-progress-icon.png">
				<img src="./../../assets/progress-line.png">
				<img src="./../../assets/widthdraw-success-icon.png">
			</div>
			<div class="text-wrap">
				<h2 class="active">申请提现</h2>
				<h2 class="active">
					<p>银行处理中</p>
					<span>预计当天到账</span>
				</h2>
				<h2>提现到账</h2>
			</div>
		</div>
		<ul class="center">
			<li>
				<h3>提现金额</h3>
				<p>￥{{widthdrawInfo.amount | twoDecimal}}</p>
			</li>
			<li>
				<h3>手续费</h3>
				<p>￥{{widthdrawInfo.fee}}</p>
			</li>
			<li>
				<h3>到账银行卡</h3>
				<p>{{widthdrawInfo.bankName}}({{widthdrawInfo.bankCard}})</p>
			</li>
		</ul>
		<div class="bottom">
			<button @click.stop="end">完成</button>
		</div>
	</div>
</template>
<script>
	export default {
		name:'widthdrawSuccess',
		computed:{
			widthdrawInfo(){
				return JSON.parse(sessionStorage.getItem('WIDTHDRAWDATA'))
			}
		},
		created(){
			this.widthdrawInfo.bankCard = this.widthdrawInfo.bankCard.substr(this.widthdrawInfo.bankCard.length - 4)
		},
		methods:{
			end(){
				this.$router.replace('/mine/balance')
			}
		}
	}
</script>
<style scoped>
	.widthdraw-success-container{
		padding-top: .5rem;
		height: 100%;
		background-color: #fff;
	}
	.widthdraw-success-container .top .icon-wrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 .6rem;
	}
	.widthdraw-success-container .icon-wrap img:nth-child(2n+1){
		width:.6rem;
		height: .6rem;
	}
	.widthdraw-success-container .icon-wrap img:nth-child(2n){
		width: 2rem;
		height: .02rem;
		padding:0 .1rem;
	}
	.widthdraw-success-container .text-wrap{
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding:.2rem .3rem .4rem;
	}
	.widthdraw-success-container .text-wrap h2{
		text-align: center;
		color: #d4d7df;
		font-size: .32rem;
	}
	.widthdraw-success-container .text-wrap h2 span{
		font-size: .2rem;
	}
	.widthdraw-success-container .text-wrap h2.active{
		color: #4e8cef;
	}
	.widthdraw-success-container .center{
		padding:0 .3rem;
	}
	.widthdraw-success-container .center li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: .3rem;
	}
	.widthdraw-success-container .center h3{
		font-size:14px;
		color: #9197a6;
	}
	.widthdraw-success-container .center p{
		font-size:14px;
		color: #3b4257;
	}
	.widthdraw-success-container .bottom{
		padding-top: 1.08rem;
	}
	.widthdraw-success-container .bottom button{
		display: block;
		margin: 0 auto;
		width:6.9rem;
		height: 1rem;
		font-size:16px;
		color: #fff;
		background-color: #4e8cef;
		border-radius: 6px;
	}
</style>
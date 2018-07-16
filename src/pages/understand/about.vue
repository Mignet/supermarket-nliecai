<template>
	<div>
		<img src="./1-banner.png">
		<div class="item">
			<div class="inner">
				<h3 class="title">猎财大师是做什么的？</h3>
				<p>猎财大师是深圳市前海领会科技有限公司致力于为理财师打造的“一站式”理财、投顾服务的零门槛创业平台。猎财大师秉持“不碰资金，专注于第三方服务平台”的原则，为理财师提供多渠道、多元化的产品和不同阶段的晋升通道，最大程度满足理财师及普通投资者的理财、投顾需求。</p>
			</div>
		</div>

		<div class="item">
			<div class="inner">
				<h3 class="title">猎财大师如何解决投资管理痛点？</h3>
				<img src="./1-table.png">
			</div>
		</div>

		<div class="item">
			<div class="inner">
				<h3 class="title">猎财大师如何保障用户资金安全？</h3>
				<img src="./1-safe.png">
			</div>
		</div>

		<div class="item">
			<div class="inner">
				<h3 class="title">猎财大师如何帮用户获得超高收益？</h3>
				<img src="./1-earn.png">
			</div>
		</div>

		<div class="item">
			<div class="inner">
				<h3 class="title">猎财大师平台成绩如何？</h3>
				<p>猎财大师上线至今，用户除了获得理财收益之外，猎财大师额外给理财师发放佣金超过2000万元；平台活跃理财师人数逾8000人，覆盖全国346个城市，平均每月复投率在70%左右。</p>
				<ul class="data-wrapper clearfix">
					<li>
						<h3 v-html="commissionAmount"></h3>
						<p>累计发放佣金(元)</p>
					</li>
					<li>
						<h3 v-html="activeUserNumber"></h3>
						<p>活跃理财师人数</p>
					</li>
					<li>
						<h3 v-html="safeOperationTime"></h3>
						<p>安全运营</p>
					</li>
					<li>
						<h3>{{reInvestRate}}</h3>
						<p>平均每月复投率</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
			}
		},
		props:{
			info:{
				type:Object
			}
		},
		computed:{
			commissionAmount(){
				return (parseInt(this.info.commissionAmount/100)/100) + '<span style="font-size:.24rem;">万</span>'
			},
			activeUserNumber(){
				return this.info.activeUserNumber + '<span style="font-size:.24rem;">人</span>'
			},
			safeOperationTime(){
				return this.info.safeOperationTime + '<span style="font-size:.24rem;">天</span>'
			},
			reInvestRate(){
				return this.info.reInvestRate
			}
		},
	}
</script>
<style scoped lang="less">
	.item{
		padding: .3rem;
	}
	.inner{
		border-radius: 3px;
		background-color: #fff;
		padding: .4rem .3rem;
		p{
			font-size: .28rem;
			color: #545871;
			text-align: justify;
			line-height: 1.5;
		}
	}
	.title{
		font-size:.38rem;
		color: #4e8cef;
		text-align: center;
		padding-bottom: .3rem;
	}
	.data-wrapper{
		width: 100%;
		li{
			float: left;
			width: 50%;
			text-align: center;
			padding-top: .8rem;
			h3{
				font-size: .48rem;
				color: #4e8cef;
			}
			p{
				text-align: center;
				font-size: .2rem;
				color: #9ca0bb;
				padding-top: .2rem;
			}
		}
	}
</style>
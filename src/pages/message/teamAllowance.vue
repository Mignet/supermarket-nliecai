<template>
	<div class="reward-container">
		<p>当您职级达到经理（或总监）时，您团队中的理财师(职级比您低)出单后，您可获得其佣金的30%（总监为50%）作为津贴，该津贴称为团队管理津贴。</p>
		<p>团队管理津贴由平台额外发放，不影响被邀请人的佣金金额。</p>
		<h3>示例：</h3>
		<div class="chart">
		    <img src="./team-allowance.png">
		</div>
		<p>若理财师A、B、C、D分别出单并获得100元佣金，则您享受理财师A、B、C的团队管理津贴各50元，总计150元，不享受理财师D的团队管理津贴，享受团队管理津贴范围如上图方框所示。</p>
	</div>
</template>
<style scoped>
	.reward-container{
		min-height: 100%;
		height: 100%;
		background-color: #fff;
		padding: .3rem;
	}
	.reward-container p{
		line-height: 2em;
		font-size: .26rem;
		color: #969696;
	}
	.reward-container h3{
		font-size: .26rem;
		color: #6c6e6d;
		padding-top: .5rem;
		padding-bottom: .2rem;
	}
	.chart img{
		display: block;
		width: 6.5rem;
		margin: 0 auto;
		padding-bottom: .5rem;
	}
</style>
<template>
	<div class="reward-container">
		<p>当您职级达到经理或总监时，您直接推荐的理财师(职级比您低)出单后，您可获得其佣金的30%(总监50%)作为津贴，该津贴称为直接管理津贴。</p>
		<p>直接管理津贴由平台额外发放，不影响被邀请人的佣金金额。</p>
		<h3>示例：</h3>
		<div class="chart">
		    <img src="./direct-allowance.png">
		</div>
		<p>若理财师A、B分别出单并获得100元佣金，则您享受理财师A的直接管理津贴30元(总监50元)，不享受理财师B的直接管理津贴。享受直接管理津贴的范围如上图所示。</p>
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
		width: 4.5rem;
		margin: 0 auto;
		padding-bottom: .5rem;
	}
</style>
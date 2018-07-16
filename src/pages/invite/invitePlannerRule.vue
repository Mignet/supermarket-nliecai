<template>
    <div class="rule-wrapper">
	  <h4>规则</h4>
	  <p>推荐人享有被推荐人每笔销售佣金的25%、间接被推荐人佣金的5%作为推荐奖励。推荐奖励由平台额外发放，不影响被推荐人的佣金金额</p>

	  <h4>示例</h4>
	  <p>有理财师A、B、C、D 4人，推荐关系如下图所示</p>

	  <!-- <p style="margin:.1rem 0"><img src="./../../../static/images/invite/recommand_rule.png"></p> -->

	  <p>若A、B、C、D分别产生销售佣金100元，则：</p>

	  <p>A享受直接推荐B的推荐奖励25元，间接推荐C的推荐奖励5元；同理，B享受直接推荐C的推荐奖励25元，间接推荐D的推荐奖励5元，以此类推。</p>
    </div>
</template>

<style scoped>
  .rule-wrapper{
  	height:100%;
    background-color: #fff;
    padding:0 .2rem;
  }

  .rule-wrapper h4{
    padding:.2rem .15rem 0.05rem .15rem;
  }
  .rule-wrapper p{
    margin:0 .15rem;
    line-height: 1.5em;
  }	
</style>
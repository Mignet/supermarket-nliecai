<template>
	<div class="template">
    <header>
      <img src="../../../static/images/strategy/banner.png" alt="猎财大师">
    </header>
    <div class="wrapper red-packet-wrapper">
      <nav>自己买&nbsp;佣金+收益都是你的</nav>
      <div class="year-rate-box">
        <p>新手<br>专享</p>
        <div class="year-rate">
          <p><span id="yearRate">{{flowMaxRate}}</span><span>%</span></p>
          <p>超高收益</p>
        </div>
      </div>
      <a :href="buyUrl">立即购买</a>
    </div>
    <div class="wrapper client-wrapper">
      <nav>邀请用户赚佣金</nav>
      <img src="../../../static/images/strategy/invite_client.png" alt="">
        <router-link :to="{name:'inviteClient'}">立即邀请</router-link>
    </div>
    <div class="wrapper cfp-wrapper">
      <nav>推荐理财师赢奖励</nav>
      <img src="../../../static/images/strategy/invite_cfp.png" alt="">
        <router-link :to="{name:'invitePlanner'}">立即推荐</router-link>
    </div>
    <div class="wrapper story-wrapper">
      <nav>老李投资小故事</nav>
      <img src="../../../static/images/strategy/story.png" alt="">
    </div>
	</div>
</template>
<script>
  import service from '../../resource/service';
  import {environment,serverHost,imgHost} from '../../resource/config';
  export default {
    data (){
        return {
            flowMaxRate : "",
            buyUrl : "",
            token : service.getCookie("__token__"),
        }
    },
    created (){
        var self = this;
        service.serverRequest('productClassifyPreference',{
          cateIdList : 2
        },(result)=>{
            if(result.datas[0]){
               self.flowMaxRate = result.datas[0].productPageListResponse.flowMaxRate.toFixed(2);
               if(environment === "produce"){
                    self.buyUrl = "https://www.bethye.top/app/pages/financing/product_detail.html?productId="+ result.datas[0].productPageListResponse.productId + "&token=" + self.token
               }else{
                    self.buyUrl = "https://pre.bethye.top/app/pages/financing/product_detail.html?productId="+ result.datas[0].productPageListResponse.productId + "&token=" + self.token
               }
            }
        });
    }
  }
</script>
<style scoped lang='less' rel="stylesheet/less">
header{
    width: 100%;
    height: 3.54rem;
    img{
        width: 100%;
    }
}
nav{
    background: url("../../../static/images/strategy/title.png") no-repeat center center;
    background-size: 100% auto;
    text-align: center;
    color: #4d4d4d;
    font-size: .33rem;
    line-height: 2em;
    font-weight: bold;
}
.wrapper{
    position: relative;
    width: 100%;
    height: 4.7rem;
    box-sizing: border-box;
    padding: 0 .38rem;
    margin-bottom: .25rem;
    padding-top: .2rem;
    background-color: #fff;
    text-align: center;
}
.year-rate-box{
    position: relative;
    display: inline-block;
    width: 5.36rem;
    height: 1.94rem;
    margin-top: .5rem;
    background: url("../../../static/images/strategy/red_packet.png") no-repeat center;
    background-size: 100% auto;
}
.year-rate-box > p{
    position: absolute;
    left: .44rem;
    top: .44rem;
    text-align: center;
    font-size: .38rem;
    color: #e4f6ff;
    line-height: 1.5em;
    box-sizing: border-box;
}
.wrapper a{
    display:block;
    width: 6.3rem;
    height: .72rem;
    font-size: .33rem;
    text-align: center;
    line-height: .72rem;
    color: #fff;
    background-color: #f5c01f;
    border-radius: 10px;
    cursor: pointer;
    margin: .35rem auto 0;
}
.year-rate{
    position: absolute;
    left:2.6rem;
    top: .44rem;
    color: #e4f6ff;
}
.year-rate p:first-child{
    font-size: .8rem;
    color: #e4f6ff;
    line-height: 1em;
    span:last-child{
    font-size: .33rem;
    }
}
.year-rate p:last-child{
    font-size: .21rem;
    color: #e4f6ff;
}
.cfp-wrapper{
    height: 6.3rem;
}
.client-wrapper img,.cfp-wrapper img{
    padding-top: .4rem;
    width: 6.3rem;
}
.story-wrapper{
    height: 7.14rem;
    img{
        width: 100%;
        padding-top: .5rem;
    }
}
</style>
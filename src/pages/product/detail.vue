<!-- 产品详情页 -->
<template>
  <div id="detailContainer" class="detail-container" style="visibility:hidden;">
    <div class="header" ref="header">
      <h2 class="name ellipsis">{{detail.productName}}</h2>
      <h3 class="earn">{{detail.yearRate}}<span>&nbsp;%</span></h3>
      <p class="earn-text">年化收益率</p>
      <ul class="info-wrapper">
        <li><p>产品期限</p><h2 v-html="detail.deadLineText"></h2></li>
        <li><p>剩余额度(元)</p><h2>{{detail.residualAmount}}</h2></li>
        <li><p>佣金率</p><h2>{{detail.feeRatio}}<span>%</span></h2></li>
      </ul>
      <div class="progress-wrapper">
        <p class="progress">
          <span :style="{width:percentage + '%'}"></span>
        </p>
        <p class="text" :style="{paddingLeft:(percentage > 90? 85: percentage-5)+ '%'}">已售{{percentage}}%</p>
      </div>
    </div>
    <div class="tip-wrapper">
      每万元总收益：{{detail.allIncome}}元（含佣金{{detail.commission}}元）
    </div>

    <div class="packet-wrapper arrow" @click="register" v-if="!token">
      <img src="./packet.png"> 新用户注册送528元红包
    </div>

    <div class="coupon-wrap" v-if="detail.couldUseRedPacketCounts > 0">
      <div class="left">
        <img src="./../../assets/packet-icon.png">
        <p>猎财专享优惠券</p>
      </div>
      <div class="right">{{detail.couldUseRedPacketCounts}}</div>
    </div>

    <div class="intro-wrapper">
      <div class="title">
        <h3>产品介绍</h3>
        <span v-if="isNewerClass">新手专享</span>
        <span v-if="detail.isRedemptionText">{{detail.isRedemptionText}}</span>
      </div>
      <div class="second">
        <p>产品总额：{{detail.buyTotalMoney}}元</p>
        <p>起投金额：{{detail.buyMinMoney}}元</p>
      </div>
      <div class="intro-content">
        <div class="detail-wrapper" ref="detailWrapper">
          <p class="detail-inner" ref='detailContent' v-html="detail.productDesc"></p>
        </div>
        <p @click="handleArrow" ref="arrow" v-show='arrowShow' class="arrow"></p>
      </div>
    </div>
    <div class="org-wrapper clearfix">
      <div class="first arrow" @click="goPlatformDetail">
        <div class="org-img">
          <img :src="detail.orgIcon" :alt="detail.orgName">
        </div>
        <h2 class="grade">安全等级：{{detail.orgLevel}}</h2>
      </div>
      <div class="second">
        {{detail.orgAdvantage}}
      </div>
    </div>

    <div class="lvdun-wrapper">
      <img src="./lvdun-icon.png">猎财大师律盾计划拥有完善的权益安心机制
    </div>
    <div class="footer-wrapper">
      <div class="strategy-wrapper">
        <img src="./../../assets/strategy.png">
        <router-link :to="{name : 'strategy',query:{orgNumber : orgInfoResponse.orgNo}}">
          <span class="icon-strategy"></span>
          <span>猎财攻略</span>
        </router-link>
      </div>
      <div class="buy-wrapper" :class="buyStateClass">
        <a @click="handleBuy">{{buyText}}</a>
      </div>
    </div>
    <form id="form" action="" method="post" accept-charset="utf-8" style="display: none" ref="buyform">
        <input id="orgAccount" type='hidden' name="orgAccount" v-model="formData.orgAccount"/>
        <input id="thirdProductId" type='hidden' name="thirdProductId" v-model="formData.thirdProductId"/>
        <input id="orgKey" type='hidden' name="orgKey" v-model="formData.orgKey"/>
        <input id="orgNumber" type='hidden' name="orgNumber" v-model="formData.orgNumber"/>
        <input id="sign" type='hidden' name="sign" v-model="formData.sign"/>
        <input id="timestamp" type='hidden' name="timestamp" v-model="formData.timestamp"/>
        <input id="txId" type='hidden' name="txId" v-model="formData.txId"/>
        <input id="requestFrom" type='hidden' name="requestFrom" v-model="formData.requestFrom"/>
    </form>
  </div>
</template>
<script>
import Vue from 'vue';
import service from '../../resource/service';
import Env from '../../resource/env';
import {environment,serverHost,imgHost,appLiecaiHost} from '../../resource/config';
import comm from './../../common/common'
import { addClass , removeClass} from './../../common/dom'
import util from './../../common/util'
export default{
  name:"detail",
  data (){
    return {
      // 购买进度
      percentage : 0,
      // 产品id
      productId:this.$route.query.productId,
      detail:{},
      formData:{},
      buyUrl:"",
      orgInfoResponse:{},
      isNewerClass:false,
      isRedemptionClass:true,
      arrowShow:false,
      detailWrapperHeight:0,
      isOpen:false,
      isBindCard:false,
      packetText : "",
      buyText:'',
      buyStateClass:'',
      // 0,1,2 倒计时,购买,售罄
      sellState:1,
      countdownTimer:null,
    }
  },
  computed:{
    token(){
      return this.$store.state.token
    },
    query(){
      return this.$route.query
    },
    // 来源是否为app
    isFromApp(){
      return this.query.fromApp === 'liecai'&& this.query.recommendCode ? true : false
    }
  },
  mounted(){
    this.init()
  },
  updated(){
    this.$nextTick(()=>{
      if(this.$refs.detailContent.getBoundingClientRect().height > this.$refs.detailWrapper.getBoundingClientRect().height){
          this.arrowShow = true;
      }
    })
  },
  destroyed(){
    clearInterval(this.countdownTimer)
  },
  methods:{
    init(){
      this.$store.dispatch('showLoading')
      service.serverRequest('productDetail',{
        productId : this.productId
      },(result)=>{
        this.detail = this.detailFilter(result);
        this.orgInfoResponse = this.detail.orgInfoResponse;
        this.totalShow = "block";
        comm.setTitle(result.productName);
        document.getElementById('detailContainer').style.visibility = 'visible'
        this.detailWrapperHeight = this.$refs.detailWrapper.getBoundingClientRect().height;
      })
    },
    detailFilter (result){
      var self = this;
      let investQuota = 10000;//投资额度
      let daysPerYear = 360;//一年投资天数
      let investIncome = 0;
      result.commission = comm.toDecimal((investQuota * parseFloat(result.feeRatio)/ 100 * result.deadLineMinValue / daysPerYear))
      investIncome = comm.toDecimal((investQuota * result.flowMinRate/ 100 * result.deadLineMinValue / daysPerYear))
      result.allIncome = comm.toDecimal(parseFloat(result.commission) + parseFloat(investIncome));
      result.feeRatio = result.feeRatio.toFixed(2);
      result.buttonText = '推荐给客户';
      //年化收益
      result.yearRate = result.isFlow == "1" ? result.flowMinRate.toFixed(2) : result.flowMinRate.toFixed(2) + '~' + result.flowMaxRate.toFixed(2);
      //产品期限
      var arr = result.deadLineValueText.split(',');
      //固定期限
      if(arr.length == 2){
          result.deadLineText = arr[0]+arr[1];
      }
      //浮动期限
      if(arr.length == 4){
         if(arr[1] == arr[3]) arr[1] = "";
         result.deadLineText = arr[0] +arr[1]+'~'+ arr[2]+arr[3];
      }
      //是否显示产品销售进度
      if(result.isHaveProgress == "0"){
        result.residualAmount = (result.buyTotalMoney - result.buyedTotalMoney).toFixed(2);
        result.residualAmount = result.residualAmount > 10000 ? (result.residualAmount/10000).toFixed(2)+"万":result.residualAmount
        //产品购买占比
        if(result.residualAmount < 0){
          //如果为负数,就使用最大最小化处理，避免数据错误
          result.residualAmount  =  0;
          result.percentage      =  100;
        }else{
          result.buyedTotalMoney = result.buyedTotalMoney || 0;
          result.buyTotalMoney   = result.buyTotalMoney   || 1;
          result.percentage      = parseInt(result.buyedTotalMoney/result.buyTotalMoney * 100);
        }
        result.virtualProduct = '';
      }else{
        //虚拟标，隐藏 剩余额度 、购买人数、产品总额
        result.virtualProduct = 'hidden';
      }
      result.buyTotalMoney = result.buyTotalMoney.toFixed(2);//产品购买总额
      result.orgIcon = Env.imgUrl +"/"+ result.orgInfoResponse.platformlistIco + "?f=png";
      var income = "";//收益
      var feeIncomeNum = "";//佣金收入
      // 1:cpa-按投资人数量进行收费 2:cps-按投资金额进行收费
      if(result.orgInfoResponse && result.orgInfoResponse.orgFeeType == "1" && result.orgInfoResponse.orgInvestdeadlineLimit){
        result.buyIcon   = "first-buy";
        var minLimit = result.orgInfoResponse.orgInvestdeadlineLimit >= result.deadLineMinValue ? result.deadLineMinValue : result.orgInfoResponse.orgInvestdeadlineLimit;
        income = parseFloat((result.orgInfoResponse.orgAmountLimit * result.deadLineMinValue * result.flowMinRate/100/360).toFixed(2));
        feeIncomeNum = parseFloat((result.orgInfoResponse.orgAmountLimit*result.feeRatio*minLimit/100/360).toFixed(2));
      }else{
        result.buyIcon    = "repeat-buy";
        income = parseFloat((100000 * result.deadLineMinValue * result.flowMinRate/100/360).toFixed(2));
        feeIncomeNum = parseFloat((100000*result.feeRatio*result.deadLineMinValue/100/360).toFixed(2));
      }
      var tagArr = [];
      for(let tag in result.tagList){
        if(tag < 3){
          tagArr.push('<span class="item">'+result.tagList[tag].substr(0,8)+'</span>');
        }
      }
      result.tagListText = tagArr.join('');
      //产品售罄
      if(result.status == '2'){
        result.percentage        = 100;
        this.buyText        = '已售罄'
        this.buyStateClass = 'sellout'
        this.sellState = 2
      }

      // 倒计时功能
      var nowTime = new Date(result.timeNow.replace( /-/g,'/' ) ).getTime();
      var saleTime = new Date(result.saleStartTime.replace( /-/g,'/' ) ).getTime();
      if(result.saleStartTime.length > 0 && nowTime < saleTime){
        var disSecond = (saleTime - nowTime) /1000;
        var dayNum = parseInt( disSecond/3600/24 );
        var hourNum = parseInt( disSecond/3600 - dayNum * 24 );
        var minuteNum = parseInt( disSecond/60 - dayNum * 24 * 60 - hourNum * 60 );
        var secondNum = parseInt( disSecond - dayNum * 24 * 60 * 60 - hourNum * 60 * 60 - minuteNum * 60 );
        this.buyText = '开售倒计时: '+ util.getTwoNum(dayNum) + '天' + util.getTwoNum(hourNum) + '时' + util.getTwoNum(minuteNum) + '分' + util.getTwoNum(secondNum) + '秒';
        this.buyStateClass = 'presell'
        this.sellState = 0;
        this.countdownTimer = setInterval(()=>{
          nowTime += 1000;
          disSecond = (saleTime - nowTime) /1000;
          dayNum = parseInt( disSecond/3600/24 );
          hourNum = parseInt( disSecond/3600 - dayNum * 24 );
          minuteNum = parseInt( disSecond/60 - dayNum * 24 * 60 - hourNum * 60 );
          secondNum = parseInt( disSecond - dayNum * 24 * 60 * 60 - hourNum * 60 * 60 - minuteNum * 60 );
          this.buyText = '开售倒计时: '+ util.getTwoNum(dayNum) + '天' + util.getTwoNum(hourNum) + '时' + util.getTwoNum(minuteNum) + '分' + util.getTwoNum(secondNum) + '秒';
          if(nowTime >= saleTime){
            this.buyText = !this.token && this.isFromApp ? '注册领528红包' : '投1万加息'+result.allIncome+'元';
            this.buyStateClass = ''
            this.sellState = 1
            clearInterval(this.countdownTimer)
          }
        },1000)
      }else{
        this.buyText = !this.token && this.isFromApp ? '注册领528红包' : '投1万加息'+result.allIncome+'元';
      }

      for(let key in result.orgInfoResponse){
        result[key] = result.orgInfoResponse[key];
      }

      //判断是否是新手标
      if(result.ifRookie == 1){
          this.isNewerClass=true;
      }else if(result.ifRookie == 2){
          result.isNewerClass=false;
      }
      //可赎回可转让
      if(result.isRedemption == 0){
          this.isRedemptionClass = false;
      }else if(result.isRedemption == 1){
          result.isRedemptionText = result.redemptionTime+'天后可赎回';
      }else if(result.isRedemption == 2){
          result.isRedemptionText = result.assignmentTime+'天后可转让';
      }else if(result.isRedemption == 3){
          result.isRedemptionText = result.redemptionTime+'天后可赎回' + result.assignmentTime+'天后可转让';
      }
      this.percentage = result.percentage;
      return result;
    },
    register(){
      if(this.token) return
      if(this.isFromApp){
        if(this.query.name){
          window.location.href = `${appLiecaiHost[environment]}/pages/user/invite_enroll.html?recommendCode=${this.query.recommendCode}&name=${encodeURIComponent(this.query.name)}&fromApp=liecai`
        }else{
          window.location.href = `${appLiecaiHost[environment]}/pages/user/invite_enroll.html?recommendCode=${this.query.recommendCode}&fromApp=liecai`
        }
      }else{
        this.$router.push({'name':'register'})
      }
    },
    handleArrow:function(){
      if(this.isOpen){
        this.isOpen = false;
        this.$refs.detailWrapper.style.height = this.detailWrapperHeight + 'px'
        removeClass(this.$refs.arrow,'active')
      }else{
        this.$refs.detailWrapper.style.height = this.$refs.detailContent.getBoundingClientRect().height + 'px'
        addClass(this.$refs.arrow,'active')
        this.isOpen = true;
      }
    },
    handleBuy(){
      // 事件统计
      if(environment === 'produce' && window._hmt){_hmt.push(['_trackEvent', 'LDBU01', 'click']);}
      if(this.sellState == 2 || this.sellState == 0) return;
      if(this.token){
        // 判断是否需要绑卡
        if(this.orgInfoResponse.orgProductUrlSkipBindType == 1){
          this.getBindCard()
        }else{
          // 是否绑定第三方平台
          this.isBindThirdPlatfrom()
        }
      }else{
        if(this.isFromApp){
          if(this.query.name){
            window.location.href = `${appLiecaiHost[environment]}/pages/user/invite_enroll.html?recommendCode=${this.query.recommendCode}&name=${encodeURIComponent(this.query.name)}&fromApp=liecai`
          }else{
            window.location.href = `${appLiecaiHost[environment]}/pages/user/invite_enroll.html?recommendCode=${this.query.recommendCode}&fromApp=liecai`
          }
        }else{
          this.loginTip()
        }
      }
    },
    loginTip(){
      var self = this;
      Vue.popup.confirm({
        title:"",
        msg:"需要登录后才能投资",
        okText:'确定',
        okCb(){
          self.$router.push({ name: 'login'})
        }
      })
    },
    // 判断是否绑卡
    getBindCard(){
      this.$store.dispatch('showLoading')
      service.serverRequest('personAuthenticate',(result)=>{
        this.isBindCard = result.bundBankcard;
        if(this.orgInfoResponse.orgNo === 'OPEN_JIUFUQINGZHOU_WEB'){
          if(result.bundBankcard){
            this.getJiufuToken()
          }else{
            this.bindCardTips()
          }
          return;
        }
        if(result.bundBankcard){
          // 是否绑定第三方平台
          this.isBindThirdPlatfrom()
        }else{
          this.bindCardTips()
        }
      })
    },
    //获取玖富的token
    getJiufuToken(){
      this.$store.dispatch('showLoading')
        service.serverRequest('jufuToken',(result)=>{
          let thirdProductIdArr = this.detail.thirdProductId.split('_');
          let url =`${this.detail.jfqzProductDetailUrl}?productId=${thirdProductIdArr[0]}&issuePeriod=${thirdProductIdArr[1]}&token=${result.token}`
          window.location.href = url;
        })
    },
    // 绑卡提示
    bindCardTips(){
      var self = this;
      Vue.popup.confirm({
          title:"",
          msg:"为了您的资金安全,请先绑定银行卡",
          okText :"立即绑定",
          okCb(){
            // 设置绑卡来源
            localStorage.setItem("__BINDCARDORIGIN__",'productDetail')
            self.$store.dispatch('originQuery',{productId:self.$route.query.productId})
            self.$store.dispatch('originPath',self.$route.path)
            self.$router.push({ name: 'setting'})
          }
      });
    },
    // 是否绑定第三方平台
    isBindThirdPlatfrom(){
      service.serverRequest('isBindOtherOrg',{
        'platFromNumber': this.detail.orgNumber
      },(result)=>{
        if(result.isBind){
          this.queryThirdBuyUrl()
        }else{
          // 检测是否是第三方老账户
          this.isThirdOldAccount();
        }
      })
    },
    /**
     * 检查是否是第三方老账户
    */
    isThirdOldAccount(){
      service.serverRequest('isExistInPlatform',{
        'platFromNumber': this.detail.orgNumber
      },(result)=>{
        if(result.isExist){
          this.bindThirdPlatfromTips()
        }else{
          this.bindAccountTips()
        }
      })
    },
    // 绑定第三方账号提示
    bindThirdPlatfromTips(){
      var self = this;
      Vue.popup.confirm({
        title:"您已有"+self.detail.orgName+"帐号",
        msg:"通过猎财大师投资不能享受佣金、津贴、红包等奖励，建议您购买其他平台产品",
        okText:'好的',
        okCb(){
        }
      })
    },
    bindAccountTips(){
      var self = this;
      Vue.popup.show({
        title: '投资返利说明',
        msg: '<div>'+
                '<section style="text-align:left;padding-bottom:.2rem;"><h2 style="font-size:.32rem;color:#666;">1.绑定账户关系</h2><p style="font-size:.24rem;color:#999;">将你的账户与该平台绑定</p></section>'+
                '<section style="text-align:left;padding-bottom:.2rem;"><h2 style="font-size:.32rem;color:#666;">2.购买猎财专享加息标的</h2><p><span style="font-size:.24rem;color:#999;line-height:1.5;">完成平台绑卡、开通存管等服务后</span><span style="color:#fd5d5d;line-height:1.5;font-size:.24rem;"><br />返回猎财购买加息产品</span></p></section>'+
                '<section style="text-align:left;padding-bottom:.2rem;"><h2 style="font-size:.32rem;color:#666;">3.获得理财额外收益</h2><p><span style="font-size:.24rem;color:#999;line-height:1.5;">起息后，获得猎财专享</span><span style="color:#fd5d5d;line-height:1.5;font-size:.24rem;">额外收益</span></p></section>'+
              '</div>',
        btn : [{
                name: '立即绑定',
                cb : function(){
                  this.close()
                  self.registerThirdAccount()
                }
              }]
      })
    },
    // 注册第三方平台
    registerThirdAccount() {
      let http = this.$axios;
      // 不显示提示
      http.isShowTips = '0';
      http.post('bindOrgAcct',{
        'platFromNumber': this.detail.orgNumber
      }).then((result)=>{
        this.queryThirdBuyUrl()
      },err => {
        this.$router.push({path:'/product/bindFail',query:{orgName:encodeURIComponent(this.detail.orgName)}})
      })
    },
    //获取第三方跳转路径
    queryThirdBuyUrl() {
      service.serverRequest('getOrgProductUrl',{
        'orgNo'    : this.detail.orgNumber,
        'productId': this.detail.productId
      },(result)=>{
        if(result.orgNumber === "OPEN_XIAOYINGLICAI_WEB"){
          result.orgAccount = decodeURIComponent(result.orgAccount)
        }
        this.formData = result;
        document.getElementById('form').setAttribute('action',result.orgProductUrl)
        setTimeout(()=>{
          document.getElementById('form').submit();
        },20)
        Vue.popup.tipsContinue('正在跳转至' + this.detail.orgName);
      })
    },
    // 跳转到平台详情
    goPlatformDetail(){
      if(this.isFromApp){
        if(this.query.name){
          this.$router.push({path:'/platformDetail',query:{orgNumber:this.detail.orgNumber,recommendCode:this.query.recommendCode,name:encodeURIComponent(this.query.name),fromApp:'liecai'}})
        }else{
          this.$router.push({path:'/platformDetail',query:{orgNumber:this.detail.orgNumber,recommendCode:this.query.recommendCode,fromApp:'liecai'}})
        }
      }else{
        this.$router.push({path:'/platformDetail',query:{orgNumber:this.detail.orgNumber}})
      }
    }
  }
}
</script>
<style scoped>
.header {
  width: 100%;
  height: 5.3rem;
  background: url('./detail-bg.png') no-repeat left bottom #508ef0;
  background-size: 100% auto;
}
.header .name {
  padding: .42rem .78rem 0;
  text-align: center;
  font-size: .24rem;
  color: #c4dbff;
}
.header .earn {
  font-size: .52rem;
  color: #fff;
  padding-top: .56rem;
  font-family: DINOTMedium;
  text-align: center;
}
.header .earn span {
  font-size: .3rem;
}
.header .earn-text {
  text-align: center;
  font-size: .28rem;
  color: #c4dbff;
  padding-top: .3rem;
}
.header .info-wrapper {
  display: flex;
  padding: .96rem .3rem 0;
}
.header .info-wrapper li {
  flex: 1;
  text-align: center;
}
.header .info-wrapper li p {
  font-size: .24rem;
  color: #c4dbff;
}
.header .info-wrapper li h2 {
  font-size: .32rem;
  color: #fff;
  padding-top: .2rem;
}
.header .info-wrapper li h2 span {
  font-size: .24rem;
}
.header .progress-wrapper {
  padding-top: .6rem;
}
.header .progress-wrapper .text {
  font-size: .24rem;
  color: #c4dbff;
  padding-top: .12rem;
}
.header .progress {
  width: 100%;
  height: .1rem;
  background-color: #4c84da;
}
.header .progress span {
  display: block;
  height: 100%;
  background-image: linear-gradient(to left, #7eadf7, #d0e1fc);
  border-top-right-radius: .05rem;
  border-bottom-right-radius: .05rem;
}
.tip-wrapper {
  padding: 0 .3rem;
  height: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  background-color: #fff;
  margin-bottom: .2rem;
}
.packet-wrapper {
  display: flex;
  align-items: center;
  padding: 0 .3rem;
  height: .8rem;
  background-color: #fff;
  margin-bottom: .2rem;
  font-size: .28rem;
  color: #4f5960;
}
.packet-wrapper img {
  width: .76rem;
  padding-right: .3rem;
}
.coupon-wrap{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 .3rem;
  height: .8rem;
  background-color: #fff;
  margin-bottom: .2rem;
  font-size: .28rem;
  color: #4f5960;
}
.coupon-wrap .left {
  display: flex;
  align-items: center;
  height: 100%;
}
.coupon-wrap .left p{
  padding-left: .1rem;
  color: #4f5960;
}
.coupon-wrap .left img{
  width: .46rem;
}
.coupon-wrap .right{
  color:#fd5d5d;
}
.intro-wrapper {
  padding: 0 .3rem;
  background-color: #fff;
  margin-bottom: .2rem;
}
.intro-wrapper .title {
  display: flex;
  height: .8rem;
  align-items: center;
  font-size: 0;
}
.intro-wrapper .title h3 {
  font-size: .28rem;
  color: #4f5960;
}
.intro-wrapper .title span {
  display: inline-block;
  padding: .04rem .06rem;
  margin-left: .2rem;
  border: 1px solid #4e8cef;
  color: #4e8cef;
  border-radius: 3px;
  font-size: .2rem;
}
.intro-wrapper .second {
  font-size: 0;
}
.intro-wrapper .second p {
  display: inline-block;
  font-size: .24rem;
  color: #666;
  padding-right: .5rem;
  padding-bottom: .36rem;
}
.intro-wrapper .intro-content {
  font-size: .26rem;
  color: #999;
  line-height: 1.5;
  text-align: justify;
}
.intro-wrapper .intro-content .detail-wrapper {
  height: 1.52rem;
  overflow: hidden;
}
.intro-wrapper .intro-content .arrow {
  margin-top: .2rem;
  width: 100%;
  height: .5rem;
  background-image: url('./open_icon.png');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: .23rem auto;
}
.intro-wrapper .intro-content .arrow.active {
  background-image: url('./fold_icon.png');
}
.org-wrapper {
  background-color: #fff;
  padding: 0 .3rem;
  overflow: hidden;
}
.org-wrapper .first {
  display: flex;
  height: 1.5rem;
  align-items: center;
}
.org-wrapper .first .org-img {
  flex: 0 0 1.94rem;
  height: .8rem;
  border: 1px solid #efefef;
  border-radius: 3px;
}
.org-wrapper .first .org-img img {
  display: block;
  width: 90%;
  height: 90%;
  padding-top: 5%;
  margin: 0 auto;
}
.org-wrapper .first .grade {
  font-size: .28rem;
  color: #4f5960;
  padding-left: .5rem;
}
.org-wrapper .second {
  font-size: .28rem;
  color: #4f5960;
  padding-top: .16rem;
  padding-bottom: .4rem;
}
.lvdun-wrapper {
  text-align: center;
  height: 2.04rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .24rem;
  color: #999;
  padding-top: .3rem;
  padding-bottom: 1.3rem;
}
.lvdun-wrapper img {
  display: inline-block;
  height: .44rem;
  width: auto;
  padding-right: .2rem;
}
.footer-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  height: 1rem;
  align-items: center;
  overflow: hidden;
}
.footer-wrapper .strategy-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 1.48rem;
  height: 100%;
  background-color: #fff;
  flex-direction: column;
}
.footer-wrapper .strategy-wrapper span {
  display: block;
  text-align: center;
  font-size: .2rem;
  color: #fd5d5d;
}
.footer-wrapper .strategy-wrapper img {
  width: .36rem;
  box-sizing: content-box;
  padding-bottom: .1rem;
}
.footer-wrapper .buy-wrapper {
  background-color: #4e8cef;
  flex: 1;
  height: 100%;
}
.footer-wrapper .buy-wrapper a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: .32rem;
}
.footer-wrapper .sellout,
.footer-wrapper .presell {
  background-color: #dcdcdc;
}
</style>

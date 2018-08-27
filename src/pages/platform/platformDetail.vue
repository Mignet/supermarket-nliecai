<template>
  <div class="platformDetail-container">
    <header>
      <div class="top">
        <div class="left"><img :src="platformInfo.platformIco"></div>
        <div class="right">
          <h2 class="title"><p>{{platformInfo.orgName}}</p><b v-html="platformInfo.orgTagHtml"></b></h2>
          <h3 class="year-rate"><p>年化收益率：</p><span>{{platformInfo.feeRateMin}}%～{{platformInfo.feeRateMax}}%</span></h3>
          <h4 class="commission-level">
            <p>年化佣金率：<span>{{platformInfo.orgFeeRatio}}%</span></p>
            <p>安全等级：<span>{{platformInfo.orgLevel}}</span></p>
          </h4>
        </div>
      </div>
      <div class="bottom"><p>{{platformInfo.orgAdvantage}}</p></div>
    </header>

    <div class="account-wrapper arrow" @click="setAccount">
      <div class="left"><img src="./images/account-icon.png"><p>{{myAccountTips}}</p></div>
      <div class="right">{{setAccountText}}</div>
    </div>

    <div class="intro-wrapper">
      <ul class="tab-wrapper">
        <li @click="tabChange(0)" :class="{active:tabIndex == 0?true :false}"><span>简介</span></li>
        <li @click="tabChange(1)" :class="{active:tabIndex == 1?true :false}"><span>投资相关</span></li>
        <li @click="tabChange(2)" :class="{active:tabIndex == 2?true :false}"><span>档案</span></li>
        <li @click="tabChange(3)" :class="{active:tabIndex == 3?true :false}"><span>动态</span></li>
      </ul>

      <div class="intro-content">
        <div class="content-one" v-show='tabIndex == 0'>
          <div class="content-one-inner" ref='contentOneWrapper' :class="{active:!isArrowDown}">
            <div class="content" ref='contentOne' v-html="platformInfo.orgProfile"></div>
          </div>
          <p @click="contentShowEvent" v-show='arrowShow' class="icon-arrow-wrapper">
            <img v-show="isArrowDown" src="./../../assets/arrow-down-icon2.png">
            <img v-show="!isArrowDown" src="./../../assets/arrow-up-icon.png">
          </p>
        </div>
        <div class="content-two" v-show="tabIndex == 1">
          <h2 class="content-two-item" v-if="platformInfo.productReleaseTime"><p>发标时间:</p><span>{{platformInfo.productReleaseTime}}</span></h2>
          <h2 class="content-two-item" v-if="platformInfo.rechargeLimitDescription"><p>充值限制:</p><span>{{platformInfo.rechargeLimitDescription}}<a :href="platformInfo.limitLink">{{platformInfo.rechargeLimitTitle}}</a></span></h2>
          <h2 class="content-two-item" v-if="platformInfo.interestTime"><p>起息时间:</p><span>{{platformInfo.interestTime}}</span></h2>
          <h2 class="content-two-item" v-if="platformInfo.withdrawalCharges"><p>提现费用:</p><span v-html='platformInfo.withdrawalCharges'></span></h2>
          <h2 class="content-two-item" v-if="platformInfo.cashInTime"><p>提现到账:</p><span v-html='platformInfo.cashInTime'></span></h2>
          <h2 class="content-two-item" v-if="platformInfo.investOthers"><p>其他:</p><span v-html='platformInfo.investOthers'></span></h2>
        </div>
        <div class="content-three" v-show="tabIndex == 2">
          <div v-if="honorShow">
            <h2 class="content-three-title">公司荣誉</h2>
            <div class="content" v-html='platformInfo.orgHonor'></div>
          </div>
          <div v-if="certificateShow">
            <h2 class="content-three-title">公司证件及证书</h2>
            <div class="content">
              <ul class="org-pic">
                <li v-for="item in platformInfo.orgPapersList" @click="showPic(item)">
                  <img :src="item.orgPicture">
                </li>
              </ul>
            </div>
          </div>
          <h2 class="content-three-title">基本信息</h2>
          <div class="content baseinfo-content">
            <h3 class="baseinfo first"><p>注册资本:</p><span>{{platformInfo.capital}}</span></h3>
            <h3 class="baseinfo"><p>上线时间</p><span>{{platformInfo.upTime}}</span></h3>
            <h3 class="baseinfo"><p>所在城市</p><span>{{platformInfo.city}}</span></h3>
            <h3 class="baseinfo"><p>产品期限</p><span>{{platformInfo.deadLineMinSelfDefined}}~{{platformInfo.deadLineMaxSelfDefined}}</span></h3>
            <h3 class="baseinfo"><p>安全评级</p><span>{{platformInfo.orgLevel}}</span></h3>
            <h3 class="baseinfo"><p>ICP备案</p><span>{{platformInfo.icp}}</span></h3>
            <h3 class="baseinfo"><p>客服电话</p><span><a @click="call(platformInfo.contact)">{{platformInfo.contact}}</a></span></h3>
          </div>
          <div class="teaminfo-wrapper" @click="locationTeamInfo">
            <p>高管团队及现场实拍<span class="icon-right-arrow"></span></p>
          </div>
        </div>

        <div class="content-four" v-show="tabIndex == 3">
          <ul>
            <li class="dynamic-item arrow" v-for="item in platformInfo.orgDynamicList">
              <a :href="item.orgDynamicUrl">
                <h3>{{item.orgTitle}}</h3>
                <p>{{item.createTime}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="orgActivitys-wrapper" v-if="activityShow">
      <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" v-if="platformInfo.orgActivitys.length > 1">
        <swiper-slide v-for="(item,index) in platformInfo.orgActivitys" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.platformImg | serverImage">
          </a>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div v-else>
      	<a :href="platformInfo.orgActivitys[0].linkUrl">
      	  <img :src=" platformInfo.orgActivitys[0].platformImg | serverImage">
      	</a>
      </div>
    </div>

    <div class="saleProduct-wrapper">
      <h1>在售产品({{productListTotalCount}})</h1>
      <div class="productList-inner">
        <pullup
          api="productPageList"
          :params="{orgCode : orgNumber,sort:2,order:1}"
        >
          <product-item :item="slotProps.item" slot-scope="slotProps"/>
          <empty-temp msg="暂无记录" slot="empty"/>
        </pullup>
      </div>
    </div>
    <form id="form" method="post" accept-charset="utf-8" style="display: none" ref="buyform">
      <input id="orgAccount" type='hidden' name="orgAccount" v-model="formData.orgAccount"/>
      <input id="orgKey" type='hidden' name="orgKey" v-model="formData.orgKey"/>
      <input id="orgNumber" type='hidden' name="orgNumber" v-model="formData.orgNumber"/>
      <input id="sign" type='hidden' name="sign" v-model="formData.sign"/>
      <input id="timestamp" type='hidden' name="timestamp" v-model="formData.timestamp"/>
      <input id="requestFrom" type='hidden' name="requestFrom" v-model="formData.requestFrom"/>
    </form>
    <Shade :src="shadeSrc" v-show='isShadeShow' @shadeShow="shadeShow" @shadeHide="shadeHide"></Shade>
  </div>
</template>
<script>
  import Vue from 'vue'
  import service from '../../resource/service';
  import Env from '../../resource/env';
  import {httpProtocol,environment,serverHost,imgHost,appLiecaiHost} from '../../resource/config';
  import comm from './../../common/common'
  import {hasClass, addClass , removeClass} from './../../common/dom'
  const pullup = () => import('./../../components/pullup/pullup.vue')
  const emptyTemp = () => import('./../../components/emptyTemp/emptyTemp.vue')

  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  import Shade from './../../components/shade/shade'
  const productItem = () => import('./../../components/productItem/productItem.vue')

  export default {
    name:'platformDetail',
    data(){
      return {
        platformInfo :{},
        arrowShow:false,
        // 简介部分箭头是否向下 默认为true
        isArrowDown:true,
        tabIndex:0,
        isShadeShow:false,
        shadeSrc:"",
        formData:{},
        productListTotalCount:0,
        notNextTick: true,
        loadingEnd:false,
        isLoading:false,
        bottomShow:false,
        bottomText:'上拉加载更多',
        pageListDatas : [],
        activityShow:false,
        honorShow:false,
        certificateShow:false,
        myAccountTips:"绑定账户快捷理财",
        // 开通或者进入账户
        setAccountText:'去绑定',
        // 是否绑定第三方平台
        ifBindThirdPlatfrom:false,
        swiperOption: {
          notNextTick: true,
          loop:true,
          autoplay: 2500,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          observer:true,
          observeParents: true,
          pagination : '.swiper-pagination',
          paginationClickable :true
        }
      }
    },
    computed:{
      orgNumber(){
        return this.$route.query.orgNumber
      },
      token(){
        return this.$store.state.token
      },
      swiper() {
        return this.$refs.mySwiper.swiper
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
      this.getDetail()

    },
    methods:{
      getDetail(){
        this.$store.dispatch('showLoading')
        service.serverRequest('platformDetail',{
          orgNo : this.orgNumber
        },(result)=>{
          this.platformInfo = this._filter(result)
          this.$nextTick(() =>{
            let contentWrapperHeight = this.$refs.contentOneWrapper.offsetHeight;
            let contentHeight = this.$refs.contentOne.offsetHeight
            if(contentHeight > contentWrapperHeight){ this.arrowShow = true; }
          })
          comm.setTitle(result.orgName)
          if (result.orgActivitys.length > 0) {
            this.activityShow = true;
          }
          if(result.orgHonor.length > 0){
            this.honorShow = true;
          }
          if(result.orgPapersList.length >0){
            this.certificateShow = true;
          }
          if(this.token){
            // 判断是否需要绑卡
            if(this.platformInfo.orgProductUrlSkipBindType == 1){
              this.getBindCard()
            }else{
              // 是否绑定第三方平台
              this.isBindThirdPlatfrom()
            }
          }else{
            if(this.isFromApp){
              this.setAccountText = '注册'
              this.myAccountTips = '注册领528红包'
            }
          }
        })
      },
      _filter(result){
        let orgTagHtml = ""
        result.platformIco = Env.imgUrl + '/' + result.platformIco + '?f=png'
        result.orgTag.split(',').forEach((item,index)=>{
          if(item){
            orgTagHtml += '<span style="display:flex;font-size:.2rem;color:#4e8cef;height:.32rem;background-color:#e0ecff;border-radius:3px;border:1px solid #4e8cef;align-items:center;justify-content:center;margin-right:.2rem;"> '+ item +'</span>'
          }
        })
        result.orgTagHtml = orgTagHtml
        result.withdrawalCharges = result.withdrawalCharges.replace(/\n/g, "<br/>")
        result.investOthers = result.investOthers.replace(/\n/g, "<br/>")
        result.cashInTime = result.cashInTime.replace(/\n/g, "<br/>")
        result.orgHonor = result.orgHonor.replace(/\n/g, "<br/>")
        for(var i=0;i<result.orgPapersList.length;i++){
          result.orgPapersList[i].orgPicture = Env.imgUrl + '/' + result.orgPapersList[i].orgPicture + '?f=png'
        }
        for(var j =0;j<result.orgDynamicList.length;j++){
          if(!result.orgDynamicList[j].orgDynamicUrl){
            result.orgDynamicList[j].orgDynamicUrl = Env.appUrl + '/pages/richText/detail.html?type=1&id=' + result.orgDynamicList[j].id
          }
        }
        for(let k = 0;k<result.orgActivitys.length;k++){
          result.orgActivitys[k].platformImg = result.orgActivitys[k].platformImg
        }

        // 充值限额表链接
        result.limitLink = Env.appUrl + '/pages/message/limit_sheet.html?orgName='+ decodeURIComponent(result.orgName) +'&orgNo=' + result.orgNo

        return result;
      },
      // 开通账户
      setAccount(){
        if(!this.token){
          if(this.isFromApp){
            if(this.query.name){
              window.location.href = `${appLiecaiHost[environment]}/pages/user/invite_enroll.html?recommendCode=${this.query.recommendCode}&name=${encodeURIComponent(this.query.name)}&fromApp=liecai`
            }else{
              window.location.href = `${appLiecaiHost[environment]}/pages/user/invite_enroll.html?recommendCode=${this.query.recommendCode}&fromApp=liecai`
            }
          }else{
            this.loginTip()
          }
          return;
        }else{
          // 判断是否需要绑卡
          if(this.platformInfo.orgProductUrlSkipBindType == 1){
            // 是否绑卡
            if(!this.isBindCard){
              this.bindCardTips()
              return;
            }
            // 对玖富做特殊处理
            if(this.orgNumber == 'OPEN_JIUFUQINGZHOU_WEB'){
            	this.queryThirdBuyUrl();
            	return;
            }
            // 是否绑定第三方平台
             if(this.ifBindThirdPlatfrom){
             	// 跳转到第三方平台
            	this.queryThirdBuyUrl()
            	return
            }else{
            	this.isThirdOldAccount()
            	return
            }
          }else{
            // 是否绑定第三方平台
            if(this.ifBindThirdPlatfrom){
              // 跳转到第三方平台
              this.queryThirdBuyUrl()
              return
            }else{
              this.isThirdOldAccount()
              return
            }
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
      getBindCard(){
        this.$store.dispatch('showLoading')
        service.serverRequest('personAuthenticate',(result)=>{
          this.isBindCard = result.bundBankcard;
          if(result.bundBankcard){
            // 是否绑定第三方平台
            this.isBindThirdPlatfrom()
          }
        })
      },
      bindCardTips(){
        var self = this;
        Vue.popup.confirm({
          title:"",
          msg:"为了您的资金安全,请先绑定银行卡",
          okText :"立即绑定",
          okCb(){
            self.$store.dispatch('originQuery',self.$route.query)
            self.$store.dispatch('originPath',self.$route.path)
            localStorage.setItem("__BINDCARDORIGIN__",'platformDetail')
            self.$router.push({ name: 'setting'})
          }
        });
      },
      // 是否绑定第三方平台
      isBindThirdPlatfrom(){
        service.serverRequest('isBindOtherOrg',{
          'platFromNumber': this.orgNumber
        },(result)=>{
          this.ifBindThirdPlatfrom = result.isBind;
          if(result.isBind){
            this.myAccountTips = '我的账户'
            this.setAccountText = '进入'
          }
        })
      },
      // 是否是第三方平台老用户
      isThirdOldAccount(){
        service.serverRequest('isExistInPlatform',{
          'platFromNumber': this.orgNumber
        },(result)=>{
          this.ifExistThirdPlatfrom = result.isExist;
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
          title:"您已有"+self.platformInfo.orgName+"帐号",
          msg:"通过貅比特投资不能享受佣金、津贴、红包等奖励，建议您购买其他平台产品",
          okText:'好的',
          okCb(){
          }
        })
      },
      bindAccountTips(){
        var self = this;
        Vue.popup.show({
          title: '投资返利说明',
          msg:
            '<div>'+
              '<section style="text-align:left;padding-bottom:.2rem;"><h2 style="font-size:.32rem;color:#666;">1.绑定账户关系</h2><p style="font-size:.24rem;color:#999;">将你的账户与该平台绑定</p></section>'+
              '<section style="text-align:left;padding-bottom:.2rem;"><h2 style="font-size:.32rem;color:#666;">2.购买貅比特专享加息标的</h2><p><span style="font-size:.24rem;color:#999;line-height:1.5;">完成平台绑卡、开通存管等服务后</span><span style="color:#fd5d5d;line-height:1.5;font-size:.24rem;"><br />返回貅比特购买加息产品</span></p></section>'+
              '<section style="text-align:left;padding-bottom:.2rem;"><h2 style="font-size:.32rem;color:#666;">3.获得理财额外收益</h2><p><span style="font-size:.24rem;color:#999;line-height:1.5;">起息后，获得貅比特专享</span><span style="color:#fd5d5d;line-height:1.5;font-size:.24rem;">额外收益</span></p></section>'+
              '</div>',
          btn:[{
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
        this.$store.dispatch('showLoading')
        service.serverRequest('bindOrgAcct',{
          'platFromNumber': this.orgNumber
        },(result) => {
          this.queryThirdBuyUrl();
        })
      },
      //获取第三方跳转路径
      queryThirdBuyUrl() {
        service.serverRequest('getOrgUserCenterUrl',{
          'orgNo' : this.orgNumber
        },(result)=>{
          if(result.orgNumber === "OPEN_XIAOYINGLICAI_WEB"){
            result.orgAccount = decodeURIComponent(result.orgAccount)
          }
           //对玖富做特殊处理
          if(this.orgNumber == 'OPEN_JIUFUQINGZHOU_WEB'){
          	this.getJiufuToken(result)
          	return;
          }
          this.formData = result;
          document.getElementById('form').setAttribute('action',result.orgUsercenterUrl)
          setTimeout(()=>{
            document.getElementById('form').submit();
          },20)
          Vue.popup.tipsContinue('正在跳转至' + this.platformInfo.orgName);
        })
      },
      //获取玖富的token
      getJiufuToken(res){
      	  service.serverRequest('jufuToken',(result)=>{
      	  	let url = `${res.orgUsercenterUrl}&token=${result.token}`
          	Vue.popup.tipsContinue('正在跳转至玖富轻舟');
      	  	window.location.href = url
      	  })
      },
      // 简介部分箭头点击事件
      contentShowEvent($event){
        this.isArrowDown = !this.isArrowDown
      },
      tabChange(index){
        if(this.tabIndex == index) return
        this.tabIndex = index
      },
      showPic(item){
        this.shadeSrc = item.orgPicture
        this.shadeShow()
      },
      shadeShow(){
        this.isShadeShow = true
      },
      shadeHide(){
        this.isShadeShow = false
      },
      call(tel){
        window.location.href = "tel:" + tel;
      },
      locationTeamInfo(){
        this.$router.push({path:'/teaminfo',query:{orgNumber:this.orgNumber}})
      }
    },
    watch:{
      arrowShow:{
        handler: function (val, oldVal) {},
        deep:true
      }
    },
    components:{
      Shade,
      swiper,
      swiperSlide,
      pullup,
      productItem,
      emptyTemp
    }
  }
</script>
<style scoped>
.platformDetail-container header {
  padding: .8rem .3rem .56rem;
  margin-bottom: .3rem;
  background: url('./images/header-bg.png') no-repeat left bottom;
  background-size: 100% auto;
}
.platformDetail-container header .top {
  display: flex;
}
.platformDetail-container header .left {
  flex: 0 0 1.7rem;
}
.platformDetail-container header .left img {
  width: 1.4rem;
}
.platformDetail-container header .right {
  flex: 1;
}
.platformDetail-container header .title {
  line-height: 1;
  display: flex;
}
.platformDetail-container header .title p {
  font-size: .32rem;
  color: #4f5960;
  margin-right: .3rem;
}
.platformDetail-container header .title b {
  display: flex;
}
.platformDetail-container header .year-rate {
  display: flex;
  line-height: 1;
  padding-top: .24rem;
}
.platformDetail-container header .year-rate p {
  font-size: .24rem;
  color: #999;
}
.platformDetail-container header .year-rate span {
  font-size: .24rem;
  color: #4f5960;
}
.platformDetail-container header .commission-level {
  display: flex;
  padding-top: .24rem;
  font-size: .24rem;
  color: #999;
}
.platformDetail-container header .commission-level p {
  display: inline-block;
}
.platformDetail-container header .commission-level p:first-child {
  padding-right: .3rem;
}
.platformDetail-container header .commission-level p:first-child span {
  color: #fd5d5d;
}
.platformDetail-container header .commission-level p:last-child span {
  color: #4f5960;
}
.platformDetail-container header .bottom {
  padding-top: .5rem;
  font-size: .28rem;
  color: #4f5960;
}
.platformDetail-container .account-wrapper {
  height: .8rem;
  background-color: #fff;
  display: flex;
  padding: 0 .3rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .3rem;
}
.platformDetail-container .account-wrapper .left {
  display: flex;
  line-height: 1;
  align-items: center;
}
.platformDetail-container .account-wrapper .left img {
  display: block;
  width: .45rem;
  height: .41rem;
}
.platformDetail-container .account-wrapper .left p {
  line-height: 1;
  font-size: .28rem;
  color: #4f5960;
  vertical-align: top;
  padding-left: .3rem;
}
.platformDetail-container .account-wrapper .right {
  padding-right: .3rem;
  line-height: 1;
  font-size: .28rem;
  color: #4f5960;
  vertical-align: top;
}
.platformDetail-container .intro-wrapper {
  overflow: hidden;
  background-color: #fff;
  margin-bottom: .3rem;
}
.platformDetail-container .intro-wrapper .tab-wrapper {
  display: flex;
  width: 100%;
  height: .8rem;
}
.platformDetail-container .intro-wrapper .tab-wrapper li {
  flex: 1;
}
.platformDetail-container .intro-wrapper .tab-wrapper li span {
  display: block;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  width: 1.2rem;
  line-height: 0.8rem;
  margin: 0 auto;
  border-bottom: 2px solid #fff;
  color: #6c6e6d;
  font-size: .28rem;
}
.platformDetail-container .intro-wrapper .tab-wrapper li.active span {
  color: #4e8cef;
  border-bottom: 2px solid #4e8cef;
}
.platformDetail-container .intro-wrapper .intro-content {
  color: #999;
  font-size: .24rem;
  line-height: 1.5;
}
.platformDetail-container .intro-wrapper .content-one-inner {
  max-height: 1rem;
  overflow: hidden;
  padding: 0 .3rem;
  margin: .3rem 0;
}
.platformDetail-container .intro-wrapper .content-one-inner.active {
  max-height: none;
}
.platformDetail-container .intro-wrapper .icon-arrow-wrapper{
  display: flex;
  height: .46rem;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f9f9f9;
  width: 100%;
}
.platformDetail-container .intro-wrapper .icon-arrow-wrapper img{
  width: .46rem;
  display: block;
  margin: 0 auto;
}
.platformDetail-container .intro-wrapper .content-two {
  padding: .3rem;
}
.platformDetail-container .intro-wrapper .content-two-item {
  display: flex;
  padding-bottom: .3rem;
  font-size: .24rem;
  color: #666;
}
.platformDetail-container .intro-wrapper .content-two-item p {
  flex: 0 0 1.45rem;
}
.platformDetail-container .intro-wrapper .content-two-item span {
  flex: 1;
  color: #999;
}
.platformDetail-container .intro-wrapper .content-two-item span a {
  display: inline;
  color: #4e8cef;
}
.platformDetail-container .intro-wrapper .content-three .content-three-title {
  line-height: 1;
  padding: .45rem .3rem .3rem;
  font-size: .28rem;
  color: #4f5960;
}
.platformDetail-container .intro-wrapper .content-three .content {
  padding: 0 .3rem;
  font-size: .24rem;
  color: #999;
}
.platformDetail-container .intro-wrapper .content-three .org-pic {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.platformDetail-container .intro-wrapper .content-three .org-pic li {
  flex: 0 0 33.333%;
  display: flex;
  height: 1.7rem;
  padding-bottom: .1rem;
  align-items: center;
  justify-content: center;
}
.platformDetail-container .intro-wrapper .content-three .org-pic li img {
  display: inline-flex;
  width: 95%;
  height: none;
}
.platformDetail-container .intro-wrapper .content-three .baseinfo-content {
  padding-bottom: .5rem;
}
.platformDetail-container .intro-wrapper .content-three .baseinfo {
  display: flex;
  padding-top: .2rem;
}
.platformDetail-container .intro-wrapper .content-three .baseinfo p {
  flex: 0 0 1.36rem;
  font-size: .24rem;
  color: #666;
  line-height: 1.5;
}
.platformDetail-container .intro-wrapper .content-three .baseinfo span {
  flex: 1;
  font-size: .24rem;
  color: #999;
  line-height: 1.5;
}
.platformDetail-container .intro-wrapper .content-three .baseinfo span a {
  color: #4e8cef;
  font-size: .24rem;
  line-height: 1.5;
}
.platformDetail-container .intro-wrapper .content-three .baseinfo.first {
  padding-top: 0;
}
.platformDetail-container .intro-wrapper .teaminfo-wrapper {
  height: .7rem;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}
.platformDetail-container .intro-wrapper .teaminfo-wrapper p {
  line-height: .7rem;
  text-align: center;
  font-size: .28rem;
  color: #4e8cef;
}
.platformDetail-container .intro-wrapper .teaminfo-wrapper p span::before {
  font-size: .28rem;
  color: #4e8cef;
}
.platformDetail-container .intro-wrapper .content-four .dynamic-item {
  padding: .3rem .3rem 0;
}
.platformDetail-container .intro-wrapper .content-four .dynamic-item a {
  display: block;
}
.platformDetail-container .intro-wrapper .content-four .dynamic-item h3 {
  font-size: .24rem;
  color: #666;
  line-height: 1.5;
  padding-bottom: .2rem;
}
.platformDetail-container .intro-wrapper .content-four .dynamic-item p {
  font-size: .24rem;
  color: #999;
  line-height: 1;
  padding-bottom: .3rem;
  border-bottom: 1px dashed #eaeaea;
}
.platformDetail-container .intro-wrapper .content-four .dynamic-item:last-child p {
  border-bottom: 0;
}
.platformDetail-container .orgActivitys-wrapper {
  height: 1.78rem;
  background-color: #fff;
  margin-bottom: .3rem;
}
.platformDetail-container .orgActivitys-wrapper div{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.platformDetail-container .orgActivitys-wrapper div a{
	display: block;
}
.platformDetail-container .orgActivitys-wrapper div img{
	width: 100%;
	height: 100%;
	display: block;
}
.platformDetail-container .orgActivitys-wrapper .swiper-container {
  height: 100%;
}
.platformDetail-container .orgActivitys-wrapper .swiper-slide img {
  height: 1.78rem;
}
.platformDetail-container .saleProduct-wrapper {
  background-color: #fff;
}
.platformDetail-container .saleProduct-wrapper h1 {
  font-size: .3rem;
  color: #585959;
  height: .66rem;
  line-height: .66rem;
  padding: 0 .3rem;
  border-bottom: 1px solid #e8e8e8;
}
</style>

<template>
  <div class="personal-content">
        <div class="personal-header">
          <img class="downloadIcon" src="../../../static/images/mine/mine_header_download_icon.png" @click="download">
          <router-link :to="{name : 'home'}"><img class="goHomeIcon" src="../../../static/images/mine/mine_header_goHome_icon.png"></router-link>
        </div>
        <div style="height:.72rem;background-color:#4e8cef;"></div>
        <div class="personal-account arrow">
            <a class="link-personal-account" @click="rankTongji">
                <img :src="userInfo.headImage">
                <div class="personal-account-info">
                    <p>{{userInfo.mobile}}</p>
                    <div class="personal-account-info-level">
                        <img :src="userInfo.cfgGradeIcon"><span>{{userInfo.cfgLevelName}}</span>
                    </div>
                    <img src="../../../static/images/normal/arrow_white.png">
                </div>
            </a>
        </div>
        <div class="myCfgAccount">
            <homeTitle name="貅比特账户"></homeTitle>
            <a class="myCfgAccount-info">
              <ul>
                <li>
                  <router-link to="mine/balance">
                    <p>余额(元)</p>
                    <p class="myCfgAccount-amount">{{userInfo.accountBalance | toThousands}}</p>
                  </router-link>
                </li>
                <li>
                  <p>本月收入(元)</p>
                  <p class="myCfgAccount-amount">{{userInfo.monthProfit | toThousands}}</p>
                </li>
              </ul>
            </a>
        </div>

         <div class="myInvestPlatform">
            <homeTitle name="投资平台"></homeTitle>
            <ul class="myInvestPlatform-info">
                <li>
                    <p>在投本金(元)</p>
                    <p class="myInvestPlatform-amount">{{investPlatformInfo.investingAmt | toThousands}}</p>
                </li>
                <li>
                    <p>在投收益(元)</p>
                    <p class="myInvestPlatform-amount">{{investPlatformInfo.investingProfit | toThousands}}</p>
                </li>
            </ul>
            <ul class="myInvestPlatform-tab">
                <li>平台</li><li>在投本金(元)</li><li>在投收益(元)</li>
            </ul>
            <ul class="myInvestPlatform-list" @click="platformTongji">
                <li v-for="(item, index) in platformInvestStatisticsList">
                   <div class="myInvestPlatform-item" @click="jumpOrgPersonCenter(index,item.orgNumber,item.orgName)">
                       <form id="form" :action="item.orgUsercenterUrl" method="post" accept-charset="utf-8" style="display: none">
                         <input id="orgAccount" type='hidden' name="orgAccount" :value="item.orgAccount"/>
                         <input id="orgKey" type='hidden' name="orgKey" :value="item.orgKey"/>
                         <input id="orgNumber" type='hidden' name="orgNumber" :value="item.orgNumber"/>
                         <input id="sign" type='hidden' name="sign" :value="item.sign"/>
                         <input id="timestamp" type='hidden' name="timestamp" :value="item.timestamp"/>
                         <input id="requestFrom" type='hidden' name="requestFrom" :value="item.requestFrom"/>
                       </form>
                       <span><img class="platformIcon" :src="item.platformLogo"></span>
                       <span class="investingAmt">{{item.investingAmt | toThousands}}</span>
                       <span class="investingProfit">{{item.investingProfit | toThousands}}</span>
                   </div>
                   <img class="go-arrow" src="../../../static/images/normal/arrow.png">
                </li>
            </ul>
        </div>

        <ul class="otherOperation">
            <router-link class="investRecord" :to="{name:'InvestRecord'}">
            <li><span>投资记录</span><img src="../../../static/images/normal/arrow.png"></li>
            </router-link>
            <a @click="invitedCfgTongji" class="invitedCfg">
            <li><span>邀请理财师</span><img src="../../../static/images/normal/arrow.png"></li>
            </a>
            <a class="helpCenter" @click='helpCenterTongji'>
            <li><span>帮助中心</span><img src="../../../static/images/normal/arrow.png"></li>
            </a>
        </ul>

         <div class="exit" @click="logout">退出登录</div>

         <p class="download-tips">提现、佣金明细、团队管理等更多高级功能,请下载APP体验</p>
         <form id="myForm" action="" method="post" accept-charset="utf-8" style="display: none" ref="buyform">
             <input id="orgAccount" type='hidden' name="orgAccount" v-model="formData.orgAccount"/>
             <input id="orgKey" type='hidden' name="orgKey" v-model="formData.orgKey"/>
             <input id="orgNumber" type='hidden' name="orgNumber" v-model="formData.orgNumber"/>
             <input id="sign" type='hidden' name="sign" v-model="formData.sign"/>
             <input id="timestamp" type='hidden' name="timestamp" v-model="formData.timestamp"/>
             <input id="requestFrom" type='hidden' name="requestFrom" v-model="formData.requestFrom"/>
         </form>
  </div>
  </template>
<script>
  import Vue from 'vue';
  import env from "../../resource/env";
  import service from "../../resource/service";
  import { environment } from './../../resource/config'
  import homeTitle from './../../components/title/title.vue'
  import comm from './../../common/common'

  export default {
    name:'mine',
    data (){
      return {
         userInfo:{
            mobile:'',
            headImage:'',
            cfgLevelName:'',
            cfgGradeIcon:'',
            accountBalance:'',
            monthProfit:''
         },
         investPlatformInfo:{
            investingAmt:'',
            investingProfit:''
         },
         formData:{},
         platformInvestStatisticsList:[]
      };
    },
    created(){
        var self = this;
        if(self.$route.query.tk){
            comm.setCookie("__token__",self.$route.query.tk,2);
        }
        //加载我的首页数据
        this.$store.dispatch('showLoading')
        service.serverRequest('minePage',(result)=>{
            comm.setCookie("__mobile__",result.mobile,2);
            //更新data中的数据同时对dom进行实时刷新
            self.userInfo = self.filterData(result);
        })

        //加载投资平台数据
        service.serverRequest('mineInvestPlatform',(result)=>{
            self.investPlatformInfo.investingAmt = result.investingAmt;
            self.investPlatformInfo.investingProfit = result.investingProfit;
            result.platformInvestStatisticsList.forEach(function(value,index,array){
                value.platformLogo = env.imgUrl + "/" + value.platformLogo + "?f=png";
                if (value.orgNumber == "OPEN_XIAOYINGLICAI_WEB") {
                   value.orgAccount = decodeURIComponent(value.orgAccount);
                }
            });
            self.platformInvestStatisticsList = result.platformInvestStatisticsList;
        })

        if(this.$route.query.code && this.$route.query.isPush){
            if(sessionStorage.getItem('__ISPUSHAPPID__') == null){
                sessionStorage.setItem('__ISPUSHAPPID__',true);
                service.serverRequest('saveWeiXinOpenId',{
                    code  : this.$route.query.code,
                    isPush: this.$route.query.isPush
                })
            }
        }

        service.serverRequest('activeToken',{
            token : comm.getCookie("__token__")
        });
    },

    methods:{
       //首页数据过滤
       filterData(datas){
           var filterDatas = {};
           filterDatas.cfgLevelName = "职级:" + datas.cfgLevelName;
           filterDatas.mobile = datas.mobile.substr(0,3) + "****" + datas.mobile.substr(7,4);
           filterDatas.headImage = env.imgUrl + "/" + datas.headImage + "?f=png";
           filterDatas.monthProfit = datas.monthProfit;
           filterDatas.accountBalance = datas.accountBalance;
           if (datas.cfgLevelName == "见习") {
               filterDatas.cfgGradeIcon = "../../../static/images/mine/mine_jianxi_icon.png";
           }else if(datas.cfgLevelName == "顾问")
           {
               filterDatas.cfgGradeIcon = "../../../static/images/mine/mine_guwen_icon.png";
           }else if(datas.cfgLevelName == "经理")
           {
               filterDatas.cfgGradeIcon = "../../../static/images/mine/mine_jingli_icon.png";
           }else
           {
               filterDatas.cfgGradeIcon = "../../../static/images/mine/mine_zongjian_icon.png";
           }

           return filterDatas;
       },

       //跳转对应机构
       jumpOrgPersonCenter(index,orgNumber,orgName){
            this.goPersonalCenterPage(orgNumber,orgName)
       },

      //下载处理
      download(){
        event.preventDefault();
        var self = this;
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'MYBU04', 'click']);
        }
        self.$router.push('/download/download')
      },

      rankTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'MYBU01', 'click']);
        }
        this.$router.push('/rank')
      },
      //邀请理财师
      invitedCfgTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'MYBU05', 'click']);
        }
        this.$router.push('/invite/invitePlanner')
      },
      helpCenterTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'MYBU06', 'click']);
        }
        this.$router.push('/commonProblem/commonProblem')
      },
      //退出登录
      logout(){
        var self = this;
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'MYBU03', 'click']);
        }

        Vue.popup.confirm({
            title: '',
            msg: '确定要退出登录吗?',
            cancelText: '取消', // 默认取消
            cancelCb: function(){
            },
            okText: '确认', // 默认确认
            okCb: function(){
                comm.setCookie("__mobile__",'',-1);
                comm.setCookie("__token__",'',-1);
                self.$router.push({name:'login'});
            }
        });
      },

      platformTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'MYBU02', 'click']);
        }
      },
      //获取第三方跳转路径
      goPersonalCenterPage(orgNumber,orgName){
        service.serverRequest('getOrgUserCenterUrl',{
          'orgNo' : orgNumber
        },(result)=>{
          if(orgNumber === 'OPEN_JIUFUQINGZHOU_WEB'){
            this.getJiufuToken(result)
            return;
          }
            if(result.orgNumber === "OPEN_XIAOYINGLICAI_WEB"){
                result.orgAccount = decodeURIComponent(result.orgAccount)
            }
            this.formData = result;
            document.getElementById('myForm').setAttribute('action',result.orgUsercenterUrl)
            setTimeout(()=>{
                document.getElementById('myForm').submit();
            },20)
            Vue.popup.tipsContinue('正在跳转至' + orgName);
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
    },
    components:{
        homeTitle
    }
}
</script>

<style scoped>
    .personal-content{
        position: relative;
        height: 100%;
    }
    .personal-header{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        height: 0.72rem;
        width: 100%;
        background-color: #4e8cef;
        border-bottom: 0.01rem solid #427bd6;
    }
    .personal-header .goHomeIcon{ position: absolute;height: 0.38rem;width: 0.40rem;right: 0.40rem;top: 0.16rem;}
    .personal-header .downloadIcon{display: block; position: absolute;height: 0.48rem;width: 0.48rem;right: 1.28rem;top: 0.12rem;}

    .personal-account{
        position: relative;
        height: 2.3rem;
        line-height: 2.3rem;
        width:100%;
        background-image: url('../../../static/images/mine/mine_header_account_bg_icon.png');
        background-size: 100% 50%;
        background-position:left bottom;
        background-color: #4e8cef;
        margin-bottom: 0.3rem;
    }

    .personal-account .link-personal-account>img
    {
        width:1.2rem;
        height: 1.2rem;
        margin-left: 0.3rem;
        border-radius: 0.6rem;
    }

    .personal-account-info{
        display: inline-block;
        height: 0.96rem;
        line-height: 0.96rem;
        margin-left: 0.16rem;
    }

    .personal-account-info>p{
        height: 0.4rem;
        line-height: 0.4rem;
        color: #ffffff;
        font-size: 0.32rem;
    }

    .personal-account-info-level{
        height: 0.5rem;
        width: 2.1rem;
        margin-top: 0.08rem;
        line-height: 0.50rem;
        border:0.01rem solid #3377e3;
        border-radius:25px;
        background-color: #3377e3;
        display: flex;
        align-items: center;
    }

    .personal-account-info-level>img
    {
        width:0.43rem;height: 0.34rem;
        margin-left: 0.08rem;
    }

    .personal-account-info-level>span
    {
        padding-left: 0.15rem;
        font-size: 0.28rem;
        color: #ffffff;
    }

    .personal-account-info>img
    {
        position: absolute;
        width: 0.16rem;
        height: auto;
        right: 0.3rem;
        top: 0.96rem;
    }


    /*我的貅比特账户*/
    .myCfgAccount{
        position: relative;
        width: 100%;
        height: 2.36rem;
        margin-bottom: 0.3rem;
        background-color: white;
    }
    .myCfgAccount-info{
        width:100%;
        height: 1.7rem;
    }
    .myCfgAccount-info>ul{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;;
    }
    .myCfgAccount-info>ul>li{
      position: relative;
      flex: 1;
    }
    .myCfgAccount-info>ul>li:after{
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        content: "";
        display: block;
        width: 0;
        height: .68rem;
        border-right: 1px solid #efefef;
    }
    .myCfgAccount-info>ul>li p:first-child{
        font-size: 0.24rem;
        color: #999;
        text-align: center;
    }
    .myCfgAccount-amount{
      margin-top: .2rem;
      font-size: 0.44rem;
      color: #fd5d5d;
      font-family: DINOTMedium;
      text-align: center;
      line-height: 1;
    }
    .myCfgAccount-info>ul>li:first-child>span{position:absolute;width:1px;height: 0.8rem;right:0px;top: 0.5rem; background-color: #f1f1f1;}
    .myCfgAccount-info>ul>li:last-child>img{position: absolute;width: 0.32rem;height: auto;right: 0.3rem;top: 0.64rem;}

    /*我的投资平台*/
    .myInvestPlatform{position: relative;width: 100%;margin-bottom: 0.3rem;background-color: white;margin-bottom: 0.3rem;}
    .myInvestPlatform-title{width:100%;height: 0.68rem;line-height: 0.68rem; border-bottom: 0.02rem solid #f1f1f1;}
    .myInvestPlatform-title>span{padding-left: 0.3rem;font-size: 0.32rem;color: #585959}
    .myInvestPlatform-info{
        display: flex;
        width:100%;
        height: 1.7rem;
        border-bottom: 1px solid #f1f1f1;
        align-items: center;
        justify-content: center;
    }
    .myInvestPlatform-info>li{
        position: relative;
        flex: 1;
        text-align: center;
    }
    .myInvestPlatform-info>li:after{
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        content: "";
        display: block;
        width: 0;
        height: .68rem;
        border-right: 1px solid #efefef;
    }
    .myInvestPlatform-info>li>p:first-child{font-size: 0.24rem;color: #999999}
    .myInvestPlatform-amount{
      margin-top: 0.25rem;
      font-size: 0.44rem;
      color: #fd5d5d;
        font-family: DINOTMedium;
    }
    .myInvestPlatform-info>li:first-child>span{position:absolute;width:0.02rem;height: 0.8rem;right:-0.08rem;top: 0.5rem; background-color: #f1f1f1;}
    .myInvestPlatform-info>li:last-child>img{position: absolute;width: 0.46rem;height: auto;right: 0.2rem;top: 0.6rem;}
    .myInvestPlatform-tab{display: flex;width:95%;height: 0.68rem;line-height: 0.68rem;background-color: white;border-bottom: 0.02rem solid #f1f1f1;}
    .myInvestPlatform-tab>li{flex: 1;padding-left: 0.3rem;text-align: left;font-size: 0.24rem;color: #999999}
    .myInvestPlatform-list>li{position: relative; width:100%;height: 1.1rem;line-height: 1.1rem;border-bottom: 0.02rem solid #f1f1f1;}

    .myInvestPlatform-item{
        width: 95%;
        height: 100%;
        display: flex;
        margin-left: 0.26rem;
    }
    .myInvestPlatform-item span{
        flex: 1;
        font-size: .28rem;
        color: #4f5960;
        font-family: DINOTMedium;
    }
    .myInvestPlatform-item span>img{
        width:1.6rem;
        height: .66rem;
    }
    .go-arrow{position: absolute; width: 0.32rem;height: auto; right: 0.3rem;top: 0.4rem;}

    /*其他功能*/
    .otherOperation{
        position: relative;
        width:100%;
        height: 3rem;
        background-color: #fff;
        margin-bottom: 0.3rem;
    }
    .investRecord{
        display: block;
        position: relative;
        height: 1rem;
        line-height: 1rem;
        padding-left: .3rem;
    }
    .investRecord li{
        border-bottom: 0.02rem solid #f1f1f1;
    }
    .invitedCfg{
        display: block;
        position: relative;
        height: 1rem;
        line-height: 1rem;
        padding-left: .3rem;
    }
    .invitedCfg li{
        border-bottom: 0.02rem solid #f1f1f1;
    }
    .helpCenter{
        display: block;
        position: relative;
        height: 1rem;
        line-height: 1rem;
        padding-left: .3rem;
    }
    .helpCenter li{
        border-bottom: 0.02rem solid #f1f1f1;
    }
    .otherOperation>li{position: relative; width: 100%;height: 1rem;line-height: 1rem; border-bottom: 0.02rem solid #f1f1f1;}
    .otherOperation li span{
        color: #333;
        font-size: .32rem;
    }
    .otherOperation li img{position: absolute; width:0.32rem;height: auto;right: 0.3rem;top: 0.38rem;}

    /*退出*/
    .exit{
        position: relative;
        display: block;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background-color: #fff;
        color: #fd5d5d;
        margin-bottom: 0.4rem;
        font-size: .32rem;
    }
    .download-tips{
        position: relative;
        padding: 0 .3rem .3rem;
        font-size: .24rem;
        color: #999;
        line-height: 1.5;
        text-align: center;
    }
</style>


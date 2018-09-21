<template>
  <div class="home-container" :style="{ visibility: isShow?'visible' : 'hidden' }">
    <div class="top-wrapper bottom-gap">
        <header>
          <!--<a @click="downloadTopTongji">
            <img src="../../../static/images/download-icon-white.png">
          </a>-->
          <router-link :to="isLogin?'/mine':'/login/login'">
            <img src="./mine.png">
          </router-link>
        </header>
        <div class="content" @click="understandLiecaiHandle">
          <div class="top">
            <a class="content-item">
              <img src="./controller.png">
              <p>专业风控</p>
            </a>
            <a class="content-item">
              <img src="./zero-thresold.png">
              <p>零门槛创业</p>
            </a>
            <a class="content-item">
              <img src="./high-income.png">
              <p>超高收益</p>
            </a>
          </div>
          <div class="know-more-wrapper">
            <a class="know-more">了解更多<span class="icon-right-double-arrow"></span></a>
          </div>
          <div class="all-commsion-wrapper">
            <h2 class="text">累计发放佣金(元)</h2>
            <p class="figure">{{commissionAmount}}<span>万</span></p>
            <p class="tip"><span class="icon-guarantee"></span>至今为止交易无风险</p>
          </div>
        </div>
    </div>
    <div v-if="!isLogin" class="register-wrapper">
      <p class="text">新手福利,<span>注册送528元红包</span></p>
      <a class="btn" @click="register">注册送528元</a>
    </div>
    <div ref="netLoan" class="net-loan-wrapper">
      <homeTitle name='网贷'></homeTitle>
      <div v-if="loanProductLists.length" class="net-loan-lists">
        <ProductList v-for="(loanProductList,index) in loanProductLists" :list="loanProductList" :key="index"></ProductList>
      </div>
      <div class="see-more">
        <a @click="moreProductList">
          查看更多<span class="icon-right-arrow"></span>
        </a>
      </div>
    </div>
    <div v-if="bannerLists.length" class="activity-wrapper">
      <homeTitle name='精彩活动'></homeTitle>
      <div class="activity-content" @click="bannerTongji">
         <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(bannerList,index) in bannerLists" :key="index">
              <a :href="bannerList.linkUrl"><img class="swiper-img" :src="bannerList.imgUrl"></a>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
      </div>
      <div class="bottom-gap"></div>
    </div>
    <!--<div class="footer-wrapper">
      <a href="tel:0755-86725461" @click="kefuTongji"><span class="icon-client"></span>联系客服</a>
      <a @click="bottomDownloadTongji"><span class="icon-download"></span>下载APP</a>
    </div>-->
  </div>
</template>
<script>
  import service from "./../../resource/service";
  import homeTitle from './title.vue'
  import ProductList from './../../components/productList/productList.vue'
  // require styles
  import 'swiper/dist/css/swiper.css'

  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  import { environment } from './../../resource/config'
  import  comm from  './../../common/common'
  export default{
    data(){
      return{
        commissionAmount:0,
        loanProductLists :[],
        bannerLists:[],
        isLogin:false,
        token: comm.getCookie("__token__"),
        isShow:false,
        swiperOption: {
          notNextTick: true,
          loop:true,
          autoplay: 2500,
          autoplayDisableOnInteraction:false,
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
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted(){
      this.$store.dispatch('showLoading')
      service.serverRequest('sysInfo',(result)=>{
        let commissionAmount = result.commissionAmount.split(',')
        commissionAmount = parseInt(commissionAmount.join('')/100)
        this.commissionAmount = commissionAmount / 100
      })

      this.$store.dispatch('showLoading')
      this.selectedProducts()

      service.serverRequest('advs',{advPlacement : 'product_banner',appType : 1},(result)=>{
        this.bannerLists = result.datas
      })

      if(this.token){
        this.isLogin = true;
      }

      if(this.$route.query.code && this.$route.query.isPush){
        if(sessionStorage.getItem('__ISPUSHAPPID__') == null){
          sessionStorage.setItem('__ISPUSHAPPID__',true);
          service.serverRequest('saveWeiXinOpenId',{
            code  : this.$route.query.code,
            isPush: this.$route.query.isPush
          })
        }
      }
      setTimeout(()=>{
        this.isShow = true;
      },20)
    },
    methods:{
      selectedProducts(){
        service.serverRequest('selectedProducts',{
          limitNumber:10
        },(result)=>{
          for(let i=0;i<result.datas.length;i++){
            result.datas[i].tongjiId = 'FPBU0' + (5 + i)
          }
          this.loanProductLists = result.datas;
        })
      },
      understandLiecaiHandle(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'FPBU02', 'click']);
        }
        this.$router.push({name:'understand'})
      },
      downloadTopTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'FPBU01', 'click']);
        }

        this.$router.push('/download/download')
      },
      register(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'FPBU03', 'click']);
        }
        this.$router.push('/register/register')
      },
      moreProductList(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'FPBU04', 'click']);
        }
        this.$router.push('/product/list')
      },
      bannerTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'FPBU12', 'click']);
        }
      },
      kefuTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'FPBU13', 'click']);
        }
      },
      bottomDownloadTongji(){
        if(environment === 'produce' && window._hmt){
          _hmt.push(['_trackEvent', 'FPBU14', 'click']);
        }
        this.$router.push('/download/download')
      }
    },
    components:{
      homeTitle,
      ProductList,
      swiper,
      swiperSlide
    }
  }
</script>

<style lang='less' scoped>
  @import './style.less';
</style>

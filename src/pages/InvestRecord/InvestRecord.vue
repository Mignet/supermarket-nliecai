<template>
	<div class="recordContainer">
       <div class="header-tab">
       	   <div class="investingProductItem" @click="clickInvestingProduct"><span :class="investingProductItemClassName">在投产品</span><span></span></div>
       	   <div class="expiredProductItem" @click="clickExpiredProduct"><span :class="expiredProductItemClassName">已到期产品</span></div>
       </div>
      
      <div class="investingProduct" v-if="showInvestingProductItem">
	      <scroll class="wrapper"
	        :data="investingProductList"
			:pulldown='investingProductPulldown'
			@pulldown = 'initData'
			:pullup = 'investingProductPullup'
			@scrollToEnd = 'loadData'
            :isLoadingEnd = 'loadingEnd'
            :isLoading = 'isLoading'
            v-if="showInvestingProductList"
            >
		      <ul class="investingProductList">
		           <li v-for='item in investingProductList'>
		           	     <div class="investRecordHeaderInfo">
		           	     	<div><span class="agentName">{{item.productName}}</span><img class="agent-icon" :src="item.platformlistIco"></div>
		           	     	<div><span>{{item.startTime}}</span><img :src="item.flagIcon" class="productRedemption-flag-icon"  v-show="item.showReback"></div>
		           	     </div>
		           	     <div class="middle_seperator_line"></div>
		           	     <ul class="investRecordInfo">
		           	     	<li><span>投入本金(元)</span><span class="value">{{item.investAmt}}</span</li>
		           	     	<li><span >预期收益(元)</span><span class="value">{{item.profit}}</span></li>
		           	     	<li><span >预期到期时间</span><span class="value expiredTime">{{item.endTime}}</span></li>
		           	     </ul>
		           </li>
		      </ul>
	      </scroll>
          <div class="empty-product-list"  v-show="investingProductList.length <= 0">
              暂无在投产品记录
          </div>
      </div>

      <div class="expiredProduct"  v-else>
      	<scroll class="wrapper"
          :data="expiredProductList"
          :pulldown='expiredProductPulldown'
          @pulldown = 'initData'
          :pullup = 'expiredProductPullup'
          @scrollToEnd = 'loadData'
          :isLoadingEnd = 'loadingEnd'
          :isLoading = 'isLoading'
          v-if="showExpiredProductList"
      >

	      	<ul class="investingProductList">
	      	   <li v-for='item in expiredProductList'>
	           	     <div class="investRecordHeaderInfo">
	           	     	<div><span class="agentName">{{item.productName}}</span><img class="agent-icon" :src="item.platformlistIco"></div>
	           	     	<div><span>{{item.startTime}}</span><img :src="item.flagIcon" class="productRedemption-flag-icon" v-show="item.showReback"></div>
	           	     </div>
	           	     <div class="middle_seperator_line"></div>
	           	     <ul class="investRecordInfo">
	           	     	<li><span>投入本金(元)</span><span class="value">{{item.investAmt}}</span</li>
	           	     	<li><span >预期收益(元)</span><span class="value">{{item.profit}}</span></li>
	           	     	<li><span >预期到期时间</span><span class="value expiredTime">{{item.endTime}}</span></li>
	           	     </ul>
	           </li>
	        </ul>

        </scroll>

         <div class="empty-product-list" v-show="expiredProductList.length <= 0">
              暂无到期产品记录
          </div>
      </div>
	</div>
</template>
<script>
    import scroll from './../../components/scroll/scroll.vue';
    import env from "../../resource/env";
    import service from "../../resource/service";

	export default{
        name:'investRecord',
        data (){
        	return { 
                loadingEnd:false,
                isLoading:false,
                investRecordType:'0',
                investingProductPageIndex:'1',
                expiredProductPageIndex:'1',
                loadingInvestingProductEnd:false,
                loadingExpiredProductEnd:false,
                investingProductPulldown:true,
                expiredProductPulldown:true,
				investingProductPullup:true,
				expiredProductPullup:true,
                investingProductItemClassName:'selected',
                showInvestingProductItem:true,
                expiredProductItemClassName:'',
                investingProductList:[],
                expiredProductList:[],
                showInvestingProductList:true,
                showExpiredProductList:true
        	};
        },
        created (){

        	var self = this;

            if(self.$route.query.tk){  
               comm.setCookie("__token__",self.$route.query.tk,2); 
            }
            self.initData();
        },
        methods:{

        	//第一次加载数据
        	initData(){

                var self = this;
              
                if (self.investRecordType == "0") {

        			self.investingProductPageIndex  = "1";
        			self.loadingInvestingProductEnd = false;
        		}else 
        		{
        			self.expiredProductPageIndex = "1";
        			self.loadingExpiredProductEnd = false;
        		}

        		//获取在投产品列表数据
                this.$store.dispatch('showLoading')
	            service.serverRequest("mineInvestingProductRecord",{
	            	investType:self.investRecordType,
	            	pageIndex:self.investRecordType == "0"?self.investingProductPageIndex:self.expiredProductPageIndex,
	            	pageSize:'30'
	            }, (result)=>{
	               self.filterDatas(result,true);

                   //滑块下移处理
                   window.scrollTo(0,0);
	           });
        	},
            
        	//请求网络数据
        	loadData(){

        		var self = this;

        		if (self.investRecordType == "0") {

        			if (self.loadingInvestingProductEnd) {
        				return;
        			}
        			self.investingProductPageIndex ++;
        		}else 
        		{
        			if (self.loadingExpiredProductEnd) {
        				return;
        			}
        			self.expiredProductPageIndex ++;
        		}

        		//获取在投产品列表数据
	            service.serverRequest("mineInvestingProductRecord",{

	            	investType:self.investRecordType,
	            	pageIndex:self.investRecordType == "0"?self.investingProductPageIndex:self.expiredProductPageIndex,
	            	pageSize:'30'
	            }, (result)=>{
	 
	                self.filterDatas(result, false);

	                if (self.investRecordType == "0" && self.investingProductPageIndex >= result.pageCount) {
	                	self.loadingInvestingProductEnd = true;
	        		}else if(self.expiredProductPageIndex >= result.pageCount){
	        			self.loadingExpiredProductEnd = true;
	        		}
	            });
        	},
            
            //tab切换
            clickInvestingProduct(){
                if (this.investingProductItemClassName === 'selected') return
                this.investingProductItemClassName = "selected";
                this.expiredProductItemClassName = "";
                this.showInvestingProductItem = true;
                this.investRecordType = "0";
                this.isLoading = false;
                this.loadingEnd = false;
                this.initData();
            },
            clickExpiredProduct(){
                if(this.expiredProductItemClassName ===  "selected") return
            	this.investingProductItemClassName = "";
                this.expiredProductItemClassName = "selected";
                this.showInvestingProductItem = false;
                this.investRecordType = "1";
                this.isLoading = false;
                this.loadingEnd = false;
                this.initData();
            },

            //数据过滤
            filterDatas (result, firstInit){
                if (this.investRecordType == "0") {
                   this.investingProductPageIndex = result.pageIndex;
                   result.datas.forEach(function(value, index, array){
                        value.platformlistIco = env.imgUrl + "/" + value.platformlistIco + "?f=png";
                        value.startTime = "投资时间: " + value.startTime;
                        value.flagIcon = value.canRedemption == "0"?"":"../../../static/images/mine/mine_reback_icon.png";
                        value.showReback = value.canRedemption == "0"?false:true;
                   });

                   if (firstInit) {

                   	    this.investingProductList = result.datas;

                        if (result.datas.length <= 0) {
                            this.showInvestingProductList = false;
                            this.isLoading = false;
                            return;
                        }
                   }else{
                      this.investingProductList = this.investingProductList.concat(result.datas);
                   }
                }else {
                   this.expiredProductPageIndex = result.pageIndex;
                   result.datas.forEach(function(value, index, array){
                        value.platformlistIco = env.imgUrl + "/" + value.platformlistIco + "?f=png";
                        value.startTime = "投资时间: " + value.startTime;
                        value.flagIcon = value.canRedemption == "0"?"":"../../../static/images/mine/mine_reback_icon.png";
                        value.showReback = value.canRedemption == "0"?false:true;
                   });
                   if (firstInit) {
                   	   this.expiredProductList = result.datas;

                      if (result.datas.length <= 0) {
                            this.showExpiredProductList = false;
                            this.isLoading = false;
                            return;
                        }
                   }else{
                     this.expiredProductList = this.expiredProductList.concat(result.datas);
                   }
                }

                this.isLoading = true;

                if(this.investRecordType == "0"){
                    if(this.investingProductList.length >= result.totalCount){
                        this.loadingEnd = true;
                    }
                }else{
                    if(this.expiredProductList.length >= result.totalCount){
                        this.loadingEnd = true;
                    }
                }
            }
        },
        components:{
        	scroll
        }
	}
</script>
<style scoped>

    .recordContainer{width:100%;height: 100%;}

	.header-tab{position: fixed;top: 0px;z-index: 1000;width:100%;height: 0.9rem;background-color: white;border-bottom: 0.01rem solid #f1f1f1;clear: both;}
	.investingProductItem{display: inline-block;position: relative;width:50%;height: 0.9rem;line-height: 0.9rem;text-align: center;vertical-align: middle;}
	.investingProductItem span{font-size: 0.28rem;color: #4f5960}
	.investingProductItem span.selected{font-size: 0.28rem;color: #4e8cef}
	.investingProductItem span:last-child{position: absolute; width: 0.02rem;height: 0.6rem;background-color: #f1f1f1;right: 0px;top: 0.16rem;}
	.expiredProductItem{display: inline-block;float: right;width: 50%;height: 0.9rem;line-height: 0.9rem;text-align: center;}
	.expiredProductItem span.selected{font-size: 0.28rem;color: #4e8cef}

	/*产品项*/
	.investingProduct{position: absolute; width: 100%;height: 100%;top: 1rem;padding-bottom: 1.2rem;}
    .empty-product-list{position: absolute;width: 100%;height:100%;top:0.1rem; padding-bottom: 1.2rem; display: -webkit-box;
     -webkit-box-orient: horizontal;
     -webkit-box-pack: center;
     -webkit-box-align: center;
  
     display: -moz-box;
     -moz-box-orient: horizontal;
     -moz-box-pack: center;
     -moz-box-align: center;
  
     display: -o-box;
     -o-box-orient: horizontal;
     -o-box-pack: center;
     -o-box-align: center;
  
     display: -ms-box;
     -ms-box-orient: horizontal;
     -ms-box-pack: center;
     -ms-box-align: center;
  
      display: box;
      box-orient: horizontal;
      box-pack: center;
      box-align: center;}
	.investingProductList{position: relative;}
	.investingProductList li{margin:0.2rem; background-color: white;border-radius: 0.1rem;}
	.investRecordHeaderInfo{
        width:100%;
        height: 1.24rem;
    }
	.agent-icon{
        float: left;
        margin-top: .21rem;
        height: 0.48rem;
        width: 1.44rem;
        margin-left: 0.2rem;
    }
	.agentName{
        display: inline-block;
        width: 3.87rem;
        margin-left: 0.2rem;
        margin-top: 0.34rem;
        margin-bottom: .13rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.24rem;
        color: #999;
        line-height: 1;

    }
	.investRecordHeaderInfo div:last-child{
        margin-top: .14rem;
    }
	.investRecordHeaderInfo div:last-child>span{margin-left: 0.3rem; font-size: 0.22rem;color: #999999}
	.productRedemption-flag-icon{float:right;width: 0.74rem;height: 0.28rem; margin-right: 0.28rem;}
	.middle_seperator_line{margin-left: 0.2rem;margin-right: 0.2rem;margin-top: 0.2rem; height: 0.02rem;border-bottom: 0.02rem dotted #f1f1f1}
    .investRecordInfo{
        padding: .1rem 0;
    }
	.investRecordInfo li{position: relative; margin-left: 0.3rem;margin-right: 0.2rem;margin-top: 0.2rem;}
    .investRecordInfo li span:first-child{
        font-size: .28rem;
        color: #999;
        line-height: .32rem;
    }
	.investRecordInfo li:nth-child(2){margin-top: 0.2rem;}
	.investRecordInfo li:nth-child(3){
        margin-top: 0.2rem;
    }
  .investRecordInfo .value{
    position: absolute;
    right: 0.1rem;top: 0.04rem;
    font-size: 0.32rem;
    color: #4f5960;
    font-family: DINOTMedium;
    }
  .investRecordInfo .expiredTime{color: #fd5d5d}

  .expiredProduct{position: absolute; width: 100%;height: 100%;top: 1.0rem;padding-bottom: 1.2rem;}
</style>
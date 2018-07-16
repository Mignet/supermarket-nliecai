<template>
	<div class="account-wrapper">
        <div class="account-balance clearfix">
        	<div class="balance">
        		<h3>账户余额（元）</h3>
        		<p>{{account.accountBalance}}</p>
        	</div>
        	<div class="widthdraw">
        		<a @click="download()">提现</a>
        	</div>
        </div>

        <div class="account-income">
        	<div class="all-income clearfix">
        		<p>累计收益(元)：<span>{{account.totalProfix}}</span></p>
        		<p><img src="../../../static/images/normal/question_icon.png" @click="download()"></p>
        	</div>
        	<ul>
        		<li v-for="item in items" @click="download()">
        			<div class="income-left">
        				<p>{{item.monthDesc}}<span v-show="item.grantDesc">（{{item.grantDesc}}）</span></p>
        				<p>总计(元)：{{item.totalAmount}}</p>
        			</div>
        			<div class="income-right arrow">
        				<a>明细</a>
        			</div>
        		</li>
        	</ul>
        </div>
	</div>
</template>

<script>     
  import Vue from 'vue'
	import service from '../../resource/service';
	export default {
	   data(){
          return {
          	account: {},
          	items  : []
          }
	   },
     created(){
			service.serverRequest('account',(result)=>{
               this.account = result;
			});

			service.serverRequest('monthProfixTotalList',(result)=>{
               this.items = result.datas;
			});
     },
       methods:{
	       download(){
		        Vue.popup.show({
			        title: '温馨提示',
			        msg  : '进入提现、收益明细、个人中心等更多操作，请下载APP体验完整版',
			        btn : [{
			          name: '取消',cb : function(){this.close()}
			        },{
			          name: '去下载',cb : function(){
			             this.close();
			             //location.hash = '/download/download';
                   this.$router.push('/download/download')
			          }
			        }]
		        }) 	       	
	       }
       }
	}
</script>

<style scoped>
	.account-balance{
		height:1.45rem;
		background-color: #fff;
		padding:0 .25rem 0 .4rem;
	}

	.account-balance .balance{
      float: left;
	}

	.account-balance .balance h3{
	  margin-top:.25rem;
	  font-size: .25rem;
      color:#969696;
	}

	.account-balance .balance p{
      font-size: .5rem;
      color:#12b7f5;
	}

	.account-balance .widthdraw{
      float: right;
	  height:1.45rem;  
	  line-height: 1.45rem;
	  text-align: right;    
	}

	.account-balance .widthdraw a{
	   display: inline-block;
       font-size: .29rem;
       color:#fff;
       background-color:#12b7f5;   
       height:.63rem;
       line-height:.63rem;
       width:1.25rem;
       text-align: center;
       border-radius: 5px;
	}	

    .account-income{
    	background-color: #fff;
    	margin:.25rem 0;
    }

    .account-income .all-income{
    	height: 1.08rem;
		padding:0 .25rem 0 .4rem;    	
    }

    .account-income .all-income p:first-child{
       float:left;
       height: 1.08rem;
       line-height:  1.08rem;
       font-size: .31rem;
       color:#969696;
    }

    .account-income .all-income p:first-child span{
       font-size: .31rem;    	
       color:#323232;
    }

    .account-income .all-income p:last-child{
       float:right;
       height: 1.08rem;
       line-height:  1.08rem;       
    }

    .account-income .all-income p:last-child img{
       width:.42rem;
       vertical-align: middle;
    }
    .account-income li{
    	height:1.45rem;
    	border-top:1px solid #dcdcdc;
    }

    .account-income .income-left{
    	float: left;
    	height:100%; 
    	padding: .2rem 0 .2rem .4rem;   	
    }

    .account-income .income-left p:first-child{
    	font-size: .31rem;
      color:#646464;	
    }

    .account-income .income-left p:first-child span{
    	font-size: .25rem;
        color:#969696;	
    }

    .account-income .income-left p:last-child{
    	font-size: .33rem;
        color:#969696;	
    }

    .account-income .income-right{
    	float: right;
    	height:1.45rem;   
    	line-height: 1.45rem; 
    	margin-right:.25rem;	
    }   

    .account-income .income-right a{
    	font-size: .25rem;
    	padding-right:.3rem;
      line-height: 1.46rem;
    } 
</style>
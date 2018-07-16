<template>
	<div class="invite-wrapper">
		<div class="tips-wrapper">
			点击右上角选择分享好友
		</div>
	    <div class="wraper">
			<div><img src="../../../static/images/invite/banner.jpg"></div>
			<div><img src="../../../static/images/invite/1.jpg"></div>
			<div><img src="../../../static/images/invite/2.jpg"></div>
			<div><img src="../../../static/images/invite/3.jpg"></div>
			<router-link :to="{name:'rank'}"><img src="../../../static/images/invite/4.jpg"></router-link>
			<div><img src="../../../static/images/invite/5.jpg"></div>
			<div><img src="../../../static/images/invite/6.jpg"></div>
			<div class="list-container">
				<div class="list-wrapper">
					<div class="title"><span>{{showMonth}}</span>月邀请奖励排行榜</div>
					<div id="list" class="list" v-for="item in rankList">
						<div class="list-item">
							<p v-if="item.showRankImageIcon"><img :src="item.rankImageIcon"></p>
							<p v-else>{{item.rank}}</p>
							<p>{{item.mobile}}</p>
							<p><span>{{item.totalProfit}}</span><b>元</b></p>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>       
</template>

<script>
	import service from '../../resource/service';
	import Env     from '../../resource/env';
	import Layer   from '../../components/layer/layer';	
	import util    from '../../common/util';
	import share   from '../../common/share';
	export default{
	  data(){
	  	return{
	  	   showMonth:'',
           rankList:[],
           inviteData:{}
	  	};
	  },
      created(){
      	    this.showMonth = util.getPreMonth();
			service.serverRequest('invitedPlannerRank',(result)=>{
				this.rankList = result.datas;
				result.datas.forEach(function(value,index,array){
					if (value.rank == "1") {
                        value.rankImageIcon = "../../../static/images/invite/first-icon.png";
                        value.showRankImageIcon = true;
					}else if(value.rank == "2"){
                        value.rankImageIcon = "../../../static/images/invite/second-icon.png";
                        value.showRankImageIcon = true;
					}else if(value.rank == "3"){
						value.rankImageIcon = "../../../static/images/invite/third-icon.png";
						value.showRankImageIcon = true;
					}else{
						value.showRankImageIcon = false;
					}
				});
			}),

			//获取邀请的数据
			service.serverRequest('invitePlanner',(result) =>{
                share(result.shareContent);
			})
      },
      methods:{
            recommand(){
            	this.content.status = true;
            	this.content.tip = '请点击右上角将本链接发送给指定朋友或分享到朋友圈';
            }
      },
      components:{
		    Layer
      }
	}	
</script>

<style scoped>
.tips-wrapper{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: .75rem;
	font-size: .26rem;
	color: #4f5960;
	text-align: center;
	line-height: .75rem;
	background-color: #fff9d9;
	z-index: 600;
}
.invite-wrapper{
	width:100%;
	height: 100%;
}
.wraper{
	margin-top: .75rem;
}
.list-container{
	width: 100%;
	box-sizing: border-box;
	padding:0 0.1656rem;
	background-color: #347ae4;
	padding-bottom: 0.41952rem;
}
.list-wrapper{
	width: 100%;
	background-color: #fff;
	padding-top: .4rem;
	padding-bottom: .8rem;
	overflow: hidden;
	border-radius: 5px;
}
.list-wrapper .title{
	width: 5.5rem;
	height: 0.67rem;
	line-height: 0.36432rem;
	display: flex;
	align-items:center;
	justify-content:center;
	background: url('../../../static/images/invite/title-4.png') no-repeat center;
	background-size: 100% 100%;
	margin: 0 auto;
	font-size: 0.42rem;
	color: #fff;
	letter-spacing: 2px;
}

.list-wrapper .title>span:first-child{

	padding-top: 0.08rem;
}

.list-wrapper .list{
	padding: 0 0.1656rem;
	margin-top: 0.2rem;
}


.list-item{
	display: flex;
	width:100%;
	padding-top: 0.276rem;
}

.list-item >p>img{
	width:0.39rem;
	height: 0.51rem;
}

.list-item > p{
	height: 0.28704rem;
}
.list-item > p:first-child{
	flex: 1;
	width:0.49128rem;
	font-size: 0.3rem;
	color: #2f3136;
	text-align: center;
}

.list-item > p:nth-of-type(2){
	flex: 2.5;
	width: 1.58424rem;
	font-size: 0.3rem;
	color: #2f3136;
	letter-spacing: 1px;
	text-align: center;
}
.list-item > p:last-child{
	flex: 1.5;
	width: 1.41312rem;
	color: #4e8cef;
	text-align: right;
	padding-right: 0.3rem;

}
.list-item > p:last-child span{
	font-family: "DINOTMedium";
	font-size: 0.36rem;
}
.list-item > p:last-child b{
	font-weight: normal;
	font-size: 0.24rem;
	padding-top: 0.04416rem;
}
</style>
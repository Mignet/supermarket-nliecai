<template>
	<div class="rank-container">
		<header v-if="token">
			<div class="one clearfix">
				<div class="logo-container" :class="rankClass"></div>
				<p class="text" v-if="token">本月职级:{{mineInfo.jobGradeDesc}}</p>
				<router-link to="/privilege" class="instruction">特权说明</router-link>
			</div>
			<div v-if="token" class="two clearfix">
				<p>{{mineInfo.cfpLevelContent}}</p>
				<span>(每天2:00更新数据)</span>
			</div>
			<div v-if="token" class="three">
				<div class="year-rate three-item">
					<p class="title">个人年化业绩</p>
					<p class="progress-wrapper">
						<span class="text">{{moneyNumber}}元</span>
						<span class="progress">
							<b :style="{width:moneyPercent}">
								<i class="dot"></i>
							</b>
						</span>
					</p>
					<p class="end">{{mineInfo.yearpurAmountMaxNew}}<span>元</span></p>
				</div>
				<div class="year-people three-item" v-show="needPlanner">
					<p class="title">直接下级理财师</p>
					<p class="progress-wrapper">
						<span class="text">{{mineInfo.lowerLevelCfpActualNew}}人</span>
						<span class="progress">
							<b :style="{width:peoplePercent}">
								<i class="dot"></i>
							</b>
						</span>
					</p>
					<p class="end">{{mineInfo.lowerLevelCfpMaxNew}}<span>名{{mineInfo.lowerLevelCfp}}</span></p>
				</div>
			</div>
		</header>
		<div class="tab-wrapper">
			<div class="tab">
				<h3 :class='jianxiClass' @click='jianxiShow'>见习</h3>
				<span :class="jianxiLine"></span>
				<h3 :class="guwenClass" @click="guwenShow">顾问</h3>
				<span :class='guwenLine'></span>
				<h3 :class='jingliClass' @click='jingliShow'>经理</h3>
				<span :class='jingliLine'></span>
				<h3 :class="zongjianClass" @click='zongjianShow'>总监</h3>
			</div>
		</div>
		<div v-if="mineInfo" class="arrow-wrapper">
			<p :style="{'marginLeft':arrowleft + 'rem'}"></p>
		</div>
		<div class="select-wrapper">
			<div class="select">
				<h2 class="title">尊享权益</h2>
				<swiper :options="swiperOption" ref="mySwiper">
				    <swiper-slide class="swiper-no-swiping">
				    	<slide rank='1'></slide>	
				    </swiper-slide>
				    <swiper-slide class="swiper-no-swiping">
				    	<slide rank='2'></slide>
				    </swiper-slide>
				    <swiper-slide class="swiper-no-swiping">
				    	<slide rank="3"></slide>
				    </swiper-slide>
				    <swiper-slide class="swiper-no-swiping">
				    	<slide rank="4"></slide>
				    </swiper-slide>
				  </swiper>
			</div>
		</div>
	</div>
</template>
<script>
	import service from './../../resource/service'
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import slide from './slide.vue'

	const normalClass = 'normal'
	const unactiveClass = ''
	const activeClass = 'active'
	const initLeft = .37
	const lineWidth = .72
	const itemWidth = 1.1
	export default {
		data(){
			return {
				mineInfo:{},
				rankClass:'jianxi',
				moneyPercent:0,
				moneyNumber:0,
				progressTimer:null,
				peoplePercent:0,
				jianxiClass:"",
				guwenClass:"",
				jingliClass:"",
				zongjianClass:"",
				jianxiLine:"",
				guwenLine:"",
				jingliLine:"",
				arrowleft:initLeft,
				needPlanner:false,
				swiperOption: {
			        notNextTick: true,
			        direction : 'horizontal',
			        grabCursor : true,
			        setWrapperSize :true,
			        autoHeight: true,
			        observer:true,
			        observeParents:true
			      }
			}
		},
		computed:{
			token(){
				return this.$store.state.token
			},
			swiper() {
			  return this.$refs.mySwiper.swiper
			}
		},
		created(){
			if(this.token){
				this.requestInfo()
			}else{
				this.rankClass = 'jianxi'
				this.jianxiClass = activeClass;
				this.jianxiLine = activeClass;
			}
		},
		destroyed(){
			clearInterval(this.progressTimer)
		},
		methods:{
			requestInfo(){
				service.serverRequest('rankInfo',{
					token:this.token
				},(result)=>{
					this._requestManage(result)
					this.mineInfo = result
				});		
			},
			_requestManage(result){
				let percent = 0;
				let start = 0;
				let step = 20;
				let truePercent = 0;
				let trueNumber = 0;
				switch(result.jobGrade){
					case "TA" : 
						this.rankClass  = 'jianxi';
						this.jianxiClass = activeClass;
						this.jianxiLine = activeClass;
						this.swiper.slideTo(0, 1000, false)
					break;
					case "SM1" : 
						this.rankClass = 'guwen';
						this.jianxiClass = normalClass;
						this.jianxiLine = activeClass;
						this.guwenClass = activeClass;
						this.arrowleft = initLeft + lineWidth + itemWidth
						this.swiper.slideTo(1, 1000, false)
					break;
					case  "SM2" : 
						this.rankClass = 'jingli';
						this.jianxiClass = normalClass;
						this.jianxiLine = activeClass;
						this.guwenClass = normalClass;
						this.guwenLine = activeClass;
						this.jingliClass = activeClass
						this.arrowleft = initLeft + lineWidth *2 + itemWidth * 2
						this.needPlanner = true;
						this.swiper.slideTo(2, 1000, false)
					break;
					case 'SM3' :
						this.rankClass = 'zongjian';
						this.jianxiClass = normalClass;
						this.jianxiLine = activeClass;
						this.guwenClass = normalClass;
						this.guwenLine = activeClass;
						this.jingliClass = normalClass
						this.jingliLine = activeClass;
						this.zongjianClass = activeClass
						this.arrowleft = initLeft + lineWidth *3 + itemWidth * 3
						this.needPlanner = true;
						this.swiper.slideTo(3, 1000, false)
					break;
				}
				this.peoplePercent = parseInt(result.lowerLevelCfpActualNew /result.lowerLevelCfpMaxNew * 100)
				if(parseFloat(result.yearpurAmountActualNew) >= parseFloat(result.yearpurAmountMaxNew)){
					percent = 100;
				}else{
					percent = parseInt(result.yearpurAmountActualNew /result.yearpurAmountMaxNew * 100) 
				}
				let gap = parseInt(percent / step)
				let gap2 = parseInt(result.yearpurAmountActualNew /step)

				this.progressTimer = setInterval(()=>{
					step --;
					truePercent += gap;
					trueNumber += gap2;
					this.moneyPercent = truePercent + '%';
					this.moneyNumber = trueNumber
					if(truePercent >= 100 || step <= 0){
						this.moneyPercent = percent + '%';
						this.moneyNumber = result.yearpurAmountActualNew;
						clearInterval(this.progressTimer)
					}
				},75)
			},
			jianxiShow(){
				this.swiper.slideTo(0, 1000, false)
				this.arrowleft = initLeft
			},
			guwenShow(){
				this.swiper.slideTo(1, 1000, false)
				this.arrowleft = initLeft + lineWidth + itemWidth
			},
			jingliShow(){
				this.swiper.slideTo(2, 1000, false)
				this.arrowleft = initLeft + lineWidth * 2 + itemWidth * 2
			},
			zongjianShow(){
				this.swiper.slideTo(3, 1000, false)
				this.arrowleft = initLeft + lineWidth*3 + itemWidth * 3
			}
		},
		components:{
			swiper,
			swiperSlide,
			slide
		}
	}
</script>
<style scoped lang='less'>
	header{
		background-color: #4e8cef;
		padding: .6rem 0;
		.one{
			position: relative;
			.logo-container{
				float: left;
				width: 1.14rem;
				height: .95rem;
				background-repeat: no-repeat;
				background-position: center;
				background-size: 100% 100%;
				margin-left: .2rem;
			}
			.jianxi{
				background-image: url('./rank_logo_1.png');
			}
			.guwen{
				background-image: url('./rank_logo_2.png');
			}
			.jingli{
				background-image: url('./rank_logo_3.png');
			}
			.zongjian{
				background-image: url('./rank_logo_4.png');
			}
			.text{
				float: left;
				padding-left: .2rem;
				line-height: .95rem;
				font-size: .28rem;
				color: #fff;
			}
			.instruction{
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				float: right;;
				width: 1.38rem;
				height: .42rem;
				background-color: #3a69b3;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: .24rem;
				border-top-left-radius:.21rem;
				border-bottom-left-radius:.21rem;
			}
		}
		.two{
			padding: .5rem .3rem 0;
			p{
				float: left;
				font-size: .28rem;
				color: #fff;
				font-weight: bold;
			}
			span{
				float: right;
				font-size: .2rem;
				color: #fff;
				opacity: .5;
				line-height: .28rem;
			}
		}
		.three{
			padding: .1rem .3rem 0;
			.three-item{
				display: flex;
				.title{
					padding-top: .54rem;
					flex:0 0 2rem;
					font-size: .22rem;
					color:	rgba(255,255,255,.8);
				}
				.progress-wrapper{
					flex: 0 0 3.7rem;
					.text{
						height: .54rem;
						text-align: left;
						color: #fff;
						font-size: .28rem;
						line-height: .54rem;
						font-family: DINOTMedium;
					}
					.progress{
						display: block;
						width: 100%;
						height: .26rem;
						background: url('./progress_bg.png') no-repeat center;
						background-size: 100% 100%;
						padding: .08rem .15rem;
						b{
							position: relative;
							display: block;
							width: 100%;
							height: 100%;
							background-color: rgba(215,231,255,.8);
							border-radius: .13rem;
						}
						.dot{
							display: block;
							position: absolute;
							left:100%;
							top: -.07rem;
							background-color:  rgba(215,231,255,1);
							width: .28rem;
							height: .28rem;
							border-radius: .14rem;
							margin-left: -.14rem;
						}
					}
				}
				.end{
					flex:1;
					text-align: right;
					font-size: .24rem;
					color: rgba(255,255,255,.8);
					padding-top: .54rem;
					line-height: .3rem;
					span{
						font-size: .2rem;
					}
				}
			}
		}
	}
	.swiper-wrapper{
		display: flex;
	}
	.tab-wrapper{
		padding: .24rem .3rem 0;
		.tab{
			display: flex;
			padding: 0 .18rem;
			align-items: center;
			h3{
				flex: 0 0 1.1rem;
				height: .46rem;
				border:1px solid #c2c6ca;
				border-radius: .23rem;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #c2c6ca;
				font-size: .22rem;
			}
			h3.normal{
				border:1px solid #4e8cef;
				color: #4e8cef;
			}
			h3.active{
				background-color: #4e8cef;
				color: #fff;
				border: 0;
			}
			span{
				display: flex;
				flex: 0 0 .72rem;
				height: 0;
				border-bottom: 1px solid #c2c6ca;
			}
			span.active{
				border-bottom: 1px solid #4e8cef;
			}
		}
	}
	.arrow-wrapper{
		padding-top: .12rem;
		height: .3rem;
		padding: .12rem .48rem 0;
		p{
			width: 0;
			height: 0;
			border-right: .18rem solid transparent;
			border-bottom: .18rem solid #fff;
			border-left: .18rem solid transparent;
			margin-left: .37rem;
		}
	}
	.select-wrapper{
		padding: 0 .3rem;
		width: 100%;
		overflow: hidden;
		.select{
			background-color: #fff;
			border-radius: 3px;
			.title{
				height: .7rem;
				display: flex;
				align-items: center;
				padding-left: .3rem;
				border-bottom: 1px solid #e7e7e7;
			}
		}
	}
</style>
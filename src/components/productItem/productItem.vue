<template>
	<div ref="productItem" class="product-container">
		<a @click="productDetail">
			<h3 class="title">
				<b>{{itemResult.orgName}}</b>
				<span>--{{itemResult.productName}}</span>
				<span v-if="itemResult.ifRookie == 1" class="box">新手</span>
				<span v-if="itemResult.hasRedPacket" class="box">红包</span>
			</h3>
			<ul class="detail-wrapper">
				<li class="detail-1">
					<p class="year-income">{{yearRate}}<span>%</span></p>
					<p class="year-income-text">年化收益率</p>
				</li>
				<li class="detail-2">
					<h3 class="day-limit"><span>期限&nbsp;&nbsp;</span><h2 v-html="itemResult.deadLineValueText"></h2></h3>
					<h3 class="year-rate"><span>年化佣金率&nbsp;&nbsp;</span><h2>{{itemResult.feeRatio}}<span>%</span></h2></h3>
				</li>
				<li class="detail-3">
					<canvas ref="canvas" id="oCanvas" class="o-canvas"></canvas>
				</li>
			</ul>
		</a>
	</div>
</template>
<script>
	import Vue from 'vue';
	import { environment } from './../../resource/config'
	import service from "./../../resource/service";
	export default {
		props:{
			item:{
				type:Object,
				default:null
			}
		},
		data(){
			return{
				yearRate: null,
				productDeadline:null,
				buyPercent:0,
				circleTimer:null,
				canvasShow:false,
				itemResult:this.item
			}
		},
		computed:{
			token(){
				return this.$store.state.token || "";
			}
		},
		created(){
			var deadLineValueTextArr = this.itemResult.deadLineValueText.split(',');
			var deadLineValueTextHtml = "";
			if(deadLineValueTextArr.length === 4){
				deadLineValueTextHtml = deadLineValueTextArr[0] + '<span>'+deadLineValueTextArr[1]+'</span>-'+deadLineValueTextArr[2] + '<span style="font-size:.2rem;line-height:1;">'+deadLineValueTextArr[3]+'</span>'
			}else if(deadLineValueTextArr.length === 2){
				deadLineValueTextHtml = deadLineValueTextArr[0] + '<span style="font-size:.2rem;line-height:1;">'+deadLineValueTextArr[1]+'</span>'
			}
			this.itemResult.deadLineValueText = deadLineValueTextHtml;
			if(this.itemResult.isFlow == 1){
				this.yearRate = this.itemResult.flowMinRate
			}else if(this.itemResult.isFlow == 2){
				this.yearRate = this.itemResult.flowMinRate + '-'+ this.itemResult.flowMaxRate
			}

			// 期限
			if(this.itemResult.isFixedDeadline == 1){ //固定期限
				this.productDeadline = this.itemResult.flowMinRate
			}else if(this.itemResult.isFixedDeadline == 2){ // 浮动期限
				this.productDeadline = this.itemResult.flowMinRate + '-'+ this.itemResult.flowMaxRate
			}

			this.buyPercent = parseInt(this.itemResult.buyedTotalMoney / this.itemResult.buyTotalMoney * 100)

			this.$nextTick(()=>{
				this.circle()
			})
		},
		destroyed(){
			clearInterval(this.circleTimer)
		},
		methods:{
			circle:function(){
				var self = this;
				var step = 10;
				var end = this.buyPercent;
				var percentage = 0;
				var gap = parseInt(end / step)
				this.canvasShow = true;
				/*当每次递增小于1时,不再生成动效*/
				if(gap <= 0){
					setTimeout(()=>{
						self.drawCircle(end);
					},200)
					return;
				}
				this.circleTimer = setInterval(function(){
					percentage += gap;
					self.drawCircle(percentage)
					if(percentage >= end){
						clearInterval(self.circleTimer)
						self.drawCircle(end)
					}
				},75)

			},
			drawCircle:function(percentage){
				let oCanvas = this.$refs.canvas;
				var lineWidth = 8;
				var w = oCanvas.getBoundingClientRect().width
				var h = oCanvas.getBoundingClientRect().height
				oCanvas.setAttribute('width',w*3);
				oCanvas.setAttribute('height',w*3);
				var r = w*3/2
				var myCanvas = oCanvas.getContext("2d");
				myCanvas.clearRect(0,0,r*6,r*6);

				myCanvas.beginPath()
				myCanvas.arc(r,r,Math.abs(r-lineWidth),0,2*Math.PI,false)
				myCanvas.lineWidth = lineWidth
				myCanvas.strokeStyle= '#dedede'
				myCanvas.stroke()
				myCanvas.closePath()

				myCanvas.beginPath()
				myCanvas.arc(r,r,Math.abs(r-lineWidth),-Math.PI /2,-Math.PI /2 + 2*Math.PI*percentage/100,false)
				myCanvas.lineWidth = lineWidth
				myCanvas.strokeStyle= '#4e8cef'
				myCanvas.stroke()
				myCanvas.closePath()

				myCanvas.beginPath()
				myCanvas.fillStyle = '#4e8cef'
				myCanvas.font="normal 42px DINOTMedium"
				myCanvas.textBaseline = 'middle'
				myCanvas.textAlign = 'center'
				myCanvas.fillText(percentage + '%',r,r+6)
				myCanvas.closePath()
			},
			productDetail(){
				 if(this.itemResult.tongjiId && environment === 'produce' && window._hmt){
				 	_hmt.push(['_trackEvent', this.itemResult.tongjiId, 'click']);
				 }
				 this.$router.push({path : '/product/detail',query:{productId:this.itemResult.productId}})
			}
		}
	}
</script>
<style lang='less' scoped>
	.product-container{
		padding: 0 .3rem;
		background-color: #fff;
		border-bottom: 1px solid #efefef;
	}
  .product-container a{
    display: block;
  }
	.product-container .title{
		display: flex;
		color: #333;
		font-size: 0;
		padding: .4rem 0 0;
	}
	.product-container .title b{
		font-size: .28rem;
		line-height: 1;
		padding-right: .2rem;
	}
	.product-container .title span{
		font-size: .28rem;
		color: #999;
		max-width: 5rem;
		margin-right: .2rem;
	}
 	.product-container .title .box{
 		font-size: .16rem;
 		display: flex;
 		align-items: center;
 		justify-content: center;
 		flex: 0 0 .54rem;
 		height: .28rem;
 		border: 1px solid #fd5d5d;
 		color: #fd5d5d;
 		border-radius: 3px;
 		margin-right: .1rem;
	}
	.detail-wrapper{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 1.5rem;
	}
	.detail-wrapper .detail-1{
		flex: 1.5;
		line-height:1;
	}
	.detail-wrapper .detail-2{
		flex: 1.5;
		line-height:1;
	}
	.detail-wrapper .detail-3{
		flex: 1;
		line-height:1;
	}
	.year-income{
		font-size: .44rem;
		color: #fd5d5d;
		line-height: 1;
		font-family: DINOTMedium;
	}
	.year-income > span{
		font-size: .3rem;
	}
	.year-income-text{
		padding-top: .2rem;
		font-size: .24rem;
		color: #999899;
	}
	.day-limit{
		font-size: 0;
	}
	.day-limit span{
		font-size: .24rem;
	}
	.day-limit h2{
		display: inline-block;
		font-size: .32rem;
		font-family: DINOTMedium;
		color: #666;
	}
	.day-limit h2 span{
		font-size: 0;
	}
	.year-rate{
		padding-top: .2rem;
		font-size: .24rem;
		color: #999899;
	}
	.year-rate h2{
		display: inline-block;
		font-size: .32rem;
		font-family: DINOTMedium;
		color: #666;
	}
	.year-rate h2 span{
		font-size:.2rem;
		line-height:1;
	}
	.o-canvas{
		display: block;
		width: .88rem;
		height: .88rem;
		float: right;
	}
</style>

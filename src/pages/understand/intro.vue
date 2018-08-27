<template>
	<div class="content-2">
		<!--<div class="one">
			<img src="./2-company-pic1.png">
		</div>-->
		<div class="two">
		    <p>深圳市戈锐科技有限公司(以下简称“戈锐科技”)成立于2015年9月14日，是中国创新金融领域新兴力量的代表。</p>
		    <p>戈锐科技是一家专注于打造金融创业生态平台的金融科技公司。目前，公司服务遍布全国23个省，4个直辖市，346个城市。</p>
		    <div v-show="isShowMore">
		        <p>戈锐科技旗下拥有服务于理财师的智能掌上工具"貅比特",服务于投资者的互联网金融信息导流平台"T呗",以及后期为金融机构提供用户导流、技术支持、品牌曝光等一系列配套服务的SAAS系统。</p>
		        <p>戈锐科技致力于以理财师为核心，构建理财师、投资者、金融机构三方相互促进、共同发展的理财师生态圈，推进互联网技术与金融信息化发展的融合。</p>
		    </div>
		    <p class="learn-detail" @click="showMore" v-show="!isShowMore">了解更多<span class="icon-down-arrow"></span></p>
		</div>
		<!--<div class="three">
			<div class="three-inner">
				<div class="second-title">
					<img src="./2-title1.png">
					<p class="sub-title">重点信用企业， 理财更放心</p>
				</div>
				<img @click="showLayer('d9bf3dc5e0be5c7f353b35f0357e4f1a')" src="./2-certificate.png">
				<h4>中国国际电子商务中心 “重点认证信用企业”</h4>
				<img  @click="showLayer('850ea1ca60961e601c1446720ba6bbb5')" src="./2-license.png">
				<h4>营业执照</h4>
			</div>
		</div>-->

		<div class="four">
			<div class="four-inner">
				<div class="second-title">
					<img src="./2-title2.png">
					<p class="sub-title">互联网+银行团队倾力打造</p>
				</div>
				<!--<img src="./anshan.png">
				<img src="./dingchao.png">
				<img src="./luyuanli.png">-->
				<h2><p>团队更多人来自</p></h2>
				<img src="./2-team.png" style="width:5.6rem;">
			</div>
		</div>

		<div class="five">
			<div class="five-inner">
				<div class="second-title">
					<img src="./2-title3.png">
					<p class="sub-title">因为卓越，彼此认可</p>
				</div>
				<img style="width:6.3rem;display:block;margin:.5rem auto 0;" src="./2-partner.png">
			</div>
		</div>
		<div @click="hideLayer" class="layer-wrapper" v-show='layerShow'>
			<div class="layer-bg animated zoomIn"></div>
			<div class="layer-content animated zoomIn">
				<img :src="layerImgSrc">
			</div>
		</div>
	</div>
</template>
<script>
	import env from './../../resource/env'
	import {environment, imgHost } from './../../resource/config'
	export default {
		data(){
			return {
				isShowMore :false,
				layerShow:false,
				layerImgSrc:''
			}
		},
		methods:{
			showMore(){
				this.isShowMore = true;
			},
			showLayer(src){
				this.layerImgSrc = env.imgUrl + '/' + src + '?f=png';
				this.layerShow = true;
			},
			hideLayer(){
				this.layerShow = false;
			}
		}
	}
</script>
<style scoped lang="less">
	.content-2{
		.one{
			padding-top: .3rem;
		}
		.two{
			padding:0 .3rem;
			line-height: 1.8;
			color: #545871;
			font-size: .28rem;
			p{
				padding-top: .2rem;
				text-indent: .56rem;
			}
		}
		.three{
			padding:.3rem;
			img{
				display: block;
				width: 4.1rem;
				margin: .46rem auto 0;
			}
			h4{
				font-size: .28rem;
				color: #545871;
				padding-top: .2rem;
				text-align: center;
			}
		}
		.three-inner,.four-inner,.five-inner{
			background-color: #fff;
			padding: .3rem 0 .4rem;
			border-radius: 3px;
		}
		.four{
			padding:0 .3rem .3rem;
		}
		.four-inner{
			img{
				display: block;
				width: 4.1rem;
				margin: .46rem auto 0;
			}
			h2{
				background: #fff;
				height: .8rem;
				padding: .2rem .3rem;
				display: table;
				width: 100%;
				p{
					font-size: .32rem;
					color: #4e8cef;
					line-height: 1;
					margin-top: .24rem;
					padding-left: .2rem;
					border-left: .06rem solid #4e8cef;
				}
			}
		}
		.five{
			padding: .3rem;
		}
	}
	.second-title{
		width: 4.1rem;
		display: block;
		margin: 0 auto;
		img{
			margin-top: 0;
		}
	}
	.sub-title{
		font-size: .24rem;
		color: #545871;
		text-align: center;
		padding-top: .2rem;
	}
	.learn-detail{
		text-align: center;
		font-size: .24rem;
		color: #4e8cef;
		text-indent:0!important;
		span{
			font-size: .2rem;
		}
	}
	.layer-wrapper{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.layer-bg{
		position:absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color:rgba(0,0,0,.8);
		z-index: 900;
	}
	.layer-content{
		position: relative;
		z-index: 910;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		width: 100%;
		overflow: hidden;
	}
</style>

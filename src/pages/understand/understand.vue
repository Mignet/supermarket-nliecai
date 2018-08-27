<template>
	<div class="understand-container">
		<div id="tab" class="tab-wrapper" ref="tab">
			<p :class="isOne ? 'active' : '' " @click="oneClick">
				<span>关于貅比特</span>
			</p>
			<p  :class="isOne ? '' : 'active' " @click="twoClick">
				<span>公司介绍</span>
			</p>
		</div>
		<div class="wrapper">
			<div class="content">
				<div class="content-inner">
					<About v-if="info" v-show="isOne" :info = 'info'></About>
					<Intro v-show="!isOne"></Intro>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import service from './../../resource/service'
	import About from './about.vue'
	import Intro from './intro.vue'
	import { wechatShare } from './../../common/wechatShare'
	import {environment , imgHost , staticHost , liecaiIcon} from './../../resource/config'
	export default {
		data(){
			return {
				info:null,
				isOne:true,
				scroll : null,
				shareContent:{
					title  : '了解貅比特',
					desc   : '国内首家零门槛理财师创业平台,为理财师提供“一站式”理财、投顾服务。',
					link   : staticHost[environment] + this.$router.currentRoute.fullPath,
					imgUrl : liecaiIcon
				}
			}
		},
		created(){
			service.serverRequest('achievement',(result)=>{
				this.info = result;
			})
			wechatShare(this.shareContent)
		},
		methods:{
			oneClick(){
				this.isOne = true;
			},
			twoClick(){
				this.isOne = false;
			},
			magnify(src){
				console.log(src)
			}
		},
		components:{
			About,
			Intro
		}
	}
</script>
<style scoped lang='less'>
	.understand-container{
		height: 100%;
	}
	.tab-wrapper{
		position: fixed;
		left: 0;
		top:0 ;
		display: flex;
		width: 100%;
		height: .9rem;
		background-color: #fff;
		p{
			flex: 1;
			height: 100%;
			span{
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid #fff;
				width: 2.4rem;
				height: 100%;
				margin: 0 auto;
				font-size: .28rem;
				color: #4f5960;
			}
		}
		p.active{
			span{
				color: #4e8cef;
				border-bottom: 1px solid #4e8cef;
			}
		}
	}
	.wrapper{
		padding-top: .9rem;
		width: 100%;
		overflow: hidden;
		background-color: #e7ebf7;
	}
	.content{
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<div class="buy-tips-container">
		<div class="mask" @click.stop="hideTipsEvent"></div>
		<div class="content">
			<button class="close-btn" @click.stop="hideTipsEvent">	
				<img src="./../../assets/close-btn.png">
			</button>
			<h2>购买须知</h2>
			<p>请用此手机号码注册购买<br />{{mobile | hideMobile}}</p>
			<a :href="link" class="btn" @click.stop = 'removeLocalSharedBtn'>去注册购买</a>
			<h3>* 平台首次投资，才能获得猎财返现。</h3>
			<h3>* 猎财大师将以此手机号码进行报单返现。</h3>
			<h3>* 分散投资、选择恰当周期的标的，可有效降低风险。</h3>
		</div>
	</div>
</template>
<script>
	export default {
		name:'buyTips',
		props:['hideTips','link'],
		data(){
			return {
				mobile:""
			}
		},
		mounted(){
			if(!this.$userInfo.mobile && this.$userInfo.token){
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('getUserInfo').then(res=>{
					this.mobile = res.mobile;
					this.$userInfo = Object.assign(this.$userInfo,res)
				})
			}else{
				this.mobile = this.$userInfo.mobile
			}
		},
		methods:{
			hideTipsEvent(){
				this.$emit('hideTips')
			},
			removeLocalSharedBtn(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_3_1', 'click']);
				}
				if(this.$publicConfig.isApp){
					this.$native.action('removeLocalSharedBtn');
				}
			}
		}
	}
</script>
<style scoped>
	.buy-tips-container{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.mask{
		position:absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.6);
	}
	.content{
		position:absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 6.3rem;
		height: 4.66rem;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
	}
	.buy-tips-container .close-btn{
		position: absolute;
		right: 0;
		top: 0;
		width: .8rem;
		height: .6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}
	.buy-tips-container .close-btn img{
		width: .22rem;
	}
	.content h2{
		text-align: center;
		font-size: .36rem;
		color: #313131;
		padding-top: .5rem;
	}
	.content p{
		font-size: .32rem;
		color: #5f6678;
		text-align:center;
		padding-top: .3rem;
		line-height: 1.5;
	}
	.content a{
		display: block;
		margin: .4rem auto .2rem;
		width: 4.24rem;
		height: .84rem;
		background-color: #4e8cef;
		border-radius: .42rem;
		color: #fff;
		font-size: .32rem;
		line-height: .84rem;
		text-align: center;
	}
	.content h3{
		padding-left: .5rem;
		font-size: .22rem;
		color: #9197a6;
		line-height:1.4;
	}
</style>
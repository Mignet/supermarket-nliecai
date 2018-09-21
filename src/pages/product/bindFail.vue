<!-- 绑定账户失败 -->
<template>
	<div class="bindFail-container">
		<div class="top-wrap">
			<img src="./../../assets/fail-icon.png">
			<h1>绑定失败</h1>
			<h2>很抱歉，你已在{{orgName}}注册过账户,{{orgName}}暂不支持老用户绑定。</h2>
			<div @click.stop="goIndex" class="button-wrap">查看其它理财产品</div>
		</div>
		<div class="bottom-wrap">
			<a>需要帮助？联系客服</a><a href="tel:0755-86725461">0755-86725461</a>
		</div>
	</div>
</template>
<script>
	export default {
		name:'bindFail',
		computed:{
			orgName(){
				return decodeURIComponent(this.$route.query.orgName)
			}
		},
		methods:{
			// 回到首页
			goIndex(){
				this.$router.replace('/')
			}
		}
	}
</script>
<style scoped>
	.bindFail-container{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.bindFail-container .top-wrap{
		padding-top: .98rem;
	}
	.bindFail-container .top-wrap img{
		display: block;
		margin: 0 auto;
		width: 1.48rem;
	}
	.bindFail-container .top-wrap h1{
		text-align: center;
		padding-top: .24rem;
		font-size: .28rem;
		color: #9197a6;
	}
	.bindFail-container .top-wrap h2{
		text-align: left;
		line-height:1.5;
		padding: .36rem .3rem 1rem;
		font-size: .28rem;
		color: #9197a6;
	}
	.bindFail-container .top-wrap .button-wrap{
		width: 6.9rem;
		height: 1rem;
		background-color: #4e8cef;
		border-radius: 10px;
		margin: 0 auto;
		text-align:center;
		line-height: 1rem;
		color: #fff;
		font-size:18px;
	}
	.bindFail-container .bottom-wrap{
		position: absolute;
		left: 0;
		bottom: .3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.bindFail-container .bottom-wrap a{
		font-size:13px;
		color: #3b4257;
	}
	.bindFail-container .bottom-wrap a:last-child{
		color: #4e8cef;
	}
</style>

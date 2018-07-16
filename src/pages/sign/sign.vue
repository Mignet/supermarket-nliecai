<template>
	<div class="sign-container">
		<img src="./bg.png">
		<button @click="goRegister">签到</button>
		<p class="sign-tips">连续签到 <span>0</span> (天)</p>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Env from './../../resource/env'
	console.log(Env)
	export default {
		name:'sign',
		computed:{
			recommendCode(){
				return this.$route.query.recommendCode
			},
			name(){
				return this.$route.query.name
			}
		},
		created(){
			console.log(this.recommendCode)
			console.log(this.name)
		},
		methods:{
			goRegister(){
				// 注册链接
				let REGISTER_URL = "";
				if(this.name){
				    REGISTER_URL = Env.appUrl + '/pages/user/inviteRegister.html?recommendCode=' + this.recommendCode + '&name=' + encodeURIComponent(this.name)
				}else{
				    REGISTER_URL = Env.appUrl + '/pages/user/inviteRegister.html?recommendCode=' + this.recommendCode
				}
				Vue.popup.tipsContinue('请注册后到APP进行签到',3000,()=>{
					location.href= REGISTER_URL
				})
			}
		}
	}
	
</script>
<style scoped>
	.sign-container button{
	    position:absolute;
	    left:0;
	    right:0;
	    margin:auto;
	    top:6.9rem;
	    display: block;
	    border: 0;
	    width: 3.9rem;
	    background-color: #ffd74c;
	    font-size: .4rem;
	    color: #f25c4b;
	    height: .9rem;
	    border-radius: .45rem;
	}
	.sign-tips{
		position: absolute;
		left: 0;
		top: 8rem;
		width: 100%;
		font-size: .24rem;
		color: #fff;
		text-align: center;
	}
	.sign-tips span{
		font-size: .36rem;
	}
</style>
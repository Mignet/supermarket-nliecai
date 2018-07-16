<template>
	<div class="resetPayPwd1-container">
		<p class="tips-wrap">设置交易密码，用于提现</p>
		<ul>
			<li class="border-1px" :class="{active:pwd.length >=1}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=2}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=3}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=4}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=5}"><span></span></li>
			<li class="border-1px last-child" :class="{active:pwd.length >=6}"><span></span></li>
		</ul>
		<keyboard
			:show='keyboard'
			@typing="typing"
			:isInteger="isInteger"
		/>
	</div>
</template>
<script>
	const keyboard = () => import('./../../components/keyboard/keyboard.vue')
	export default {
		name:'resetPayPwd1',
		data(){
			return {
				// 是否显示键盘
				keyboard:true,
				// 输入框密码
				pwd:"",
				isInteger:true
			}
		},
		methods:{
			// 监听键盘输入输入
			typing (value) {
				this.changePwd(value);
			},
			// 监听密码改变
			changePwd(value){
				let pwd = this.pwd
				if (value === '') {
					if(pwd){
						pwd = pwd.substr(0,pwd.length-1)
					}else{
						pwd = "";
					}
				}else{
					pwd = pwd + value;
					if(pwd.length >= 6){
						pwd = pwd.substr(0,6)
					}
				}
				this.pwd = pwd
			},
			verifyPayPwdEvent(){
				let firstPwd = comm.toBase64(this.pwd);
				sessionStorage.setItem('__FIRSTPWD__',firstPwd)
				this.$router.replace('/user/resetPayPwd2')
			}
		},
		watch:{
			pwd(curval,oldval){
				if(curval.length >=6){
					this.verifyPayPwdEvent()
				}
			}
		},
		components:{
			keyboard
		}
	}
</script>
<style>
	.resetPayPwd1-container{
		width: 100%;
		height: 100%;
	}
	.resetPayPwd1-container .tips-wrap{
		font-size: 12px;
		color: #323232;
		padding-top: .36rem;
		padding-left: .3rem;
		padding-bottom: .24rem;
	}
	.resetPayPwd1-container ul{
		margin: 0 auto;
		width: 6.9rem;
		display: flex;
		height: 1.16rem;
	}
	.resetPayPwd1-container ul li{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}
	.resetPayPwd1-container ul li span{
		display: block;
		width: .2rem;
		height: .2rem;
		border-radius: .1rem;
		background-color: #fff;
	}
	.resetPayPwd1-container ul li.active span{
		background-color: #000;
	}
	.resetPayPwd1-container ul li:after{
		border-right: 0;
	}
	.resetPayPwd1-container ul .last-child:after{
		border-right: 1px solid #e0e0e0;
	}
	.resetPayPwd1-container .bottom-tips{
		font-size: 12px;
		color: #323232;
		padding-top: .36rem;
		padding-left: .3rem;
	}
</style>
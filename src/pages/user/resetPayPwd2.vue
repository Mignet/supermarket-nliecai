<template>
	<div class="resetPayPwd2-container">
		<p class="tips-wrap">请再次输入交易密码</p>
		<ul>
			<li class="border-1px" :class="{active:pwd.length >=1}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=2}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=3}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=4}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=5}"><span></span></li>
			<li class="border-1px last-child" :class="{active:pwd.length >=6}"><span></span></li>
		</ul>
		<p class="bottom-tips" v-show="showErrors">交易密码不一致</p>
		<keyboard
			:show='keyboard'
			@typing="typing"
			:isInteger="isInteger"
		/>
	</div>
</template>
<script>
	import Vue from 'vue'
	const keyboard = () => import('./../../components/keyboard/keyboard.vue')
	export default {
		name:'resetPayPwd2',
		data(){
			return {
				// 是否显示键盘
				keyboard:true,
				// 输入框密码
				pwd:"",
				// 是否是整数
				isInteger:true,
				showErrors:false
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
				var self = this;
				let secondPwd = this.pwd;
				let firstPwd = comm.base64ToString(sessionStorage.getItem('__FIRSTPWD__'));
				if(secondPwd != firstPwd){
					this.showErrors = true;
					this.errTimer = setTimeout(()=>{
						this.$router.replace('/user/resetPayPwd1')
					},1000)
				}else{
					this.resetPayPwdEvent()
				}
			},
			// 重置支付密码
			resetPayPwdEvent(){
				var self = this;
				let http = this.$axios;
				http.post('resetPayPwd',{
					pwd:this.pwd,
					resetPayPwdToken:sessionStorage.getItem('__RESETPAYPWDTOKEN__')
				}).then(res =>{
					Vue.popup.tips('设置成功',function(){
						sessionStorage.removeItem('__FIRSTPWD__')
						sessionStorage.removeItem('__RESETPAYPWDTOKEN__')
						// self.$router.replace('/mine/widthdraw')
						self.settingBindCard()
					})
				},err=>{
					self.$router.replace('/mine/balance')
				})
			},
			// 是否绑卡
			settingBindCard(){
				var self = this;
				var http = this.$axios;
				http.isShowLoading = true;
				http.post('settingBindCard').then(res=>{
					if(res.bundBankcard){		
						self.$router.replace('/mine/widthdraw')
					}else{
						self.$router.replace('/user/verifyPayPwd')
					}
				})
			},
		},
		beforeDestroy(){
			clearTimeout(this.errTimer)
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
	.resetPayPwd2-container{
		width: 100%;
		height: 100%;
	}
	.resetPayPwd2-container .tips-wrap{
		font-size: 12px;
		color: #323232;
		padding-top: .36rem;
		padding-left: .3rem;
		padding-bottom: .24rem;
	}
	.resetPayPwd2-container ul{
		margin: 0 auto;
		width: 6.9rem;
		display: flex;
		height: 1.16rem;
	}
	.resetPayPwd2-container ul li{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}
	.resetPayPwd2-container ul li span{
		display: block;
		width: .2rem;
		height: .2rem;
		border-radius: .1rem;
		background-color: #fff;
	}
	.resetPayPwd2-container ul li.active span{
		background-color: #000;
	}
	.resetPayPwd2-container ul li:after{
		border-right: 0;
	}
	.resetPayPwd2-container ul .last-child:after{
		border-right: 1px solid #e0e0e0;
	}
	.resetPayPwd2-container .bottom-tips{
		font-size: 12px;
		color: #fd5d5d;
		padding-top: .36rem;
		padding-left: .3rem;
	}
</style>
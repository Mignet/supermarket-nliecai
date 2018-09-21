<!-- 设置交易密码的手机号认证页 注意和绑卡手机号验证做区分 -->
<template>
	<div class="verifyPayPwdMobile-container">
		<h2>已发送验证码到{{mobile | hideMobile}}</h2>
		<section>
			<input type="tel" maxlength="6" placeholder="请输入短信验证码" v-model="verifyCode">
			<div>
				<p class="line"></p>
				<button :class="{active:canSend}" @click.stop="sendAccountVcode">{{sendVerifyCodeTips}}</button>
			</div>
		</section>
		<div class="button-wrap">
			<button @click.stop="checkVerifyCode" :class="{active:canVerifyCode}">下一步</button>
		</div>
		<div class="tips">收不到验证码？联系客服<a href="tel:0755-86725461">0755-86725461</a></div>
	</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		name:'verifyPayPwdMobile',
		data(){
			return{
				// 能否发送验证码
				canSend:true,
				// 发送验证码计时器
				sendVerifyCodeTimer:null,
				// 发送验证码提示
				sendVerifyCodeTips:'重新发送',
				// 验证码
				verifyCode:"",
				// 能否校验验证码
				canVerifyCode:false,
				// 用户手机号
				mobile:""
			}
		},
		mounted(){
			this.getUserInfo()
		},
		methods:{
			// 获取用户信息(手机号)
			getUserInfo(){
				let http = this.$axios;
				http.post('getUserInfo').then(res =>{
					this.mobile = res.mobile
					this.sendAccountVcode()
				})
			},
			// 发送验证码
			sendAccountVcode(){
				if(!this.canSend) return;
				let http = this.$axios;
				http.post('sendVcode',{
					mobile:this.mobile,
					type:0
				}).then(res =>{
					this.canSend = false;
					let time  = 60;
					time --;
					this.sendVerifyCodeTips =`重新发送(${time})`
					this.sendVerifyCodeTimer = setInterval(()=>{
						time --;
						this.sendVerifyCodeTips =`重新发送(${time})`
						if(time <=0){
							clearInterval(this.sendVerifyCodeTimer)
							this.sendVerifyCodeTips = '重新发送'
							this.canSend = true;
						}
					},1000)
				})
			},
			// 校验验证码
			checkVerifyCode(){
				if(this.canVerifyCode){
					let http = this.$axios;
					http.isShowLoading = true;
					http.post('inputVcode',{
						mobile:this.mobile,
						vcode:this.verifyCode
					}).then(res=>{
						if(res.result === 'true'){
							this.$router.replace('/user/setPayPwd')
						}
					})
				}
			},
		},
		watch:{
			verifyCode(curVal){
				if(curVal.length >= 4){
					this.canVerifyCode = true;
				}
			}
		},
		beforeDestroy(){
			// 清除计时器
			clearInterval(this.sendVerifyCodeTimer)
		}
	}
</script>
<style scoped>
	.verifyPayPwdMobile-container h2{
		padding: .4rem .3rem .4rem;
		font-size: .28rem;
		color: #9197a6;
	}
	.verifyPayPwdMobile-container section{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		background-color: #fff;
		padding: 0 .3rem;
	}
	.verifyPayPwdMobile-container input{
		font-size:.32rem;
		height: 100%;
	}
	.verifyPayPwdMobile-container section .line{
		background: #d6d4de;
		width: 1px;
		height: .8rem;
		transform: scaleX(0.5);
		transform-origin: 0 0;
	}
	.verifyPayPwdMobile-container section div{
		display: flex;
		align-items: center;
		height: 100%;
		width: 2.22rem;
	}
	.verifyPayPwdMobile-container section button{
		font-size:.28rem;
		color: #9197a6;
		text-align: right;
		display: block;
		width: 100%;
	}
	.verifyPayPwdMobile-container section button.active{
		color:#4e8cef;
	}
	.verifyPayPwdMobile-container .button-wrap{
		padding-top: .8rem;
	}
	.verifyPayPwdMobile-container .button-wrap button{
		display: block;
		width: 6.9rem;
		height: 1.1rem;
		background-color: #cecece;
		border-radius: 6px;
		margin: 0 auto;
		font-size:18px;
		color: #fff;
	}
	.verifyPayPwdMobile-container .button-wrap button.active{
		background-color: #4e8cef;
	}
	.verifyPayPwdMobile-container .tips{
		padding-top: .3rem;
		padding-left: .3rem;
		color: #9197a6;
	}
	.verifyPayPwdMobile-container .tips a{
		display: inline;
		color: #4e8cef;
	}
</style>

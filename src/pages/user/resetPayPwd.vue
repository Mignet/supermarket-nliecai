<!-- 重置交易密码页面 -->
<template>
	<div class="resetPayPwd-container">
		<h2>已发送短信验证码到{{$userInfo.mobile | hideMobile}}</h2>
		<section>
			<input type="tel" maxlength="6" placeholder="请输入短信验证码" v-model="verifyCode">
			<div>
				<p class="line"></p>
				<button :class="{active:canSend}" @click.stop="sendVerifyCode">{{sendVerifyCodeTips}}</button>
			</div>
		</section>
		<div class="button-wrap">
			<button @click.stop="checkVerifyCode" :class="{active:canVerifyCode}">下一步</button>
		</div>

		<div class="tips">收不到验证码？联系客服<a href="tel:0755-86725461">0755-86725461</a></div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		name:'resetPayPwd',
		data(){
			return{
				// 能否发送验证码
				canSend:true,
				// 发送验证码计时器
				sendVerifyCodeTimer:null,
				// 发送验证码提示
				sendVerifyCodeTips:'',
				// 验证码
				verifyCode:"",
				// 能否校验验证码
				canVerifyCode:false
			}
		},
		mounted(){
			if(this.$userInfo.mobile){
				this.sendVerifyCode()
			}else{
				this.getUserInfo()
			}
		},
		methods:{
			// 收不到验证码提示
			cannotReceiveVerifyCode(){
				Vue.popup.alert({
					title:'收不到验证码',
					msg:"<div style='text-align:left;'><p>1.请确认当前手机号是否为该银行卡预留手机号</p><p>2.检查短信是否被手机安全软件拦截</p><p>3.预留手机号停用，联系银行客服咨询</p><p>更多帮助致电貅比特客服<a href='tel:0755-86725461' style='display:inline;color:#4e8cef;'>0755-86725461</a></p></div>",
					btnText:'我知道了'
				})
			},
			getUserInfo(){
				var http = this.$axios;
				http.post('getUserInfo').then(res =>{
					this.$userInfo = res;
					this.sendVerifyCode()
				})
			},
			// 发送验证码请求
			sendVerifyCode(){
				if(!this.canSend) return;
				var http = this.$axios;
				http.post('sendVcode',{
					mobile:this.$userInfo.mobile,
					type:3
				}).then(res=>{
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
						// mobile:this.$userInfo.mobile,
						vcode:this.verifyCode
					}).then(res=>{
						sessionStorage.setItem('__RESETPAYPWDTOKEN__',res.resetPayPwdToken)
						if(res.result === 'true'){
							this.$router.replace('/user/resetPayPwd1')
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
	.resetPayPwd-container h2{
		padding: .4rem .3rem .4rem;
		font-size: .28rem;
		color: #9197a6;
	}
	.resetPayPwd-container section{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		background-color: #fff;
		padding: 0 .3rem;
	}
	.resetPayPwd-container input{
		font-size:.32rem;
	}
	.resetPayPwd-container section .line{
		background: #d6d4de;
		width: 1px;
		height: .8rem;
		transform: scaleX(0.5);
		transform-origin: 0 0;
		margin-right: .4rem;
	}
	.resetPayPwd-container section div{
		display: flex;
		align-items: center;
		height: 100%;
	}
	.resetPayPwd-container section button{
		font-size:.28rem;
		color: #9197a6;
	}
	.resetPayPwd-container section button.active{
		color:#4e8cef;
	}
	.resetPayPwd-container .button-wrap{
		padding-top: .8rem;
	}
	.resetPayPwd-container .button-wrap button{
		display: block;
		width: 6.9rem;
		height: 1.1rem;
		background-color: #cecece;
		border-radius: 6px;
		margin: 0 auto;
		font-size:18px;
		color: #fff;
	}
	.resetPayPwd-container .button-wrap button.active{
		background-color: #4e8cef;
	}
	.resetPayPwd-container .tips{
		padding-top: .3rem;
		padding-left: .3rem;
		color: #9197a6;
	}
	.resetPayPwd-container .tips a{
		display: inline;
		color: #4e8cef;
	}
</style>

<!-- 绑卡流程第三步 -->
<template>
	<div class="verifyMobile-container">
		<h2>绑定银行卡需短信验证，请输入手机号{{bindCardInfo.mobile | hideMobile}}收到的验证码</h2>
		<section>
			<input type="tel" maxlength="4" placeholder="请输入短信验证码" v-model="verifyCode">
			<div>
				<p class="line"></p>
				<button :class="{active:canSend}" @click.stop="sendVerifyCode">{{sendVerifyCodeTips}}</button>
			</div>
		</section>
		<div class="button-wrap">
			<button @click.stop="checkVerifyCode" :class="{active:canVerifyCode}">完成</button>
		</div>
		<div class="tips" @click.stop="cannotReceiveVerifyCode">收不到验证码?</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		name:'verifyMobile',
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
		computed:{
			bindCardInfo(){
				return JSON.parse(sessionStorage.getItem('__BINDCARDINFO__'));
			}
		},
		mounted(){
			this.sendVerifyCode()
		},
		methods:{
			// 收不到验证码提示
			cannotReceiveVerifyCode(){
				Vue.popup.alert({
					title:'收不到验证码',
					msg:"<div style='text-align:justify;'><p>1.请确认当前手机号是否为该银行卡预留手机号</p><p>2.检查短信是否被手机安全软件拦截</p><p>3.预留手机号停用，联系银行客服咨询</p><p>更多帮助致电猎财客服<a href='tel:400-888-6987' style='display:inline;color:#4e8cef;'>400-888-6987</a></p></div>",
					btnText:'我知道了'
				})
			},
			// 发送验证码请求
			sendVerifyCode(){
				if(!this.canSend) return;
				var http = this.$axios;
				http.post('sendVcode',{
					mobile:this.bindCardInfo.mobile,
					type:0
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
						mobile:this.bindCardInfo.mobile,
						vcode:this.verifyCode
					}).then(res=>{
						if(res.result === 'true'){
							this.bindCardEvent()
						}
					})
				}
			},
			// 去绑卡
			bindCardEvent(){
				let bindCardInfo = this.bindCardInfo;
				let http = this.$axios;
				http.isShowLoading = true;
				http.post('addBankCard',{
					bankCard:bindCardInfo.card,
					bankCode:bindCardInfo.bankInfo.bankCode,
					bankId:	bindCardInfo.bankInfo.bankId,
					bankName:bindCardInfo.bankInfo.bankName,
					city:bindCardInfo.areaInfo.city,
					idCard:bindCardInfo.identity,
					kaihuhang:bindCardInfo.areaInfo.city,
					mobile : bindCardInfo.mobile,
					userName:bindCardInfo.name
				}).then(res=>{
					sessionStorage.removeItem('__BINDCARDINFO__')
					if(this.$store.state.originPath === '/mine/balance'){
						// 判断是否设置交易密码
						this.isSetPayPwd()
					}else{
						this.$router.replace('/setting/bindCardSuccess')
					}
				},err =>{
					console.log(err)
				})
			},
			// 是否设置交易密码
			isSetPayPwd(){
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('verifyPayPwdState').then(res=>{
					if(res.rlt){
						this.$router.replace('/setting/bindCardSuccess')
					}else{
						this.$router.replace('/user/setPayPwd')
					}
				})
			}	
		},
		watch:{
			verifyCode(curVal){
				if(curVal.length >= 4){this.canVerifyCode = true;}
			}
		},
		beforeDestroy(){
			// 清除计时器
			clearInterval(this.sendVerifyCodeTimer)
		}
	}
</script>
<style scoped>
	.verifyMobile-container h2{
		padding: .4rem .3rem .4rem;
		font-size: .28rem;
		color: #9197a6;
	}
	.verifyMobile-container section{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		background-color: #fff;
		padding: 0 .3rem;
	}
	.verifyMobile-container input{
		font-size:.32rem;
		height: 100%;
	}
	.verifyMobile-container section .line{
		background: #d6d4de;
		width: 1px;
		height: .8rem;
		transform: scaleX(0.5);
		transform-origin: 0 0;
		margin-right: .4rem;
	}
	.verifyMobile-container section div{
		display: flex;
		align-items: center;
		height: 100%;
	}
	.verifyMobile-container section button{
		font-size:.28rem;
		color: #9197a6;
	}
	.verifyMobile-container section button.active{
		color:#4e8cef;
	}
	.verifyMobile-container .button-wrap{
		padding-top: .8rem;
	}
	.verifyMobile-container .button-wrap button{
		display: block;
		width: 6.9rem;
		height: 1.1rem;
		background-color: #cecece;
		border-radius: 6px;
		margin: 0 auto;
		font-size:18px;
		color: #fff;
	}
	.verifyMobile-container .button-wrap button.active{
		background-color: #4e8cef;
	}
	.verifyMobile-container .tips{
		text-align: right;
		color: #4e8cef;
		padding-top: .3rem;
		padding-right: .3rem;
	}
</style>
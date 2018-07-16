<!-- 验证交易密码页面 -->
<template>
	<div class="verifyPayPwd-container">
		<p class="tips-wrap">添加银行卡需验证交易密码</p>
		<ul @click.stop="showKeyboard">
			<li class="border-1px" :class="{active:pwd.length >=1}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=2}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=3}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=4}"><span></span></li>
			<li class="border-1px" :class="{active:pwd.length >=5}"><span></span></li>
			<li class="border-1px last-child" :class="{active:pwd.length >=6}"><span></span></li>
		</ul>
		<router-link class="forget-pwd" to="/user/verifyRelationship?type=0" replace>忘记密码?</router-link>
		<keyboard
			:show='keyboard'
			@typing="typing"
			:isInteger="isInteger"
		/>
	</div>
</template>
<script>
	import Vue from 'vue';
	const keyboard = () => import('./../../components/keyboard/keyboard.vue')
	export default {
		name:'verifyPayPwd',
		data(){
			return {
				// 是否显示键盘
				keyboard:true,
				// 输入框密码
				pwd:"",
				// 验证交易密码次数
				verifyPayPwdTimes:0,
				isInteger:true
			}
		},
		methods:{
			showKeyboard(){
				this.keyboard = true;
			},
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
			// 验证支付密码
			verifyPayPwdEvent(){
				var self = this;
				var http = this.$axios;
				http.post('verifyPayPwd',{
					pwd:this.pwd
				}).then(res=>{
					if(res.rlt){
						this.$router.replace('/setting/bind')
					}else{
						Vue.popup.tips('交易密码输入错误,请重新输入',function(){
							self.pwd = "";
						})
					}
				})
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
	.verifyPayPwd-container{
		width: 100%;
		height: 100%;
	}
	.verifyPayPwd-container .tips-wrap{
		padding-top: .36rem;
		padding-left: .3rem;
		padding-bottom: .24rem;
		font-size: .28rem;
		color: #9197a6;
	}
	.verifyPayPwd-container ul{
		margin: 0 auto;
		width: 6.9rem;
		display: flex;
		height: 1.16rem;
	}
	.verifyPayPwd-container ul li{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}
	.verifyPayPwd-container ul li span{
		display: block;
		width: .2rem;
		height: .2rem;
		border-radius: .1rem;
		background-color: #fff;
	}
	.verifyPayPwd-container ul li.active span{
		background-color: #000;
	}
	.verifyPayPwd-container ul li:after{
		border-right: 0;
	}
	.verifyPayPwd-container ul .last-child:after{
		border-right: 1px solid #e0e0e0;
	}
	.verifyPayPwd-container .forget-pwd{
		text-align: right;
		color: #4e8cef;
		padding-right: .3rem;
		padding-top: .3rem;
		font-size:12px;
	}
</style>
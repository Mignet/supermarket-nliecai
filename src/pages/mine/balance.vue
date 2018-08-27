<!-- 貅比特余额 -->
<template>
	<div class="balance-container">
		<router-link class="record" to="/mine/widthdrawRecord">提现记录</router-link>
		<img src="./../../assets/gold-icon.png" class="gold-pic">
		<div class="money-wrap"><p>￥&nbsp;</p><h2>{{totalAmount}}</h2></div>
		<p class="myaccount-tips">我的余额</p>
		<button @click.stop="withdrawEvent">提现</button>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		name:'balance',
		data(){
			return {
				// 账户余额
				totalAmount:0,
				// 是否绑定银行卡
				isBindCard:false
			}
		},
		mounted(){
			this.getMyAccount()
		},
		methods:{
			getMyAccount(){
				var http = this.$axios;
				http.isShowLoading = true;
				http.post('myaccount').then(res=>{
					this.totalAmount = res.totalAmount
				})
			},
			// 提现
			withdrawEvent(){
				this.settingBindCard()
			},
			// 是否绑卡
			settingBindCard(){
				var self = this;
				var http = this.$axios;
				http.isShowLoading = true;
				http.post('settingBindCard').then(res=>{
					this.isBindCard = res.bundBankcard;
					this.isSetTradePwd()
				})
			},
			/*
				已绑卡
					未设置交易密码:=> 身份验证 => 验证手机号 => 设置交易密码1 => 设置交易密码2 => 提现
					已设置交易密码 => 提现
				未绑卡
					未设置交易密码:=> 绑卡
					已设置交易密码 => 验证交易密码 => 绑卡

			*/
			// 是否设置交易密码
			isSetTradePwd(){
				var self = this;
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('verifyPayPwdState').then(res=>{
					// 已设置交易密码
					if(res.rlt){
						if(this.isBindCard){
							self.$store.dispatch('originQuery',self.$route.query)
							self.$store.dispatch('originPath',self.$route.path)
							this.$router.push('/mine/widthdraw')
						}else{
							Vue.popup.confirm({
								msg: '当前无可用银行卡，请添加银行卡。',
								cancelText: '取消', // 默认取消
								okText: '添加银行卡', // 默认确认
								okCb: function(){
									// 设置绑卡来源
									localStorage.setItem("__BINDCARDORIGIN__",'balance')
									self.$store.dispatch('originQuery',self.$route.query)
									self.$store.dispatch('originPath',self.$route.path)
									self.$router.push('/user/verifyPayPwd')
								}
							});

						}
					}else{
						if(this.isBindCard){
							Vue.popup.confirm({
								msg:'交易密码未设置，请设置交易密码。',
								cancelText:'取消',
								okText:'设置交易密码',
								okCb:function(){
									self.$store.dispatch('originQuery',self.$route.query)
									self.$store.dispatch('originPath',self.$route.path)
									// 身份验证
									self.$router.push({path:'/user/verifyRelationship',query:{type:1}})
								}
							})
						}else{
							Vue.popup.confirm({
								msg: '当前无可用银行卡，请添加银行卡。',
								cancelText: '取消', // 默认取消
								okText: '添加银行卡', // 默认确认
								okCb: function(){
									localStorage.setItem("__BINDCARDORIGIN__",'balance')
									self.$store.dispatch('originQuery',self.$route.query)
									self.$store.dispatch('originPath',self.$route.path)
									self.$router.push('/setting/bind')
								}
							});

						}
					}
				})
			}
		}
	}
</script>
<style scoped>
	.balance-container{
		height: 100%;
		background-color: #fff;
	}
	.balance-container .record{
		padding-top: .3rem;
		text-align: right;
		padding-right: .3rem;
		font-size:14px;
		color: #3b4257;
	}
	.balance-container .gold-pic{
		width: 1.5rem;
		display: block;
		margin: 0 auto;
		padding-top: .36rem;
		padding-bottom: .3rem;
	}
	.balance-container .money-wrap{
		display: flex;
		align-items: flex-end;
		justify-content: center;
		box-sizing: content-box;
		height: 36px;
	}
	.balance-container .money-wrap p{
		font-size: 18px;
		color: #3b4257;
		line-height: 1;
		font-family: DINOTMedium;
	}
	.balance-container .money-wrap h2{
		font-size: 36px;
		line-height: 1;
		font-family: DINOTMedium;
	}
	.balance-container .myaccount-tips{
		text-align: center;
		padding-top: 10px;
		color: #9197a6;
		font-size: 16px;
	}
	.balance-container button{
		width:6.9rem;
		height: 1.1rem;
		background-color: #4e8cef;
		border-radius: 6px;
		margin: .94rem auto 0;
		font-size: 18px;
		color: #fff;
	}
</style>

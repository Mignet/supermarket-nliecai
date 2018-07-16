/*
	已绑卡
		未设置交易密码:=> 身份验证 => 验证手机号 => 设置交易密码1 => 设置交易密码2 => 提现
		已设置交易密码 => 提现
	未绑卡
		未设置交易密码:=> 绑卡
		已设置交易密码 => 验证交易密码 => 绑卡

*/
import axios from './../resource/axios'
const bindCard = {
	settingBindCard(){
		var self = this;
		var http = axios;
		http.isShowLoading = true;
		http.post('settingBindCard').then(res=>{
			this.isBindCard = res.bundBankcard;
			this.isSetTradePwd()
		})
	},
	// 是否设置交易密码
	isSetTradePwd(){
		var self = this;
		var http = this.$axios;
		http.isShowLoading = false;
		http.post('verifyPayPwdState').then(res=>{
			if(res.rlt){
				if(this.isBindCard){
					this.$router.push('/mine/widthdraw')
				}else{
					this.$router.push('/user/verifyPayPwd')
				}
			}else{
				if(this.isBindCard){
					Vue.popup.confirm({
						msg:'交易密码未设置，请设置交易密码。',
						cancelText:'取消',
						okText:'设置交易密码',
						okCb:function(){
							// 身份验证
							self.$router.push('/user/verifyRelationship?type=0')
						}
					})
				}else{
					Vue.popup.confirm({
						msg: '当前无可用银行卡，请添加银行卡。',
						cancelText: '取消', // 默认取消
						okText: '添加银行卡', // 默认确认
						okCb: function(){
							self.$router.push('/setting/bind')
						}
					});
					
				}
			}
		})
	}	
}
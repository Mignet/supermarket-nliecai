<template lang="html">
	<div class="wraper">
		<p class="reminder">{{reminderText}}</p>
		<ul class="inputList commonForm">
			<li>
				<label for="loginMob">手机号码</label>
				<div class="inputWraper">
					<input required pattern="^1\d{10}$" name="mobile" id="loginMob" type="tel" maxlength="11" placeholder="请输入您的手机号码" v-model="mobile">
				</div>
			</li>
			<li>
				<label for="loginMob">确认密码</label>
				<div class="inputWraper">
					<input required pattern=".{4,20}" name="password" id="loginPwd"  type="password" v-model="password" ref="password">
				</div>
			</li>
		</ul>
		<div class="agree">
			<input type="checkbox" checked id="isAgree" ref="agreement">
			我同意<router-link :to="{name : 'serviceAgreement'}">《猎财大师用户服务协议》</router-link>
		</div>
		<!-- 底部内容 -->
		<div >
			<a class="button" @click="registerMatch">激活</a>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import Service from "./../../resource/service";
import Util from "./../../common/util";
export default {
	name : 'thirdRegister',
	data(){
		return {
			password:"",
			reminderText : "",
		}
	},
	computed:{
		source : function(){
			return JSON.parse( sessionStorage.getItem('registerPageData') ) || {}
		},
		mobile :function(){
			return JSON.parse(sessionStorage.getItem("registerPageData")).mobile;
		},
		recommendCode :function(){
			return JSON.parse(sessionStorage.getItem("registerPageData")).recommendCode || "";
		},
		reminderText : function(){
			return '您是' + this.source.regSource + '用户，' + '输入登录密码可直接激活'
		}
	},
	created(){
	},
	mounted(){
		this.$refs.password.placeholder = '请输入您的' + this.source.regSource + '登录密码'
	},
	methods:{
		registerMatch:function(){
			if(!this.password){
				Vue.popup.tips("请输入密码");
				return;
			}

			if(!/^.{4,20}$/.test(this.password)){
				Vue.popup.tips("请输入正确的密码");
				return;
			}
			if(!this.$refs.agreement.checked){
				Vue.popup.tips("请同意猎财大师服务协议");
				return false;
			}
			this.register();
		},
		// 登录操作
		register : function(){
			var self = this;
			Service.serverRequest("register",{
                mobile   : this.mobile,
				password : this.password,
				recommendCode : this.recommendCode
            },(result)=>{
            	comm.setCookie("__mobile__",self.mobile,2);
            	comm.setCookie("__token__",result.token,2); 
            	sessionStorage.removeItem('__ISPUSHAPPID__');
            	if(self.recommendCode){
            		Util.redirect('/mine?isPush=2');
            	}else{
            		Util.redirect('/mine?isPush=1');
            	}
            })
		}
	}
}
</script>

<style scoped>
.reminder{
	font-size: .3rem;
	padding:.15rem 0 .15rem .3rem;
}
.inputList {
	background: #fff;
	font-size: .3rem;
	border-top: solid 1px #dcdcdc;
}
.inputList li {
    position: relative;
    line-height: .8rem;
    height: .8rem;
    border-bottom: solid 1px #dcdcdc;
    overflow: hidden;
}
.inputWraper {
    margin: 0 0 0 6.2em;
    height: 100%;
}
.inputList li input {
    height: 100%;
    width: 100%;
    display: block;
    font-size: .3rem;
}
.inputList li label {
    position: absolute;
    left: .14rem;
    top: 0;
}
.login2Form{
	color:#000;
}
.agree{
	margin-top: .34rem;
	text-align:center;
}
.agree a{
	color:#007aff;
	display: inline-block;
}
</style>

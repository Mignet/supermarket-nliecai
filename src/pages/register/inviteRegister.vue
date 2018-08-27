<template>
    <div class="wraper white" ref='wraper'>
        <img src="./images/banner.jpg">
        <div class="content clearfix">
            <p class="recommend" v-if="recommendText">你好友{{recommendText | desensitization}}邀请你组团赚佣金</p>
            <input type="password" style="position:absolute;height:0;top:-10000px;">
            <div class="input-wrapper">
                <label class="mobile" for="mobile"></label>
                <input id="mobile" type="tel" placeholder="请输入您的手机号码" maxlength="11" autofocus v-model="tel">
            </div>
            <div class="input-wrapper2">
                <div class="vcode-wraper">
                    <label class="vcode" for="vcode" ></label>
                    <input id="vcode" type="tel" placeholder="请输入验证码" maxlength="4" v-model="identifyingCode">
                </div>
                <div class="vcode-button" @click="getVcode" :class="{gray :sendCode}">
                    <p>{{vcodeText}}</p>
                </div>
            </div>
            <div class="input-wrapper">
                <label for="password" class="password"></label>
                <input id="password" type="password" placeholder="6~20位数字、字母或字符组合" style="width:5.1rem;" ref="password" v-model="password" minlength="4" maxlength="20">
                <span @click="eyeStatus" class="eye eye-close" v-bind:class="eyeClose ? 'eye-close' : 'eye-open'"></span>
            </div>

            <div class="register-wraper">
                <div class="register" @click="registerMatch">注册赚佣金</div>
            </div>

            <div class="agreement" >
                <span :class="select" @click="serviceAgreement"></span>
                <router-link :to="{name : 'serviceAgreement'}">我同意《貅比特用户服务协议》</router-link>
            </div>
        </div>
        <div class="intro-wraper">
            <img src="./images/1.jpg">
            <img src="./images/2.png">
            <img src="./images/3.jpg">
            <img src="./images/4.jpg">
            <img src="./images/5.jpg">
            <div class="register-box">
                <div class="register-to-top" @click="scrollTop">注册赚佣金</div>
            </div>
        </div>
        <download></download>
    </div>
</template>
<script>
import Vue from 'vue'
import download from './../../components/download/download.vue'
import Service from "./../../resource/service";
import { environment } from './../../resource/config'
import Util from "../../common/util";
export default {
    name : "inviteRegister",
    data (){
        return {
            select : "select",
            sendCode : false,
            sendCodeOnce:false,
            tel : "",
            identifyingCode :"",
            password : "",
            eyeClose:true,
            timer : "",
            vcodeText:"获取验证码"
        }
    },
    computed:{
        recommendCode:function(){
            return this.$route.query.recommendCode || '';
        },
        recommendText : function(){
            var name = this.$route.query.name == 'null'? "":this.$route.query.name
            return name || this.$route.query.recommendCode;
        }
    },
    created(){
        sessionStorage.setItem("__referer__","inviteRegister");
        sessionStorage.setItem("__href__",location.href);
    },
    methods: {
        //点击获取验证码
        getVcode:function(){
            var self = this;
            if(this.sendCode){
                return false;
            }
            if(this.tel.length === 0){
                Vue.popup.tips("请输入手机号码");
                return false;
            }

            if(!/^1\d{10}$/.test(this.tel)){
                Vue.popup.tips("请输入正确的手机号码");
                return false;
            }
            this.sendCodeOnce = true;
            if(environment === 'produce' && window._hmt){
              _hmt.push(['_trackEvent', 'FVBU01', 'click']);
            }
            this.getUserType();
        },
        //判断用户类型
        getUserType(){
            Service.serverRequest("checkMobile",{
                mobile        : this.tel,
                recommendCode : this.recommendCode
            },(result)=>{
                var registerPageData = JSON.stringify(Object.assign(this.$route.query,{mobile:this.tel},result));
                sessionStorage.setItem('registerPageData', registerPageData);
                switch ( result.regFlag.toString()){
					// 已注册为理财师
					case '2':
                        Vue.popup.tips("您已经是貅比特用户，可直接登录",function(){
                            location.href = "https://liecai.bethye.top/pages/download/download.html";
                        });
						break;
					// 注册第三方
					case '1':
                        this.$router.push('/register/thirdRegister')
						break;
					// 未注册
					case '0':
                        this.getIdentifyingCode();
						break;
				}
            })
        },
        //获取验证码
        getIdentifyingCode:function(){
            var self = this;
            Service.serverRequest("sendVcode",{
                mobile:this.tel,
                type  : 1,
            },function(){
                self.sendCode = true;
                self.identifyingCodeTimer();
            });
        },
        identifyingCodeTimer :function(){
            var self = this;
            var time = 60;
            this.vcodeText = "重新获取("+time+"s)";
            this.timer = setInterval(function(){
                time --;
                self.vcodeText = "重新获取("+time+"s)";
                if(time <= 0){
                    clearInterval(self.timer)
                    self.sendCode = false;
                    time = 60;
                    self.vcodeText = "请重新获取";
                }
            },1000)
        },
        eyeStatus(){
            var type = this.$refs.password.type;
            this.$refs.password.type = type === "password"?"text":"password";
            this.$refs.password.autofocus = true;
            this.eyeClose = !this.eyeClose;
        },
        serviceAgreement (){
            this.select = this.select == "select" ? "":"select";
        },
        registerMatch (){
            if(!this.sendCodeOnce){
                Vue.popup.tips("请获取验证码");
                return ;
            }
            if(!this.identifyingCode){
                Vue.popup.tips("请输入验证码");
                return;
            }
            if(!/^\d{4}$/.test(this.identifyingCode)){
                Vue.popup.tips("请输入正确的验证码");
                return;
            }
            if(!this.password){
                Vue.popup.tips("请输入密码");
                return;
            }
            if(!/^.{6,20}$/.test(this.password)){
                Vue.popup.tips("请输入正确的密码");
                return;
            }
            if(!this.select){
                Vue.popup.tips("请同意貅比特服务协议");
                return;
            }
            if(environment === 'produce' && window._hmt){
              _hmt.push(['_trackEvent', 'FVBU02', 'click']);
            }
            this.registerFinish();
        },
        registerFinish (){
            var self  = this;
            Service.serverRequest('register',{
                mobile   : this.tel,
                password : this.password,
                vcode    : this.identifyingCode,
                recommendCode : this.recommendCode,
                fromUrl  : sessionStorage.getItem('__referer__'),
                accessUrl: sessionStorage.getItem('__href__'),
            },(result)=>{
                sessionStorage.removeItem('__ISPUSHAPPID__');
                // location.href = "https://liecai.bethye.top/pages/download/download.html";
                comm.setCookie("__mobile__",self.tel,2);
                comm.setCookie("__token__",result.token,2);
                Util.redirect('/mine?isPush=2');
            })
        },
        scrollTop (){
            document.documentElement.scrollTop = document.body.scrollTop =0;
            this.$refs.wraper.scroll = 0;
        }
    },
    watch : {
        '$route' : function(){
            clearInterval(this.timer);
        }
    },
    components:{
        download
    }

}
</script>
<style scoped>
img{
    display: block;
}
.content{
    width: 100%;
    height: 7.88rem;
    background: url('./images/register_bg.jpg') no-repeat center;
    background-size: cover;
    padding:0 .2rem;
}
.recommend{
    padding-top: .55rem;
    padding-bottom: .3rem;
    font-size: .28rem;
    color: #fff;
}
.input-wrapper{
    width: 6.9rem;
    height: .9rem;
    border-radius: .45rem;
    background-color: #fff;
    font-size: 0;
    margin-top: .3rem;
}
.input-wrapper label{
    width: .3rem;
    height: 100%;
    display: inline-block;
    margin-left: .45rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
    margin-right: .3rem;
}
.mobile{
    background-image: url("./images/phone_icon.png");
}
.vcode{
    background-image: url('./images/identify_code_icon.png')
}
.password{
    background-image: url('./images/password_icon.png');
}
.input-wrapper input{
    height: 100%;
    width: 5.4rem;
    font-size: .3rem;
}

.input-wrapper2{
    width: 6.9rem;
    height: .9rem;
    font-size: 0;
    margin-top: .3rem;
}
.input-wrapper2 .vcode-wraper{
    display: inline-block;
    width: 3.9rem;
    height: 100%;
    background-color: #fff;
    border-radius: .45rem;
    margin-right: .2rem;
    font-size: 0;
}
.vcode-wraper .vcode{
    width: .3rem;
    height: 100%;
    display: inline-block;
    margin-left: .45rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
    background-image: url('./images/identify_code_icon.png');
    margin-right: .3rem;
}
.vcode-wraper input{
    height: 100%;
    width: 2.4rem;
    font-size: .3rem;
}
.input-wrapper2 .vcode-button{
    display: inline-block;
    width: 2.8rem;
    height: 100%;
    background-color: #f8cb55;
    border-radius: .45rem;
    color: #fff;
    font-size: .3rem;
    line-height: .9rem;
    text-align: center;
}
.gray{
    background-color: #f4a951!important;
}
.eye{
    display: inline-block;
    width: .3rem;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
}
.eye-close{
    background-image: url("./images/eye_close.png");
}
.eye-open{
    background-image: url("./images/eye_open.png");
}
/***************************************/
.register-wraper{
    width:100%;
    height: .9rem;
}
.register{
    width: 100%;
    height: 100%;
    margin-top: .3rem;
    background-color: #f8cb55;
    border-radius:.45rem;
    text-align: center;
    line-height: .9rem;
    font-size: .36rem;
    color: #fff;
}

.agreement{
    padding-top: .4rem;
    text-align: center;
    font-size: .3rem;
}
.agreement span{
    display: inline-block;
    width: .25rem;
    height: .25rem;
    border: 1px solid #fff;
    border-radius: 3px;
    margin-top: -.02rem;
    margin-right: .1rem;
}
.agreement a{
    color: #fff;
    display: inline-block;
}

.select{
    background: url("./images/hook.png") no-repeat center;
    background-size: 100% auto;
}


.register-box{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 2.1rem;
    background: url("./images/register_bg.jpg") no-repeat center;
    background-size: 100% auto;
    padding: 0 .2rem;
}

.register-to-top{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -3.45rem;
    margin-top: -.45rem;
    width: 6.9rem;
    height: .9rem;
    background-color: #f8cb55;
    border-radius: .45rem;
    text-align: center;
    line-height: .9rem;
    font-size: .36rem;
    color: #fff;
}
.download {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>

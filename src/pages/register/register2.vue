<template>
<div class="register2-container">
    <p class="msg">验证码已发短信至 {{mobile | desensitization}}</p>

    <div class="input-wrapper">
        <ul>
            <li>
                <label for="vcode">验证码</label>
                <input id="vcode" type="text" placeholder="请输入验证码" autofocus v-model="identifyingCode" maxlength="4">
                <span v-if='status==0'>{{identifyingCodeTips}}</span>
                <span v-else class="send" @click="sendCode()">{{identifyingCodeTips}}</span>
            </li>
            <li>
                <label for="firstPassword">输入密码</label>
                <input id ="firstPassword" type="password" placeholder="6~20位数字、字母和字符组合" v-model="firstPassword">
            </li>
            <li>
                <label for="againPassword">确认密码</label>
                <input id ="againPassword" type="password" placeholder="请您再次输入密码" v-model="againPassword" >
            </li>
        </ul>
    </div>

    <div class="agreement">
        <span :class="select" @click="serviceAgreement"></span>
        <router-link :to="{name : 'serviceAgreement'}">我同意《貅比特用户服务协议》</router-link>
    </div>

    <a class="button" style="margin:0 .3rem;" @click="registerMatch">完成</a>
    <!--<p class="custom-service">客服电话0755-86725461</p>-->
</div>
</template>
<script>
import service from "../../resource/service";
import Util from "../../common/util";
export default{
    name : 'register2',
    data (){
        return {
            select : "select",
            mobile : this.$route.query.mobile,
            customService :true,
            identifyingCode : "",
            identifyingCodeTips:"重新获取(60s)",
            firstPassword : "",
            againPassword : "",
            status : 0
        }
    },
    created (){
        this.gainIdentifyingCode();
    },
    methods : {
        identifyingCodeTimer (){
            var self = this;
            var times = 60;
            this.timer = setInterval(function(){
                self.identifyingCodeTips     = "重新获取("+(--times)+"s)";
                if(times == 0){
                    self.status = 1;
                    self.identifyingCodeTips = '重新获取';
                    clearInterval(self.timer);
                }
            },1000);
        },
        gainIdentifyingCode (){
            var self = this;
            service.serverRequest("sendVcode",{
                mobile:this.$route.query.mobile,
                type  : 1,
            },function(){
                self.identifyingCodeTimer();
                self.status = 0;
            });
        },
        registerMatch (){
            if(!this.select){
                Vue.popup.tips("请同意貅比特服务协议");
                return;
            }
            if(!this.identifyingCode){
                Vue.popup.tips("请输入验证码");
                return;
            }
            if(!this.firstPassword){
                Vue.popup.tips("请输入密码");
                return;
            }
            if(!this.againPassword){
                Vue.popup.tips("请再次输入密码");
                return;
            }
            if(!(this.firstPassword === this.againPassword)){
                Vue.popup.tips("两次输入的密码不一致,请重新输入");
                this.firstPassword = "";
                this.againPassword = "";
                return;
            }
            this.registerFinish();
        },
        registerFinish (){
            var self = this;
            var recommendCode = self.$route.query.recommendCode || "";
            service.serverRequest('register',{
                mobile   : self.mobile,
                password : self.firstPassword,
                vcode    : self.identifyingCode,
                recommendCode : recommendCode,
                fromUrl  : sessionStorage.getItem('__referer__'),
                accessUrl: sessionStorage.getItem('__href__'),
            },(result)=>{
                comm.setCookie("__mobile__",self.mobile,2);
                comm.setCookie("__token__",result.token,2);
                sessionStorage.removeItem('__ISPUSHAPPID__');
                Util.redirect('/mine?isPush=1');
            })
        },
        serviceAgreement (){
            if(this.select == "select"){
                this.select = "";
            }else{
                this.select = "select";
            }
        },

        sendCode : function(event){
            this.gainIdentifyingCode();
        }
    },

    watch : {
        '$route' : function(){
            clearInterval(this.timer);
        }
    }
}
</script>
<style scoped>
.msg{
    height: .7rem;
    padding-left: .25rem;
    line-height: .7rem;
    font-size: .28rem;
    color: #323232;
}

.input-wrapper li{
    display: flex;
    position: relative;
    background-color: #fff;
    height: 1rem;
    padding:0 .25rem;
    border-top:1px solid #dcdcdc;
    align-items: center;
}

.input-wrapper li:first-child{
    margin-bottom: .7rem;
    border-bottom: 1px solid #dcdcdc;
}

.input-wrapper li:last-child{
    border-bottom: 1px solid #dcdcdc;
}

.input-wrapper li label{
    font-size: .32rem;
    flex: 0 0 20%;
}

.input-wrapper li input{
    vertical-align: -1px;
    font-size: .32rem;
    vertical-align: 1px;
    padding-left:.2rem;
    height: 0.5rem;
    width:80%;
    flex: 0 0 80%;
}
.input-wrapper li:first-child span{
    position: absolute;
    right: .25rem;
    top: .36rem;
    border-left: 1px solid #dcdcdc;
    padding-left:.2rem;
    color:#c8c8c8;
}
.input-wrapper li:first-child label{
    flex: 0 0 1.28rem;
}

.input-wrapper li:first-child span.send{
    color:#12b7f5;
}

.agreement{
    margin-top: .55rem;
    margin-bottom: .7rem;
    text-align: center;
    height: .35rem;
    line-height:.35rem;
}
.agreement span{
    display: inline-block;
    width: .35rem;
    height: .35rem;
    border-radius: 5px;
    border: 1px solid #dcdcdc;
    vertical-align:middle;
    background-color: #fff;
}
.agreement a{
    display: inline-block;
    vertical-align: middle;
    color: #007aff;
    font-size: .28rem;
}
.select{
    background: url("../../../static/images/normal/XN_FinancialManager_Institutions_check.png") no-repeat center;
    background-size: 90% auto;
}
.custom-service{
    width: 100%;
    text-align: center;
    color: #969696;
    position: absolute;
    left: 0;
    bottom: .45rem;
}
</style>

<template>
    <div class="template">
        <div class="error-msg">请输入手机号注册</div>
        <div class="input-wrapper">
            <label for="mobile">手机号码</label>
            <input id="mobile" type="tel" placeholder="请输入您的手机号码" maxlength="11" v-model="tel">
        </div>
        <a class="button" @click="nextStep">下一步</a>
        <p class="login">已有账号？直接<router-link :to="{name : 'login'}" style="color:#007aff;margin-left:2px">登录</router-link></p>
        <p class="custom-service" v-show="customService">客服电话 400-888-6987</p>
    </div>
</template>
<script>
import service from "../../resource/service";
export default {
    name : 'register',
    data (){
        return {
            tel  :"",
            recommendCode:this.$route.query.recommendCode || '',
            customService:true,
        }
    },
    methods :{
        nextStep (){
            if(this.tel.length == 0){
                Vue.popup.tips("请输入手机号码");
                return false;
            }

            if(!/^1\d{10}$/.test(this.tel)){
                Vue.popup.tips("请输入正确的手机号码");
                return false;
            }

            service.serverRequest("checkMobile",{
                mobile        : this.tel,
                recommendCode : this.recommendCode
            },(result)=>{
                if(result.regFlag == 0){
                    this.$router.push('/register/register2?mobile='+this.tel)
                }else if(result.regFlag == 2){
                    this.$router.push('/login/login')
                }
            })
        }
    }
}
</script>

<style scoped>
.template{
    height:100%;
}

.template .error-msg{
    height: .7rem;
    padding-left: .25rem;
    line-height: .7rem;
    font-size: .28rem;
    color: #323232;
}
.template .input-wrapper{
    width: 100%;
    height: 1rem;
    padding: .25rem;
    background-color: #fff;
}

.template .input-wrapper label{
    color:#323232;
    font-size: .30rem;
}

.template .input-wrapper input{
    vertical-align: -1px;
    font-size: .30rem;
    height: 0.5rem;
    padding-left:.2rem;
}

.template a.button{
    margin:.5rem .25rem;
}

.template .login{
    margin-top: .7rem;
    text-align: center;
    font-size: .28rem;
    color: #000;
}
.template .login a{
    display: inline-block;
}
.template .custom-service{
    width: 100%;
    text-align: center;
    color: #969696;
    position: absolute;
    left: 0;
    bottom: .45rem;
}
</style>

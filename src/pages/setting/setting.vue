<template>
    <div class="wraper">
     <div class="inputBox">
        <div>
            <label>姓名</label>
            <input type="text" placeholder="请输入持卡人姓名" length="10" v-model="name">
        </div>
        <div>
            <label>身份证</label>
            <input type="text" placeholder="请输入持卡人身份证号" length="18" v-model="identity">
        </div>
     </div>
     <div class="inputBox">
        <div>
            <label>银行卡</label>
            <input type="tel" placeholder="请输入银行卡号" length="22" v-model="card">
        </div>
        <div class="select-bank">
            <label>开户银行</label>
            <select v-model="openBank" :class="{selectColor:openBank}">
                <option value="" disabled>请选择开户银行</option>
                <option v-for="bank in banks" :value="bank">{{bank.bankName}}</option>
            </select>
        </div>
     </div>
     <div class="inputBox">
        <div>
            <label>手机号码</label>
            <input type="tel" placeholder="请输入银行预留手机号码" length="11" v-model="mobile">
        </div>
     </div>
     <div class="buttonBox"><a class="button" @click="bindCard">绑定</a></div>
    </div>
</template>
<script>
import service from '../../resource/service';  
export default{
    name :"bind",
    data (){
        return {
            banks:[],
            //bank:new Set();
            name:"",
            identity:"",
            bank:"",
            mobile:"",
            card:"",
            openBank:"",
            Pattern:{
                nameReg : /^[\u4e00-\u9fa5]{2,}$/,
                identifyReg : /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                cardReg : /^\d{16}|\d{19}$/,
                mobileReg : /^1\d{10}$/
            }
        }
    },
    created (){
      var self = this;
      service.serverRequest('queryAllBank',(result)=>{
        self.banks = result.datas;
        // for(let list of result.datas){
        //     self.banks.add(list)
        // }
        // self.banks = Array.from(self.banks)
      })
    },
    methods:{
       validate (){  
          if(this.name == ""){
             return '请输入持卡人姓名';
          }
          if(!this.Pattern.nameReg.test(this.name)){
             return '请输入正确的持卡人姓名';
          }
          if(this.identity == ""){
             return '请输入持卡人身份证号';
          }
          if(!this.Pattern.identifyReg.test(this.identity)){
             return '请输入正确持卡人身份证号';
          }     
          if(this.card == ""){
             return '请输入银行卡号';
          }
          if(!this.openBank){
              return '请选择开户银行';
          }      
          if(!this.Pattern.cardReg.test(this.card)){
             return '请输入正确的银行卡号';
          }
          if(this.mobile == ""){
             return '请输入银行预留手机号码';
          }
          if(!this.Pattern.mobileReg.test(this.mobile)){
             return '请输入正确的银行预留手机号码';
          }
          return true;
       },
       bindCard (){
        const self = this;
        const result = self.validate();
          if(result == true){
            self.submit();
          }else{
            Vue.popup.tips(result)
          }
        },
       submit (){
        var self = this;
        service.serverRequest('addBankCard',{
            bankCard : self.card,
            bankCode : self.openBank.bankCode,
            bankId   : self.openBank.bankId,
            bankName : self.openBank.bankName,
            idCard   : self.identity,
            mobile   : self.mobile,
            userName : self.name
        },(result)=>{
          location.hash = '/setting/bindCardSuccess';
        })
       }
    }
}
</script>
<style scoped>
    .inputBox{
      margin:.25rem 0;
    }

    .inputBox > div{
      height:.92rem;
      line-height: .92rem;
      background-color: #fff;
      padding-left:.25rem;
      box-sizing: border-box;
    }

    .inputBox > div:nth-child(2){
        border-top:1px solid #f1f1f1;
    }

    .inputBox label{
        display: inline-block;
        font-size: .33rem;
        width:1.84rem;
        box-sizing: border-box;
    }
    input,
    select{
        height:.9rem;
        line-height: .9rem;
        box-sizing: border-box;
        vertical-align: top;
        border:none;
        width:70%;
        font-size: .33rem;
        color: #000;
        background-color: #fff;
    }
    .select-bank select{
        /*很关键：将默认的select选择框样式清除*/
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        opacity: 1;
        color: #dcdcdc;
        outline: none;
    }
    .selectColor{
        color:#000!important;
    }
    .buttonBox{
        margin: .62rem .21rem;
    }
    option{
        color: #000;
    }
    .color{
       color:#323232;
    }
</style>
<template>
    <div class="bind-container">
        <input type="password" style="position:absolute;height:0;top:-10000px;">
      <div class="title">请绑定持卡人的银行卡</div>
      <div class="section">
        <div class="inputBox border-bottom-1px">
          <div>
              <label for="name">持卡人</label>
              <input id="name" type="text" placeholder="请输入姓名" length="10" v-model="name" @blur="validate('name')" :class="{active:nameError}">
          </div>
        </div>
        <div class="inputBox border-bottom-1px">
           <div>
               <label for="idcard">身份证</label>
               <input id="idcard" type="text" placeholder="请输入身份证号" length="18" v-model="identity" @blur="validate('identity')" :class="{active:identityError}">
           </div>
            <div class="del-icon-wrap"  @click.stop="delIdCard" v-if="identity.length >=6">
                <img src="./../../assets/del-ico.png" class="del-icon">
            </div>
        </div>
      </div>
      <div class="section">
         <div class="inputBox">
           <div>
               <label for="bankcard">银行卡</label>
               <input id="bankcard" type="tel" placeholder="请输入储蓄卡号" @input.stop="inputCardEvent($event)" @blur="validate('card')" :class="{active:cardError}">
           </div>
           <div class="del-icon-wrap" @click.stop="delBankCard" v-if="card.length >= 6">
            <img src="./../../assets/del-ico.png" class="del-icon" />
           </div>
        </div>
      </div>

     <p class="danger-tips">{{dangerTips}}</p>
     <div class="buttonBox"><a class="button" @click="bindCard" :class="{active:canGoNext}">下一步</a></div>
    </div>
</template>
<script>
export default{
    name :"bind",
    data (){
        return {
            name:"",
            identity:"",
            bank:"",
            card:"",
            openBank:"",
            // 是否能进行下一步
            canGoNext:false,
            // 名字错误
            nameError:false,
            // 身份证号错误
            identityError:false,
            // 银行卡号错误
            cardError:false,
            // 报错提示
            dangerTips:"",
            Pattern:{
                nameReg : /^[\u4e00-\u9fa5]{2,}$/,
                identifyReg : /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                cardReg : /^\d{16}|\d{19}$/
            }
        }
    },
    methods:{
       validate (val){
            // 重置
            this.nameError = false;
            this.identityError = false;
            this.cardError = false;
            this.dangerTips = "";

            if(val === 'name' && this.name && !this.Pattern.nameReg.test(this.name)){
                this.dangerTips = '姓名必须是中文,输入有误';
                this.nameError = true;
            }

            if(val === 'identity' && this.identity && !this.Pattern.identifyReg.test(this.identity)){
                this.dangerTips = '请输入正确的身份证号';
                this.identityError = true;
            }

            if(val === 'card' && this.card && !this.Pattern.cardReg.test(this.card)){
                this.dangerTips = '请输入正确的银行卡号';
                this.cardError = true;
            }
       },
       inputCardEvent($event){
            let val = $event.target.value;
            val = val.replace(/(\d{4})(?=\d)/g, "$1 ");
            $event.target.value = val;
            this.card = val.replace(/\s/g,"")
            if(this.card.length >= 19){
                this.card = this.card.substr(0,19)
                $event.target.value = this.card.replace(/(\d{4})(?=\d)/g, "$1 ");
            }
       },
       canGoNextEvent(){
        if(this.Pattern.nameReg.test(this.name) && this.Pattern.identifyReg.test(this.identity) && this.Pattern.cardReg.test(this.card)){
          this.canGoNext = true;
        }else{
            this.canGoNext = false
        }
       },
       bindCard (){
            if(this.canGoNext){
                sessionStorage.setItem('__BINDCARDINFO__',JSON.stringify({
                    name:this.name,
                    identity:this.identity,
                    card:this.card
                }))
                this.$router.replace('/setting/bindCard2')

            }
       },
       // 清空身份证输入框
       delIdCard(){
        this.identity = "";
        this.dangerTips = '';
        this.identityError = false;
       },
       // 清空银行卡输入框
       delBankCard(){
        this.card = "";
        this.dangerTips = '';
        this.cardError = false;
       }
    },
    watch:{
      name(curVal,oldVal){
        this.canGoNextEvent()
      },
      identity(curVal,oldVal){
        this.canGoNextEvent()
      },
      card(curVal,oldVal){
        this.canGoNextEvent()
      }
    }
}
</script>
<style scoped>
  .bind-container .title{
    height: .7rem;
    font-size:.28rem;
    padding-top: .3rem;
    padding-left: .3rem;
    color: #9197a6;
    line-height: 1;
  }
  .bind-container .section{
    padding-left: .3rem;
    background-color: #fff;
  }
  .bind-container .inputBox{
    display: flex;
    height: 1rem;
    align-items: center;
    justify-content: space-between;
    padding-right: .3rem;
  }
  .bind-container .inputBox > div{
    height:1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .bind-container .inputBox label{
    display: block;
    font-size: .32rem;
    width:1.84rem;
    box-sizing: border-box;
    color: #5f6678;
  }
  .bind-container .inputBox > div img{
    width:.3rem;
    height: .3rem;
    box-sizing: content-box;
    padding-right: .3rem;
  }
  .bind-container input{
      height:.5rem;
      line-height: .5rem;
      box-sizing: border-box;
      vertical-align: middle;
      border:none;
      width:4.6rem;
      font-size: .32rem;
      color: #3b4257;
      background-color: #fff;
  }
  .bind-container .button{
    background-color: #cdcdce;
  }
  .bind-container .button.active{
    background-color: #4e8cef;
  }
  .bind-container .del-icon-wrap{
    display: flex;
    width: .6rem;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .bind-container .del-icon{
    width:.2rem;
    height: .2rem;
  }
  .bind-container .danger-tips{
    padding-left: .3rem;
    font-size:12px;
    color: #ff0808;
    line-height: .3rem;
    text-align: center;
    padding-top: .1rem;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
      color:    #9197a6;
  }
</style>

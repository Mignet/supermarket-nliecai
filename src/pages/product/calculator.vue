<template>
<div class="template" style="height:100%;">
<ul>
<li>
    <div class="canEdit" v-if="limitEdit">
        <span>产品期限</span>
        <div>
            <input type="number" placeholder="请输入对应的天数" maxlength="6" v-model="productLimit" v-on:keyup="changeProfit">
            <span>天</span>
        </div>
    </div>
    <div class="unCanEdit" v-else>
        <span style="position:absolute;left:.25rem;top: 0;">产品期限</span>
        <span style="width:2.2rem;text-align:right;">{{productLimit}}&nbsp;&nbsp;天</span>   
    </div>
</li>
<li>
    <span>销售佣金</span>
    <div>
        <input autofocus type="number" placeholder="请输入对应的金额" v-model="amt" v-on:keyup="changeProfit" oninput="if(value.length>9)value=value.slice(0,9)">
        <span>元</span>
    </div>
</li>
<li style="margin-bottom: .25rem;">
    <span>年化佣金</span>
    <span style="width:2.2rem;padding-left:.1rem;">{{feeRatio}}%</span>
</li>
<li>
    <span>预期佣金</span>
    <div>
        <span style="width:1.8rem;text-align:right;color: #fd5353;">{{wishProfit}}</span>
        <p style="padding-left: .1rem;">元</p>
    </div>
</li>
</ul>
<a class="button">确定</a>
</div>
</template>
<script>
    import Vue from "vue";
    import service from '../../resource/service';

    export default {
        data (){
            return {
                productId:this.$route.query.productId,
                feeRatio : this.$route.query.feeRatio,
                amt:1000,
                productLimit : "",
                wishProfit : "",
                limitEdit  :false,
            }
        },
        created (){
            this.initProfit();
        },
        methods : {
            initProfit (){
                var self = this;
                service.serverRequest('profitCalculate',{
                  productId : this.productId,
                  amount    : this.amt,
                  day       : this.productLimit
                },(result)=>{
                    for(let data of result.datas){
                        if(data.profiltName == "产品期限"){
                            self.productLimit = data.profiltValue;
                            if(data.isEdit){
                                self.limitEdit = true;
                            }
                        }else if(data.profiltName == "预期佣金"){
                            self.wishProfit = data.profiltValue
                        }
                    }
                })
            },
            changeProfit (){
                let numReg = /^\d+$/;
                if(!numReg.test(this.amt) && this.amt){
                    Vue.popup.tips("请输入数字");
                    this.amt = 1000;
                    return;
                }
                this.initProfit();
            }
        }
    }
</script>
<style scoped>
span,
input{
    display: inline-block;
}
li{
    position: relative;
    width: 100%;
    padding: 0 .25rem;
    background-color: #fff;
    height: .87rem;
    border-bottom: 1px solid #dcdcdc;
    line-height: .87rem;
}
li:last-child{
    border-top: 1px solid #dcdcdc;
}
li > span:first-child{
    position: absolute;
    left: .25rem;
    top: 0;
}
li > span:last-child{
    position: absolute;
    right: .25rem;
    top: 0;
    text-align: right;
}
li:nth-of-type(2) > span:first-child{
}
li input {
    text-align: right;
    width: 2.65rem;
    height: .5rem;
    background-color: #fafafa;
    padding: 0 .14rem;
    border-radius: 3px;
    color: #323232;
    border: 1px solid #dcdcdc;
}
li > div{
    position: absolute;
    right: .25rem;
    top: 0;
}
li:first-child > div{
    position: static;
}
li p{
    display: inline-block;
}
.canEdit{
    position: relative;
    width: 100%;
    height: 100%;
}
.canEdit span:first-child{
    position: absolute;
    left: .25rem;
    top: 0;
}
.canEdit div{
   position: absolute;
    right: .25rem;
    top: 0;
}
.unCanEdit{
    position: relative;
    width: 100%;
    height: 100%;
}
.unCanEdit span:first-child{
    position: absolute;
    left: .25rem;
    top: 0;
}
.unCanEdit span:last-child{
    position: absolute;
    right: .25rem;
    top: 0;
}
.button{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    max-width: 10rem;
    margin: 0 auto;
    width: 100%;
}
</style>
<template>
<div style="height:100%;">
   <ul v-scroll='loadMore' v-show="items.length">
        <li v-for="item in items" class="clearfix"> 
            <div class="item-t">
                <img :src="item.headImage">
                <div>
                    <p style="font-size:0.33rem;padding:.05rem 0;line-height: 1em;">
                        <span style="padding-right:.24rem;border-right:1px solid #dcdcdc;line-height: 1em;display:inline-block;">{{item.userName}}</span>
                        <span style="padding-left:.24rem;display:inline-block;">{{item.mobile}}</span>
                    </p>
                    <p>{{item.registerTime}}&nbsp;&nbsp;注册</p>
                </div>
            </div>
            <div class="item-b arrow" @click="download">
                <p>最近投资:{{item.nearInvestAmt}}元</p>
                <p>累计投资:{{item.totalInvestAmt}}元</p>
                <p>投资笔数:{{item.totalInvestCount}}</p>
            </div>
        </li>
    </ul>
    <Empty :empty-msg = "emptyMsg" v-show="emptyMsg" style="height:100%;"></Empty>
</div>
</template>
<script>
   import service from '../../resource/service';
   import Env     from '../../resource/env';
   import Empty   from '../../components/empty/empty';
   
   export default{
        data (){
           return {
            items:[],
            pageIndex:1,
            pageCount : "",
            emptyMsg:"",
           }
        },
        created (){
            this.render();
        },
        methods:{
            render (){
                var self = this;
                service.serverRequest('mycustomerpageList',{
                    pageIndex:self.pageIndex,
                    sort     : 2,
                    order    : 1
                },(result)=>{
                    if(result.datas && result.datas.length){
                        self.items.push.apply(self.items,self.listFilter(result.datas));
                        self.pageCount = result.pageCount;
                    }else{
                        self.emptyMsg = "暂无客户哦~";
                    }
                })
            },
            listFilter (datas){
                for(let data of datas){
                    if(data.headImage){
                        data.headImage = Env.imgUrl +"/"+ data.headImage;
                    }else{
                        data.headImage = "../../../static/images/mine/client_default.png"
                    }
                    if(!data.totalInvestCount){
                        data.totalInvestCount = 0;
                    }
                    data.nearInvestAmt =  (data.nearInvestAmt*1).toFixed(2);
                    data.totalInvestAmt = (data.totalInvestAmt*1).toFixed(2);
                }
                return datas;
            },            
            loadMore() {
                if(this.pageIndex < this.pageCount){
                    this.pageIndex ++;
                    this.render();
                }
            },
           download(){
                Vue.popup.show({
                    title: '温馨提示',
                    msg  : '进入提现、收益明细、个人中心等更多操作，请下载APP体验完整版',
                    btn : [{
                      name: '取消',cb : function(){this.close()}
                    },{
                      name: '去下载',cb : function(){
                         this.close();
                         //location.hash = '/download/download';
                         location = "http://liecai.tophlc.com/pages/download/download.html";
                      }
                    }]
                })          
           }
        },
        directives :{
            scroll: {
                bind: function (el, binding){
                    var self = this;
                    window.addEventListener('scroll', ()=> {
                    if(document.body.scrollTop + window.innerHeight >= el.offsetHeight) {
                        let loadMore = binding.value;   
                        loadMore(); 
                    }
                  })
                }
            },
        },
        components:{
            Empty
        }
    }
</script>
<style scoped>
ul{
    margin-top: .74rem;
}
ul li{
    border-bottom: 1px solid #dcdcdc;
    padding-top: .22rem;
    background-color: #fff;
    padding-left: .25rem;
    margin-bottom: .25rem;
}
.item-t{
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: .2rem;
}
.item-t img{
    display: inline-block;
    width: .8rem;
    height: .8rem;
    margin-right: .27rem;
    border-radius: 50%;
}
.item-t div{
    display: inline-block;
}
.item-t p:first-child{
    font-size: .33rem;
    color: #323232;
}
.item-t p:last-child{
    padding-top: .1rem;
    font-size: .25rem;
    color: #969696;
}
.item-b{
    padding: .2rem 0;
}
.item-b p{
    color:#969696;
    font-size:.25rem;
}
</style>
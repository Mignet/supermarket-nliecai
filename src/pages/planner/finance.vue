<template>
    <div style="height:100%;">
        <ul v-scroll='loadMore' v-show="items.length">
            <li class="arrow clearfix" v-for="item of items" @click="download">
                <div class="finance-left">   
                    <img :src="item.headImage">
                </div>
                <div class="finance-center">
                    <p><span>{{item.userName}}</span><span>{{item.mobile}}</span></p>
                    <p>直接推荐奖励：{{item.allowance}}</p>
                    <p>间接推荐奖励：{{item.childrenAllowance}}</p>
                </div>
                <div class="finance-right" >
                    <p>下级:{{item.newSubordinateCount}}人</p>
                    <p>{{item.registerTime}}注册</p>
                </div>
            </li>
        </ul>
        <Empty :empty-msg = "emptyMsg" v-show="emptyMsg" style="height:100%;"></Empty>
    </div>
</template>
<script>
    import service from '../../resource/service';
    import Env from '../../resource/env';
    import Empty from '../../components/empty/empty.vue';
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
                service.serverRequest('plannerList',{
                    pageIndex:self.pageIndex,
                    sort     : 2,
                    order    : 1,
                },(result)=>{
                    if(result.datas && result.datas.length){
                        self.items.push.apply(self.items,self.listFilter(result.datas));
                        self.pageCount = result.pageCount;
                    }else{
                        self.emptyMsg = "暂无理财师团队哦~";
                    }

                })
            },
            listFilter (datas){
                for(let data of datas){
                    if(data.headImage){
                        data.headImage = Env.imgUrl +"/"+ data.headImage;
                    }else{
                        data.headImage = "../../../static/images/mine/planner_default.png";
                    }
                    if(!data.totalInvestCount){
                        data.totalInvestCount = 0;
                    }
                    
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
        margin-bottom: .25rem;
        background-color: #fff;
        padding-top: .18rem;
        padding-left: .25rem;
    }
    ul li > div{
        float: left;
    }
    .finance-left {
        width: .69rem;
        height: .69rem;
        margin-right: .2rem;
    }
    .finance-left img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .finance-center p:first-child{
        font-size: .33rem;
        color: #323232;
        line-height: 1em;
        padding: .05rem 0;
    }
    .finance-center p:first-child span:first-child{
        display: inline-block;
        padding-right: .24rem;
        border-right: 1px solid #dcdcdc;
    }
    .finance-center p:first-child span:last-child{
        padding-left: .24rem;
    }
    .finance-center p:nth-of-type(2){
        padding-top: .15rem;
    }
    .finance-center p:nth-of-type(3){
        padding-bottom: .15rem;
    }
    .finance-center p:nth-of-type(2),.finance-center p:nth-of-type(3){
        color: #969696;
        font-size: .25rem;
        line-height: 1.8em;
    }
    .finance-right{
        float: right;
        text-align: right;
        padding-right: .62rem;
        font-size: .21rem;
        color: #969696;
        line-height: 2em;
        padding-top: .4rem
    }
</style>
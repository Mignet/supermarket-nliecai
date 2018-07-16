<template>
	<div class="msg-wrapper" style="height: 100%;">
		<ul v-scroll="loadMore">
            <li class="clearfix" v-for="list in lists" @click="setHasRead(list)" >
                <img src="../../../static/images/message/icon_light.png">
                <div>
                    <p :class="{'font-gray':list.read == 1}">{{list.crtTime}}</p>
                    <p :class="{'font-gray':list.read == 1}">{{list.content}}<router-link :to="{name:'planner',query:{currentView:list.linkUrlKey}}">{{list.linkBtnTxt}}</router-link></p>
                </div>
            </li>
        </ul>
        <Empty :empty-msg = "emptyMsg" v-show="emptyMsg"></Empty>
	</div>
</template>
<script>
    import service from "../../resource/service";
    import Empty   from '../../components/empty/empty';
    export default{
        data (){
            return {
                lists : [],
                pageIndex:1,
                pageCount : "",
                emptyMsg :"",
            }
        },
        created (){
            this.render();
        },
        methods:{
            loadMore() {
                if(this.pageIndex < this.pageCount){
                    this.pageIndex ++;
                    this.render();
                }
            },
            render(){
                var self = this;
                service.serverRequest('personList',{
                    pageIndex : self.pageIndex,
                },(result)=>{
                    if(result.datas && result.datas.length > 0){
                        self.lists.push.apply(self.lists,self._filter(result.datas));
                        self.pageCount = result.pageCount;
                    }else{
                        self.emptyMsg = "暂无消息哦~";
                    }
                })
            },
            _filter(result){
                for(let item of result){
                    // item.read = 0;
                    // item.linkBtnTxt = "点击立即查看"
                    // item.linkUrlKey = "myCfp_platform";
                }
                return result;
            },
            //通知设置为已读
            setHasRead(list){
                if(list.read ==1){
                    return false;
                }
                var self = this;
                service.serverRequest('readed',{
                    msgIds : list.id,
                },(result)=>{
                    list.read = 1 ;
                })
            },
            allSetHasRead(){
                service.serverRequest('allReaded',(result)=>{
                    
                })
            }
        },
        directives :{
            scroll: {
                bind: function (el, binding){
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
    width: 100%;
    padding-left:.25rem;
    background-color: #fff;
    border-bottom: 1px solid #dcdcdc;
}
ul li {
    padding-top: .35rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #dcdcdc;
}
ul li:last-child{
    border-bottom: 0;
}
ul li img{
    width: .25rem;
    float: left;
    margin-right: .15rem;
}
ul li div{
    float: left;
    width: 6.6rem;
}
ul li div p:first-child{
    line-height: 1em;
    color: #646464;
    font-size: .25rem;
}
ul li div p:last-child{
    padding-top: .2rem;
    line-height: 1.5em;
    font-size: .25rem;
    color: #646464;
}
ul li div p:last-child a{
    color: #3057fd;
}
.font-gray{
    color: #969696!important;
}
</style>
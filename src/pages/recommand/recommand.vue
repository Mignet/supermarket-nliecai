<template>
    <div class="template" v-show="totalShow">
        <ul>
            <li v-for="list in lists" @click="select(list)">
                <div class="check-status" :class="list.checkStatus"></div>
                <div class="person">
                    <p>{{list.userName}}</p>
                    <p>{{list.mobile}}</p>
                </div>
            </li>
        </ul>
        <button @click="submit" ref="num">
            <p>推荐({{checkedLen}})</p>
            <p>自己购买猎财产品，佣金和收益可以一起拿哦</p>
        </button>
    </div>
</template>
<script>
    import service from '../../resource/service';
    import Vue from 'vue';
    export default{
        name:"recommend",
        data (){
            return {
                totalShow:false,
                lists:[],
                productId:this.$route.query.productId,
                checkStatus:"uncheck",
                userIdSet:[],
                userIdString:"",
                checkedLen : 0
            }
        },
        created (){
            var self = this;
            service.serverRequest('recommendChooseList',{
              productId : self.productId,
            },(result)=>{
                self.lists = self.listFilter(result.allFeeList);
                self.totalShow = true;
            })
        },
        methods:{
            listFilter (result){
                var self = this;
                for(let list in result){
                    if(result[list].userName == ""){
                       result[list].userName = "未认证"; 
                    }
                    if(!result[list].ifRecommend == 0){
                        result[list].checkStatus = "checked";
                        self.userIdSet.push(result[list].userId);
                    }else{
                        result[list].checkStatus = "uncheck";
                    }
                }
                self.checkedLen = self.userIdSet.length;
                return result;
            },
            select (list){
                var self = this;
                if(list.checkStatus == "uncheck"){
                    list.checkStatus = "checked"; 
                    self.userIdSet.push(list.userId);
                }else if(list.checkStatus == "checked"){
                    list.checkStatus = "uncheck";
                    var index = self.userIdSet.indexOf(list.userId);
                    if (index > -1) {self.userIdSet.splice(index, 1);}
                }
                self.checkedLen = self.userIdSet.length;
                // 这个在小米机型无效，通过异步延迟来处理
                this.$refs.num.style.display = 'none';
                setTimeout(function(){
                    self.$refs.num.style.display = '';                  
                },0)    
            },
            submit:function(){
                var self = this;
                if(!self.checkedLen){
                    Vue.popup.confirm({
                        title:"",
                        msg:"您未选择任何客户,确认不做推荐",
                        okText :"确认",
                        okCb:function(){
                            self.recommendAvatar();
                            window.history.go(-1);
                        }
                    });
                    return;
                }
                Vue.popup.confirm({
                    title:"推荐给客户",
                    msg:"推荐后客户将收到你推荐的产品,且可能收到电话回访",
                    okText :"确认",
                    okCb:function(){
                        self.recommendAvatar();
                    }
                });

            },
            recommendAvatar (){
                var self = this;
                service.serverRequest('recommendByChoose',{
                  productId : self.productId,
                  userIdString:Array.from(self.userIdSet).join(','),
                },(result)=>{
                    console.log(self.userIdSet)
                    if(self.userIdSet && self.userIdSet.length > 0){
                        Vue.popup.tips("推荐成功");
                    }
                    setTimeout(function(){
                        location.hash="/mine";
                    },1000)
                })
            }

        }
    }
</script>
<style lang='less' rel="stylesheet/less" scoped>
    .template{
        position: relative;
        width: 100%;
        height: 100%;
    }
    ul{
        width: 100%;
        padding:0 .25rem;
        margin-bottom: 1.04rem;
        background-color: #fff;
        li{
            position: relative;
            height: 1rem;
            border-bottom: 1px solid #efefef;
            .check-status{
                position: absolute;
                left: 0;
                top: .24rem;
                width: .45rem;
                height: .45rem;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }
            .checked{
                background-image:url("../../../static/images/normal/XN_Invite_Checked_blue.png");
            }
            .uncheck{
                background-image:url("../../../static/images/normal/XN_Home_Invite_unChecked.png");
            }
            .person{
                position: absolute;
                left: .8rem;
                height:1rem;
                top:.1rem;
                p:first-child{
                    font-size: .3rem;
                    color: #000;
                }
                p:last-child{
                    font-size: .25rem;
                    color: #969696;
                }
            }
        }
    }
    button{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1.04rem;
        background: #12b7f5;
        text-align: center;
        border: 0;
        color: #fff;
        p:first-child{
            color: #fff;
            font-size: .39rem;
            line-height: 1em;
        }
        p:last-child{
            padding-top: .1rem;
            color: #b8eafd;
            font-size: .21rem;
        }
    }
</style>
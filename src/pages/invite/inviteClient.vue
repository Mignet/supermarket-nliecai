<template>
<div class="template">
	<img class="qr-code" :src="shareData.url">
    <p>邀请客户，赚销售佣金</p>
    <ul>
        <li><span>1</span><span>将邀请链接发送给客户</span></li>
        <li><span>2</span><span>客户通过邀请链接注册成T呗用户</span></li>
        <li><span>3</span><span>若客户在T呗投资，您就可获得佣金</span></li>
    </ul>
    <a class="button" @click.stop="recommand()">立即邀请</a>
    <Layer :content="content"></Layer>
</div>
</template>
<script>
import service from '../../resource/service';
import Env     from '../../resource/env';
import share   from '../../common/share';    
import Layer   from '../../components/layer/layer';    
export default{
    data (){
        return {
            shareData :{},
            content : {
              status : false ,
              tip    : ''
            },
            shareContent : {},
        }
    },
    created(){
        var self = this;
        service.serverRequest('invitation',(result)=>{
            result.url =Env.imgUrl +"/"+ result.url;
            self.shareData = result;
            share(result.shareContent);
        });
    },
    methods : {
        recommand(){
            this.content.status = true;
            this.content.tip = '请点击右上角将本链接发送给指定朋友或分享到朋友圈';
        }
    },
      components:{
            Layer
      }
}
</script>
<style scoped>
.template{
    background-color: #fff;
    height: 100%;
}
.qr-code{
    display: block;
    width: 3rem;
    padding-top: .4rem;
    margin: 0 auto;
}
p{
    margin-top: .4rem;
    text-align:center;
    color: #646464;
    font-size: .32rem;
}
ul{
    padding: 0 .25rem;
}
ul li{
    padding:.5rem .75rem 0;
}
ul li span:first-child{
    display: inline-block;
    width: .4rem;
    height: .4rem;
    background-color: #12b7f5;
    margin-right:.1rem;
    border-radius: 50%; 
    text-align: center;
    color: #fff;
    line-height: .4rem;
    font-size: .24rem;
}
ul li span:last-child{
    color: #646464;
    font-size: .28rem;
}
.button{
    width: 7.02rem;
    margin: .86rem auto 0;
}
.share{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.share .share-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .6;
    z-index: 888;
}
.share .share-content{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.share .share-content img{
    display: block;
    padding-top: 0;
    padding-right: .75rem;
    height: 2.24rem;
    float: right;
}
.share-content p{
    width:5.15rem;
    font-size:.33rem;
    background:#7e99ce;
    color:#fff;
    border-radius: 10px;
    padding:.1rem;
    float: right;
    margin-right: .22rem;
    margin-top: .1rem;
}
</style>
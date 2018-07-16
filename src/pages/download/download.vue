<template>
    <div class="download-wrapper">
        <div>
            <div class="downloadLogoImg">
                <img src="/static/images/normal/download_logo.png" />
            </div>

            <ul class="downloadButton">
                <li v-for="item in items">
                    <h3>（{{item.version}}版本）更新时间：{{item.issueTime.trim().split(' ')[0]}}</h3>
                    <a :href="item.downloadUrl"  @click="operation($event)">
                        <img v-if="item.platform.toLowerCase() =='ios'" src="/static/images/normal/download_ios.png" />
                        <img v-if="item.platform.toLowerCase()=='android'" src="/static/images/normal/download_android.png" />
                    </a>
                </li>
            </ul>
        </div>

        <div class="downloadtip">
            <p>微信可能会禁止下载功能</p>
            <p>请在浏览器中打开本界面</p>
        </div>

        <Layer :content='content'></Layer>
    </div>
</template>

<script>
    import service from '../../resource/service';
    import Layer   from '../../components/layer/layer';
    import Util    from '../../common/util';
    import comm from './../../common/common'

    export default{
        data(){
           return {
                status  : 0,
                items   : [],
                content : {
                    status : false,
                    tip    : ''
                }
           }
        },
        created(){
          service.serverRequest('downloadAppList',(result)=>{
            this.items = result.datas;

            for(let item in result.datas){
                if(comm.isIOS() && result.datas[item].platform.toLowerCase() === 'ios' ){
                    window.location.href = result.datas[item].downloadUrl
                }

                if(comm.isAndroid() && result.datas[item].platform.toLowerCase() === 'android' ){
                    if(!comm.isWechat()){
                        window.location.href = result.datas[item].downloadUrl;
                    }
                }
            }
          });
        },
        methods:{
          operation(event){
            if(Util.isWebChat()){
                event.preventDefault();
                this.content.status = true;
                this.content.tip = '请点击右上角菜单，选择在浏览器中打开下载';
            }
          }
        },
        components:{
            Layer
        }
    }
</script>

<style scoped>

.download-wrapper{
   height:100%;
   background-color: #fff;
}

.downloadLogoImg{
   padding:1rem 0;
   text-align:center;
}

.downloadLogoImg img{
    display:inline-block;
    width:2rem;
}

.downloadButton li{
  margin-top:.2rem;
}

.downloadButton h3{
    margin:0 10%;
    width:80%;
    height: .5rem;
    line-height: .5rem;
    color:#969696;
    text-align: center;
}

.downloadButton li a{
    display: block;
    margin:0 10%;
    width:80%;
}

.downloadButton img{
    width:100%;
}

.downloadtip{
    margin-top:1rem;
    text-align: center;
}

.downloadGuide{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 99;
    background:rgba(0,0,0,0.8);
}

.shareContent{
    background:url(/static/images/normal/download_guide.png) no-repeat right top;
    background-size:auto 1.14rem;
    position: fixed;
    right:25px;
    top:10px;
    z-index:10;
    padding-top:1.14rem;
    width:3.62rem;
}

.shareContent p{
    width: 4rem;
    font-size: 0.16rem;
    background: #ef4a3c;
    color: #fff;
    border-radius: 5px;
    padding: .15rem;
}
</style>

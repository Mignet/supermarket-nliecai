<template>
  <div class="wraper">
           <div class="header">
               <img class="header-icon" src="../../../static/images/mine/mine_helpCenter_default_icon.png">
               <span class="serverInfo">
                   <p class="server-number">400-888-6987</p>
                   <p class="server-time">服务时间  9:00~12:00  13:30~18:00</p>
               </span>
               <img class="server-phone" src="../../../static/images/mine/mine_helpCenter_phone_icon.png" @click="clickPhone">
           </div>
           <div class="question-header">
               <span></span><span class="question-header-title">看看是不是下面常见问题</span>
           </div>
            <ul>
                <li class="arrow" @click="registerShow" :class="registerClass">
                    <a>注册问题</a>
                </li>
                <div class="article" v-show="registerIsShow">
                    <h4>1、注册后手机号可以更改吗？</h4>
                    <p>注册手机号作为登录账号，目前不支持更改。</p>
                    <h4>2、  我的客户可以自己注册貅比特吗？</h4>
                    <p>您名下的客户需要您的推荐才能注册成为理财师。客户成为理财师后，您将不再享受该客户的销售佣金，改为享受理财师推荐收益。</p>
                </div>
                <li class="arrow" @click="passwordShow" :class="passwordClass">
                    <a>密码问题</a>
                </li>
                <div class="article" v-show="passwordIsShow">
                    <h4>1、忘记登录密码和交易密码怎么办？</h4>
                    <p>在登录界面，点击“忘记密码”可重置登录密码。</p>
                    <p>登录后，在“我的”页面，点击头像区域，进入“个人设置—密码管理”可进行登录密码和交易密码的修改重置操作。</p>
                </div>

                <li class="arrow" @click="commissionShow" :class="commissionClass">
                    <a>佣金及收益</a>
                </li>
                <div class="article" v-show="commissionIsShow">
                    <h4>1、销售佣金如何计算？</h4>
                    <p>每款产品详情页面都显示有对应的佣金率。<p>
                    <h4>普通产品：</h4>
                    <p>销售佣金=产品销售金额×产品佣金率×产品持有时间÷360<br>
                        例如理财师的客户投资了10万元佣金率为1%、期限为180天的产品，则本笔成交理财师可获得100000×1%×180÷360=500（元）佣金。</p>
                    <h4>首投产品（带有“首投”标签）：</h4>
                    <p>
                        只有用户首次投资该机构的产品时，才会产生佣金。<br>
                        销售佣金=产品销售金额×产品佣金率×产品持有时间÷360<br>
                        （产品销售金额大于限购金额时，按限购金额进行计算。产品持有时间大于首投佣金期限时，按首投佣金期限计算）
                    </p>
                    <h4>2、推荐收益如何计算？</h4>
                    <p>A推荐B加入貅比特，B再推荐C加入。A可获得直接推荐下级B每笔佣金的25%和间接推荐下级C每笔销售佣金的5%作为推荐收益。推荐收益由平台额外发放，不影响被推荐人的佣金金额。</p>

                    <h4>3、推荐收益可以永久获取吗？</h4>
                    <p>推荐收益是可以永久享有的，不受推荐人和被推荐人的职级影响。</p>

                    <h4>4、佣金和收益的发放时间？</h4>
                    <p>每个月产生的佣金和收益等均会在次月15日发放至领会账户中</p>
                </div>
                <li class="arrow" @click="clientShow" :class="clientClass">
                    <a>关于客户</a>
                </li>
                <div class="article" v-show="clientIsShow">
                    <h4>1、什么是理财师专属客户？</h4>
                    <p>理财师自行邀请的客户（通过该理财师二维码/邀请链接成功注册投呗的用户），成为该理财师的专属客户。专属客户以后在投呗投资所有产品，理财师均可获得佣金。且该客户如果想升级为理财师身份，需由该理财师推荐。</p>
                    <h4>2、什么是团队成员？</h4>
                    <p>理财师A推荐理财师B加入，B推荐C加入，B和C都是理财师A的团队成员。A可享有B、C的推荐收益。</p>
                    <h4>3、邀请的客户不在客户列表里</h4>
                    <p>客户只要注册了，都会在客户——客户列表中显示，直接在列表中查看即可。</p>
                    <p>如果未找到，则考虑：</p>
                    <p>A、客户是否通过理财师链接注册了；</p>
                    <p>B、客户之前就已经是别人的客户了。如果都不是，请提供号码找客服进行核实。</p>
                    <h4>4、貅比特的客户关系可以更改吗？是永久绑定吗？</h4>
                    <p>貅比特是以手机号码绑定客户的，只要客户没申请更改归属关系，客户都是您的客户；如果客户180天未登录过投呗，才会解绑。</p>
                </div>
                <li class="arrow" @click="bindShow" :class="bindClass">
                    <a>银行卡绑卡及充值</a>
                </li>
                <div class="article" v-show="bindIsShow">
                    <h4>1、只能绑定一张银行卡吗？绑定之后是否可以修改？</h4>
                    <p>为了严格保障您的资金安全，貅比特仅支持绑定一张银行卡，并同时验证实名。绑定成功后，您的银行卡和身份信息无法随意修改，资金进出都将通过该张银行卡进行。如需更换银行卡信息，请联系客服。</p>
                    <h4>2、绑定银行卡失败怎么办？</h4>
                    <p>您在绑定银行卡的时候请先确认以下几项信息：</P>
                    <p>A、手机号码是否正确；</P>
                    <p>B、银行预留手机号与您等待接收验证码的手机号是否一致；  </P>
                    <p>C、您所绑定的银行卡的开户名与您在貅比特页面所填身份证姓名是否一致；</P>
                    <p>如以上信息正确无误仍提示出错，请致电客服人员。</P>
                </div>
                <li class="arrow" @click="withdrawShow" :class="withdrawClass">
                    <a>提现与手续费</a>
                </li>
                <div class="article" v-show="withdrawIsShow">
                    <h4>1、申请提现何时到账？</h4>
                    <p>工作日15:00前申请提现，当日到账；</p>
                    <p>工作日15:00后申请提现，下一工作日到账；</p>
                    <p>周末或节假日申请提现，顺延到下一个工作日到账。</p>
                    <h4>2、关于提现如何收手续费？</h4>
                    <p>用户每月可享受前三笔免费提现的优惠！超过3次每次提现收取1元手续费，此费用属第三方支付平台收取</p>
                    <h4>3、提现后显示提现失败怎么办？</h4>
                    <p>因提现通道异常或您的提现银行审核不通过等因素，可能会造成提现失败。提现失败的资金会返回到您的账户中，请重新提交申请即可。如仍有问题请联系客服。</p>
                </div>
               <li class="arrow" @click="validateShow" :class="validateClass">
                  <a>验证码问题</a>
               </li>
                <div class="article" v-show="validateIsShow">
                    <h4>1、收不到短信验证码怎么办？</h4>
                    <p>短信验证码发送1分钟后仍未收到可以点击“重新发送”获取验证码。若排除网络信号及软件拦截等问题后屡次尝试仍接收不到验证码，则可能因为此前设置过拒收此类短信，请重新设置。如设置为黑名单的，需要解除黑名单并设置不再拦截。</p>
                </div>
               <li class="arrow" @click="teamShow" :class="teamClass">
                  <a>团队发展问题</a>
               </li>
                <div class="article" v-show="teamIsShow">
                    <h4>1. 如何发展团队？</h4>
                    <p>理财师可以通过推荐其他理财师加入猎才的方式来发展自己的团队，团队成员按推荐顺序向下包含2级。例如：理财师A推荐B成为理财师，B推荐C成为理财师，BC都是A的团队成员，B是A的直接下级（一级成员），C是A的间接下级（二级成员），C是B是的直接下级（一级成员） 。层级往下类推。理财师可以获得自己直接下级每笔佣金的25%、间接下级每笔佣金的5%作为推荐收益。推荐收益由平台额外发放，不影响被推荐人的佣金金额。综上所述，理财师发展团队不仅可以体现自身的价值，同时还能增加理财师的被动收入。</p>
                </div>

                <li class="arrow" @click="accountShow" :class="accountClass">
                    <a>托管账户问题</a>
                </li>
                <div class="article" v-show="accountIsShow">
                    <h4>1. 为什么要开通托管账户？</h4>
                    <p>开通托管账户，能实现投资用户的账户资金与理财平台分开，实现资金与平台账户独立，保障用户的资金安全，符合国家金融监管政策，防止平台出现擅自挪动您的资金风险。</p>
                    <h4>2. 入驻平台的第三方托管账户的密码忘记了，怎么办？</h4>
                    <p>方法一：您可以通过第三方托管账户的充值页面，点击忘记密码，通过其推荐方式进行修改；</p>
                    <p>方法二：您可以致电所投资的平台与客服联系；</p>
                </div>

                <li class="arrow" @click="buySelfShow" :class="buySelfClass">
                    <a>理财师自购问题</a>
                </li>
                <div class="article" v-show="buySelfIsShow">
                    <h4>1. 理财师如何自购？</h4>
                    <p>方法一：在貅比特中选择要购买的产品，点击进入产品详情，点击产品详情页底部的“自己购买”按钮即可跳转到T呗（投资人端）进行购买</p>
                    <p>方法二：在“貅比特-平台”中选择自己想要投资的理财平台，点击，进入平台信息页，再点击页面底部的“去购买”按钮，跳转到T呗（投资人端）进行购买即可</p>
                    <h4>2.自购后如何查看购买记录和收益？</h4>
                    <p>因为理财师自购是通过T呗（投资人端）进行的，所以购买记录和收益需要在T呗查看，具体查看方法如下：</p>
                    <p>1.在“貅比特-平台”中选择任一平台，点击进入平台信息页；</p>
                    <p>2.点击平台信息页底部的“去购买”按钮，跳转到T呗的平台信息页；</p>
                    <p>3.点击T呗平台信息页右下方的“首页”，然后在首页点击“我的”；</p>
                    <p>4.在我的页面点击“我的投资”即可查看购买记录和收益</p>
                    <h4>自购后如何赎回？</h4>
                    <p>按照问题2方法进入“我的投资”，找到要进行赎回的投资记录，点击记录右边的“查看、赎回”，跳转到第三方理财平台进行赎回即可。</p>
                </div>
            </ul>
         </div>
</template>

<script>
  export default{
    data(){
        return {
            registerIsShow:false,
            registerClass:"",
            passwordIsShow:false,
            passwordClass :"",
            commissionIsShow:false,
            commissionClass:"",
            clientIsShow:false,
            clientClass:"",
            bindIsShow:false,
            bindClass:"",
            withdrawIsShow:false,
            withdrawClass:"",
            validateIsShow:false,
            validateClass:"",
            teamIsShow:false,
            teamClass:"",
            accountIsShow:false,
            accountClass:"",
            buySelfIsShow:false,
            buySelfClass:"",

        }
    },
    created(){

    },
    methods:{
        registerShow (){
            this.registerIsShow = !this.registerIsShow;
            this.registerClass = this.registerClass == "active" ? "" : "active";
        },
        passwordShow (){
            this.passwordIsShow = !this.passwordIsShow;
            this.passwordClass = this.passwordClass == "active" ? "" : "active"
        },
        commissionShow (){
            this.commissionIsShow = !this.commissionIsShow;
            this.commissionClass = this.commissionClass == "active" ? "" : "active"
        },
        clientShow (){
            this.clientIsShow = !this.clientIsShow;
            this.clientClass = this.clientClass == "active" ? "" : "active"
        },
        bindShow (){
            this.bindIsShow = !this.bindIsShow;
            this.bindClass = this.bindClass == "active" ? "" : "active";
        },
        withdrawShow (){
            this.withdrawIsShow = !this.withdrawIsShow;
            this.withdrawClass = this.withdrawClass == "active" ? "" : "active";
        },
        validateShow (){
            this.validateIsShow = !this.validateIsShow;
            this.validateClass = this.validateClass == "active" ? "" : "active";
        },
        teamShow (){
            this.teamIsShow = !this.teamIsShow;
            this.teamClass = this.teamClass == "active" ? "" : "active";
        },
        accountShow (){
            this.accountIsShow = !this.accountIsShow;
            this.accountClass = this.accountClass == "active" ? "" : "active";
        },
        buySelfShow (){
            this.buySelfIsShow = !this.buySelfIsShow;
            this.buySelfClass = this.buySelfClass == "active" ? "" : "active";
        },

        clickPhone(){
            window.location.href = "tel:" + 4008886987;
        }
    }
  }
</script>

<style scoped>
    ul li{
        height:.98rem;
        line-height: .98rem;
        border-bottom: 1px solid #efefef;
        padding-left: .3rem;
        font-size: .28rem;
        background-color: #fff;
        color: #3e4446;
    }
    ul li a{
        display: block;
        width:100%;
        height:100%;
        color: #3e4446;
        font-size: .28rem;
    }
    .arrow {
        background-image: url("../../../static/images/normal/arrow-down.png");
    }
    .arrow.active {
        background-image: url("../../../static/images/normal/arrow-up.png");
    }
    .article {
        background: #fff;
        background-color: #fafafa;
        border-bottom: 1px solid #efefef;
        padding: 0 .3rem .1rem;
    }
    .article h4{
        padding-top: .4rem;
        font-size: .28rem;
        color: #6c6e6d;
    }
    .article p{
        color: #a2a2a2;
        font-size: .24rem;
        line-height: 1.8em;
    }

    .header{width:100%;height: 2.38rem;line-height: 2.38rem;background-color: white;margin-bottom: 0.30rem;}
    .header-icon{width:1.06rem;height: 1.58rem;margin-left: 0.3rem;}
    .serverInfo{display: inline-block;margin-left: 0.2rem;}
    .serverInfo p{line-height: 0.4rem;}
    .server-number {font-size: 0.4rem;color: #3e4446;}
    .server-time{margin-top:0.16rem; font-size: 0.24rem; color: #3e4446}
    .server-phone{position: absolute; width: 0.5rem;height: 0.5rem; right: 0.3rem; top: 1rem;}

    /*常见问题*/
    .question-header{width: 100%;height: 0.7rem;line-height: 0.7rem;background-color: white;border-bottom: 0.01rem solid #f1f1f1;}
    .question-header>span:first-child{display: inline-block; margin-left: 0.3rem; width:0.06rem;height: 0.24rem;background-color: #02a0f2;}
    .question-header .question-header-title{display: inline-block; margin-left: 0.10rem; font-size: 0.24rem;color: #6c6e6d;margin-top: 1px;}

</style>

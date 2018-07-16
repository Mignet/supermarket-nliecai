// 路由
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import comm from './../common/common'
import titles from './titles'
import store from './../store/index.js'
import publicConfig from './../publicConfig.js'

// 首页
const Home = () => import('@/pages/home/home')

// 我的
const Mine = () => import('@/pages/mine/mine')
// 我的余额
const Balance = () => import('@/pages/mine/balance.vue')
// 提现
const Widthdraw = () => import('./../pages/mine/widthdraw.vue')
// 提现成功页
const WidthdrawSuccess = () => import('./../pages/mine/widthdrawSuccess.vue')
// 提现记录页
const WidthdrawRecord =  () => import('./../pages/mine/widthdrawRecord.vue')


// user
// 初始化 交易密码第一步
const SetPayPwd = () => import('./../pages/user/setPayPwd.vue')
// 初始化 交易密码第二步
const SetPayPwd2 = () => import('./../pages/user/setPayPwd2.vue')
// 重置交易密码 第一步 验证短信验证码
const ResetPayPwd = () => import('./../pages/user/resetPayPwd.vue')
// 重置交易密码 第二步   第一次输入重置密码
const ResetPayPwd1 = () => import('./../pages/user/resetPayPwd1.vue')
// 重置交易密码 第三步   第二次输入重置密码
const ResetPayPwd2 = () => import('./../pages/user/resetPayPwd2.vue')
// 验证交易密码
const VerifyPayPwd = () => import('./../pages/user/verifyPayPwd.vue')
// 验证身份
const VerifyRelationship = () => import('./../pages/user/verifyRelationship')
// 设置交易密码手机号认证注意和绑卡手机号验证做区分
const VerifyPayPwdMobile = () => import('./../pages/user/verifyPayPwdMobile')

// setting
// 绑卡第二步
const BindCard2 = () => import('./../pages/setting/bindCard2.vue')
// 验证绑卡手机号
const VerifyMobile = () => import('./../pages/setting/verifyMobile.vue')
// 绑卡成功页
const BindCardSuccess = () => import('@/pages/setting/bindCardSuccess.vue')

// product
// 产品
const BindFail = () => import('./../pages/product/bindFail.vue')

const Detail = () => import('@/pages/product/detail')
const Login = () => import('@/pages/login/login')
const Setting = () => import('@/pages/setting/bind.vue')
const About = () => import('@/pages/about/about.vue')
const Message = () => import('@/pages/message/msg.vue')
const Planner = () => import('@/pages/planner/planner.vue')
const Guide = () => import('@/pages/guide/guide.vue')
const InviteClient = () => import('@/pages/invite/inviteClient.vue')
const InvitePlanner = () => import('@/pages/invite/invitePlanner.vue')
const InvitePlannerRule = () => import('@/pages/invite/invitePlannerRule.vue')
const Recommand = () => import('@/pages/recommand/recommand.vue')
const Download = () => import('@/pages/download/download.vue')
const Account = () => import('@/pages/account/account.vue')

const Calculator = () => import('@/pages/product/calculator.vue')
const Strategy = () => import('@/pages/product/strategy.vue')
const Register = () => import('@/pages/register/register.vue')
const Register2 = () => import('@/pages/register/register2.vue')
const InviteRegister = () => import('@/pages/register/inviteRegister.vue')
const ThirdRegister = () => import('@/pages/register/thirdRegister.vue')
const ServiceAgreement = () => import('@/pages/agreement/service.vue')
const Lvdun = () => import('@/pages/activities/lvdun.vue')
const CommonProblem = () => import('@/pages/commonProblem/commonProblem.vue')
const ProductList = () => import('@/pages/product/list.vue')
const Understand = () => import('@/pages/understand/understand.vue')
const Rank = () => import('@/pages/rank/rank.vue')
const Privilege = () => import('@/pages/rank/rankPrivilege.vue')
const Commission = () => import('@/pages/message/commission.vue')
const MessageReward = () => import('@/pages/message/reward.vue')
const MessageDirectAllowance = () => import('@/pages/message/directAllowance.vue')
const MessageTeamAllowance = () => import('@/pages/message/teamAllowance.vue')
const PlatformDetail = () => import('@/pages/platform/platformDetail.vue')
const Teaminfo = () => import('@/pages/platform/teaminfo.vue')
const Person = () => import('@/pages/person/person.vue')
const Sign = () => import('@/pages/sign/sign.vue')
const InvestRecord = () => import('@/pages/InvestRecord/InvestRecord.vue')

let router  = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Home
  }, {
    name: 'login',
    path: '/login/login',
    component: Login
  }, {
    name: 'mine',
    path: '/mine',
    component: Mine
  }, {
    name:'balance',
    path:'/mine/balance',
    component:Balance
  },{
    name:'widthdraw',
    path:'/mine/widthdraw',
    component:Widthdraw
  },{
    name:'widthdrawSuccess',
    path:'/mine/widthdrawSuccess',
    component:WidthdrawSuccess
  },{
    name:'widthdrawRecord',
    path:'/mine/widthdrawRecord',
    component:WidthdrawRecord
  },
  // user
  {
    name:'setPayPwd',
    path:'/user/setPayPwd',
    component:SetPayPwd
  },{
    name:'setPayPwd2',
    path:'/user/setPayPwd2',
    component:SetPayPwd2
  },{
    name:'resetPayPwd',
    path:'/user/resetPayPwd',
    component:ResetPayPwd
  },{
    name:'resetPayPwd1',
    path:'/user/resetPayPwd1',
    component:ResetPayPwd1
  },{
    name:'resetPayPwd2',
    path:'/user/resetPayPwd2',
    component:ResetPayPwd2
  },{
    name:'verifyPayPwd',
    path:'/user/verifyPayPwd',
    component:VerifyPayPwd
  },{
    name:'verifyRelationship',
    path:'/user/verifyRelationship',
    component:VerifyRelationship
  },{
    name:'verifyPayPwdMobile',
    path:'/user/verifyPayPwdMobile',
    component:VerifyPayPwdMobile
  },
  // setting
  {
    name: 'setting',
    path: '/setting/bind',
    component: Setting
  },{
    name: 'bindCardSuccess',
    path: '/setting/bindCardSuccess',
    component: BindCardSuccess
  },{
    name:'bindCard2',
    path:'/setting/bindCard2',
    component:BindCard2
  },{
    name:'verifyMobile',
    path:'/setting/verifyMobile',
    component:VerifyMobile
  },
  {
    name: 'about',
    path: '/about/about',
    component: About
  }, {
    name: 'detail',
    path: '/product/detail',
    component: Detail
  }, {
    name:"productList",
    path:'/product/list',
    component:ProductList
  },{
    name: 'calculator',
    path: '/product/calculator',
    component: Calculator
  }, {
    name: 'strategy',
    path: '/product/strategy',
    component: Strategy
  },{
    name:'bindFail',
    path:'/product/bindFail',
    component:BindFail
  },{
    name: 'message',
    path: '/message/msg',
    component: Message
  },{
    name:'download',
    path:"/download/download",
    component:Download
  },{
    name: 'planner',
    path: '/planner/planner',
    component: Planner
  }, {
    name: 'guide',
    path: '/guide/guide',
    component: Guide
  }, {
    name: 'inviteClient',
    path: '/invite/inviteClient',
    component: InviteClient
  }, {
    name: 'invitePlanner',
    path: '/invite/invitePlanner',
    component: InvitePlanner
  }, {
    name: 'invitePlannerRule',
    path: '/invite/invitePlannerRule',
    component: InvitePlannerRule
  }, {
    name: 'recommand',
    path: '/recommand/recommand',
    component: Recommand
  }, {
    name: 'account',
    path: '/account/account',
    component: Account
  }, {
    name: 'register',
    path: '/register/register',
    component: Register
  }, {
    name: 'register2',
    path: '/register/register2',
    component: Register2
  }, {
    name: "serviceAgreement",
    path: '/agreement/service',
    component: ServiceAgreement
  }, {
    name: 'lvdun',
    path: '/activities/lvdun',
    component: Lvdun
  }, {
    name: 'commonProblem',
    path: '/commonProblem/commonProblem',
    component: CommonProblem
  }, {
    name: 'inviteRegister',
    path: '/register/inviteRegister',
    component: InviteRegister
  }, {
    name: 'thirdRegister',
    path: '/register/thirdRegister',
    component: ThirdRegister
  },{
    name : 'InvestRecord',
    path : '/InvestRecord/InvestRecord',
    component: InvestRecord
  },{
    name : 'home',
    path:"/home/home",
    component:Home
  },{
    name:"understand",
    path :'/understand',
    component:Understand
  },{
    name:'rank',
    path:'/rank',
    component:Rank
  },{
    name:'privilege',
    path:'/privilege',
    component:Privilege
  },{
    name:"commission",
    path:'/message/commission',
    component:Commission
  },{
    name:'messageReward',
    path:'/message/reward',
    component:MessageReward

  },{
    name:'messageDirectAllowance',
    path:'/message/directAllowance',
    component:MessageDirectAllowance
  },{
    name:'messageTeamAllowance',
    path:'/message/teamAllowance',
    component:MessageTeamAllowance
  },{
    name:'platformDetail',
    path:'/platformDetail',
    component:PlatformDetail
  },{
    name:'teaminfo',
    path:'/teaminfo',
    component:Teaminfo
  },{
    name:'person',
    path:"/person",
    component:Person
  },{
    name:'sign',
    path:'/sign',
    component:Sign
  }],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeResolve((to,from,next)=>{
  store.dispatch('fromPath',from.path)
  store.dispatch('fromQuery',from.query)
  comm.setTitle(titles[to.name])
  next()
})

router.afterEach((to,from) => {
  if (publicConfig.environment === 'produce' && window._hmt) {
      _hmt.push(['_trackPageview', to.path]);
  }
})

export default router


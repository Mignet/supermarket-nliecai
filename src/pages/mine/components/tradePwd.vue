<!-- 设置交易密码弹窗 -->
<template>
	<div class="trade-pwd-container" v-show="show">
		<div class="wrap">
			<div class="title border-bottom-1px">
				<div class="img-wrap" @click.stop="hideEvent(false)">
					<img src="./../../../assets/close-ico.png">	
				</div>
				<p>请输入交易密码</p>
			</div>
			<p class="widthdraw-title">提现</p>
			<h3 class="widthdraw-money">￥{{amount | twoDecimal}}</h3>
			<p class="widthdraw-fee">{{feeText}}</p>
			<ul class="widthdraw-pwd">
				<li class="border-1px"><span :class="{active:pwd.length >=1}"></span></li>
				<li class="border-1px"><span :class="{active:pwd.length >=2}"></span></li>
				<li class="border-1px"><span :class="{active:pwd.length >=3}"></span></li>
				<li class="border-1px"><span :class="{active:pwd.length >=4}"></span></li>
				<li class="border-1px"><span :class="{active:pwd.length >=5}"></span></li>
				<li class="border-1px last-child"><span :class="{active:pwd.length >=6}"></span></li>
			</ul>
			<div class="bottom" v-show="showPayPwdError || showForgetPayPwd">
				<div class="center" v-show="showPayPwdError">交易密码错误</div>
				<div class="right" v-show="showForgetPayPwd" @click.stop="resetPayPwd">忘记密码?</div>
			</div>
		</div>
		<keyboard
			:show='keyboard'
			@typing="typing"
			:isInteger="isInteger"
		/>
	</div>
</template>
<script>
	const keyboard = () => import('./../../../components/keyboard/keyboard.vue')
	export default {
		name:'tradePwd',
		props:['show',"amount",'fee'],
		data(){
			return {
				pwd:"",
				// 验证交易密码次数
				verifyPayPwdTimes:0,
				// 显示交易密码错误
				showPayPwdError:false,
				// 显示忘记密码
				showForgetPayPwd:false,
				payFee:this.fee,
				isInteger:true,
				keyboard:true
			}
		},
		computed:{
			feeText(){
				let val = this.fee ? '额外扣除手续费￥1.00' : ''
				return val
			}
		},
		methods:{
			// 监听键盘输入输入
			typing (value) {
				this.changePwd(value);
			},
			// 监听密码改变
			changePwd(value){
				let pwd = this.pwd
				if (value === '') {
					if(pwd){
						pwd = pwd.substr(0,pwd.length-1)
					}else{
						pwd = "";
					}
				}else{
					pwd = pwd + value;
					if(pwd.length >= 6){
						pwd = pwd.substr(0,6)
					}
				}
				this.pwd = pwd
			},
			verifyPayPwdEvent(){
				let firstPwd = comm.toBase64(this.pwd);
				sessionStorage.setItem('__FIRSTPWD__',firstPwd)
				this.$router.replace('/user/setPayPwd2')
			},
			hideEvent(bool){
				this.pwd = "";
				this.$emit('hide',bool)
			},
			verifyPayPwdEvent(){
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('verifyPayPwd',{
					pwd:this.pwd
				}).then(res=>{
					this.verifyPayPwdTimes ++;
					// 交易密码正确
					if(res.rlt){
						this.hideEvent(true);
					}else{ // 交易密码错误
						this.pwd = "";
						this.showPayPwdError = true;
						if(this.verifyPayPwdTimes >= 2){
							this.showForgetPayPwd = true;
						}
					}
				})
			},
			// 重置交易密码页面
			resetPayPwd(){
				this.$router.replace('/user/verifyRelationship?type=0')
			}
		},
		watch:{
			pwd(curVal,oldVal){
				if(curVal.length >= 6){
					this.verifyPayPwdEvent()
				}
			}
		},
		components:{
			keyboard
		},
		directives: {
		  focus: {
		    // 指令的定义
		    inserted: function (el) {
		      el.focus()
		    }
		  }
		}
	}
</script>
<style scoped>
	.trade-pwd-container{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.2);
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	.trade-pwd-container .wrap{
		width: 6.9rem;
		background-color: #fff;
		border-radius: 10px;
		margin-top: .4rem;
		padding-bottom: .28rem;
	}
	.trade-pwd-container .title{
		position: relative;
		width: 100%;
		height: .8rem;
	}
	.trade-pwd-container .title .img-wrap{
		position: absolute;
		left: 0;
		top: 0;
		width: .8rem;
		height:100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.trade-pwd-container .title .img-wrap img{
		width: .22rem;
	}
	.trade-pwd-container .title p{
		font-size: 16px;
		color: #3b4257;
		text-align: center;
		line-height: .8rem;
	}
	.trade-pwd-container .widthdraw-title{
		text-align: center;
		font-size:.28rem;
		color: #9197a6;
		padding-top: .38rem;
	}
	.trade-pwd-container .widthdraw-money{
		text-align: center;
		padding-top: .2rem;
		font-size:.48rem;
		color: #3b4257;
	}
	.trade-pwd-container .widthdraw-fee{
		text-align: center;
		padding-top: .1rem;
		font-size:.24rem;
		color: #9197a6;
	}
	.trade-pwd-container .widthdraw-pwd{
		display: flex;
		width: 6.3rem;
		margin: 0 auto;
		padding-top: .2rem;
	}
	.trade-pwd-container .widthdraw-pwd li{
		flex: 1;
		height: 1.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.trade-pwd-container .widthdraw-pwd li:after{
		border-right: 0;
	}
	.trade-pwd-container .widthdraw-pwd li.last-child:after{
		border-right: 1px solid #e0e0e0;
	}
	.trade-pwd-container .widthdraw-pwd li span{
		width: .2rem;
		height: .2rem;
		border-radius: .1rem;
	}
	.trade-pwd-container .widthdraw-pwd li span.active{
		background-color: #000;
	}
	.trade-pwd-container .bottom{
		position: relative;
		padding-top: .1rem;
		display: flex;
		height: .5rem;
		align-items: center;
		justify-content: center;
	}
	.trade-pwd-container .bottom .center{
		font-size:.32rem;
		line-height: .5rem;
		color: #ff0808;
	}
	.trade-pwd-container .bottom .right{
		position: absolute;
		right: .34rem;
		top: .18rem;
		font-size:.28rem;
		color: #4e8cef;
	}
</style>
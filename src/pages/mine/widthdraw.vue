<!-- 提现页面 -->
<template>
	<div class="widthdraw-contianer">
		<div class="wrap">
			<div class="top">
				<h2>可提现金额</h2>
				<h3>
					<p>¥&nbsp;{{totalAmount}}</p>
					<p><span>{{bankInfo.withdrawRemark}}</span><img @click.stop="accountTips" src="./../../assets/tips-ico.png"></p>
				</h3>
			</div>
			<div class="center">
				<div class="center-1">
					<h3>提现金额</h3>
					<h2 class="money">
						<span>¥</span>
						<input type="tel" @input="changeMoney($event)" ref="myWidthdraw" v-show="!showTradePwd">
					</h2>
				</div>
				<div class="danger-tips" v-if="dangerTips.length">{{dangerTips}}</div>
				<div class="center-2" v-else>
					<h4><p>最低提现&nbsp;&nbsp;¥&nbsp;20.00</p><span @click.stop="widthdrawAll" v-show="totalAmount - bankInfo.fee >= 20 && showWidthdrawAll">全部提现</span></h4>
					<p @click.stop="serviceCharge"><span>{{bankInfo.feeText}}</span><img src="./../../assets/tips-ico.png"></p>
				</div>
				<div class="center-3">
					<p>到账银行卡&nbsp;&nbsp;&nbsp;&nbsp;{{bankInfo.bankName}}({{bankInfo.bankLatterFour}})</p>
					<img @click.stop="bindTips" src="./../../assets/tips-ico.png">
				</div>
			</div>
			<button @click.stop="widthdrawEvent" class="bottom" :class="{active:canWithdraw}">提现</button>
		</div>
		<trade-pwd :show="showTradePwd" :amount="withdrawMoney" :fee="bankInfo.fee" @hide="hideTradePwdEvent"/>
	</div>
</template>
<script>
	import Vue from 'vue'
	import tradePwd from './components/tradePwd.vue'
	export default {
		name:'widthdraw',
		data(){
			return {
				totalAmount:0,
				// 提现金额
				withdrawMoney:"",
				bankInfo:{},
				// 能否提现
				canWithdraw:false,
				// 不能提现报错提示
				dangerTips:"",
				showTradePwd:false,
				// 验证支付密码
				isPayPwd:false,
				// 显示全部提现按钮
				showWidthdrawAll:true
			}
		},
		mounted(){
			var http = this.$axios;
			http.isShowLoading = true;
			http.post('getWithdrawBankCard').then(res=>{
				// 银行卡后四位
				res.bankLatterFour = res.bankCard.substr(res.bankCard.length - 4)
				res.feeText = res.fee === '1.00' ? "手续费 ¥1.00" : '免手续费'
				this.bankInfo = res
			})
			this.getMyAccount()

		},
		methods:{
			changeMoney($event){
				var val = $event.target.value;

				if(/^\d+\.?\d{0,2}$/.test(val)){
				    val= val;
				 }else{
				    val = val.substring(0,val.length-1);
				 }
				val =  val.replace(/^(0+)/, '0');
				if(val.length >= 11){
					val = val.substr(0,val.length - 1)
				}
				$event.target.value = val
				this.withdrawMoney = val;
			},
			getMyAccount(){
				var http = this.$axios;
				http.isShowLoading = true;
				http.post('myaccount').then(res=>{
					this.totalAmount = res.totalAmount
					if(this.totalAmount - this.bankInfo.fee < 20){
						this.showWidthdrawAll = false
					}else{
						this.showWidthdrawAll = true
					}
				})
			},
			// 全部提现
			widthdrawAll(){
				this.$refs.myWidthdraw.value = this.withdrawMoney = this.totalAmount - this.bankInfo.fee;
			},
			// 点击提现
			widthdrawEvent(){
				if(!this.canWithdraw) return;
				if(this.withdrawMoney > this.totalAmount - this.bankInfo.fee){
					this.widthdrawMaxTips()
					return;
				}
				this.showTradePwd = true;
			},
			showTradePwdEvent(){
				this.showTradePwd = true
			},
			hideTradePwdEvent(bool){
				this.isPayPwd = bool || false;
				this.showTradePwd = false
				if(bool){
					this.goWidthdraw()
				}
			},
			// 去提现
			goWidthdraw(){
				var http = this.$axios;
				http.isShowLoading = true;
				let requestData = {};
				if(this.bankInfo.needkaiHuHang){
					requestData = {
						amount:this.withdrawMoney,
						bankCard : this.bankInfo.bankCard,
						bankCode : this.bankInfo.bankCode,
						bankId : this.bankInfo.bankId,
						bankName : this.bankInfo.bankName,
						city : this.bankInfo.city,
						kaihuhang : this.bankInfo.kaihuhang
					}
				}else{
					requestData = {
						amount:this.withdrawMoney,
						bankCard : this.bankInfo.bankCard,
						bankName : this.bankInfo.bankName
					}
				}
				http.post('userWithdrawRequest',requestData).then(res=>{
					sessionStorage.setItem("WIDTHDRAWDATA",JSON.stringify(Object.assign(requestData,{fee:this.bankInfo.fee})))
					this.$router.replace('/mine/widthdrawSuccess')
				})
			},
			accountTips(){
				Vue.popup.alert({
					msg: '工作日当天下午2点前提现当天到账，2点后提现次日到账。节假日提现顺延至工作日到账。',
					btnText: '我知道了'
				});
			},
			serviceCharge(){
				Vue.popup.alert({
					msg: '每月可享受一次免费提现服务,超过1次,每次1.00元手续费。',
					btnText: '我知道了'
				});
			},
			bindTips(){
				Vue.popup.alert({
					msg: '暂时只支持绑定一张银行卡,提现至其他银行卡,请联系客服(<a style="display:inline;color:#4e8cef;" href="tel:0755-86725461">0755-86725461</a>)更换银行卡',
					btnText: '我知道了'
				});
			},
			// 提现超出了最大范围提示
			widthdrawMaxTips(){
				var self = this;
				Vue.popup.confirm({
					msg: '剩余余额不足以扣除提现手续费¥1.00,最大可提现金额'+(this.totalAmount - this.bankInfo.fee)+'。是否全部提现?',
					cancelText: '取消', // 默认取消
					okText: '全部提现', // 默认确认
					okCb: function(){
						self.widthdrawAll()
						self.widthdrawEvent()
					}
				});
			}

		},
		watch:{
			withdrawMoney(curVal,oldVal){
				if(curVal*1 >0){
					if(curVal*1  >= 20){
						this.dangerTips = ''
						if(curVal*1 > this.totalAmount){
							this.dangerTips = '输入金额大于可提现金额'
							this.canWithdraw = false;
						}else{
							this.canWithdraw = true;
						}
					}else{
						this.dangerTips = '输入金额小于最小提现金额￥20.00'
						this.canWithdraw = false;
					}
				}else{
					this.dangerTips = ''
					this.canWithdraw = false;
				}

				if(curVal*1 < this.totalAmount - this.bankInfo.fee){
					this.showWidthdrawAll = true;
				}else{
					this.showWidthdrawAll = false;
				}

			}
		},
		components:{
			tradePwd
		}
	}
</script>
<style scoped>
	.widthdraw-contianer{
		padding: .4rem .3rem 0;
	}
	.widthdraw-contianer .wrap{
		width: 100%;
		overflow: hidden;
		border-radius:6px;
		background-color: #fff;
	}
	.widthdraw-contianer .top{
		display:flex;
		height: 1.2rem;
		background-color: #f7f9fd;
		padding-left: .3rem;
	}
	.widthdraw-contianer .top h2{
		font-size: 14px;
		color: #5f6678;
		padding-top: .24rem;
		padding-right: .56rem;
	}
	.widthdraw-contianer .top h3{
		padding-top: .24rem;
	}
	.widthdraw-contianer .top h3 p{
		font-size: 14px;
		color: #5f6678;
	}
	.widthdraw-contianer .top h3 p:last-child{
		padding-top: .14rem;
		display: flex;
		align-items: center;
	}
	.widthdraw-contianer .top h3 p:last-child span{
		padding-right: .2rem;
	}
	.widthdraw-contianer .top h3 p img{
		width: .24rem;
		height: .24rem;
	}
	.widthdraw-contianer .center{
		padding-top: .5rem;
		padding-left: .3rem;
		padding-right: .3rem;
	}
	.widthdraw-contianer .center-1 h3{
		font-size: 16px;
		color: #3b4257;
		padding-bottom: .3rem;
	}
	.widthdraw-contianer .center-1 h2{
		display: flex;
		align-items: center;
	}
	.widthdraw-contianer .center-1 h2 span{
		font-size: 28px;
		color: #3b4257;
		line-height: 1;
		padding-right: .3rem;
		font-family: DINOTMedium;
	}
	.widthdraw-contianer .center-1 h2 input{
		font-size: 36px;
		color: #3b4257;
		line-height: 1;
		caret-color: #4e8cef;
		font-family: DINOTMedium;
	}
	.widthdraw-contianer .center-1 h2{
		padding-bottom: .2rem;
		border-bottom: 1px solid #eee;
	}
	.widthdraw-contianer .danger-tips{
		font-size:12px;
		color: #ff0808;
		padding-top: .4rem;
		padding-bottom: .18rem;
	}
	.widthdraw-contianer .center-2{
		width: 100%;
		display: flex;
		padding-top: .4rem;
		padding-bottom: .18rem;
		align-items: center;
		justify-content: space-between;
	}
	.widthdraw-contianer .center-2 h4{
		display: flex;
		font-size:12px;
		color: #9197a6;
	}
	.widthdraw-contianer .center-2 h4 span{
		font-size: 12px;
		color: #4e8cef;
		padding-left: .3rem;
	}
	.widthdraw-contianer .center-2 p{
		font-size:12px;
		color: #9197a6;
	}
	.widthdraw-contianer .center-2 p img{
		width: .24rem;
		padding-left: .2rem;
		box-sizing: content-box;
	}
	.widthdraw-contianer .center-3{
		font-size:12px;
		color: #9197a6;
		display: flex;
		align-items: center;
		padding-bottom: .66rem;
	}
	.widthdraw-contianer .center-3 img{
		width:.24rem;
		box-sizing: content-box;
		padding-left: .2rem;
	}
	.widthdraw-contianer .bottom{
		width:6.3rem;
		height: 1.1rem;
		background-color: #cdcdce;
		margin: 0 auto .38rem;
		color: #fff;
		font-size:20px;
		border-radius: 6px;
	}
	.widthdraw-contianer .bottom.active{
		background-color: #4e8cef;
	}
</style>

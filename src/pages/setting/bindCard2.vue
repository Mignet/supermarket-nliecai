<template>
	<div class="bindCard2-container">
		<input type="password" style="position:absolute;height:0;top:-10000px;">
		<h2 class="title">请选择开户行</h2>
		<div class="inputBox inputBox1">
			<p class="left">开户行</p>
			<div class="right" @click.stop="setBank" :class="{active:bankInfo.bankName}"><p>{{bankTips}}</p></div>
		</div>
		<h2 class="title">请填写个人信息</h2>
		<div class="inputBox inputBox2">
			<p class="left">地区</p>
			<div class="right" @click.stop="selectArea" :class="{active:areaInfo.province}"><p>{{areaTips}}</p></div>
		</div>

		<div class="inputBox inputBox3">
			<label for="mobile" class="left">手机号</label>
			<div id="mobile" class="right">
				<input type="tel" placeholder="请输入银行卡预留手机号" maxlength="11" v-model="mobile"/>
				<div>
					<img src="./../../assets/del-ico.png" @click.stop="emptyMobile" v-show="mobile.length > 0">
					<img @click.stop="mobileTips" src="./../../assets/tips-ico-2.png">
				</div>
			</div>
		</div>
		<h3 class="mobile-tip"  v-show="showMobileTip">使用银行预留手机号绑定</h3>

		<div class="button-wrap">
			<button :class="{active:canGoNext}" @click.stop="goNext">下一步</button>
		</div>
		<address-picker :addressShow="addressShow" @ok="ok" @cancel="addressShow=false"/>
		<bank-picker :show="bankPickerShow" @cancel="bankPickerShow = false" @ok="bankPickerEvent"/>
	</div>
</template>
<script>
	import Vue from 'vue'
	import addressPicker from './../../components/addressPicker/addressPicker.vue'
	import bankPicker from './components/bankPicker.vue'
	export default {
		name:'bankCard2',
		data(){
			return {
				// 地址选择组件显示
				addressShow:false,
				// 银行选择组件显示
				bankPickerShow:false,
				bankInfo:{},
				selected:"",
				bankTips:'请选择银行',
				areaInfo:{},
				areaTips:'请选择地区',
				// 是否能进行下一步
				canGoNext:false,
				mobile:"",
				// 显示填写预留手机号提示
				showMobileTip:false
			}
		},
		mounted(){
			this.getUserInfo()
		},
		methods:{
			ok(val){
				this.addressShow = false;
				this.areaInfo = val;
				this.areaTips = val.province + val.city;
			},
			bankPickerEvent(val){
				this.bankPickerShow = false;
				this.bankInfo = val;
				this.bankTips = this.bankInfo.bankName
			},
			selectArea(){
				this.addressShow = true;
			},
			setBank(){
				this.bankPickerShow = true;
			},
			emptyMobile(){
				this.mobile = "";
			},
			getUserInfo(){
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('getUserInfo').then(res=>{
					this.mobile = res.mobile;
					this.showMobileTip = true;
				})
			},
			goNext(){
				if(this.canGoNext){
					let bindCardInfo =  JSON.parse(sessionStorage.getItem('__BINDCARDINFO__'))
					bindCardInfo.bankInfo = this.bankInfo;
					bindCardInfo.mobile = this.mobile
					bindCardInfo.areaInfo = this.areaInfo;
					sessionStorage.setItem('__BINDCARDINFO__',JSON.stringify(bindCardInfo))
					this.$router.replace('/setting/verifyMobile')
				}
			},
			// 判断能否进行下一步
			isCanGoNext(){
				let mobileReg = /^1(3|4|5|7|8)\d{9}$/;
				if(mobileReg.test(this.mobile) && this.bankInfo.bankName && this.areaInfo.province){
				  this.canGoNext = true;
				}else{
				    this.canGoNext = false
				}
			},
			mobileTips(){
				Vue.popup.alert({
					title:'预留手机号说明',
					msg: '<p style="text-align:left;">预留手机号是办理该银行卡时填写的手机号</p><p style="text-align:left;">没有预留手机号、忘记或已停用，请联系银行客服更新。</p>',
					btnText: '我知道了'
				});
			},
		},
		watch:{
			mobile(curval){
				if(curval.length < 11){
					this.showMobileTip = false;
				}
				this.isCanGoNext()
			},
			bankTips(){
				this.isCanGoNext()
			},
			areaTips(){
				this.isCanGoNext()
			}
		},
		components:{
			addressPicker,
			bankPicker
		}
	}
</script>
<style scoped>
	.bindCard2-container .title{
		height: .7rem;
		font-size:14px;
		padding-top: .3rem;
		padding-left: .3rem;
		color: #9197a6;
		line-height: 1;
	}
	.bindCard2-container .inputBox{
		display: flex;
		align-items: center;
		height: .9rem;
		background-color: #fff;
		padding: 0 .3rem;
	}
	.bindCard2-container .inputBox .left{
		font-size: .32rem;
		color: #5f6678;
		display: block;
		padding-right: .3rem;
		width: 1.4rem;
	}
	.bindCard2-container .inputBox .right{
		display:flex;
		align-items: center;
		height: 100%;
	}
	.bindCard2-container .inputBox .right p{
		text-align:left;
		font-size:.32rem;
		color:#4e8cef;
	}
	.bindCard2-container .inputBox .right.active p{
		color: #4e8cef;
	}
	.bindCard2-container .inputBox1 .right.active p{
		color: #4e8cef;
	}
	.bindCard2-container .inputBox2 .right.active p{
		color: #4e8cef;
	}
	.bindCard2-container .inputBox2 img{
		width: .28rem;
		padding-left: .16rem;
		box-sizing: content-box;
	}
	.bindCard2-container .inputBox3{
		margin-top: .36rem;
		justify-content: flex-start;
	}
	.bindCard2-container .inputBox3 .left{
		padding-right: .3rem;
		display: block;
	}
	.bindCard2-container .inputBox3 .right{
		flex:1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bindCard2-container .inputBox3 input{
		color:#9197a6;
		font-size:.32rem;
		height: 100%;
	}
	.bindCard2-container .inputBox3 input::-webkit-input-placeholder{
	    color:#9197a6;
	}
	.bindCard2-container .inputBox3 input::-moz-placeholder{   /* Mozilla Firefox 19+ */
	    color:#9197a6;
	}
	.bindCard2-container .inputBox3 input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
	    color:#9197a6;
	}
	.bindCard2-container .inputBox3 input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
	    color:#9197a6;
	}
	.bindCard2-container .inputBox3 img{
		width: .28rem;
		box-sizing: content-box;
		padding-left: .2rem;
	}
	.bindCard2-container .inputBox3 img:nth-of-type(1){
		margin-left: -.48rem;
	}
	.bindCard2-container .button-wrap{
		padding-top: 1rem;
	}
	.bindCard2-container .button-wrap button{
		width: 6.9rem;
		height: 1.1rem;
		color: #fff;
		font-size:18px;
		background-color: #cecece;
		border-radius: 6px;
		margin: 0 auto;
	}
	.bindCard2-container .button-wrap button.active{
		background-color:#4e8cef;
	}
	.bindCard2-container .mobile-tip{
		padding-top: .3rem;
		padding-left: .3rem;
		color: #999;
	}

</style>
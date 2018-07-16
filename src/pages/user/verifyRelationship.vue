<!-- 验证身份页 -->
<template>
	<div class="verifyRelationship-container">
		<input type="password" style="position: absolute;height: 0;left: 0;top: -10000px;">
		<div class="tips">{{tips}}</div>
		<div class="section">
			<div class="inputBox border-bottom-1px">
				<label for="name">姓名</label>
				<input type="text" name="name" id="name" placeholder="请输入姓名" v-model="name" @blur="validate('name')" :class="{active:nameError}" @focus="onFocus">
			</div>
			<div class="inputBox inputBox2">
				<div>
					<label for="idcard">身份证号</label>
					<input type="text" name="idcard" id="idcard" placeholder="请输入身份证号码" maxlength="18" v-model='idcard' @blur="validate('idcard')" @focus="onFocus" :class="{active:idcardError}">
				</div>

				<img v-if="idcard.length >= 6" class="del-ico" src="./../../assets/del-ico.png" @click.stop="removeIdcard">
			</div>
		</div>
		<p class="danger-tips" v-if="dangerTips">{{dangerTips}}</p>
		<div class="button-wrap">
			<button :class="{active:canPost}" @click.stop="goPost">下一步</button>
		</div>
	</div>
</template>
<script>
	export default{
		name:'verifyRelationship',
		data(){
			return {
				// 姓名
				name:"",
				// 身份证号码
				idcard:"",
				// 身份证号码正则
				idcardReg:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				// 中文姓名正则
				nameReg:/^[\u4e00-\u9fa5]{2,}$/,
				// 正则校验成功,可以提交
				canPost:false,
				// 报错提示
				dangerTips:"",
				nameError:false,
				idcardError:false,
				typeText:"",
				tips:"",

			}
		},
		computed:{
			type(){
				return this.$route.query.type
			}
		},
		created(){
			// type 
			// 0:忘记支付密码,身份验证
			// 1:设置支付密码身份验证
			switch(this.type){
				case '0' :
					this.carryForgetPayPwd()
				break;
				case '1' :
					this.carryInitPayPwd()
				break;
				default :
					this.carryInitPayPwd();
					return;

			}
		},
		methods:{
			// 忘记支付密码的操作
			carryForgetPayPwd(){
				this.tips = '重置交易密码需验证身份';
			},
			// 初始化支付密码操作
			carryInitPayPwd(){
				this.tips = '设置交易密码前，请验证身份';
			},
			validate (val){
			     // 重置
			     this.nameError = false;
			     this.idcardError = false;
			     this.dangerTips = "";

			     // 匹配正则
			     if(val === 'name' && this.name && !this.nameReg.test(this.name)){
			         this.dangerTips = '姓名必须是中文,输入有误';
			         this.nameError = true;
			     }
			     if(val === 'idcard' && this.idcard && !this.idcardReg.test(this.idcard)){
			         this.dangerTips = '身份证号输入有误';
			         this.idcardError = true;
			     }
			},
			canGoPost(){
			 if(this.nameReg.test(this.name) && this.idcardReg.test(this.idcard)){
			   this.canPost = true;
			 }else{
			     this.canPost = false
			 }
			},
			goPost(){
				if(!this.canPost) return;
				let http = this.$axios;
				http.isShowLoading = true;
				// 验证身份信息
				http.post('verifyIdCard',{
					idCardNo:this.idcard,
					name:this.name
				}).then(res =>{
					if(res.rlt){
						if(this.type == 0){
							this.$router.replace('/user/resetPayPwd')
						}else if(this.type == 1){
							this.$router.replace('/user/verifyPayPwdMobile')
						}else{
							this.$router.replace('/user/verifyPayPwdMobile')
						}
					}
				},err=>{
				})
			},
			// 删除身份证号码
			removeIdcard(){
				this.idcard = "";
				this.dangerTips = '';
				this.idcardError = false;
			},
			// 获取焦点
			onFocus(){
				this.nameError = false
				this.idcardError = false
			}
		},
		watch:{
			name(curval,oldval){
				this.canGoPost()
			},
			idcard(curval,oldval){
				this.canGoPost()
			}
		}
	}
</script>
<style scoped>
	.verifyRelationship-container .tips{
		padding-top: .3rem;
		padding-bottom: .2rem;
		font-size: .28rem;
		color: #9197a6;
		padding-left: .3rem;
	}
	.verifyRelationship-container .section{
		padding-left: .3rem;
		background-color: #fff;
	}
	.verifyRelationship-container .inputBox{
		display: flex;
		height: .98rem;
		align-items: center;
	}
	.verifyRelationship-container .inputBox div{
		display: flex;
		height: .98rem;
		align-items: center;
	}
	.verifyRelationship-container .inputBox label{
		width: 1.84rem;
		font-size:16px;
		color: #999;
	}
	.verifyRelationship-container .inputBox input{
		color: #4f5960;
		font-size:15px;
	}
	.verifyRelationship-container .inputBox input.active{
		color: #ff0808;
	}
	.verifyRelationship-container .danger-tips{
	  font-size:12px;
	  color: #ff0808;
	  line-height: .3rem;
	  text-align: center;
	  padding-top: .1rem;
	  padding-top: .2rem;
	}
	.verifyRelationship-container .button-wrap{
		padding-top: .8rem;
	}
	.verifyRelationship-container .inputBox2{
		justify-content: space-between;
		padding-right: .3rem;
	}
	.verifyRelationship-container .button-wrap button{
		width: 6.9rem;
		height: .9rem;
		background-color: #cdcdce;
		color: #fff;
		font-size:16px;
		border-radius: 6px;
		display: block;
		margin: 0 auto;
	}
	.verifyRelationship-container .button-wrap button.active{
		background-color: #4e8cef;
	}
	.verifyRelationship-container .bottom-tips{
		padding:.3rem;
	}
	.verifyRelationship-container .bottom-tips h2{
		font-size:.32rem;
		padding-bottom: .2rem;
	}
	.verifyRelationship-container .bottom-tips a{
		display: inline;
		color: #4e8cef;
	}
	.verifyRelationship-container .bottom-tips p{
		font-size:.28rem;
		color: #999;
		line-height: 1.3;
	}
	.verifyRelationship-container .del-ico{
		width: .32rem;
	}
</style>
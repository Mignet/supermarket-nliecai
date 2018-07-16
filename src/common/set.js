import Vue from 'vue';
import store from './../store/index'

let token = store.state.token
let set = {};

set.init = (context)=>{
	set.context = context;
	if(!token){
	  set.loginTip()
	  return;
	}else{
		set.getBindCard()
	}
}

set.loginTip = ()=>{
	var self = this;
	Vue.popup.confirm({
	  title:"",
	  msg:"需要登录后才能投资",
	  okText:'确定',
	  okCb(){
	    set.context.$router.push({ name: 'login'})
	  }
	})
}

export default set;
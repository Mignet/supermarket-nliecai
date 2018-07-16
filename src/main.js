import Vue from 'vue';
import FastClick from 'fastclick'

import comm from './common/common'
window.comm = comm;

import router from './router/index';
import App from './App';
import './common/filters'
import Popup from './components/popup/vue-popup';
import store from './store'

// ajax请求
import axios from './resource/axios'
Vue.prototype.$axios = axios;

Vue.prototype.$userInfo={}

// 环境配置
import publicConfig from './publicConfig'
Vue.prototype.$publicConfig = publicConfig;

var _hmt = _hmt || []

if(publicConfig.environment === 'produce'){
	var hm = document.createElement('script')
	hm.src = 'https://hm.baidu.com/hm.js?3126ca9763beb941ca302b38ebd76f63'
	var s = document.getElementsByTagName('script')[0]
	s.parentNode.insertBefore(hm,s)
}

FastClick.attach(document.body);
Vue.use(Popup);

let vm = new Vue({
  el         : '#app',
  template   : '<App/>',
  router     : router,
  store      : store,
  components : {App}
});


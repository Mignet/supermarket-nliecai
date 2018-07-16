import Vue from 'vue'
import api from './api'
import comm from './../common/common'
import store from './../store/index'

import publicConfig from './../publicConfig'

import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
    if(config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    if(axios.defaults.isShowLoading){
       store.dispatch('showLoading')
    }
    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    store.dispatch('hideLoading');
    return Promise.resolve(response);
}, error => {
    store.dispatch('hideLoading');
    //请求错误时做些事
    return Promise.reject(error);
});

let onFail = (data) => {
    var msg = '机器闹情绪了，拼命安慰中...';
    if (toString.call(data.errors) === '[object Array]') {
        if(data.errors[0].msg == '用户名或者密码错误'){
            msg = '用户名或者密码错误,忘记密码请通过APP找回'
        }else{
            msg = data.errors[0].msg;
        }
    } else {
        if (data.msg) msg = data.msg;
    }
    Vue.popup.tips(msg);
}

let checkStatus = (response) => {
    if (response.status === 200 || response.status === 304) {
        return Promise.resolve(response.data);
    }
}

let checkCode = (response) => {
    if (response && response.code === '0') {
        return Promise.resolve(response.data);
    }else{
        if(axios.defaults.isShowTips){
            onFail(response)
        }
        return Promise.reject(response);
    }
}

export default {
    post (url, data) {
    	let requestUrL  = api[url]
    	let params = this.extends(data)
        let isShowLoading = this.isShowLoading;
        axios.defaults.isShowLoading = isShowLoading || false;
    	axios.defaults.isShowTips = this.isShowTips == '0' ? false : true;
    	return axios({
            method: 'post',
            baseURL: publicConfig.httpsServerUrl + 'rest/api/',
            url:requestUrL,
            data: params,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
	extends(data) {
	    var baseData = this.getBaseData();
	    for (let attr in data) {
	        baseData[attr] = data[attr];
	    }
	    return baseData;
	},
	getBaseData() {
	    let data = {
	        orgNumber: 'App_channel_wechat',
	        appKind: 'channel',
	        appClient: 'wechat',
	        appVersion: '1.0.0',
	        v: '1.0.0',
	        token:comm.getCookie('__token__') || '',
	        timestamp: this.getNowDate()
	    }
	    return data;
	},
	getNowDate() {
	    var d = new Date();
	    var o = {};
	    o.y = d.getFullYear();
	    o.m = d.getMonth() + 1;
	    o.d = d.getDate();
	    o.h = d.getHours();
	    o.min = d.getMinutes();
	    o.s = d.getSeconds();
	    return o.y + '-' + o.m + '-' + o.d + ' ' + o.h + ':' + o.min + ':' + o.s;

	},
}
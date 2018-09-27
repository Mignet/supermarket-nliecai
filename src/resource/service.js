import Vue from 'vue';
import Api from './api';
import Env from './env';
import VueResource from 'vue-resource';
import comm from './../common/common'
import store from './../store/index'

Vue.use(VueResource);


Vue.http.interceptors.push((request, next)=>{
  next((response) => {
    store.dispatch('hideLoading');
    return response
  });
});

export default {
    serverRequest(url, data, callback) {
        let self = this;
        if (typeof data === 'function') {
            callback = data;
            data = {};
        }
        let requestUrL = Env.serverUrl + Api[url];
        let params = this.extends(data);
        let promise = Vue.http.post(requestUrL, params, {
            timeout: 3000,
            emulateJSON: true
        }).then((response) => {
            if(process.env.NODE_ENV != 'production'){
                console.log(response.url)
                console.log(response.data)
            }
            if (response.body && response.body.code == 0) {
                callback && callback(response.body.data);
            } else if (response.body && response.body.code === '100003') {
              comm.setCookie("__mobile__",'',-1);
              comm.setCookie("__token__",'',-1);
                location.href = '/login/login';
            }else if(response.body && response.body.code === '100005'){
                self.onFail(response.body,function(){
                    // location.href = "https://liecai.v5ent.com/pages/download/download.html";
                });
            } else {
                self.onFail(response.body);
            }
        }, (response) => {
            self.onFail(response.body)
        });
        return promise;
    },

    onFail(data,callback) {
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
        Vue.popup.tips(msg,callback);
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
            token: comm.getCookie('__token__') || '',
            timestamp: this.getNowDate()
        };
        return data;
    },

    getNowDate() {
        let d = new Date();
        let o = {};
        o.y = d.getFullYear();
        o.m = d.getMonth() + 1;
        o.d = d.getDate();
        o.h = d.getHours();
        o.min = d.getMinutes();
        o.s = d.getSeconds();
        return o.y + '-' + o.m + '-' + o.d + ' ' + o.h + ':' + o.min + ':' + o.s;

    },
    setCookie(name, value, expiredays) {
        var d = new Date();
        d.setDate(d.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + d.toGMTString()) + ";path=/";
    },
    getCookie(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=")
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }
}

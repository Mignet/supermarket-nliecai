import {environment,evnHost,staticHost} from '../resource/config';
let util = {};

util.getQueryString = (search) => {
    var url = decodeURIComponent ( search);
    var request = {};
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      arr = str.split("&");
      for(var i = 0; i < arr.length; i ++) {
         request[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
      }
    }
    return request || {};
}

util.redirect = (url,isPush) => {
    if(util.isWebChat() && environment != 'pre') {
        let posUrl = staticHost[environment] + url;
        location.href = 'http://nliecai.v5ent.com/getWechatCode.html?appid=wx83677e6da548b99e&redirect_uri=' + encodeURIComponent(posUrl) + '&scope=snsapi_base&state=1#wechat_redirect';
    } else {
        location.href = url;
    }
}

util.isWebChat = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

util.getParameter = (pops) => {
    var regexp = new RegExp(pops + "=([^\&]*)", "i");
    var arr = regexp.exec (document.location.search);
    if (arr == null ) return '';
    return arr[1];
}

/*
* 获取上一个月
*/
util.getPreMonth = () => {
    var month = new Date().getMonth() + 1
    var PreMonth = parseInt(month) - 1;
    if (PreMonth == 0) PreMonth = 12;
    return PreMonth;
}

util.getTwoNum = (num) => {
    if( num < 10 ){
        num = '0' + num;
    }
    return num
}

export default util;

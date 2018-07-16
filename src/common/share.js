import service from '../resource/service';
import evn     from '../resource/env';
import { environment , staticHost } from './../resource/config'
import store from './../store/index.js'
import comm from './common.js'

function getChannel(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
	    return "wechat" ;
	}else{
	    return "wap";
	}
}

function setWechatConfig(share){
	var href = "";
	if(comm.isAndroid()){
		href = window.location.href.replace(/#.+$/, '')
	}else if(comm.isIOS()){
		href = store.state.initHref.replace(/#.+$/, '')
	}
	service.serverRequest('wechatShare',{
		url: href,
	},(result)=>{
		wx.config({
			appId : result.appid,
			timestamp : result.timestamp,
			nonceStr : result.nonceStr,
			signature : result.signature,
			jsApiList : ['showOptionMenu','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ']
		});
		wx.ready(function(){
			// 分享到QQ
			wx.onMenuShareQQ(share);
			// 分享到朋友圈
			wx.onMenuShareTimeline(share);
			// 分享给朋友
			wx.onMenuShareAppMessage(share);
		});
		wx.error(function (res) {

		});
	})
}

export default function share(content) {
    var linkArr = content.shareLink.split("?")
    var request = {};
    var arr = linkArr[1].split("&");
    for (var i = 0; i < arr.length; i++) {
     request[decodeURIComponent(arr[i].split("=")[0])] = decodeURIComponent(arr[i].split("=")[1]);
    }
    if(request && request.name){
        request.name = encodeURI(request.name)
    }
    content.shareLink = staticHost[environment] + '/register/inviteRegister'+"?recommendCode="+request.recommendCode+"&name="+request.name
    var shareContent = {
        title  : content.shareTitle, // 分享标题
        desc   : content.shareDesc, // 分享描述
        link   : content.shareLink + '&fromApp=leicai&platform=' + getChannel(), // 分享链接
        imgUrl : evn.imgUrl +"/"+  content.shareImgurl// 分享图标
    };
    setWechatConfig(shareContent);
};

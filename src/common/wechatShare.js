import comm from './../common/common'
import service from './../resource/service'
import store from './../store/index'


function _requestToken(share){
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


export function  wechatShare(shareContent) {
	shareContent.link = shareContent.link + '?fromApp=leicai&platform=' + getChannel();
		_requestToken(shareContent)
}
function getChannel(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
	    return "wechat" ;
	}else{
	    return "wap";
	}
}

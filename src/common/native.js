// android与ios交互处理对象
import comm from './common'

class Native {
    constructor(props) {
        this.init()
    }
}

Native.prototype = {
    // 初始化
    init : function (){
        var search = location.href.split("?")[1] || "";
        if( sessionStorage.getItem("__AppSource__") ){
            this.source = sessionStorage.getItem("__AppSource__");
        }else{
            if( search.indexOf('channel_ios') > -1 ){   //当前环境为ios的app中
                this.source =  'ios';
            }else if( typeof AppObject == 'object' ){   //当前环境为android的app中
                this.source = 'android';
            }
            if(this.source){
                sessionStorage.setItem("__AppSource__",this.source);                    
            }
        }
        
        var query = comm.getQueryString()
        if(comm.isIOS() && query.isApp && query.isApp === 'liecai'){
            this.source =  'ios';
        }

        if( this.source ){
            this.isApp = true;
        }else{
            this.isApp = false;
        }
    },

    // 获取app的token
    // ios中为异步执行，暂时只能采用回调函数的形式
    getAppToken : function(fn){
        this.action('getAppToken',null,fn);
    },

    // app退出登录
    appLogOut : function(){
        this.action('getAppLogOut');
    },

    // 调用app分享功能
    appShare : function( shareData ){
        this.action('getAppShareFunction',shareData);
    },

    // 第三方浏览器打开
    gotoWeb : function(urlObj) {
        this.action('buyTBProduct', urlObj);
    },

    //获取版本号
    getAppVersion : function(fn){
        this.action('getAppVersion',null,fn)
    },
    //动态跳转到app具体某个页面
    skipAppPage(data){
        var data = data || "";
        var result = "";
        if(comm.isAndroid()){
            result = comm.toBase64(JSON.stringify(data.android))
        }else if(comm.isIOS()){
            result = comm.toBase64(JSON.stringify(data.ios))
        }
        this.action('jumpToNativePage',result)
    },
    // 操作代理
    action : function(str,data,callback){
        var _this = this;
        var appAction = {
            android : function(){
                if( data ){ // android中如果data没有而传了，会出错
                    _this.appToken  = AppObject[str]( JSON.stringify(data) );
                }else{
                    _this.appToken  = AppObject[str]();
                }
                if( typeof callback == 'function' ){
                    callback(_this.appToken);
                }
            },
            ios : function(){
                _this.setupWebViewJavascriptBridge(function(bridge){
                    bridge.callHandler(str, data, function(responseData){
                        _this.appToken = responseData;
                        if( typeof callback == 'function' ){
                            callback(responseData);
                        }
                    });
                });
            }
        };

        if( this.source ){
            appAction[this.source]();
        }
    },

    // ios桥接处理
    setupWebViewJavascriptBridge : function(callback){
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    }
}

export default new Native();
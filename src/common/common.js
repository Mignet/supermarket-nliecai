const comm = {
	setTitle(str){
		document.title = str || '猎财大师';
		var iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.setAttribute('src', '/favicon.ico');
		document.body.appendChild(iframe);
		iframe.onload = function() {
		    setTimeout(() => {
		        document.body.removeChild(iframe)
		    }, 0)
		}
	},
	scrollTop(){
		return document.documentElement.scrollTop || document.body.scrollTop || 0;
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
	},
	isWechat() {
    	var ua = navigator.userAgent.toLowerCase();
    	if (ua.match(/MicroMessenger/i) == "micromessenger") {
        	return true;
    	} else {
        	return false;
    	}
	},
	isAndroid() {
    	return navigator.userAgent.match(/Android/i) ? true : false;
	},
	isIOS() {
    	return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	//获取url中search部分字符串为json对象
	getQueryString : function (search) {
		var url = decodeURIComponent ( search || location.search );
		let arr;
		var request = {};
		if (url.indexOf("?") != -1) {
		  var str = url.substr(1);
		  arr = str.split("&");
		  for(var i = 0; i < arr.length; i ++) {
		     request[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
		  }
		}
		return request || {};
	},
	throttle(fn, wait){
    	var last = 0;
    	return function(){
        	var curr = +new Date()
        	if (curr - last > wait){
            	fn.apply(this, arguments);
            	last = curr;
        	}
    	}
	},
	//转码成base64
    toBase64(data){
        var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var base64Pad = '=';
        var result = '';
        var length = data.length;
        var i;
        for (i = 0; i < (length - 2); i += 3) {
            result += toBase64Table[data.charCodeAt(i) >> 2];
            result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
            result += toBase64Table[((data.charCodeAt(i + 1) & 0x0f) << 2) + (data.charCodeAt(i + 2) >> 6)];
            result += toBase64Table[data.charCodeAt(i + 2) & 0x3f];
        }
        if (length % 3) {
            i = length - (length % 3);
            result += toBase64Table[data.charCodeAt(i) >> 2];
            if ((length % 3) == 2) {
                result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
                result += toBase64Table[(data.charCodeAt(i + 1) & 0x0f) << 2];
                result += base64Pad;
            } else {
                result += toBase64Table[(data.charCodeAt(i) & 0x03) << 4];
                result += base64Pad + base64Pad;
            }
        }
        return result;
    },
    /** Convert Base64 data to a string */ 
    base64ToString :function(data) {  
        var toBinaryTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,38, 39, 40,41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];  
        var base64Pad = '=';
        var result = '';  
        var leftbits = 0;
        var leftdata = 0;                                                                         
        for (var i = 0; i < data.length; i++) {  
            var c = toBinaryTable[data.charCodeAt(i) & 0x7f];  
            var padding = (data.charCodeAt(i) == base64Pad.charCodeAt(0)); 
            if (c == -1) continue;  
            leftdata = (leftdata << 6) | c;  
            leftbits += 6;  
            if (leftbits >= 8) {  
                leftbits -= 8;
                if (!padding)  
                    result += String.fromCharCode((leftdata >> leftbits) & 0xff);  
                leftdata &= (1 << leftbits) - 1;  
            }
        }                                    
        if (leftbits)  
            throw Components.Exception('Corrupted base64 string');  
        return result;  
    },
    toDecimal(num, flg, decimal){
    var decimal = decimal || 2;
    var thePow = Math.pow(10, decimal);
    var theNum = Math.floor(num * thePow) / thePow;
    if (flg) { // 不多于两位
      return theNum;
    } else { // 强制为两位
      return theNum.toFixed(decimal);
    }
  },
  setCookie(name, value, expiredays) {
    let d = new Date();
    d.setDate(d.getDate() + expiredays);
    // document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + d.toGMTString()) + ";path=/;domain=.bethye.top";
    var reg = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;
    if(document.domain && (document.domain === "localhost" || reg.test(document.domain))){
      //如果document.domain是localhost或ip就不做cookie domain限制
      document.cookie = name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + d.toGMTString())+";path=/";
    }else{
      document.cookie = name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + d.toGMTString())+";path=/;domain=.bethye.top";
    }
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

export default comm;

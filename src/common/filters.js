import Vue from 'vue';
import publicConfig from './../publicConfig'

Vue.filter('serverImage',(url)=>{
	if(!url) return
	if(url.indexOf('http') == 0){
	    return url
	}else {
	    url = publicConfig.imageUrl + url + '?f=png'
	    return url
	}	
})

Vue.filter('hideMobile',(mobile)=>{
	if(!mobile) return
	let reg = /^(\d{3})\d{4}(\d{4})$/;
	mobile = mobile.replace(reg, "$1****$2");
	return mobile
})

Vue.filter('desensitization',(val)=>{
	if(val){
		var val = val.replace(/\s/g,"")
		if(/^\d{11}$/.test(val)){
			val = val.substr(0,3) + "****" +val.substr(7);
		}else {
			if(val.length <= 2){
				val = val.substr(0,1) + "*";
			}else {
				var points = "";
				for(let i=0;i<val.length;i++){
					if (i != 0 && i != val.length-1) {
						points += "*";
					}
				}
				val = val.substr(0,1) + points + val[val.length-1];
			}
		}
		return val;
	}
});

Vue.filter('linksymbol',(val)=>{
	let str = new String(val).replace(/\s/g,'');
	if(str) {
	   return str + ' ';
	}else{
       return '~' + ' ';
	}
});

Vue.filter('toThousands',(num)=>{
	if(num){
	    //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
	    num = num.toString().replace(/\$|\,/g,'');
	    //如果num不是数字，则将num置0，并返回
	    if(''==num || isNaN(num)){
	    	return '0.00';
	    }
	    //如果num是负数，则获取她的符号
	    var sign = num.indexOf("-")> 0 ? '-' : '';
	    //如果存在小数点，则获取数字的小数部分
	    var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
	    cents = cents.length>1 ? cents : '' ;//注意：这里如果是使用change方法不断的调用，小数是输入不了的
	    //获取数字的整数数部分
	    num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
	    //如果没有小数点，整数部分不能以0开头
	    if('' == cents){
	    	if(num.length>1 && '0' == num.substr(0,1)){
	    		return '0.00';
	    	}
	    }else{
	    	if(num.length>1 && '0' == num.substr(0,1)){
	    		return '0.00';
	    	}
	    }
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
	        num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
	    }
	    //将数据（符号、整数部分、小数部分）整体组合返回
	    return (sign + num + cents);   
	}
})

// 保留两位小数
Vue.filter('twoDecimal',(num)=>{
	if(isNaN(parseFloat(num))) return "";
	let theNum = Math.floor( num * 100 ) / 100;
	return theNum.toFixed(2);
})

// 四个数字加空格
Vue.filter("fourNumberSplit",(val)=>{
    // if(/\S{5}/.test(val)){
    //     return val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
    // }
    return "";
})
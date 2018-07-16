let environment = 'pre';

if(process.env.NODE_ENV === 'production'){
	environment = 'produce';
}else if(process.env.NODE_ENV === 'pre'){
	environment = 'pre';
}

// const httpsProtocol = 'https://'
const httpsProtocol = 'http://'
	
// 后台服务地址
const serverHost  = {
    pre  : 'premarket.bethye.top/',
    produce : 'market.bethye.top/'
};

// 图片服务器地址
const imgHost =  {
	pre :'preimage.bethye.top/',
	produce  :'image.bethye.top/'      
};

const projectHost = {
	pre :'predeclare.bethye.top/',
	produce  :'declare.bethye.top/' 
}

const httpsServerUrl = httpsProtocol + serverHost[environment]
const imageUrl = httpsProtocol + imgHost[environment]
const projectUrl = httpsProtocol + projectHost[environment]

export default {
	environment,
	httpsServerUrl,
	imageUrl,
	projectUrl
}
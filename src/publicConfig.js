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
    pre  : 'premarket.v5ent.com/',
    produce : 'market.v5ent.com/'
};

// 图片服务器地址
const imgHost =  {
	pre :'preimage.v5ent.com/',
	produce  :'image.v5ent.com/'
};

const projectHost = {
	pre :'predeclare.v5ent.com/',
	produce  :'declare.v5ent.com/'
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

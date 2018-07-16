
let environment = 'pre';

if(process.env.NODE_ENV === 'production'){
	environment = 'produce';
}else if(process.env.NODE_ENV === 'pre'){
	environment = 'pre';
}

// const httpProtocol = 'https://'
const httpProtocol = 'http://'

const serverHost  = {
    pre  : 'premarket.bethye.top',
    produce : 'market.bethye.top'
};

const imgHost     =  {
	pre     :'preimage.bethye.top',
	produce :'image.bethye.top'      
};

const evnHost = {
	pre     : 'https://prenliecai.bethye.top/',
	produce : 'https://nliecai.bethye.top/'
}

const staticHost = {
	pre     : 'https://prenliecai.bethye.top',
	produce : 'https://nliecai.bethye.top'
}

const appLiecaiHost = {
	pre: "https://preliecai.bethye.top",
	produce: "https://liecai.bethye.top"
}

const liecaiIcon = httpProtocol +  imgHost[environment] + '/' +'dfa3e35be331f6ec67566130f67820b9' + '?f=png'

export {environment,serverHost,imgHost,evnHost,liecaiIcon,staticHost,appLiecaiHost};	




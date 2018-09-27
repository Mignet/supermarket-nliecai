
let environment = 'pre';

if(process.env.NODE_ENV === 'production'){
	environment = 'produce';
}else if(process.env.NODE_ENV === 'pre'){
	environment = 'pre';
}

// const httpProtocol = 'https://'
const httpProtocol = 'http://'

const serverHost  = {
    pre  : 'premarket.v5ent.com',
    produce : 'market.v5ent.com'
};

const imgHost     =  {
	pre     :'preimage.v5ent.com',
	produce :'image.v5ent.com'
};

const evnHost = {
	pre     : 'https://prenliecai.v5ent.com/',
	produce : 'https://nliecai.v5ent.com/'
}

const staticHost = {
	pre     : 'https://prenliecai.v5ent.com',
	produce : 'https://nliecai.v5ent.com'
}

const appLiecaiHost = {
	pre: "https://preliecai.v5ent.com",
	produce: "https://liecai.v5ent.com"
}

const liecaiIcon = httpProtocol +  imgHost[environment] + '/' +'dfa3e35be331f6ec67566130f67820b9' + '?f=png'

export {environment,serverHost,imgHost,evnHost,liecaiIcon,staticHost,appLiecaiHost};




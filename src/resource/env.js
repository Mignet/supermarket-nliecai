
import {environment,serverHost,imgHost,appLiecaiHost} from './config';

export default {

    serverUrl :  'http://'+ serverHost[environment]+'/rest/api/',

    vcodeUrl  :  'http://'+ serverHost[environment]+'/rest/api/',

    imgUrl    :  'http://'+imgHost[environment],

    appUrl    :  appLiecaiHost[environment]  
}


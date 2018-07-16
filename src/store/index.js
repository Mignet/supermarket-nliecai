import Vue from 'vue'
import vuex from 'vuex'
import  comm from './../common/common'

Vue.use(vuex);

const state = {
    // 是否显示loading
    show:false,
    token: comm.getCookie('__token__'),
    fromPath:'/',
    fromQuery:'',
    initHref :"",
    // 来源路径 
    originPath:"",
    // 来源query
    originQuery:{},
    originParams:{}
}

export default new vuex.Store({
    state,
    mutations:{
        showLoading(state){
            state.show = true
        },
        hideLoading(state){
			state.show = false
        },
        fromPath(state,str){
            state.fromPath = str
        },
        fromQuery(state,str){
            state.fromQuery = str
        },
        initHref(state,str){
            state.initHref = str;
        },
        originPath(state,str){
            state.originPath = str;
        },
        originQuery(state,obj){
            state.originQuery = obj;
        },
        originParams(state,obj){
            state.originParams = obj
        }
    },
    actions:{
    	showLoading(context){
    		context.commit('showLoading')
    	},
    	hideLoading(context){
    		context.commit('hideLoading')
    	},
        fromPath(context,str){
            context.commit('fromPath',str)
        },
        fromQuery(context,str){
            context.commit('fromQuery',str)
        },
        initHref(context,str){
            context.commit('initHref',str)
        },
        originPath(context,str){
            context.commit('originPath',str)
        },
        originQuery(context,obj){
            context.commit('originQuery',obj)
        },
        originParams(context,obj){
            context.commit('originParams',obj)
        }
    }
})

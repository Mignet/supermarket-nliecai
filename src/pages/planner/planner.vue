<template>
    <div class="wraper" style="height:100%;">
        <ul class="flex">
            <li class="oneFlex"><a @click="toggleTabs(client)" v-bind:class="{active:currentView=='client'}">客户</a></li>
            <li class="oneFlex"><a @click="toggleTabs(finance)" v-bind:class="{active:currentView=='finance'}">理财师团队</a></li>
        </ul>
        <div style="height:100%;">
            <component :is="currentView" keep-alive style="height:100%;"></component>   
        </div>
    </div>
</template>
<script>
    import Client from './client.vue'
    import Finance from './finance.vue'
    export default{
        name : 'planner',
        data (){
            return {
                iscur:0,
                client: "client",
                finance: "finance",
                currentView:this.$route.query.currentView=="myCfp_platform"?'finance':'client' || "client",
            }
        },
        components:{
            "client":Client,
            "finance":Finance
        },
        methods:{
            toggleTabs: function(tabText) {
                this.currentView = tabText;
            },
        }
    }
</script>
<style scoped>
    ul{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: .74rem;
        background-color: #eeeff3;
        z-index: 999;
    }
    li{
        text-align: center;
        height: 100%;
    }
    li a{
        display: block;
        font-size: .29rem;
        color: #969696;
        width: 1.67rem;
        border-bottom:1px solid #f1f1f1;
        margin: 0 auto;
        line-height: .72rem;
        height: 100%;
    }
    li a.active{
        border-color: #12b7f5;
        color: #323232;
    }
</style>
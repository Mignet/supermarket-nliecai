<template>
  <div style="width:100%;height: 100%;">
    <transition :name="transitionName" appear>
      <router-view></router-view>
    </transition>
    <Loading v-show="$store.state.show"></Loading>
  </div>
</template>

<script>

  import './../static/css/reset.css'
  import './../static/css/public.css'
  import './components/popup/popup.css'

  const Loading = () => import('@/components/Loading/Loading')

  export default {
    name: 'App',
    data(){
      return {
        transitionName: 'slide-left',
      }
    },
    created(){
      sessionStorage.setItem('__href__',location.href);
      sessionStorage.setItem('__referer__',document.referrer);
      this.$store.dispatch('initHref',window.location.href);
    },
    watch: {
      '$route' (to, from) {
        let toDepth = to.path.split('/').length;
        let fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
    },
    components:{
      Loading
    }
  }
</script>
<style>
  .slide-left-enter-active{
    transition: all .3s ease;
    transform :translate3d(0, 0, 0);
  }

  .slide-left-enter{
    transform:translate3d(200%, 0, 0);
  }

  .slide-right-enter-active{
    transition: all .3s ease;
    transform :translate3d(0, 0, 0);
  }

  .slide-right-enter{
    transform:translate3d(-200%, 0, 0);
  }
</style>

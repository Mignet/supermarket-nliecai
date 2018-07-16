<template>
  <div ref='wrapper'>
    <slot></slot>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
  import comm from './../../common/common'
  export default{
    name:'loadmore',
    props:{
      initData:{
        type:Function,
        default:null
      },
      loadmore:{
        type:Function,
        default:null
      },
      isLoadingEnd:{
        type:Boolean,
        default:true
      }
    },
    mounted(){
      this.initScroll()
      this.throttleLoad=comm.throttle(()=>{
        this.scrollEvent()
      },50)
      window.addEventListener('scroll',this.throttleLoad)
    },
    destroyed(){
      window.removeEventListener('scroll',this.throttleLoad)
    },
    methods:{
      initScroll(){
        this.$emit('initData')
      },
      loadmoreData(){
        this.$emit('loadmore')
      },
      scrollEvent(){
        if(this.isLoadingEnd) return;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight;
        if( scrollHeight-clientHeight - scrollTop <= 50){
          this.loadmoreData()
        }
      }
    }
  }
</script>
<style>
  .loadmore-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items :center;
    font-size: .24rem;
    color: #999;
    padding: .3rem 0;
    background-color: #ebebeb;
  }
  .loadmore-wrapper b{
    display: block;
    width: 16%;
    height: 1px;
    background-color: #dcdcdc;
  }
  .loadmore-wrapper span{
    display: block;
    padding: 0 .16rem;
  }
</style>

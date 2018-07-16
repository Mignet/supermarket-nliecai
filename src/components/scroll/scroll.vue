<template>
  <div ref="wrapper">
  	<div>
		<div class="scroll-content">
			<slot></slot>
		</div>
		<div class="pullup-wrapper" v-show="isLoading">
			<b></b><span>{{pullupTxt}}</span><b></b>
		</div>
  	</div>
  </div>
</template>
<script>
	import BScroll from 'better-scroll'
  	export default {
	    props: {
	      /**
	       * 1 滚动的时候会派发scroll事件，会截流。
	       * 2 滚动的时候实时派发scroll事件，不会截流。
	       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
	       */
	      probeType: {
	        type: Number,
	        default: 1
	      },
	      /**
	       * 点击列表是否派发click事件
	       */
	      click: {
	        type: Boolean,
	        default: true
	      },
	      /**
	       * 是否开启横向滚动
	       */
	      scrollX: {
	        type: Boolean,
	        default: false
	      },
	      /**
	       * 是否派发滚动事件
	       */
	      listenScroll: {
	        type: Boolean,
	        default: false
	      },
	      pullUpLoad: {
	        type: null,
	        default: true
	      },
	      /**
	       * 列表的数据
	       */
	      data: {
	        type: Array,
	        default: null
	      },
	      pullDownRefresh: {
	        type: null,
	        default: true
	      },
	      /**
	       * 是否派发滚动到底部的事件，用于上拉加载
	       */
	      pullup: {
	        type: Boolean,
	        default: true
	      },
	      /**
	       * 是否派发顶部下拉的事件，用于下拉刷新
	       */
	      pulldown: {
	        type: Boolean,
	        default: false
	      },
	      /**
	       * 是否派发列表滚动开始的事件
	       */
	      beforeScroll: {
	        type: Boolean,
	        default: false
	      },
	      /**
	       * 当数据更新后，刷新scroll的延时。
	       */
	      refreshDelay: {
	        type: Number,
	        default: 20
	      },

	      /**
			* 判断是否加载到了最后
	      */
	      isLoadingEnd: {
	      	type:Boolean,
	      	default:false
	      },

	      /**
			* 请求是否正在加载
	      */
	      isLoading:{
	      	type:Boolean,
	      	default:false
	      }
	    },
	    data(){
	    	return {
	    		isPullUpLoad:true,
	    		beforePullDown: true,
	    		isRebounding: false,
	    		isPullingDown: false,
	    		pullUpDirty: true,
	    		pullDownStyle: '',
	    		bubbleY: 0
	    	}
	    },
	    computed:{
	    	pullupTxt(){
	    		return this.isLoadingEnd ? '暂无更多项目' : '上拉加载更多...'
	    	}
	    },
	    mounted() {
	      // 保证在DOM渲染完毕后初始化better-scroll
	      setTimeout(() => {
	        this._initScroll()
	      }, 20)
	    },
	    methods: {
	      _initScroll() {
	        if (!this.$refs.wrapper) {
	          return
	        }
	        // better-scroll的初始化
	        this.scroll = new BScroll(this.$refs.wrapper, {
	          probeType: this.probeType,
	          click: this.click,
	          scrollX: this.scrollX
	        })

	        // 是否派发滚动事件
	        if (this.listenScroll) {
	          this.scroll.on('scroll', (pos) => {
	            this.$emit('scroll', pos)
	          })
	        }

	        // 是否派发滚动到底部事件，用于上拉加载
	        if (this.pullup) {
	          this.scroll.on('scrollEnd', () => {
	            // 滚动到底部
	            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
	              this.$emit('scrollToEnd')
	            }
	          })
	        }

	        // 是否派发顶部下拉事件，用于下拉刷新
	        if (this.pulldown) {
	          this.scroll.on('touchend', (pos) => {
	            // 下拉动作
	            if (pos.y > 50) {
	              this.$emit('pulldown')
	            }
	          })
	        }

	        // 是否派发列表滚动开始的事件
	        if (this.beforeScroll) {
	          this.scroll.on('beforeScrollStart', () => {
	            this.$emit('beforeScroll')
	          })
	        }
	      },
	      _initPullUpLoad() {
	        this.scroll.on('pullingUp', () => {
	          this.isPullUpLoad = true
	          this.$emit('pullingUp')
	        })
	      },
	      disable() {
	        // 代理better-scroll的disable方法
	        this.scroll && this.scroll.disable()
	      },
	      enable() {
	        // 代理better-scroll的enable方法
	        this.scroll && this.scroll.enable()
	      },
	      refresh() {
	        // 代理better-scroll的refresh方法
	        this.scroll && this.scroll.refresh()
	      },
	      _initPullDownRefresh() {
	        this.scroll.on('pullingDown', () => {
	          this.beforePullDown = false
	          this.isPullingDown = true
	          this.$emit('pullingDown')
	        })

	        this.scroll.on('scroll', (pos) => {
	          if (this.beforePullDown) {
	            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
	            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
	          } else {
	            this.bubbleY = 0
	          }

	          if (this.isRebounding) {
	            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
	          }
	        })
	      },
	      scrollTo() {
	        // 代理better-scroll的scrollTo方法
	        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
	      },
	      scrollToElement() {
	        // 代理better-scroll的scrollToElement方法
	        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
	      },
	      forceUpdate(dirty) {
	        if (this.pullDownRefresh && this.isPullingDown) {
	          this.isPullingDown = false
	          this._reboundPullDown().then(() => {
	            this._afterPullDown()
	          })
	        } else if (this.pullUpLoad && this.isPullUpLoad) {
	          this.isPullUpLoad = false
	          this.scroll.finishPullUp()
	          this.pullUpDirty = dirty
	          this.refresh()
	        } else {
	          this.refresh()
	        }
	      },
	    },
	    watch: {
	      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
	      data() {
	        setTimeout(() => {
	          this.refresh()
	        }, this.refreshDelay)
	      }
	    },
	    components:{
	    }
  }
</script>
<style scoped>
    .wrapper{
        height: 100%;
    }
	.pullup-wrapper{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items :center;
		font-size: .24rem;
		color: #999;
		padding: .3rem 0;
		background-color: #pullup-wrapper;
	}
	.pullup-wrapper b{
		display: block;
		width: 16%;
		height: 1px;
		background-color: #dcdcdc;
	}
	.pullup-wrapper span{
		display: block;
		padding: 0 .16rem;
	}
</style>
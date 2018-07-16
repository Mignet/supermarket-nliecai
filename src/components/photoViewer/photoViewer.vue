<template>
  <transition name="slide-fade">
  	<div class="photo-viewer-container" @click="complete" v-if="show">
  		<swiper :options="swiperOption">
  		  <swiper-slide v-for="(imgItem,index) in imgArr" :key="index">
  		  	<img :src="imgItem | serverImage">
  		  </swiper-slide>
  		</swiper>
  	</div>
  </transition>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	 
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		name:'photoViewer',
		props:['imgArr','initialSlide','show'],
		data(){
			return {
				swiperOption:{
					observer:true,
					observeParents:true,
					initialSlide:this.initialSlide
				},
			}
		},
		methods:{
			complete(){
				this.$emit('complete')
			}
		},
		components:{
			swiper,
			swiperSlide
		}
	}
</script>
<style scoped>
	.photo-viewer-container{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.slide-fade-enter-active {
	    transition: opacity .5s ease;
	}
	.slide-fade-leave-active {
	    transition: opacity .5s ease;
	}
	.slide-fade-enter, .slide-fade-leave-active {
	    opacity: 0;
	}
</style>
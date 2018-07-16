<template>
    <div class="about-wrapper">
		<swiper :options="swiperOption" ref="mySwiperA">
			<swiper-slide class="page one">
		      	<div class="animation"><img src="./images/1/1.png"></div>
		      	<div class="animation"><img src="./images/1/2.png"></div>
		      	<div class="animation"><img src="./images/1/3.png"></div>   					
			</swiper-slide>
			<swiper-slide class="page two">
		      	<div class="animation"><img src="./images/2/1.png"></div>
		      	<div class="animation"><img src="./images/2/2.png"></div>
		      	<div class="animation"><img src="./images/2/3.png"></div>    					
			</swiper-slide>
			<swiper-slide class="page three">
		      	<div class="animation"><img src="./images/3/1.png"></div>
		      	<div class="animation"><img src="./images/3/2.png"></div>
		      	<div class="animation"><img src="./images/3/3.png"></div>          		
		      	<div class="animation"><img src="./images/3/4.png"></div>  					
			</swiper-slide>
			<swiper-slide class="page four">
		      	<div class="animation"><img src="./images/4/1.png"></div>
		      	<div class="animation"><img src="./images/4/2.png"></div>
		      	<div class="animation"><img src="./images/4/3.png"></div>          		
		      	<div class="animation"><img src="./images/4/4.png"></div>   					
			</swiper-slide>
			<swiper-slide class="page five">
		      	<div class="animation"><img src="./images/5/1.png"></div>
		      	<div class="animation"><img src="./images/5/2.png"></div>
		      	<div class="animation"><img src="./images/5/3.png"></div>          		
		      	<div class="animation"><img src="./images/5/4.png"></div>          		
		      	<div class="animation"><img src="./images/5/5.png"></div>    					
			</swiper-slide>
			<swiper-slide class="page six">
		      	<div class="animation"><img src="./images/6/1.png"></div>
		      	<div class="animation"><img src="./images/6/2.png"></div>
		      	<div class="animation"><img src="./images/6/3.png"></div>          		
		      	<div class="animation"><img src="./images/6/4.png"></div>          		
		      	<div class="animation"><img src="./images/6/5.png"></div>   					
			</swiper-slide>
		</swiper>   	
    </div>
</template>

<script>
	import {swiper, swiperSlide} from 'vue-awesome-swiper'
	let About = {
		name : 'about',
		data() {
			return {
				swiperOption: {
					notNextTick: true,
					direction : 'vertical',
					setWrapperSize :true,
					paginationClickable :true,
					debugger: true,
					observeParents:true,
					onSlideNextEnd : function(swiper){           
						About.methods.animation(swiper.activeIndex);                                    
					},
					onSlidePrevEnd:function(swiper){
						About.methods.animation(swiper.activeIndex);  
					}   
				}
			}
		},
		computed:{
			swiper() {
				return this.$refs.mySwiperA.swiper
			}
		},
		mounted() {
			setTimeout(()=>{
				About.methods.animation(0);     	  	
			},320)
		},
		methods:{
			animation(activeIndex){ 			
				let animationActive = document.getElementsByClassName('animation');     
				for(let i = 0 ; i < animationActive.length ; i++){
					animationActive[i].setAttribute('class','animation');       	
				}
				let swiperWrapper = document.getElementsByClassName('swiper-wrapper');
				let swiperSlide = swiperWrapper[0].children[activeIndex];
				let activeElement = swiperSlide.children;
				for(let i = 0 ; i < activeElement.length ; i++){
					activeElement[i].setAttribute('class','animation active');       	
				}       
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	}
	export default About;
</script>

<style>
    .about-wrapper{
	    position: relative;
	    height: 100%;    	
    }
	.swiper-container{
	    width: 100%;
	    height: 100%;
	    background-color: #fff;
	}

	.swiper-slide img{
		width:100%;
	}

    .swiper-wrapper .one > div:nth-child(2){
		margin:.85rem 0 1.5rem 0;
    }

    .swiper-wrapper .two > div:nth-child(2){
		margin:2.3rem 0;
    }

    .swiper-wrapper .three > div , .swiper-wrapper .four > div{
		margin-top:1.5rem;
    }

    .swiper-wrapper .five > div , .swiper-wrapper .six > div{
		margin-top:.85rem;
    }

	.swiper-wrapper .page > div:first-child{
		margin-top:.85rem!important;
	}

	.page > div:nth-child(1){
		backface-visibility:hidden;
		-webkit-backface-visibility:hidden; 
		transform:translate(-100%,0);
		-webkit-transform:translate(-100%,0);
		transition: all 0.8s ease;
		-webkit-transition: all 0.8s ease;       
	}

	.page > div:nth-child(1).active{
		transform:translate(0,0);
		-webkit-transform:translate(0,0);        
	}

	.page > div:nth-child(2){
		backface-visibility:hidden;
		-webkit-backface-visibility:hidden; 
		transform:translate(100%,0);
		-webkit-transform:translate(100%,0);
		transition: all 0.8s ease;
		-webkit-transition: all 0.8s ease;            
	}

	.page > div:nth-child(2).active{
		transform:translate(0,0);
		-webkit-transform:translate(0,0);            
	}

	.page > div:nth-child(3){
		backface-visibility:hidden;
		-webkit-backface-visibility:hidden; 
		transform:translate(-100%,0);
		-webkit-transform:translate(-100%,0);
		transition: all 0.8s ease;
		-webkit-transition: all 0.8s ease;       
	}

	.page > div:nth-child(3).active{
		transform:translate(0,0);
		-webkit-transform:translate(0,0);        
	}

	.page > div:nth-child(4){
		backface-visibility:hidden;
		-webkit-backface-visibility:hidden; 
		transform:translate(100%,0);
		-webkit-transform:translate(100%,0);
		transition: all 0.8s ease;
		-webkit-transition: all 0.8s ease;       
	}

	.page > div:nth-child(4).active{
		transform:translate(0,0);
		-webkit-transform:translate(0,0);        
	}

	.page > div:nth-child(5){
		backface-visibility:hidden;
		-webkit-backface-visibility:hidden; 
		transform:translate(-100%,0);
		-webkit-transform:translate(-100%,0);
		transition: all 0.8s ease;
		-webkit-transition: all 0.8s ease;       
	}

	.page > div:nth-child(5).active{
		transform:translate(0,0);
		-webkit-transform:translate(0,0);        
	}	
</style>


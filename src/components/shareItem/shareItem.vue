<template>
	<div class="share-item-container">
		<div class="t">
			<div class="avatar-wrap">
				<div class="avatar">
					<img :src="itemResult.headImage | serverImage">
				</div>
				<h3 class="mobile">{{itemResult.mobile}}</h3>
			</div>
			<div class="share-text-wrap">
				<p v-html="itemResult.desc"></p>
			</div>
		</div>
		<ul class="c">
			<li v-for="(md5Item,index) in itemResult.md5Arr" :key="index"  @click="showImageView(index)">
				<img :src="md5Item | serverImage">
			</li>
		</ul>
		<div class="b">
			<p @click="thumbUpEvent"><img src="./../../assets/thumb-icon.png">&nbsp;<span>{{itemResult.thumbsTimes=== '0'?'赞':itemResult.thumbsTimes}}</span></p>
		</div>
		<div class="imageView-wrap" v-if="isShowImageView" @click.stop="hideImageView">
			<swiper :options="swiperOption">
			  <swiper-slide v-for="(imgItem,index) in imgArr" :key="index">
			  	<img :src="imgItem | serverImage">
			  </swiper-slide>
			</swiper>
		</div>
	</div>
</template>
<script>
	import 'swiper/dist/css/swiper.css'

	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name:'shareItem',
		props:{
			item:{
				type:Object,
				default:null,
			},
		},
		data(){
			return {
				itemResult:this.item,
				imgArr:[],
				isShowImageView:false,
				imageIndex:0,
				swiperOption:{
					observer:true,
					observeParents:true,
					initialSlide:0
				},
			}
		},
		created(){
			this.itemResult = this._filter(this.itemResult)
		},
		methods:{
			_filter(result){
				result.desc = `我在${result.investTime.split(' ')[0]}投资${result.platfromName}${result.productDeadLine}天标${result.investAmt}元<span style="color:#fd5f5f;line-height:1.5;">获得${result.feeAmt}元貅比特返现</span>`
				result.md5Arr = result.investImage.split(',')
				this.imgArr = result.md5Arr
				return result
			},
			showImageView(index){
				this.swiperOption.initialSlide = index;
				this.isShowImageView = true;
			},
			hideImageView(){
				this.isShowImageView = false;
			},
			thumbUpEvent(){
				let http = this.$axios;
				http.isShowLoading = false;
				http.post('thumbsUp',{
					id:this.itemResult.id
				}).then(res=>{
					this.itemResult.thumbsTimes ++;
				})
			}
		},
		watch:{
			imageIndex(curval,oldval){
				return curval
			},
			imgArr(curval,oldval){
				if(curval){
					this.imgArr = curval
				}
			}
		},
		components:{
			swiper,
			swiperSlide
		}
	}
</script>
<style scoped>
	.share-item-container{
		padding:.18rem .3rem;
		border-bottom: 1px solid #eee;
		background-color: #fff;
	}
	.t .avatar-wrap{
		display:flex;
		height: .6rem;
		align-items: center;
	}
	.avatar-wrap .avatar{
		width: .6rem;
		height: .6rem;
		border-radius: .3rem;
		background-color: #dfe8f8;
		overflow: hidden;
	}
	.avatar-wrap .mobile{
		font-size: .32rem;
		color: #3b4257;
		font-weight: bold;
		padding-left: .18rem;
	}
	.share-text-wrap{
		width: 100%;
		height: 1.44rem;
		background: url('./../../assets/share-text-bg.png') no-repeat center;
		background-size: cover;
		box-sizing: border-box;
		padding: .38rem .22rem 0;
	}
	.share-text-wrap p{
		font-size: .3rem;
		line-height: 1.5;
		color: #313131;
	}
	.share-text-wrap b{
		color: #fd5f5f;
	}
	.c{
		display:flex;
		padding-top: .2rem;
		flex-wrap: wrap;
	}
	.c li{
		width: 1.65rem;
		height: 1.65rem;
		overflow:hidden;
		margin-right: .1rem;
		margin-bottom: .2rem;
		border-radius: 6px;
	}
	.c li:nth-child(4n){
		margin-right: 0;
	}
	.b{
		padding-top: .18rem;
	}
	.b p{
		display:flex;
		justify-content: flex-end;
		align-items:center;
		font-size: .24rem;
		color: #5f6678;
	}
	.b img{
		width: .36rem;
		height: .36rem;
	}
	.imageView-wrap{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		display: flex;
		align-items: center;
		justify-content:center;
	}
</style>

<template>
	<div class="teaminfo-container">
		<h2 class="title">高管团队</h2>
		<ul class="person-wrapper">
			<li v-for="item in teaminfos">
				<div class="header-image-wrapper">
					<div class="header-img">
						<img :src="item.orgIcon | serverImage">
					</div>
				</div>
				<div class="intro-content">
					<h3><b>{{item.orgMemberName}}</b><span>{{item.orgMemberGrade}}</span></h3>
					<p class="detail">{{item.orgDescribe}}</p>
				</div>
			</li>
		</ul>
		<h2 class="title">现场实拍</h2>
		<ul class="pic-wrapper">
			<li v-for="orgEnvironmentList in orgEnvironmentLists"  @click="showPic(orgEnvironmentList)">
				<div>
					<img :src="orgEnvironmentList.orgPicture | serverImage">
				</div>
			</li>
		</ul>
		<Shade :src="shadeSrc" v-show='isShadeShow' @shadeShow="shadeShow" @shadeHide="shadeHide"></Shade>
	</div>
</template>
<script>
	import service from '../../resource/service';
	import Shade from './../../components/shade/shade'
	export default{
		name:'teaminfo',
		data(){
			return {
				teaminfos:{},
				orgEnvironmentLists:[],
				isShadeShow:false,
				shadeSrc:"",
			}
		},
		computed:{
			orgNumber(){
				return this.$route.query.orgNumber
			}
		},
		created(){
			this.getDetail()
		},
		methods:{
			getDetail(){
				this.$store.dispatch('showLoading')
				service.serverRequest('platformDetail',{
				  orgNo : this.orgNumber
				},(result)=>{
					this.teaminfos = this._filter(result.teamInfos)
					this.orgEnvironmentLists = result.orgEnvironmentList
				})
			},
			_filter(result){
				return result
			},
			shadeShow(){
				this.isShadeShow = true
			},
			shadeHide(){
				this.isShadeShow = false
			},
			showPic(item){
				this.shadeSrc = item.orgPicture
				this.shadeShow()
			},
		},
		components:{
			Shade
		}
	}
</script>
<style scoped>
	.teaminfo-container{
		background: #fff;
		padding-bottom: .3rem;
	}
	.title{
		padding:.5rem .3rem .6rem;
		font-size: .28rem;
		color:#525d63;
	}
	.person-wrapper{
		padding: 0 .3rem;
	}
	.person-wrapper li{
		display: flex;
		padding-bottom: 1.2rem;
	}
	.header-image-wrapper{
		flex: 0 0 1.3rem;
	}
	.header-img{
		width: 1.05rem;
		height: 1.05rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.header-img img{
		display: block;
		width: 100%;
		height: 100%;

	}
	.intro-content{
		flex: 1;
	}
	.intro-content h3{
		font-size: .4rem;
		color: #525d63;
		font-weight: bold;
		padding-bottom: .2rem;
	}
	.intro-content h3 b{
		font-weight: bold;
		padding-right: .2rem;
	}
	.intro-content h3 span{
		font-size: .3rem;
		color: #999;
	}
	.detail{
		font-size: .24rem;
		color: #999;
		line-height: 1.84;
	}
	.pic-wrapper{
		display: flex;
		flex-wrap: wrap;
		padding: 0 .3rem;
	}
	.pic-wrapper li{
		flex: 0 0 33.333%;
		display: flex;
		align-items: center;
		padding: .1rem;
		height: 1.2rem;
		overflow: hidden;
	}
	.pic-wrapper li div{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
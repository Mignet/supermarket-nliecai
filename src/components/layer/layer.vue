<template>
	<div class="mask" v-show="content.status == true" @click="touch()">
		<div class="content">
             <p>{{content.tip}}</p>    			
		</div>
	</div>
</template>

<script>
	export default {
		name:'Layer',
		props:{
			content:{
				types: Object
			}
		},

		methods:{
			touch(){
				this.content.status = false;
			}
		}
	}
</script>

<style type="text/css" media="screen">
	.mask{
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index: 99;
		background:rgba(0,0,0,0.8);   
	}

	.mask .content{
		background:url('../../../static/images/normal/download_guide.png') no-repeat right top;
		background-size:auto 1.14rem;
		position: fixed;
		right:25px;
		top:10px;
		z-index:10;
		padding-top:1.14rem;
		width:3.62rem;
	}

	.mask .content p{
		width: 4rem;
		font-size: 0.25rem;
		background: #ef4a3c;
		color: #fff;
		border-radius: 5px;
		padding: .15rem;
	} 	
</style>
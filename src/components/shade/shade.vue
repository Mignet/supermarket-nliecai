<template>
	<div class="shade-container">
		<div class="wrapper">
			<div @click.self="handlerClick" class="content">
				<img :src="src | serverImage">
			</div>
		</div>
	</div>
</template>
<script>
	// 图片遮罩
	export default {
		name:"shade",
		props:{
			src:{
				types:String
			}
		},
		data(){
			return {
				isShow:true
			}
		},
		methods:{
			handlerClick(){
				this.$emit("shadeHide")
			},
		}
	}
</script>
<style scoped>
	.wrapper{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 800;
		width: 100%;
		height: 100%;
	}
	.content{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 820;
		background:#000;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.content img{
		width: 100%;
	}
</style>
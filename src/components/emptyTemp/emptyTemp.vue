<!-- 空模板 -->
<template>
	<div class="emptyTemp-container">
		<img src="./../../assets/empty-icon.png">
		<p>{{msg}}</p>
	</div>
</template>
<script>
	export default {
		name:'emptyTemp',
		props:['msg']
	}
</script>
<style scoped>
	.emptyTemp-container img{
		display: block;
		box-sizing: content-box;
		width: 2.08rem;
		margin: 0 auto;
		padding-top: 3rem;
	}
	.emptyTemp-container p{
		text-align: center;
		font-size: 14px;
		color: #999;
		padding-top: .2rem;
	}
</style>
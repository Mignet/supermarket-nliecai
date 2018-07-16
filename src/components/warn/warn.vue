<template>
	<div class="warn-container">
		<img src="./../../assets/danger-tips.png">
		<p>投资人应根据平台提供的信息进行独立判断，具有独自承担风险的能力</p>
	</div>
</template>
<script>
	export default{
		name:'warn'
	}
</script>
<style scoped>
	.warn-container{
		padding: .5rem 0;
	}
	.warn-container img{
		width: 4.1rem;
		display: block;
		margin: 0 auto;
	}
	.warn-container p{
		font-size: .18rem;
		color: #9197a6;
		text-align: center;
		padding-top: .2rem;
	}
</style>
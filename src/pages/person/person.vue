<template>
	<div class="person-container">
		<form id="form" action="" method="post" accept-charset="utf-8" style="display: none" ref="buyform">
	<!-- 	    <input id="orgAccount" type='hidden' name="orgAccount" v-model="formData.orgAccount"/>
		    <input id="thirdProductId" type='hidden' name="thirdProductId" v-model="formData.thirdProductId"/>
		    <input id="orgKey" type='hidden' name="orgKey" v-model="formData.orgKey"/>
		    <input id="orgNumber" type='hidden' name="orgNumber" v-model="formData.orgNumber"/>
		    <input id="sign" type='hidden' name="sign" v-model="formData.sign"/>
		    <input id="timestamp" type='hidden' name="timestamp" v-model="formData.timestamp"/>
		    <input id="txId" type='hidden' name="txId" v-model="formData.txId"/>
		    <input id="requestFrom" type='hidden' name="requestFrom" v-model="formData.requestFrom"/> -->
		</form>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		name:'person',
		computed:{
			token(){
				return this.$store.state.token
			},
			orgNumber(){
				return this.$route.query.orgNumber
			}
		},
		created(){
			
		}
	}
</script>
<style scoped>
	
</style>
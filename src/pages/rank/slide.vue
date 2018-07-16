<template>
	<ul  class="slide-wrapper">
		<li>
			<router-link to='/message/commission'>
				<img src="./rank_commission_icon.png">
				<p class="active">销售佣金</p>
			</router-link>
		</li>
		<li>
			<router-link to='/message/reward'>
				<img src="./rank_reward_icon.png">
				<p class="active">推荐奖励</p>
			</router-link>
		</li>
		<li>
			<router-link to="/message/directAllowance">
				<img v-if='rank == 3 || rank == 4' src="./rank_direct_icon.png">
				<img v-else src="./icon_1_gray.png">
				<p :class="rank == 3 || rank == 4 ? 'active' : ''">直接管理津贴{{percent}}</p>
			</router-link>
		</li>
		<li>
			<router-link to="/message/teamAllowance">
				<img v-if='rank == 3 || rank == 4' src="./rank_allowance_icon.png">
				<img v-else src="./icon_2_gray.png">
				<p :class="rank == 3 || rank == 4 ? 'active' : ''">团队管理津贴{{percent}}</p>
			</router-link>
		</li>
	</ul>
</template>
<script>
	export default {
		props:{
			rank:{
				type:String,
				default:'1'
			}
		},
		data (){
			return {

			}
		},
		computed:{
			percent(){
				let percent = '';
				if(this.rank == 3){
					percent = '30%'
				}else if(this.rank == 4){
					percent = '50%'
				}else{
					percent = "";
				}
				return percent
			}
		}
	}
</script>
<style scoped lang='less'>
	.slide-wrapper{
		display: flex;
		height: 1.84rem;
		li{
			flex: 1;
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100%;
			a{
				display: block;
			}
			img{
				display: block;
				width: .6rem;
				margin: 0 auto;
				padding-top: .3rem;
			}
			p{
				text-align: center;
				padding: .2rem .3rem ;
				font-size: .2rem;
				color: #b6b6b6;
				line-height: 1.2;
			}
			p.active{
				color: #666;
			}
		}
	}
</style>
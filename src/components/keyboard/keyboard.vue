<template>
	<transition name="slide">
		<div class="keyboard animated" v-show="show" @click.stop="fn">
			<!-- 键盘区域 -->
			<div class="list">
				<div class="key" @click.stop="typing('1')">1</div>
				<div class="key" @click.stop="typing('2')">2</div>
				<div class="key" @click.stop="typing('3')">3</div>
				<div class="key" @click.stop="typing('4')">4</div>
				<div class="key" @click.stop="typing('5')">5</div>
				<div class="key" @click.stop="typing('6')">6</div>
				<div class="key" @click.stop="typing('7')">7</div>
				<div class="key" @click.stop="typing('8')">8</div>
				<div class="key" @click.stop="typing('9')">9</div>
				<div class="key dot" 
					@click.stop="isInteger?null : typing('.')"
				>
					<img v-show="!isInteger" src="./../../assets/dot.svg" >
				</div>
				<div class="key" @click.stop="typing('0')">0</div>
				<div class="key" @click.stop="typing('')">
					<img src="./../../assets/del.svg">
				</div>
			</div>
		</div>
	</transition>
</template>
<script>	
	export default {
		props: ['show','isInteger'],
		methods: {
			/*防止点击完成按钮左边的空白区域收起键盘*/
			fn () {},
			/*输入*/
			typing (val) {
				this.$emit('typing', val);
			},
			/*点击完成*/
			complete () {
				this.$emit('complete');
			}	
		}
	}
</script>
<style scoped>
	.keyboard{
		height: 200px;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		z-index: 999;
	}
	.keyboard .done{
		height: 50px;
		background: #f9f9f9;
		border: .5px solid #d6d6d6;
		border-right: none;
		border-left: none;
		padding-right: 10px;
		border-bottom: none;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.keyboard .done .text{
		color: #007eff;
		font-size: 15px;
	}
	.keyboard .list{
		height: 200px;
	}
	.keyboard .list .key{
		height: 25%;
		width: 33.33%;
		float: left;
		border-right: .5px solid #d6d6d6;
		border-top: .5px solid #d6d6d6;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
	}
	.keyboard .list .key:active{
		background: #e2e2e2;
	}
	.keyboard .list .key:nth-child(3n) {
		border-right: none;
	}
	.del {
		font-size: 28px;
	}
	.animated {
		animation-duration: .2s;
		animation-fill-mode: both;
	}
	.key img{
		width: 24%;
	}
	.slide-enter-active {
		animation-name: slideInUp;
	}
	.slide-leave-active {
		animation-name: slideInDown;
	}
</style>
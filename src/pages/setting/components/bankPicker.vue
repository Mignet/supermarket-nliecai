<!-- 银行选择组件 -->
<template>
	<div class="bankPicker-container">
		<transition name="fade">
			<div class="mask" v-if="show" @click.stop="cancel"></div>
		</transition>
		<transition name="animate">
			<div class="picker" v-if="show">
				<div class="picker-head">
					<div>
						<span @click="cancel">取消</span>
					</div>
					<div>
						<span @click="ok">确定</span>
					</div>
				</div>
				<div class="picker-wrap">
					<div class="content">
						<div class="content-item" ref="bankPickerRef" v-picker = "{set:set}">
							<div class="picker-item">
								<div class="item" v-for="(bankItem,index) in bankInfo" :key="index">{{bankItem.bankName}}</div>
							</div>
						</div>
					</div>
					<div class="line"></div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	export default{
		name:'bankPicker',
		props:['show'],
		data(){
			return {
				setIndex:0,
				bankInfo:{}
			}
		},
		methods:{
			cancel(){
				this.$emit('cancel')
			},
			ok(){
				this.$emit('ok',this.bankInfo[this.setIndex])
				this.setIndex = 0;
			},
			set(index){
				this.setIndex = index
			}
		},
		mounted(){
			let http = this.$axios;
			http.post('queryAllBank').then(res=>{
				this.bankInfo = res.datas
			})
		},
		directives:{
			picker:{
				bind(el,binding){
					let startY = ""
					let differY = "";
					let currentY = 0;
					let len = el.children[0].children.length;
					let dom = el.children[0];
					let index = 0;
					let maxY = -(len - 1);
					let r = Number.parseFloat(document.documentElement.style.fontSize);
					el.addEventListener('touchstart',(e)=>{
						e.preventDefault()
						if(dom.style.transform == 'translateY(0px)'){
							currentY = 0;
							maxY = -(el.children[0].children.length - 1);
						}
						let ev = e.touches[0];
						startY = ev.clientY
					})
					el.addEventListener('touchmove',(e)=>{
						e.preventDefault();
						let ev = e.touches[0];
						differY = ev.clientY - startY;
						dom.style.transition = 'transform 0s';			
						dom.style.transform = `translateY(${currentY*r+differY}px)`;
					});
					el.addEventListener('touchend',(e)=>{
						e.preventDefault();
						let ev = e.changedTouches[0];
						differY = ev.clientY - startY;
						dom.style.transition = 'transform .3s';
						if(differY <= -r/2){
							currentY += Math.floor(differY/r);
							if(currentY<=maxY)currentY = maxY;
						}
						else if(differY >= r/2){
							currentY += Math.floor(differY/r);
							if(currentY>=0)currentY = 0;
						}
						dom.style.transform = `translateY(${currentY}rem)`;
						index = Math.floor(Math.abs(currentY/1));//记录当前位移在数组中的索引,必须取整，否则会出现浮点数
						if(binding.modifiers.province){
							var name = 'province';
						}else if(binding.modifiers.city){
							var name = 'city';
						}else if(binding.modifiers.town){
							var name = 'town';
						}
						binding.value.set(index);
					});
				}
			}
		}
	}
</script>
<style scoped>
	.bankPicker-container .mask{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.6);
	}
	.bankPicker-container .picker{
		position:fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 5.5rem;
		background: #fff;
	}
	.bankPicker-container  .picker-head{
		display: flex;
		justify-content: space-around;
		padding: 0 .3rem;
		height: .8rem;
		font-size: .3rem;
		color: #2395ff;
		background: #efefef;
	}
	.bankPicker-container  .picker-head div{
		flex-grow: .4;
		line-height: .8rem;
	}
	.bankPicker-container  .picker-head div:nth-child(1){
		text-align: left;
	}
	.bankPicker-container  .picker-head div:nth-child(2){
		text-align: right;
	}
	.bankPicker-container .picker-wrap{
		position: relative;
		height: 4.7rem;
	}
	.bankPicker-container .content{
		display: flex;
		width:100%;
		height: 100%;
	}
	.bankPicker-container .content-item{
		width: 100%;
		height: 100%;
		overflow: hidden;
		transition:width .3s;
	}
	.bankPicker-container .picker-item{
		position: relative;
		z-index: 10;
		width:100%;
		top: 1.85rem;
	}
	.bankPicker-container .item{
		flex-grow: 1;
		height: 1rem;
		line-height: 1rem;
		font-size: .3rem;
		color:#707274;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}
	.bankPicker-container .line{
		position: absolute;
		top:50%;
		left: 0;
		margin-top: -.5rem;
		width:100%;
		height: 1rem;
		border-top:.02rem solid #ddd ;
		border-bottom:.02rem solid #ddd ;
	}
	.fade-enter-active,
	.fade-leave-active{
		transition: all .3s linear;
	}
	.fade-enter,
	.fade-leave-to{
		opacity: 1;
	}
	.animate-enter-active,
	.animate-leave-active{
		transition:all .3s;
	}
	.animate-enter,
	.animate-leave-to{
		transform:translateY(100%);
	}
</style>
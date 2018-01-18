<template>
	<div class="cartcontrol">
		<transition name="slide-fade">
			<div class="cart-decrease" v-show="food.count>0"  @click.stop.prevent="decreaseCart">
				<span class="inner">
					<span class="inner-decrease">-</span>
				</span>
			</div>
		</transition>	
		<transition name="slide-fade">
			<div class="cart-count" v-show="food.count>0">{{ food.count}}</div>
		</transition>
		<div class="cart-add" @click.stop.prevent="addCart">
			<span class="inner">
				<span class="inner-add">+</span>
			</span>
		</div>
	</div> 
</template>

<script>
	import Vue from 'vue';
	export default {
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(){
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count ++;
				}
			},
			decreaseCart(){
				if(this.food.count){
					this.food.count --;
				}
			}
		}
	};
</script>

<style>
	.cartcontrol{
		font-size:0;
	}
	.cart-decrease{
		display:inline-block;
		padding:6px;
	}
	.cartcontrol .slide-fade-enter-active {
	  transition: all .4s ease;
	}
	.cartcontrol .slide-fade-leave-active {
	  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.cartcontrol .slide-fade-enter,.cartcontrol .slide-fade-leave-to{
	  transform: translateX(20px);
	  opacity: 0;
	}
	.cart-add{
		display:inline-block;
		padding:6px;
		font-size:24px;
		line-height:24px;
	}
	.cart-count{
		display:inline-block;
		padding:6px;
		vertical-align:top;
		width:12px;
		padding-top:6px;
		line-height:24px;
		text-align:center;
		font-size:10px;
		margin-left:-5px;
		color:rgb(147,153,159);
	}
	.cart-decrease .inner,.cart-add .inner{
		display:inline-block;
		height:20px;
		width:20px;
		background:rgb(0,160,220);
		border-radius:50%;
		color:#fff;
		position:relative;
	}
	.cart-decrease .inner{
		box-sizing:border-box;
		font-size:24px;
		line-height:24px;
		border:2px solid rgb(0,160,220);
		background:#fff;
		color:rgb(0,160,220);
	}
	.cart-decrease .inner .inner-decrease,.cart-add .inner .inner-add{
		position:absolute;
		left:2px;
		top:-2px;
	}
	.cart-decrease .inner .inner-decrease{
		position:absolute;
		left:4px;
		top:-5px;
	}
</style>

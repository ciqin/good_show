<template>
	<div class="shopcart">
		 <div class="contant" @click = "toggleList">
		 	<div class="contant-left">
		 		<div class="logo-wrapper">
		 			<div class="logo" :class="{'highlight':totalCount>0}">
		 				<div class="icon">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 768 768" fill="#ffffff" x="10" y="10">
							<path d="M544.5 576q25.5 0 44.25 19.5t18.75 45-18.75 44.25-44.25 18.75-45-18.75-19.5-44.25 19.5-45 45-19.5zM31.5 64.5h105l30 63h474q13.5 0 22.5 9.75t9 23.25q0 7.5-4.5 15l-114 207q-18 33-55.5 33h-238.5l-28.5 52.5-1.5 4.5q0 7.5 7.5 7.5h370.5v64.5h-384q-25.5 0-44.25-19.5t-18.75-45q0-15 7.5-30l43.5-79.5-115.5-243h-64.5v-63zM223.5 576q25.5 0 45 19.5t19.5 45-19.5 44.25-45 18.75-44.25-18.75-18.75-44.25 18.75-45 44.25-19.5z"></path>
							</svg>
						</div>
		 			</div>
		 			<div class="num" v-show="totalCount>0">{{totalCount}}</div>
		 		</div>
		 		<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
		 		<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		 	</div>
		 	<div class="contant-right" @click.stop.prevent="pay">
		 		<div class="pay" :class="payClass">
		 			{{payDesc}}
		 		</div>
		 	</div>
		 </div>
		 <transition name="fold">
			 <div class="shopcart-list" ref="shopcartList" v-show="listShow">
			 	<div class="list-header">
			 		<h1 class="title">购物车</h1>
			 		<span class="empty" @click="empty">清空</span>
			 	</div>
			 	<div class="list">
				 	<div class="list-contant" ref="listContant">
				 		<ul>
				 			<li class="food" v-for="food in selectFoods">
				 				<span class="name">{{food.name}}</span>
				 				<div class="price">
				 					<span>￥{{food.price*food.count}}</span>
				 				</div>
				 				<div class="cartcontrol-wrapper">
				 					<Cartcontrol :food="food"></Cartcontrol>
				 				</div>
				 			</li>
				 		</ul>
				 	</div>
				 </div>	
			 </div>
		 </transition>		 
	</div>	

</template>

<script>
	import Bscroll from  'better-scroll';
	import Cartcontrol from '../cartcontrol/cartcontrol.vue';
	export default {
		 props:{
			 	selectFoods:{
			 		type:Array,
			 		default(){
			 		 	return [
			 		 		{
			 		 			price:10,
			 		 			count:1
			 		 		}
			 		 	];
			 		}
			 		
			 	},
			 	deliveryPrice:{
			 	 	type:Number,
			 	 	default:0
			 	},
			 	minPrice:{ 
			 		type:Number,
			 		default:0
			 	}
		  },	
		  data(){
			  	return {
			  		fold:true
			  	}
		  },
		  methods:{
			  	toggleList(){
			  		 if(!this.totalCount){
			  		 	return ;
			  		 }
			  		 this.fold = !this.fold;
			  	},
			  	empty(){
			  		this.selectFoods.forEach(function(food){
			  			food.count = 0;
			  		})
			  	},
			  	pay(){
			  		if(this.totalPrice<this.minPrice){
			  			return; 
			  		}
			  		window.alert(`支付${this.totalPrice}`)
			  	}
		  },
		  components:{
				Cartcontrol
		  },
		  computed:{
			  	totalPrice(){
			  		let totle = 0;
			  		this.selectFoods.forEach(function(food){
			  			totle +=food.price*food.count;
			  		})
			  		return totle;
			  	},
			  	totalCount(){
			  		let count=0;
			  		this.selectFoods.forEach(function(food){
			  			count +=food.count;
			  		})
			  		return count;
			  	},
			  	payDesc(){
			  		 if(this.totalPrice ===0){
			  		 	return `￥${this.minPrice}元起送`
			  		 }else if(this.totalPrice < this.minPrice){
			  		 	let diff = this.minPrice - this.totalPrice;
			  		 	return `还差￥${diff}元起送`
			  		 }else{
			  		 	return "去结算"
			  		 }
			  	},
			  	payClass(){
			  		if(this.totalPrice < this.minPrice){
			  			return "not-enough"
			  		}else{
			  			return "enough"
			  		}
			  	},
			  	listShow(){
			  		if(!this.totalCount){
			  			this.fold = true;
			  			return false;
			  		}
			  		
			  		let show = !this.fold;
			  		let that = this;
			  		if(show){
			  			if(!this.scroll){
				  			this.$nextTick(function(){
				  				this.scroll = new Bscroll(this.$refs.listContant,{});
				  			});
			  			}else{
			  				this.scroll.refresh();
			  			}
			  		}
			  		return show;
			  	}
		  }
	}
</script>

<style>
.bk{
	top:0;
	left:0;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.5);
	z-index:40;
}
.shopcart{
	position:fixed;
	left:0;
	bottom:0;
	width:100%;
	height:48px;
	z-index:50;
}	
.shopcart .contant{
	display:flex;
	height:100%;
	background-color:#141d27;
	margin-left:0;
}
.shopcart .contant .contant-left{
	flex:1;
	font-size:0;
}
.shopcart .contant .contant-left .logo-wrapper{
	display:inline-block;
	position:relative;
	top:-10px;
	margin:0 12px;
	padding: 6px;
	width:56px;
	height:56px;
	box-sizing:border-box;
	vertical-align:top;
	border-radius:50%;
	background-color:#141d27;
}
 .contant .contant-left .logo-wrapper .num{
 	position:absolute;
 	right:0;
 	top:0;
 	width:24px;
 	height:16px;
 	line-height:16px;
 	text-align:center;
 	border-radius:50%;
 	font-size:9px;
 	font-weight:700;
 	color:#fff;
 	background:red;
 	box-shodow:0 4px 8px 0 rgba(0,0,0,0.4);
 }
 .contant .contant-left .logo-wrapper .logo{
 	display:inline-block;
	border-radius:50%;
	width:100%;
	height:100%;
	background-color:#2b343c;
}
 .contant .contant-left .logo-wrapper .highlight{
 	background:rgb(0,160,220);
 	
 }
 .contant .contant-left .logo-wrapper .logo .icon{
 	position:absolute;
 	left:17px;
 	top:16px;
 }
.shopcart .contant .contant-left .price{
	display:inline-block;
	vertical-align:top;
	
	margin-top:12px;
	box-sizing:border-box;
	padding-right:12px;
	font-size:16px;
	font-weight:700;
	border-right:1px solid rgba(255,255,255,0.1);
	color:rgba(255,255,255,0.4);
}
.shopcart .contant .contant-left .highlight{
	color:#fff;
}
.shopcart .contant .contant-left .desc{
	display:inline-block;
	vertical-align:top;
	line-height:24px;
	margin:12px 0 0 12px;
	color:rgba(255,255,255,0.4);
	font-size:10px;
}
.shopcart .contant .contant-right{
	flex:0 0 105px;
	width:100%;
}

.shopcart .contant .contant-right .pay{
	height:48px;
	line-height:48px;
	text-align:center;
	font-size:12px;
	color:rgba(255,255,255,0.4);
	font-weight:700;
	background-color:#2b333b;
}
.shopcart .contant .contant-right .not-enough{
	background:#2b333b;
}
.shopcart .contant .contant-right .enough{
	background:#00b43c;
	color:#fff;
}
.shopcart .shopcart-list{
	position:absolute;
	top:0px;
	left:0;
	z-index:-1;
	width:100%;
	transform: translateY(-100%);
}
.fold{
  	display:block;
}
.fold-enter-active, .fold-leave-active {
  	transition: all 0.6s;
}
.fold-enter, .fold-leave-to{
	opacity: 0;
  	transform: translateY(100%);
}
.shopcart .shopcart-list .list-header{
	height:50px;
	line-height:40px;
	padding: 10px 18px 0 18px;
	background: #f2f5f7;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.shopcart .shopcart-list .list-header .title{
	float:left;
	font-size:14px;
	color:rgb(7,17,27);
}
.shopcart .shopcart-list .list-header .empty{
	float:right;
	font-size:12px;
	color:rgb(0,160,220);
}
.shopcart .shopcart-list .list-contant{
	padding:0 18px;
	max-height:217px;
	background:#fff;
}
.list{
	width:100%;
	overflow:hidden;
}
.shopcart .shopcart-list .list-contant .food{
	position:relative;
	padding:12px 0;
	box-sizing:border-box;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.shopcart-list .list-contant .food .name{
	line-height:24px;
	font-size: 14px;
	color:rgb(7,17,27);
}
.shopcart-list .list-contant .food .price{
	position:absolute;
	right:90px;
	bottom:12px;
	line-height:24px;
	font-weight:700;
	font-size:14px;
	color:red;
}
.shopcart-list .list-contant .food .cartcontrol-wrapper{
	position:absolute;
	right:0;
	bottom:4px;
}

list-mask{
	posotion:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:40;
	background-filter:blur(10px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
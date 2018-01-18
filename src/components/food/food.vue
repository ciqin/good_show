<template>	
	<transition name="move">
  		<div v-show="showFlag" class="food" ref="food">
  			
  			<div class="food-content">
  				<div class="image-header">
  					<img :src="food.image">
  					
  					<div class="back" @click="hide">
  						<span class="icon-arrow_lift">
  							<span class="icon"><</span>
  						</span>
  					</div>
  				</div>
  				
  				<div class="content">
  					<h1 class="title">{{food.name}}</h1>  	
  					<div class="details">
  						<span class="sell-count">月售{{food.sellCount}}份</span>
  						<span class="rating">好评率{{food.rating}}%</span>
  					</div>		
  					<div class="price">
  						<span class="now">￥{{ food.price}}</span>
  						<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
  					</div>	
  					<div class="cartcontrol-wrapper" v-show="food.count>0">
  					<cartcontrol :food="food"></cartcontrol>
  					</div>
  					<div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count==0">加入购物车</div>	
  				</div>
  				<split v-show="food.info"></split>
  				<div class="info" v-show="food.info">
  					<h1 class="title">商品信息</h1>
  					<p class="text">{{food.info}}</p>
  				</div>
  				<split></split>
  				<div class="rating">
  					<h1 class="title">商品评价</h1>
  					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
  				</div>
  				<div class="rating-wrapper">
  					<ul v-show="food.ratings">
  						<li v-show="needShow(rating.rateType,rating.rateText)" v-for="rating in food.ratings" class="rating-item">
  							<div class="user">
  								<span class="name">{{ rating.username}}</span>
  								<img class="avatar" width="12" height="12" :src="rating.avatar">
  							</div>
  							<div class="time">{{rating.rateTime | formatDate}}</div>
  							<p class="text">
  								{{rating.text}}
  							</p>
  						</li>
  					</ul>
  					<div class="no-rating" v-show="!food.ratings">暂无评价</div>
  				</div>
  			</div>
  			
  		</div>
	 </transition>
</template>

<script>
import Bscroll from  'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import Vue from 'vue';
import {formatDate} from '../../common/js/date.js' ;

const POSITIVE= 0;
const NEGATIVE = 1; 	
const ALL = 2;

export default {
	props:{
		food:{
			type:Object
		}
	},
	data() {
	  	return {
	  		showFlag:false,
	  		selectType:{
	  			type:ALL
	  		},
	  		onlyContent:{
	  			type:false
	  		},
	  		desc:{
	  			all:"全部",
	  			positive:"推荐",
	  			negative:"吐槽"
	  		}
	  	}
	},
	filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm");
			}
	},
  	methods:{
  		show(){
  			this.showFlag = true;
  			this.selectType.type = ALL;
  			this.onlyContent.type = false;
  			if(!this.scroll){
				 this.$nextTick(function(){
				  		this.scroll = new Bscroll(this.$refs.food,{});
				  });
			 }else{
			  	this.$nextTick(function(){
				  		this.scroll = new Bscroll(this.$refs.food,{});
				 });
			 }
  			
  		},
  		hide(){
  			this.showFlag = false;
  		},
  		addFirst(){
  			Vue.set(this.food,"count",1)
  		},
  		needShow(type,text){
  			if(this.onlyContent.type && !text){
  				return false;
  			}	
  			if(this.selectType.type ===ALL){
  				return true;
  			}else{
  				return type ===this.selectType.type;
  			}
  		}
  	},
  	components:{
  		cartcontrol,
  		split,
  		ratingselect
  	}
}
</script>

<style>
.food{
	position:fixed;
	left:0;
	top:0;
	bottom:48px; 
	z-index:30;
	width:100%;
	background:#fff;
}
.move-enter-active {
  transition: all 0.8s ease-in;
}
.move-leave-active {
  transition: all 0.8s ;
}
.move-enter, .move-leave-to {
  transform: translateX(100%);
  opacity: 1;
}
.food .image-header{
	position:relative;
	width:100%;
	height:0;
	padding-top:100%;
}
.food .image-header img{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
}
.food .image-header .back{
	position:absolute;
	top:10px;
	left:0;
}
.food .image-header .back .icon-arrow_lift{
	display:block;
	padding:10px;
	font-size:20px;
	color:#fff;
}
.image-header .back .icon-arrow_lift .icon{
	background:rgba(0,0,0,0.5);
	position:absolute;
	top:0px;
	left:10;
	display:block;
	height:20px;
	line-height:20px;
	text-align:center;
	width:20px;
	border-radius:50%;
}
.food .content{
	padding:18px;
	position:relative;
	width:90%;
}
.food .content .title{
 	line-height:14px;
 	margin-bottom:8px;
 	font-size:14px;
 	font-weight:700;
 	color:rgb(7,17,27);
}
.food .content .details{
	margin-bottom:18px;
	line-height:10px;
	height:10px;
	font-size:0;
}
.food .content .details .sell-count,.food .content .details .rating{
	font-size:10px;
	color:rgb(147,153,159);
}
.food .content .details .sell-count{
	margin-right:12px;
}
.food .content .price{
	font-weight:700;
	line-height:24px;
}
.food .content .price .now{
	margin-right:8px;
	font-size:14px;
	color:red;
}
.food .content .price .old{
	test-decorration:line-throuth;
	font-size:10px;
	margin-left:-4px;
	color:rgb(148,153,159);
}
.food .content .cartcontrol-wrapper{
	position:absolute;
	right:12px;
	bottom:18px;
}
.food .content .buy{
	position:absolute;
	right:18px;
	bottom:18px;
	z-index:10;
	height:24px;
	line-height:24px;
	padding:0 12px;
	box-sizing:border-box;
	font-size:10px;
	border-radius:12px;
	color:#fff;
	background:rgb(0,160,220);
}
.food .info{
	padding: 18px;
}
.food .info .title{
	line-height:14px;
	font-size:14px;
	margin-bottom:6px;
	color:rgb(7,17,27);
}
.food .info .text{
	line-height:24px;
	padding:0 8px;
	font-size:12px;
	color:rgb(77,85,93)；
}
.food .rating{
	padding-top:18px;	
}
.food .rating .title{
	line-height:14px;
	margin-left:18px;
	font-size:14px;
	color:rgb(7,17,27);
}
.food .rating-wrapper{
}
.food .rating-wrapper .rating-item{
	position:relative;
	box-sizing:border-box;
	padding:16px 18px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.food .rating-wrapper .rating-item .user{
	position:absolute;
	right:18px;
	top:16px;
	font-size:0;
	line-height:12px;
}
.rating-wrapper .rating-item .user .name{
	display:inline-block;
	vertical-align:top;
	font-size:10px;
	color:rgb(147,153,159);
	margin-right:6px;
}
.rating-wrapper .rating-item .user .avatar{
	border-raidus:50%;
}
.rating-wrapper .rating-item .time{
	line-height:12px;
	font-size:10px;
	color:rgb(147,153,159);
	margin-bottom:6px;
}
.rating-wrapper .rating-item .text{
	line-height:16px;
	font-size:12px;
	color:rgb(7,17,27);
	margin-bottom:6px;
}
.rating-wrapper .no-rating{
	padding:16px; 
	font-size:12px;
	color:rgb(147,153,159);
}
</style>

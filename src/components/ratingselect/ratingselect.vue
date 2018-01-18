<template>
  	<div class="ratingselect">
  		<div class="rating-type">
  			<span @click="select(2)" class="block positive" :class="{'active-b':selectType.type===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
  			<span @click="select(0)" class="block positive" :class="{'active-b':selectType.type===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
  			<span @click="select(1)" class="block negetive" :class="{'active-n':selectType.type===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  		</div>
  		<div @click="togglecontent" class="switch">
  			<span class="no-look" :class="{'on':onlyContent.type}">✔️</span>
  			<span class="text">不看评价内容</span>
  		</div>
  	</div>
</template>

<script>
 const POSITIVE= 0;
 const NEGATIVE = 1; 	
 const ALL = 2;
 
export default {

  props:{
  	ratings:{
  		type:Array,
  		default(){
  			return [];
  		}
  	},
  	selectType:{
  		type:Object,
  		defalut:{
  			type:ALL
  		}
  	},
  	onlyContent:{
  		type:Object,
  		defalut:{
  			type:true
  		}
  	},
  	desc:{
  		type:Object,
  		default(){
  			return {
  				all:"全部",
  				positive:"满意",
  				negative:"不满意"
  			}
  		}
  	}
  },
  computed:{
  	positives(){
  		return this.ratings.filter(function( rating){
  			return rating.rateType === POSITIVE;
  		})
  	},
  	negatives(){
  		return this.ratings.filter(function( rating){
  			return rating.rateType === NEGATIVE;
  		})
  	}
  },
  methods:{
  	select(type){
  		this.selectType.type = type;
  		
  	},
  	togglecontent(){
  		this.onlyContent.type = !this.onlyContent.type
  	}
  }
}
</script>

<style>
 .ratingselect .rating-type{
 	padding:18px 18px;
 	border-bottom:1px solid rgba(7,17,27,0.1);
 	font-size:0;
 }
.ratingselect .rating-type .block{
 	display:inline-block;
 	padding:8px 12px;
 	margin-right:8px;
 	border-radius:1px;
 	font-size:12px;
 	color:rgb(77,85,93);
 	line-height:16px;
}
.ratingselect .rating-type .block .count{
	font-size:8px;
	margin-left:2px;
}
.ratingselect .rating-type .positive{
	background:rgba(0,160,220,0.2)
}
.ratingselect .rating-type .active-b{
	background:rgba(0,160,220,1);
	color:#fff;
}
.ratingselect .rating-type .negaive-b{
	background:rgba(77,85,93,0.2);
}
.ratingselect .rating-type .active-n{
	background:rgba(77,85,93,1);
	color:#fff;
}
.ratingselect .switch{
	padding: 12px 18px;
	line-height:24px;
	font-size:0;
	border-bottom:1px solid rgba(7,17,27,0.1);
	color:rgb(147,153,159);
}
.ratingselect .switch .no-look{
	display:inline-block;	
	margin-right:4px;
	border-radius:50%;
	padding: 0 4px;
	font-size:12px;
}
.ratingselect .switch .text{
	display:inline-block;
	font-size:12px;
}
.ratingselect .on{
	background:rgba(7,17,27,0.5);;
}
</style>

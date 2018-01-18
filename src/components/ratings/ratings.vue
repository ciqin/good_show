<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.seller.rankRate}}%</div>
				</div>	
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.seller.serviceScore"></star>
						<span class="score">{{seller.seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.seller.foodScore"></star>
						<span class="score">{{seller.seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.seller.deliveryTime}}分钟</span>
					</div>
				</div>	
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-show="needShow(rating.rateType,rating.rateText)"  v-for="(rating,index) in ratings" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="ratings[index].recommend.length">
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from "../star/star";
	import Bscroll from  'better-scroll';
	import split from '../split/split.vue';
	import ratingselect from '../ratingselect/ratingselect.vue';
	import {formatDate} from '../../common/js/date.js' ;
	
	 const POSITIVE= 0;
	 const NEGATIVE = 1; 	
	 const ALL = 2;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm");
			}
		},
		components:{
			 star,
			 split,
			 ratingselect
		},
		created(){
			this.$http.get("../../../static/datas.json").then((response)=>{
				response = response.body;
				this.ratings = response.ratings; 
				this.$nextTick(function(){
					  this.scroll = new Bscroll(this.$refs.ratings,{});
				});
				 
			})
		},
		methods:{
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
		data(){
			return {
				ratings:[],
	  			selectType:{
	  				type:ALL
	  			},
	  			onlyContent:{
	  				type:false
	  			},
	  			desc:{
	  				all:"全部",
	  				positive:"满意",
	  				negative:"不满意"
	  			}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ratings{
	position:absolute;
	top:174px;
	bottom:0px;
	width:100%;
	left:0;
	overflow:hidden;
}
.overview{
	display:flex;
	padding:18px 0;
}
.overview .overview-left{
	flex:0 0 137px;
	wdith:120px;
	padding-bottom:6px;
	border-right:1px solid rgba(7,17,27,0.2);
	text-align:center;
}
@media only screen and (max-width: 320px){
	flex:0 0 120px;
	wdith:120px;
}
.overview .overview-left .score{
	font-size:24px;
	line-height:28px;
	color:rgba(255,153,0.1);
}
.overview .overview-left .title{
	margin-top:6px;
	line-height:12px;
	font-size:12px;
	color:rgb(7,17,27);
}
.overview .overview-left .rank{
	margin-top:6px;
	line-height:10px;
	font-size:10px;
	color:rgb(147,153,159);

}
.overview .overview-right{
	padding:6px 0 6px 24px;
	flex:1;
}
@media only screen and (max-width: 320px){
	padding:6px 0 6px 6px;
}
.score-wrapper{
	margin-bottom:8px;
	font-size:0;
}
.score-wrapper .title{
	font-size:12px;
	line-height:18px;
	vertical-align:top;
	display:inline-block;
	color:rgb(7,17,27);
}
.score-wrapper .star{
	display:inline-block;
	vertical-align:top;
	margin:2px 12px 0 12px;
}
.score-wrapper .score{
	line-height:18px;
	display:inline-block;
	vertical-align:top;
	font-size:12px;
	color:rgb(255,153,0);
}
.delivery-wrapper {
	font-size:0;
}
.delivery-wrapper .title{
	font-size:12px;
	line-height:18px;
	color:rgb(7,17,27);
}
.delivery-wrapper .delivery{
	margin-left:12px;
	font-size:12px;
	color:rgb(147,153,159);
}
.ratings .rating-wrapper{
	padding: 0 18px;
}
.ratings .rating-wrapper .rating-item{
	display:flex;
	padding-top:18px;
	position: relative;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.ratings .rating-wrapper .rating-item .avatar{
	flex: 0 0 28px;
	width:28px;
	margin-right:12px;
	
}
.rating-wrapper .rating-item .avatar img{
	border-radius:50%;
}
.ratings .rating-wrapper .rating-item .content{
	flex:1;
	position:ralitive;
}
.rating-wrapper .rating-item .content .name{
	margin-bottom:4px;
	line-height:12px;
	fon-size:10px;
	color:rgb(7,17,27);
}
.rating-wrapper .rating-item .content .star-wrapper{
	margin-bottom:6px;
	font-size:0;
}
.rating-wrapper .rating-item .content .star-wrapper .star{
	display:inline-block;
	margin-right:6px;
	vertical-align:top;
}
.rating-wrapper .rating-item .content .star-wrapper .delivery{
	display:inline-block;
	vertical-align:top;
	line-height:12px;
	font-size:10px;
	color:rgb(147,153,159);
}
.rating-wrapper .rating-item .content .text{
	line-height:18px;
	font-size:12px;
	margin-bottom:8px;
}
.rating-wrapper .rating-item .content .recommend{
	line-height:16px;
	margin-bottom:4px;
}
.rating-wrapper .rating-item .content .recommend .item{
	display:inline-blcok;
	margin: 0 8px 4px 0;
	font-size:9px;
	padding: 0 6px;
	border: 1px solid rgba(7,17,27,0.1);
	border-radius:1px;
	color:rgb(147,153,159);
	background:#fff;
}
.rating-wrapper .rating-item .content .time{
	position:absolute;
	top:0;
	right:0;
	color:rgb(147,153,159);
	cont-size:10px;
}
</style>
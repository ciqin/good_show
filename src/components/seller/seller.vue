<template>
	<div class="seller" ref="seller">
		<div class="seller-contant">
			<div class="overview-s">
				<h1 class="title">{{seller.seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.seller.score"></star>
					<span class="text">{{seller.seller.ratingCount}}</span>
					<span class="text">月售{{seller.seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="count">
							<span class="stress">{{seller.seller.minPrice}}</span>
							元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="count">
							<span class="stress">{{seller.seller.deliveryPrice}}</span>
							元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="count">
							<span class="stress">{{seller.seller.deliveryTime}}</span>
							分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon" :class="{'active':favorite}">❤</span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="contant-wrapper">
					<p class="contant">{{seller.seller.bulletin}}</p>
				</div>
				<ul v-if="seller.seller.supports" class="supports">
		 			<li class="support-item" v-for="(item,index) in seller.seller.supports">
		 					<span class="icon" :class="classMap[seller.seller.supports[index].type]"></span>
		 					<span class="text">{{seller.seller.supports[index].description}}</span>
		 			</li>
		 		</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="pic-wrapper">
					<ul class="pic-list" ref="pic-list">
						<li class="pic-item" v-for="pic in seller.seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '../star/star';
	import split from '../split/split';
	import Bscroll from  'better-scroll';
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split
		},
		created(){
			this.classMap = ["decrease","discount","special","invoice","guarantee"];
			
		},
		data(){
			return {
				favorite:false
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?'收藏':'未收藏';
			}
		},
		methods:{
			toggleFavorite(){
				return this.favorite = !this.favorite;
			}
		},
		mounted(){
			if(!this.scroll){
				 this.$nextTick(function(){
				  		this.scroll = new Bscroll(this.$refs.seller,{});
				  });
			 }else{
			  	this.$nextTick(function(){
				  		this.scroll = new Bscroll(this.$refs.seller,{});
				 });
			 }
			if(this.seller.seller.pics){
				let picWidth = 120;
				let margin = 6;
				let width = (picWidth+margin)*this.seller.seller.pics.length-margin;
				this.$refs.picList.style.width = width+"px";
				this.$nextTick(function(){
				 	this.scroll = new Bscroll(this.$refs.picWrapper,{
				 		scrollX:true
				 	});
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
*{
	margin:0;
	padding:0;
	list-style:none;
}
.seller{
	position:absolute;
	top:174px;
	bottom:0px;
	width:100%;
	left:0;
	overflow:hidden;
}
.seller .overview-s{
	padding:28px 18px 18px 18px;
	position:relative;
}
.seller .overview-s .title{
	margin-bottom:8px;
	line-height:14px;
	color:rgb(7,17,27);
	font-size:14px;
}
.seller .overview-s .desc{
	padding-bottom:18px;
	font-size:0;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.seller .overview-s .desc .star{
	display:inline-block;
	margin-right:8px;
	vertical-align:top;
}
.seller .overview-s .desc .text{
	display:inline-block;
	line-height:18px;
	vertical-align:top;
	margin-right:12px;
	font-size:10px;
	color:rgb(74,85,93);
}
.seller .overview-s .remark{
	display:flex;
	padding-top:18px;
}
.seller .overview-s .remark .block{
	flex:1;
	text-align:center;
	border-right:1px solid rgba(7,17,27,0.1);
}
.seller .overview-s .remark .block:last-child{
	border-right:0;
}
.seller .overview-s .remark .block h2{
	margin-bottom:4px;
	line-height:10px;
	font-size:10px;
	color:rgb(147,153,159);
}
.seller .favorite{
	position:absolute;
	right:11px;
	top:24px;
	width:30px;
}
.seller .favorite .icon{
	display:block;
	line-height:24px;
	color:#d4d6d9;
	font-size:24px;
}
.seller .favorite .active{
	color:red;
}
.seller .favorite .text{
	font-size:10px;
	line-height:10px;
	color:rgb(77,85,93);
}
.seller .overview-s .remark .block .count{
	line-height:24px;
	color:rgb(7,17,27);
	font-size:10px;
	
}
.overview-s .remark .block .count .stress{
	font-size:24px;
}
.seller .bulletin{
	padding: 18px 18px 0 18px;
}
.seller .bulletin .title{
	line-height:14px;
	color:rgb(7,17,27);
	font-size:14px;
}
.seller .bulletin .contant-wrapper{
	padding: 0px 12px 16px 12px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.seller .bulletin .contant-wrapper .contant{
	line-height:24px;
	font-size:12px;
	color:rgb(240,20,20);
	margin-left:0;
}
.seller .bulletin .supports .support-item{
	padding: 16px 12px;
	font-size:0;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.seller .bulletin .supports .icon{
	display:inline-block; 
	width:12px;
	height:12px;
	margin-right:4px;
	background-size:cover;
	background-repeat:no-repeat;
	vertical-align:top;
	margin-top:2px;
}
.seller .bulletin .supports .decrease{
	background-image:url("./decrease_4@2x.png");
}
.seller .bulletin .supports .discount{
	background-image:url("./discount_4@2x.png");
}
.seller .bulletin .supports .guarantee{
	background-image:url("./guarantee_4@2x.png");
}
.seller .bulletin .supports .invoice{
	background-image:url("./invoice_4@2x.png");
}
.seller .bulletin .supports .special{
	background-image:url("./special_4@2x.png");
}
.seller .bulletin .supports .text{
	font-size:12px;
	line-height:16px;
	color:rgb(7,17,27);
}
.seller .pics{
	padding:18px;
}
.seller .pics .title{
	line-height:14px;
	color:rgb(7,17,27);
	font-size:14px;
	margin-bottom:12px;
}
.seller .pics .pic-wrapper{
	width:100%;
	overflow:hidden;
	white-space:nowrap;
}
.seller .pics .pic-wrapper .pic-list{
	font-size:0;
}
.seller .pics .pic-wrapper .pic-list .pic-item{
	display:inline-block;
	margin-right:6px;
	width:120px;
	height:90px;
}
.seller .pics .pic-wrapper .pic-list .pic-item:list-child{
	margin-right:0;
}
.seller .info{
	padding:18px 18px 0 18px;
	color:rgb(7,17,27);
}
.seller .info .title{
	line-height:14px;
	font-size:14px;
	padding-bottom:12px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.seller .info .info-item{
	padding: 16px 12px;
	line-height:16px;
	border-bottom:1px solid rgba(7,17,27,0.1);
	font-size:12px;
}
.seller .info .info-item:last-child{
	border-bottom:0;
}
</style>
<template>
	<div class="header">
	 	<div class="contant-wrapper">
	 		<div class="avatar">
	 			<img width="64" height="64" :src="seller.seller.avatar">
	 		</div>
	 		<div class="contant">
	 			<div class="title">
	 				<span class="brand"></span>
	 				<span class="name">{{seller.seller.name}}</span>
	 			</div>
	 			<div class="descraption">
	 				{{seller.seller.description}}/{{seller.seller.deliveryTime}}分钟送达
	 			</div>
	 			<div v-if="seller.seller.supports" class ="supports">
	 				<span class="icon" :class="classMap[seller.seller.supports[0].type]"></span>
	 				<span class="text">{{ seller.seller.supports[0].description}}</span>
	 			</div>
	 		</div>
	 		<div v-if="seller.seller.supports" class="support-count"  @click="showDetail">
	 			<span class="count">{{seller.seller.supports.length}}个</span>
	 			<span class="count-icon">></span>
	 		</div>
	 	</div>
	 	<div class="bulletin-wrapper" @click="showDetail" >
	 		<span class="bulletin-title"></span >
	 		<span class="bulletin-text">{{ seller.seller.bulletin}}</span >
	 		<span class="bulletin-icon">></span >
	 	</div>
	 	<div class="background">
	 		<img :src="seller.seller.avatar" height="100%" width="100%">
	 	</div>
	 	<transition name="fade">
		 	<div v-show="detailShow"  class="detail" ref="minute">
		 		<div class="detail-wrapper clearfix">
		 			<div class="detail-main">
		 				<h1 class="name">{{seller.seller.name}}</h1>
		 				<div class="star-wrapper">
		 					<star :size="48" :score="seller.seller.score"></star>
		 				</div>
		 				<div class="title">
		 					<div class="line"></div>
		 					<div class="text">优惠信息</div>
		 					<div class="line"></div>
		 				</div>
		 				<ul v-if="seller.seller.supports" class="supports">
		 					<li class="support-item" v-for="(item,index) in seller.seller.supports">
		 						<span class="icon" :class="classMap[seller.seller.supports[index].type]"></span>
		 						<span class="text">{{seller.seller.supports[index].description}}</span>
		 					</li>
		 				</ul>
		 				<div class="title">
		 					<div class="line"></div>
		 					<div class="text">商家公告</div>
		 					<div class="line"></div>
		 				</div>
		 				<div class="bulletin">
		 					<p class="contant">{{ seller.seller.bulletin}}{{ seller.seller.bulletin}}{{ seller.seller.bulletin}}{{ seller.seller.bulletin}}{{ seller.seller.bulletin}}{{ seller.seller.bulletin}}</p>
		 				</div>
		 				<div class="detail-close" @click="hideDetail">x</div>
		 			</div>
		 		</div>
		 	</div>
	 	</transition>
	</div>
</template>

<script>
	import star from '../star/star.vue';
	import Bscroll from  'better-scroll';
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				detailShow:false
			}
			
		},
		methods:{
			showDetail(){
				this.detailShow = true;
				let that = this;
				if(!this.scroll){
					console.log(this.$refs)
					 this.$nextTick(function(){
					  	 this.scroll = new Bscroll(that.$refs.minute,{});
					  });
				 }else{
				 	console.log(2)
					  this.$nextTick(function(){
					  	 this.scroll = new Bscroll(this.$refs.minute,{});
					  });
				 }
			},
			hideDetail(){
				this.detailShow = false;
			},
		  	
		},
		computed:{
			normalizedUsername:function(){
				return this.seller
			}
		},
		created(){
			this.classMap = ["decrease","discount","special","invoice","guarantee"];
		},
		components:{
			star
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*base css*/
*{
	margin:0px;
	padding:0px;
}
.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}
 /*base css*/
.header{
	color:#fff;
	position:relative;
	background-color:rgba(7,17,27,0.5);
}
.contant-wrapper{
	padding:24px 12px 18px 24px; 
	position:relative;
}
.avatar{
	display:inline-block;
	vertical-align:top;
	border-radius:2px;
}
.contant{
	display:inline-block;
	margin-left:16px;
}
.title{
	margin:2px 0 8px 0;
}
.brand{
	display:inline-block;
	background:url("./brand@2x.png") no-repeat;
	background-size:cover;
	width:30px;
	height:18px;
	vertical-align:top;
}
.name{
	margin-left:6px;
	font-size:16px;
	line-height:18px;
	font-weight:700;
	
}
.descraption{
	margin-top:10px;
	line-height:12px;
	font-size:12px;
}
.supports{
	 margin-top:5px;
}
.supports .icon{
	display:inline-block; 
	width:12px;
	height:12px;
	margin-right:4px;
	background-size:cover;
	background-repeat:no-repeat;
	vertical-align:top;
	margin-top:4px;
}
.supports .text{
	font-size:12px;
	line-height:12px;
}
.supports .decrease{
	background-image:url("./decrease_1@2x.png");
}
.supports .discount{
	background-image:url("./discount_1@2x.png");
}
.supports .guarantee{
	background-image:url("./guarantee_1@2x.png");
}
.supports .invoice{
	background-image:url("./invoice_1@2x.png");
}
.supports .special{
	background-image:url("./special_1@2x.png");
}
.support-count{
	position:absolute;
	right:12px;
	bottom:18px;
	padding:0 8px;
	height:24px;
	line-height:24px; 
	background-color:rgba(0,0,0,0.2);
	text-align:center;
}
.count{
	font-size:10px;
}
.count-icon{
	font-size:10px;
}
.bulletin-wrapper{
	height:28px;
	line-height:28px;
	padding:0 22px 0 12px;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
	position:relative;
	background:rgba(7,17,27,0.2);
}
.bulletin-title{
	width:22px;
	height:12px;
	display:inline-block;
	background:url("./bulletin@2x.png") no-repeat;
	background-size:cover;
	vertical-align:top;
	margin-top:9px;
}
.bulletin-text{
	font-size:12px;
	font-weight:400;
	vertical-align:top;
}
.bulletin-icon{
	position:absolute;
	font-size:10px;
	right:8px;
	top:1px;
	
}
.background{
	position:absolute;
	top:0px;
	left:0px;
	width:100%;
	height:100%;
	z-index:-1;
	filter:blur(10px);
}
.detail{
	position:fixed;
	z-index:100;
	width:100%;
	top:0px;
	left:0px;
	height:100%;
	overflow:hidden;
	background-color:rgba(7,17,27,0.7);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.detail-wrapper{
	width:100%;
	min-height:100%;
}
.detail-main{
	margin-top:64px;
	padding-bottom:64px;
}
.detail-main .name{
	line-height:16px;
	text-align:center;
	font-size:16px;
	font-weight:700;
}
.detail-main .star-wrapper{
	margin-top:18px;
	padding:2px  0;
	text-align:center;
}
.detail-main .title{
	 display:flex;
	 width:80%;
	 margin: 28px auto 24px auto;
}
.detail-main .title .line{
	flex:1;
	position:relative;
	top:-6px;
	border-bottom:1px solid rgba(255,255,255,0.2);
}
.detail-main .title .text{
	padding:0 12px ;
	font-size:14px;
	font-weight:700;
}
.detail-main  .supports{
	width:80%;
	margin:0 auto;
	list-style:none;
}
.detail-main .title .supports .supports-item{
	padding:0 12px;
	margin-bottom:12px;
	font-size:0;
	
}
.detail-main .title .supports .supports-item:last-child{
	margin-bottom:0;
}
.detail-main .title .supports .icon{
	display:inline-block;
	width:16px;
	height:16px;
	vertical-align:top;
	margin-right:16px;
	background-size:cover;
	background-repeat:no-repeat;
}

.detail-main .title .supports .text{
	font-size:12px;
	line-height:12px;
}
.detail-main .title .supports .decrease{
	background-image:url("./decrease_2@2x.png");
}
.detail-main .bulletin{
	width:80%;
	margin:0 auto; 
	padding-bottom:128px;
}
.detail-main .bulletin .contant{
	padding: 0 12px ;
	line-height:24px;
	font-size:12px;
}
.detail-close{
	position:relative;
	width:32px;
	height:32px;
	margin:-64px auto 0 auto;
	clear:both;
	font-size:32px;
}
</style>
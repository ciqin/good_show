<template>
  <div>	
	<div class="goods">
	     <div class="menu-wrapper" ref="menuWrapper">
	     	<ul>
	     		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMneu(index)">
	     			<span class="text">
	     				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name}}
	     			</span>
	     		</li>
	     	</ul>
	     </div>
	     <div class="foods-wrapper" ref="foodsWrapper">
	     	<ul>
	     		<li v-for="(item,index) in goods" class="food-list food-list-hook">
	     			<h1 class="title">{{ item.name}}</h1>
	     			<ul>
	     				<li @click="selectFood(food)" v-for="food in item.foods" class="food-item">
	     					<div class="icon">
	     						<img width="57" height="57" :src="food.icon">
	     					</div>
	     					<div class="content">
	     						<h2 class="name">{{ food.name}}</h2>
	     						<p class="desc">{{ food.description}}</p>
	     						<div class="extra">
	     							<span class="count"> 月售{{food.sellCount}}分</span>
	     							<span>好评率{{ food.rating }}%</span>
	     						</div>
	     						<div class="price">
	     							<span class="now">￥{{ food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
	     						</div>
	     						<div class="cartcontrol-wrapper">
	     							<Cartcontrol :food="food"></Cartcontrol>
	     						</div>
	     					</div>
	     				</li>
	     			</ul>
	     		</li>
	     	</ul>
	     </div> 
	     <Shopcart :select-foods="selectFoods" :delivery-price="seller.seller.deliveryPrice" :min-price="seller.seller.minPrice"></Shopcart>
     </div>
     <food :food="selectedFood" ref="food"></food>
 </div>    
</template>

<script>
	import Bscroll from  'better-scroll';
	import Shopcart from '../shopcart/shopcart.vue';
	import Cartcontrol from '../cartcontrol/cartcontrol.vue';
	import food from '../food/food.vue'
	const ERR_OK = 0;
	export default{
		props:{
			seller:Object
		}, 
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY:0,		
				selectedFood:{}
			}
		},
		components:{
			Shopcart,
			Cartcontrol,
			food
		},
		created(){
			this.classMap = ["decrease","discount","special","invoice","guarantee"];
			this.$http.get("../../../static/datas.json").then((response)=>{
				response = response.body;
				this.goods = response.goods;
				      this.$nextTick(function () {
				        		this._initScorll();
				        		this._calculateHeight();
				      })
			})
		},
		computed:{
			currentIndex(){
				for(let i = 0; i<this.listHeight.length;i++){
				  let height1 = this.listHeight[i];
				  let height2 = this.listHeight[i+1];
				  if(!height2 || this.scrollY>=height1 && this.scrollY<height2){
				  	return i;
				  }
				}
				return 0;
			},
			selectFoods(){
				let foods = [];
				this.goods.forEach(function(good){
					good.foods.forEach(function(food){
						if(food.count){
							foods.push(food);
						}
					})
				})
				console.log(foods);
				return foods;
			}
		},
		methods:{
			selectMneu(index){
				let foodList = this.$refs.foodsWrapper.querySelectorAll(".food-list-hook")
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300);
			},
			_initScorll(){
				this.menuScroll = new Bscroll(this.$refs.menuWrapper,{});
				this.foodsScroll = new Bscroll(this.$refs.foodsWrapper,{
					probeType:3
				});
				let that = this;
				this.foodsScroll.on("scroll",function(pos){
					console.log(pos)
					that.scrollY = Math.abs( Math.round(pos.y));
				})			
			},
			selectFood(food){
				this.selectedFood = food;
				this.$refs.food.show();
			},
			_calculateHeight(){
				let foodList = this.$refs.foodsWrapper.querySelectorAll(".food-list-hook")
				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i];
					height +=item.clientHeight;
					this.listHeight.push(height);
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
*{
margin:0px;
padding:0px;
}
li{
	list-style:none;
}
.goods{
	position:absolute;
	top:184px;
	width:100%;
	bottom:46px;
	display:flex;
	overflow:hidden;
}
.menu-wrapper{
	flex:0 0 80px;
	width:80px;
	background-color:#f3f5f7;
}
.menu-item{
	display:table;
	height:54px;
	width:56px;
	line-height:14px;
	padding:0 12px;
}
.current{
 	position:relative;
 	margin-top:-1px;
 	z-index:10;
 	background-color:#fff;
 	font-weight:700;	
 	border:0;
}
.menu-item .icon{
	display:inline-block; 
	width:12px;
	height:12px;
	margin-right:2px;
	background-size:cover;
	background-repeat:no-repeat;
	vertical-align:middle;
	margin-top:-3px;
}
.menu-item  .text{
	display:table-cell;
	width:56px;
	vertical-align:middle;
	border-bottom:1px solid rgba(7,17,27,0.1);
	font-size:12px;
	line-height:12px;
}
.menu-item  .decrease{
	background-image:url("./decrease_3@2x.png"); 
}
.menu-item  .discount{
	background-image:url("./discount_3@2x.png");
}
.menu-item  .guarantee{
	background-image:url("./guarantee_3@2x.png");
}
.menu-item  .invoice{
	background-image:url("./invoice_3@2x.png");
}
.menu-item  .special{
	background-image:url("./special_3@2x.png");
}
.foods-wrapper{
	flex:1;
}
.foods-wrapper .title{
	margin:0;
	padding-left:14px;
	height:26px;
	line-height:26px;
	border-left:2px solid #d9dde1;
	font-size:12px;
	color:rgb(148,153,159);
	background-color:#f3f5f7;
}
.foods-wrapper .food-item{
	display:flex;
	margin:18px;
	padding-bottom:18px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.foods-wrapper .food-item:last-child{
	border-bottom:0;
	margin-bottom:0;
}
.foods-wrapper .food-item .icon{
	flex: 0 0 57px;
	margin-right:10px;
	
}
.foods-wrapper .food-item .content{
	flex:1;
	position:relative;
}
.foods-wrapper .food-item .content .name{
	font-size:14px;
	margin:2px 0 8px 0;
	height:14px;
	line-height:14px;
	color:rgb(7,17,27);
}
.foods-wrapper .food-item .content .desc,.foods-wrapper .food-item .content .extra{
	line-height:10px;
	font-size:10px;
	color:rgb(148,153,159);
}
.foods-wrapper .food-item .content .desc{
	margin-bottom:8px;
	line-height:12px;
}
.foods-wrapper .content .extra .count{
	margin-right:10px;
}
.foods-wrapper .food-item .price{
	font-weight:700;
	line-height:24px;
}
.foods-wrapper .food-item .price .now{
	margin-right:8px;
	font-size:14px;
	color:red;
}
.foods-wrapper .food-item .price .old{
	test-decorration:line-throuth;
	font-size:10px;
	margin-left:-4px;
	color:rgb(148,153,159);
}
.foods-wrapper .food-item .cartcontrol-wrapper{
	position:absolute;
	right:0px;
	bottom:12px;
}
</style>
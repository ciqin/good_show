<template>
  <div id="app">
      <v_header :seller="seller"></v_header>
      <div class="tap">
        <div class="tab-items"><router-link :to="{ name: 'home' }">商品</router-link></div>
        <div class="tab-items"><router-link :to="{ name: 'foo' }">评论</router-link></div>
        <div class="tab-items"><router-link :to="{ name: 'bar' }">商家</router-link></div>
      </div>
      <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
import Headers from './components/header/header.vue';
import {urlParse} from './common/js/util.js';
export default {
  data() {
  	return {
  		seller:{
  			seller:{
  				avatar:1
  				
  			},
  			id:(function(){
  					let queryParam = urlParse();
  					return queryParam.id
  			})()
  		}
  	}
  },
  mounted() {
  	
  },
  created() {
  	 this.$http.get('../static/datas.json').then((response) =>{
  	 		response = response.body;
				 this.seller = response;
  	  })
  },
  components:{
  	v_header:Headers
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.tap{ 
	display:flex ;
	width:100%;
	height:40px;
	line-height:40px;
	border-bottom:1px solid rgba(2,17,27,0.1)
}
.tap .tab-items{
	flex:1;
	text-align:center;
}
.tap .tab-items a{
	text-decoration:none;
	display:block;
	font-size:14px;
	color:rgb(78,85,93);
}
.tap .tab-items .active{
	color:red;
}
</style>

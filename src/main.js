import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from './App.vue';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';

Vue.use(VueRouter);
Vue.use(VueResource);


const router = new VueRouter({
  linkActiveClass:'active',
  base: __dirname,
  routes: [
    { path: '/goods', name: 'home', component: Goods },
    { path: '/foo', name: 'foo', component: Ratings },
    { path: '/bar', name: 'bar', component: Seller }
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const User = {
  template: `<div>User {{ $route.params.id }}</div>`
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})



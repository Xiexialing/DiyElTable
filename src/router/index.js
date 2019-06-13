import Vue from 'vue'
import Router from 'vue-router'
import List from '@/views/list'
import Tabs from '@/views/tabs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/tabs',
      name: 'Tabs',
      component: Tabs
    },
    {
      path: '*',
      redirect: '/list'
    }
  ]
})

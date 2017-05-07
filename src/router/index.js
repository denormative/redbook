import Vue from 'vue'
import Router from 'vue-router'
import Odd from '@/components/Odd'
import Red from '@/components/Red'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/odd',
    },
    {
      path: '/odd',
      name: 'Odd',
      component: Odd,
    },
    {
      path: '/red',
      name: 'Red',
      component: Red,
    },
  ],
})

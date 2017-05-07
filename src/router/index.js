import Vue from 'vue'
import Router from 'vue-router'
import Odd from '@/components/Odd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Odd',
      component: Odd,
    },
  ],
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/landingPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPage
  },
  {
    path: '/inGame/:id',
    name: 'inGame',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/inGame.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/result')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

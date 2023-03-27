import VueRouter from 'vue-router'
import Vue from 'vue'
import configPage from './page/config.vue'
import feedbackPage from './page/feedback.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/config',
  },
  {
    path: '/config',
    name: 'configPage',
    component: configPage,
  },
  {
    path: '/feedback',
    name: 'feedbackPage',
    component: feedbackPage,
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router

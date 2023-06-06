import VueRouter from 'vue-router'
import Vue from 'vue'
import stopScenePage from './stopScene/index.vue'
import focusScenePage from './focusScene/index.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/stop',
  },
  {
    path: '/stop',
    name: 'stopScenePage',
    component: stopScenePage,
  },
  {
    path: '/focus',
    name: 'focusScenePage',
    component: focusScenePage,
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router

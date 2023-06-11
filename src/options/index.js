import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/global.css'
import GlobalFunction from '@/utils/utils-index'

import NET from '../utils/net'
import AppComponent from './App/App.vue'
import router from './App/router'
import store from './App/store'

Vue.component('app-component', AppComponent)
Vue.use(GlobalFunction)
Vue.use(ElementUI)
Vue.prototype.NET = NET

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  async created() {
    this.$root.$options.store.dispatch('asyncGetConfig')
  },
  render: (createElement) => createElement(AppComponent),
})

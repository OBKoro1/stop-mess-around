import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/global.css'
import GlobalFunction, { utils } from '@/utils/index'

import NET from '../utils/net'
import AppComponent from './App/App.vue'
import router from './App/router'

Vue.component('app-component', AppComponent)
Vue.use(GlobalFunction)
Vue.use(ElementUI)
Vue.prototype.NET = NET
Vue.prototype.useLanguageMessage = utils.getLanguageMessage
Vue.prototype.useGetUILanguage = utils.getUILanguage

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: (createElement) => createElement(AppComponent),
})

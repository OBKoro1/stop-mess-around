import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './global.css'
import GlobalFunction from '../utils'
import NET from '../utils/net'
import AppComponent from './App/App.vue'

Vue.component('app-component', AppComponent)
Vue.use(GlobalFunction)
Vue.use(ElementUI)
Vue.prototype.NET = NET

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: (createElement) => createElement(AppComponent),
})

import Vue from 'vue'
import {
  Card,
  Button,
} from 'element-ui'
import AppComponent from './App/App.vue'

// TODO: 提醒用户某个网站不要访问 浪费时间 应该滚去学习
Vue.component('app-component', AppComponent)

Vue.use(Card)
Vue.use(Button)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: (createElement) => createElement(AppComponent),
})

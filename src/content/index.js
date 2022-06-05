/*
 * Author       : OBKoro1
 * Date         : 2021-05-17 16:17:59
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-06-05 14:41:39
 * FilePath     : /src/content/index.js
 * Description  : content插入到页面的js
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */
import Vue from 'vue'
import './content-global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AppComponent from './App.vue'

const id = `app_vue_${Date.now()}`
const root = document.createElement('div')
root.id = id
document.body.appendChild(root)
Vue.use(ElementUI)

// eslint-disable-next-line no-new
new Vue({
  el: `#${id}`,
  render: (h) => h(AppComponent),
})

// src/main.js
import './polyfills'
import Vue from 'vue'
import App from './App'
import store from './store'
import './filters'
import plugins from './plugins' // plugins
import { router, RouterMount } from './router/index'
import TuniaoUI from 'tuniao-ui'

// ✅ 用 ESM 导入，而不是 require
import uStoreMixin from '@/store/$u.mixin.js'

Vue.config.productionTip = false
App.mpType = 'app'

// 路由插件
Vue.use(router)

// 其他插件（兼容 CJS/ESM 双写法，防止个别老插件还是 module.exports）
Vue.use(plugins && (plugins.install ? plugins : plugins.default || plugins))
Vue.use(TuniaoUI)

// 全局混入（同样做兼容兜底）
Vue.mixin(uStoreMixin && (uStoreMixin.default || uStoreMixin))

const app = new Vue({
  store,
  ...App
})

// v1.3.5 起 H5 端用 RouterMount 渲染
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() // 为兼容小程序和 App 端
// #endif

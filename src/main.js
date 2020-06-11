// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import store from './store'
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
  ak: 'BVy7xaeyWQ3TDvT2K1bpA8R3EtraWZbF'
})
Vue.use(ElementUI)
Vue.config.productionTip = false
//自定义指令,给document绑定事件，select.vue中
Vue.directive('document-click', {
  bind(el, binding, vnode) {
    document.addEventListener('click', binding.value, false)
  },
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

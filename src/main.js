import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from './store/index';

import toast from 'components/content/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(toast)
Vue.use(VueLazyLoad)

Vue.prototype.$bus = new Vue({})

FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

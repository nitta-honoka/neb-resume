// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource';
import Toasted from 'vue-toasted'

Vue.use(VueResource);
Vue.use(Toasted, {
  position: 'top-center',
  duration: 3000
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

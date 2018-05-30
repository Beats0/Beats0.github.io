import Vue from 'vue'
import vuescroll from 'vuescroll'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(vuescroll);

new Vue({
  el: '#app',
  render: h => h(App)
})


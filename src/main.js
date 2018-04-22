import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import RecurrenceSetting from './components/RecurrenceSetting.vue'

import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)
Vue.prototype.$http = axios


new Vue({
  el: '#app',
  render: h => h(RecurrenceSetting)
})

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import popup from './components/popup.vue'
import elmentUI from 'element-ui'
// import  { Button, MessageBox, Input } from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'


// Vue.use(Button)
// Vue.use(MessageBox)
// Vue.use(Input)
Vue.use(elmentUI)
Vue.prototype.$http = axios


new Vue({
  el: '#app',
  render: h => h(popup)
})

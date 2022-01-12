import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import requests from '@/axios/index.js';
import store from "./store";
import './editor/index';

Vue.use(ElementUI);
Vue.prototype.$rq = requests;
Vue.prototype.$store = store;
Vue.prototype.$imgUrl = 'http://127.0.0.1/images/';
Vue.prototype.$baseUrl = 'http://127.0.0.1:8002/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

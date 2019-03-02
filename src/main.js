import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import axios from 'axios'
// import router from './router'
// import store from './store'
import "@/assets/style/main.scss"

Vue.use(VueRouter);

import {routes} from './router'
import {store} from './store/store'

axios.defaults.baseURL = 'https://food-service-10b7a.firebaseio.com'

Vue.config.productionTip = false

export const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import "@/assets/style/main.scss"
import Vuelidate from 'vuelidate'

Vue.use(VueRouter);
Vue.use(Vuelidate);

import {store} from './store/store'

axios.defaults.baseURL = 'https://food-service-10b7a.firebaseio.com';

Vue.config.productionTip = false;

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.fullPath === '/account' || to.fullPath === '/account/your-orders') {
        if (!token) {
            next('/signin');
        }
    }else {
      next()
    }
    // if (to.fullPath === '/login') {
    //     if (store.state.accessToken) {
    //         next('/users');
    //     }
    // }
    next();
});

new Vue({
  router,
  store,
  validations: {},
  render: h => h(App)
}).$mount('#app');

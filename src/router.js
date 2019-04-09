// import Vue from 'vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import Hero from './components/Hero.vue'
import Restaurants from './views/Restaurants/Restaurants.vue'
import OneRest from './views/Restaurants/OneRest.vue'
import ListRest from './views/Restaurants/ListRest.vue'
import Signup from './views/Account/Signup.vue'
import Signin from './views/Account/Signin.vue'
import Account from './views/Account/Account.vue'
import Sign from './views/Account/Sign.vue'
import UserOrders from './views/Account/UserOrders.vue'
import UserData from './views/Account/UserData.vue'

Vue.use(VueRouter)


const routes= [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        'hero': Hero
      },
    },
    {
        path: '/restaurants',
        name: 'restaurants',
        component: Restaurants,
        children: [
            {path: '/restaurants', component: ListRest, name: 'listRest'},
            {path: '/restaurants/:link', component: OneRest, name: 'oneRest'}
        ]
    },
    {
        path: '/sign',
        name: 'sign',
        component: Sign,
        children: [
            {path: '/signin', component: Signin, name: 'signin'},
            {path: '/signup', component: Signup, name: 'signup'},
            {path: '/account', component: Account, name: 'account', children: [
                {path: '/account/your-orders', component: UserOrders, name: 'userOrders'},
                {path: '/account/personal-data', component: UserData, name: 'UserData'}
            ]},
        ]
    },
    {path: '*', redirect: '/'}

    // {
        // path: '/signin',
        // component: Signin,
        // name: 'signin'
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/.vue')
    // }
  ]
// })

export default new VueRouter({mode: 'history', routes})


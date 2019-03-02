// import Vue from 'vue'

import Home from './views/Home.vue'
import Hero from './components/Hero.vue'
import Restaurants from './views/Restaurants.vue'
import OneRest from './views/OneRest.vue'
import ListRest from './views/ListRest.vue'
import Signup from './views/Signup.vue'
import Signin from './views/Signin.vue'
import Account from './views/Account.vue'



// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
export const routes= [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        'hero': Hero
      },

    },
    {
        path: '/',
        name: 'restaurants',
        component: Restaurants,
        children: [
            {path: '/restaurants', component: ListRest, name: 'listRest'},
            {path: '/restaurants/:id', component: OneRest, name: 'oneRest'},
            {path: '/signup', component: Signup, name: 'signup'},
            {path: '/signin', component: Signin, name: 'signin'},
            {path: '/account', component: Account, name: 'account'}
        ]
    },
    // {
    //    path: '/signup',
    //    name: 'signup',
    //    component: Signup
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
// })



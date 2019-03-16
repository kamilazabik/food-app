import Vue from 'vue'
import Vuex from 'vuex'

import basket from './modules/basket'
import restaurants from './modules/restaurants'
import user from './modules/auth-user'
import account from './modules/account'

Vue.use(Vuex);

export const store =  new Vuex.Store({
    modules: {
        basket,
        restaurants,
        user,
        account
    }
})

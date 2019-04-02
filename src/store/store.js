import Vue from 'vue'
import Vuex from 'vuex'

import basket from './modules/basket'
import restaurants from './modules/restaurants'
import user from './modules/auth-user'
import account from './modules/account'
import sidebar from './modules/sidebar'
import header from './modules/header'

Vue.use(Vuex);

export const store =  new Vuex.Store({
    modules: {
        basket,
        restaurants,
        user,
        header,
        account,
        sidebar

    }
})

import * as types from '../types';
import axios from '../../axios-auth';
import globalAxios from 'axios';
import auth from './auth-user'

const state = {
    openBasket: false,
    stickyBasket: false,
    basket: [],
    order: null
};

const mutations = {
    [types.MUTATE_OPEN_BASKET](state){
        console.log( !state.openBasket);
        if(!state.openBasket){
            state.openBasket = true;
            window.pageYOffset > 300 ? state.stickyBasket = true :  state.stickyBasket = false;
        }else {
            state.openBasket = false
        }
    },

    [types.MUTATE_ADD_TO_BASKET](state, payload){
        console.log( payload);
        state.basket.push({
            name: payload[0].name,
            price: payload[0].price,
            delCost: payload[1],
            quantity: 1,
            restName: payload[0].type
        });
        console.log(state.basket)
    },

    [types.MUTATE_CLEAN_BASKET](state){
        state.basket = []
    },

    [types.MUTATE_ADD_ORDER](state, payload){
     state.order= {
         restName: payload[0][0].restName,
         total: payload[1],
         basket: payload[0]
        }
    }
};

const actions = {
    [types.ACT_OPEN_BASKET]({commit}, getters) {
        commit(types.MUTATE_OPEN_BASKET, getters)
    },

    [types.ACT_ADD_TO_BASKET]({commit}, item){
        commit(types.MUTATE_ADD_TO_BASKET, item)
    },

    [types.ACT_CLEAN_BASKET]({commit}){
        commit(types.MUTATE_CLEAN_BASKET)
    },

    [types.ACT_ADD_ORDER]({commit}, payload ){
        commit(types.MUTATE_ADD_ORDER, payload)
    },

    [types.ACT_BASKET_TO_DB]({commit, state}, basket){
        if(!auth.state.idToken){
            return
        }
        if(typeof auth.state.oneUser.orders !== 'undefined' ){
            auth.state.oneUser.orders.push(basket)
        }else {
            auth.state.oneUser.orders = [];
            auth.state.oneUser.orders.push(basket)
        }
        globalAxios.post('/orders.json' + '?auth=' + auth.state.idToken, basket)
            .then(res=> console.log(res))
            .catch(error => console.log(error))

        globalAxios.put('/users/'+ auth.state.idUserDb +'.json?auth=' + auth.state.idToken, auth.state.oneUser )
            .then(res => {
                console.log(res);
                console.log(res.data)
            })
            .catch(error => console.log(error))

    }
};

const getters = {
    [types.GET_BASKET_STATUS]: state=> {
        return state.openBasket
    },

    [types.GET_STICKY_BASKET]: state=> {
        return state.stickyBasket
    },

    [types.GET_BASKET]: state=> {
        return state.basket
    },

    [types.GET_ORDER]: state=> {
        return state.order
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
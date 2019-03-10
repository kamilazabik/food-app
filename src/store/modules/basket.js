import axios from '../../axios-auth';
import globalAxios from 'axios';
import auth from './auth-user'

const state = {
    openBasket: false,
    stickyBasket: false,
    basket: [],
    order: null
}

const mutations = {
    'BASKET_STATUS'(state){
        console.log( !state.openBasket);
        if(!state.openBasket){
            state.openBasket = true;
            window.pageYOffset > 300 ? state.stickyBasket = true :  state.stickyBasket = false;
        }else {
            state.openBasket = false

        }
    },

    'PUSH_BASKET'(state, payload){
        console.log( payload)
        state.basket.push({
            name: payload[0].name,
            price: payload[0].price,
            delCost: payload[1],
            quantity: 1,
            restName: payload[0].type
        })

        console.log( state.basket)
    },

    'CLEAN_BASKET'(state){
        state.basket = []
    },
    
    'ADD_ORDER'(state, payload){
     state.order= {
         restName: payload[0][0].restName,
         total: payload[1],
         basket: payload[0]
        }
            // state.restItem: payload.restName


    }

}

const actions = {
    changeBasket({commit}, getters) {
        commit('BASKET_STATUS', getters)
    },

    addToBasket({commit}, item){
        commit('PUSH_BASKET', item)
    },

    cleanBasket({commit}){
        commit('CLEAN_BASKET')
    },

    addOrder({commit}, payload ){
        commit('ADD_ORDER', payload)
    },

    addBasketToDB({commit, state}, basket){
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
}

const getters = {
    checkBasket: state=> {
        return state.openBasket
    },

    checkStickyBasket: state=> {
        return state.stickyBasket
    },

    pushBasket: state=> {
        return state.basket
    },

    getOrder: state=> {
        return state.order
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
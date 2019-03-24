import * as types from '../types';
import globalAxios from 'axios';
import auth from './auth-user'

const state = {
    openBasket: false,
    stickyBasket: false,
    basket: [],
    order: null,
    total: 0,
    partial: '',
    basketItems:''
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
        state.basket.push({
            name: payload[0].name,
            price: payload[0].price,
            delCost: payload[1].options[0].deliverCost,
            quantity: 1,
            restName: payload[1].name
        });
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
    },
    [types.MUTATE_TOTAL](state,payload){
        console.log(state.total)
        return state.total = payload[0] + payload[1]
    },
    [types.MUTATE_RESET_TOTAL](){
        state.total = 0
    },
    [types.MUTATE_PARTIAL](state){
        state.partial = 0;
        console.log(state.basket)
        for (var items in state.basket) {
            console.log(items)
            var individualItem = state.basket[items];
            state.partial += individualItem.quantity * individualItem.price;
            console.log(individualItem.quantity)
        }
        return state.partial
    }
};

const actions = {
    [types.ACT_BASKET_TO_DB]({commit},basket){
        if(!auth.state.idToken){
            return
        }
        if(typeof auth.state.oneUser.orders !== 'undefined' ){
            auth.state.oneUser.orders.push(basket)
            console.log(basket)
            console.log(auth.state.oneUser.orders)
        }else {
            auth.state.oneUser.orders = [];
            auth.state.oneUser.orders.push(basket)
            console.log(basket)
            console.log(auth.state.oneUser.orders)
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
    },
    [types.GET_TOTAL]: state=> {
        return state.total
    },
    [types.GET_PARTIAL]: state=> {
        return state.partial
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
const state = {
    openBasket: false,
    stickyBasket: false,
    basket: [],
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
            quantity: 1
        })
    },
    'CLEAN_BASKET'(state){
        state.basket = []
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
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
import * as types from '../types';

const state = {
    showOrders: false
};
const mutations = {
    [types.MUTATE_SHOW_ORDERS](state){
        state.showOrders = true
    }
};

const actions = {
    [types.ACT_SHOW_ORDERS]({commit}, state){
        commit(types.MUTATE_SHOW_ORDERS)
    }
}

const getters = {
    [types.GET_SHOW_ORDERS]: state => {
        return state.showOrders
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}

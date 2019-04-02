import * as types from '../types';

const state = {
    openSidebar: false,
    mobile: false,
    showNavHeader: true,
    showBasketHeader: true,
    showSidebarHeader: true,
    fullScreen: false,
    // stickyHeader: false,
    fullWidth: false
};

const mutations = {
    [types.MUTATE_SIDEBAR_VIS](state, payload){
        return state.visibleSidebar = payload
    }
};

const actions = {
    [types.ACT_OPEN_SIDEBAR]({state, rootState}, payload){
        let max700 = window.matchMedia("(max-width: 700px)");

        state.stickyHeader = false;

        if(!state.openSidebar){
            state.openSidebar = true;

            // pageOffset > 300 ? state.openSidebar = true :  state.openSidebar = false;

            if(max700.matches){
                state.fullScreen = true;
                rootState.header.stickyHeader = true;
                state.showNavHeader = false;
                state.showBasketHeader = false;
                state.showSidebarHeader = true;
            }
        }else {
            if(max700.matches){
                rootState.header.stickyHeader = false;
                state.showNavHeader = true;
                state.showBasketHeader = true;
            }
            state.fullScreen = false;
            state.openSidebar = false;
            document.documentElement.scrollTop = payload
        }
    },
}

const getters = {
    [types.GET_SHOW_NAV_HEADER]: state => {
        return state.showNavHeader
    },
    [types.GET_SHOW_BASKET_HEADER]: state => {
        return state.showBasketHeader
    },
    [types.GET_SHOW_SIDEBAR_HEADER]: state => {
        return state.showSidebarHeader
    },
    [types.GET_FULL_SCREEN]: state => {
        return state.fullScreen
    },
    // [types.GET_STICKY_HEADER]: state => {
    //     return state.stickyHeader
    // },
    [types.GET_OPEN_SIDEBAR]: state => {
        return state.openSidebar
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}


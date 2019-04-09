import * as types from '../types';

const state = {
    stickyHeader: false,
    sticky: 220,
    offset: 0,
    height: 150
};

const mutations = {
    [types.MUTATE_STICKY_HEADER](state){
        let hero = document.getElementsByClassName('jumbotron-small')[0],
            pageOffset = window.pageYOffset,
            max700 = window.matchMedia("(max-width: 700px)");

        if(max700.matches){
            if  (pageOffset > state.sticky) {
                state.stickyHeader = true;
            } else if(pageOffset < state.sticky){
                state.stickyHeader = false;
            }

        }else {
            hero.style.height = (150 - pageOffset/10)  + "%";
            hero.style.top =  -(pageOffset/10)  + "%";

            if  (pageOffset > state.sticky + 30) {
                state.stickyHeader = true;
            } else if(pageOffset < state.sticky + 30){
                state.stickyHeader = false;
            }
        }
    },

    [types.MUTATE_SET_HERO_START](state){
        let max700 = window.matchMedia("(max-width: 700px)");
        max700.matches ? state.height = 100 : state.height = 150;
    }
};

const actions = {
    [types.ACT_HERO_HEIGHT]({state} ){
        state.height = 150;
        state.stickyHeader = false;
    },

    [types.ACT_RESIZE_HERO]({state, dispatch,rootState}){
        if (window.innerWidth > 700) {
            dispatch(types.ACT_HERO_HEIGHT);
        }else if(window.innerWidth <= 700 && rootState.basket.openBasket){
            state.height = 100;
            dispatch(types.ACT_OPEN_BASKET, null, { root: true })
        }else if (window.innerWidth <= 700 &&  rootState.sidebar.openSidebar){
            dispatch(types.ACT_OPEN_SIDEBAR, null, { root: true })
        }else{
            state.height = 100
        }
    }
};

const getters = {
    [types.GET_STICKY_HEADER]: state => {
        return state.stickyHeader
    },
    [types.GET_HERO_HEIGHT]: state => {
        return state.height
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}


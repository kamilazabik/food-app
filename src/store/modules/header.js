import * as types from '../types';

const state = {
    stickyHeader: false,
    sticky: 270,
    offset: 0,
    height: 270
};

const mutations = {
    [types.MUTATE_STICKY_HEADER](state, payload){
        let hero = document.getElementsByClassName('jumbotron-small')[0],
            pageOffset = window.pageYOffset,
            max700 = window.matchMedia("(max-width: 700px)");

        if(max700.matches){
            if (pageOffset < state.sticky && pageOffset !== 0 ) {
                state.offset = pageOffset;
                state.stickyHeader = false;
                state.height = 270 - pageOffset ;

                if(hero.offsetHeight < 50 ){
                    state.height = 50;
                }
            } else if(pageOffset >  220){
                state.stickyHeader = true;
            }

        }else {
            if  (pageOffset > state.sticky) {
                state.stickyHeader = true;
            } else if(pageOffset < state.sticky){
                state.stickyHeader = false;
            }
        }
    }
};

const actions = {
    [types.ACT_HERO_HEIGHT]({state} ){
        state.height = 300
            state.stickyHeader = false;

    },
    [types.ACT_RESIZE_HERO]({state, dispatch,rootState}){
        if (window.innerWidth > 700) {
            dispatch(types.ACT_HERO_HEIGHT);
        }else if(window.innerWidth <= 700 && rootState.basket.openBasket === true){
            state.height = 270
            dispatch(types.ACT_OPEN_BASKET, null, { root: true })
        }else {
            state.height = 270
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


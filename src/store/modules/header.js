import * as types from '../types';

const state = {
    stickyHeader: false,
    sticky: 270,
    offset: 0,
    height: 30
};

const mutations = {
    [types.MUTATE_STICKY_HEADER](state, payload){
        let header = document.getElementsByClassName('header')[0],
            pageOffset = window.pageYOffset,
            max700 = window.matchMedia("(max-width: 700px)");

        if(max700.matches){
            if (pageOffset < state.sticky && pageOffset !== 0 ) {
                state.offset = pageOffset;
                // header.classList.remove("sticky");
                state.stickyHeader = false;
                // header.parentNode.style.height = 270 - pageOffset + 'px';
                // state.height = 270 - pageOffset + 'px';
                state.height = 49 - pageOffset ;

                console.log(state.height)

                if(header.parentNode.offsetHeight < 50 ){
                    header.parentNode.style.height = 50 + 'px'
                }
            } else if(typeof header !== 'undefined' && pageOffset >  220){
                // header.classList.add("sticky");
                state.stickyHeader = true;
            }

        }else {
            if  (pageOffset > state.sticky && typeof header !== 'undefined') {
                // header.classList.add("sticky");
                state.stickyHeader = true;
            } else if(pageOffset < state.sticky && typeof header !== 'undefined'){
                state.stickyHeader = false;
                // header.classList.remove("sticky");
            }
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
    getters
}


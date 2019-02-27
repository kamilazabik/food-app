import Vue from 'vue'
import Vuex from 'vuex'

import menu from './store/menu'
import restaurantItems from './store/listRest'

Vue.use(Vuex);

export const store =  new Vuex.Store({
    modules: {
        menu,
        restaurantItems
    },
  state: {
      openBasket: false,
      stickyBasket: false,
      basket: [],



  },

  getters: {
    resItem: state=> {
        return state.restaurantItems
    },
    oneResMenu: state=> {
      return state.menu
    },
    checkBasket: state=> {
        return state.openBasket
    },
    checkStickyBasket: state=> {
        return state.stickyBasket
    },
    pushBasket: state=> {
        return state.basket
    }
  },
  mutations: {
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

  },


  actions: {
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
})

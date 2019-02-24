import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
      restaurantItems: {
          burger: {
              'name': 'Burgers',
              'type': 'American',
              'range': 5,
              'img': 'burger.png',
              'options': [{
                  'deliverCost': 6,
                  'deliveryTime': 30,
                  'minCost': 10
              }]
          },
          pizza: {
              'name': 'Pizza',
              'type': 'Italian',
              'range': 4,
              'img': 'pizza-slice.png',
              'options': [{
                  'deliverCost': 5,
                  'deliveryTime': 45,
                  'minCost': 30
              }]
          },
          pasta: {
              'name': 'Pasta',
              'type': 'Italian',
              'range': 4,
              'img': 'spaghetti.png',
              'options': [{
                  'deliverCost': 5,
                  'deliveryTime': 60,
                  'minCost': 30
              }]
          },
          burgers: {
              'name': 'Burgers',
              'type': 'American',
              'range': 5,
              'img': 'burger.png',
              'options': [{
                  'deliverCost': 5,
                  'deliveryTime': 35,
                  'minCost': 50
              }]
          },
      },
      menu: {
        burger: [ {
            type: 'burgers',
            name: 'Classic Burger',
            price: '20' ,
            ingredients: ['180g beef', 'cheddar', 'tomato', 'red onion', 'cucumber', 'sauce', 'lettuce']
          },
          {
            type: 'burgers',
            name: 'Spicy Burger',
            price: '18' ,
            ingredients: ['180g beef', 'cheddar', 'bacon', 'jalapeno peppers', 'tomato', 'cucumber', 'red onion', 'chilli', 'lettuce']
          }
          ,
          {
            type: 'burgers',
            name: 'Burger Blue Cheese',
            price: '18' ,
            ingredients: ['180g beef', 'blue cheese', 'bacon', 'lettuce', 'tomato', 'cucumber', 'red onion', 'sauce']
          },

          {
              type: 'burgers',
              name: 'Burger Blue Cheese 2',
              price: '18' ,
              ingredients: ['180g beef', 'blue cheese', 'bacon', 'lettuce', 'tomato', 'cucumber', 'red onion', 'sauce']
          }
        ]
      }
  },

  getters: {
    resItem: state=> {
        return state.restaurantItems
    },
    oneResMenu: state=> {
      return state.menu
    }
  },
  mutations: {

  },
  actions: {

  }
})

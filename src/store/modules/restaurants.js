import * as types from '../types';

const state = {
    filteredRestaurants: [],
    filteredData:[],
    filters: [],
    paramID: '',
    paramLink: '',
    params: {},
    restaurantItems: [
        {
            'name': 'Burgers',
            'type': 'American',
            'link': 'burgers',
            'range': 5,
            'img': 'burger.png',
            "types": ['burgers', 'drinks'],
            'options': [{
                'deliverCost': 6,
                'deliveryTime': 30,
                'minCost': 10
            }],
            'menu':{
                'burgers': [
                    {
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
                    },
                    {
                        type: 'burgers',
                        name: 'Burger Blue Cheese 3',
                        price: '18' ,
                        ingredients: ['180g beef', 'blue cheese', 'bacon', 'lettuce', 'tomato', 'cucumber', 'red onion', 'sauce']
                    },
                    {
                        type: 'burgers',
                        name: 'Burger Blue Cheese 4',
                        price: '18' ,
                        ingredients: ['180g beef', 'blue cheese', 'bacon', 'lettuce', 'tomato', 'cucumber', 'red onion', 'sauce']
                    }
                ],
                'drinks': [
                    {
                        type: 'drinks',
                        name: 'Coca-Cola',
                        price: '5'
                    }
                ]
            }
        },
         {
            'name': 'Sky Pizza',
            'type': 'Italian',
            'link': 'sky-pizza',
             "types": ['pizza', 'drinks'],
            'range': 4,
            'img': 'pizza-slice.png',
            'options': [{
                'deliverCost': 5,
                'deliveryTime': 45,
                'minCost': 30
            }],
             'menu':{
                 'sky-pizza': [
                     {
                         type: 'pizzas',
                         name: 'Mexicana Pizza',
                         kind: 'Hot',
                         price: '24' ,
                         ingredients: [' spicy tomato sauce', 'cheese', 'tomato', 'bacon', 'corn ', ' jalapeno']
                     },
                     {
                         type: 'pizzas',
                         name: 'Margherita Pizza',
                         kind: 'Classic',
                         price: '18' ,
                         ingredients: ['tomato sauce', 'cheese']
                     },
                     {
                         type: 'pizzas',
                         name: 'Peperoni Pizza',
                         kind: 'Classic',
                         price: '22' ,
                         ingredients: [' spicy tomato sauce', 'cheese', 'salami', 'onions']
                     },
                     {
                         type: 'pizzas',
                         name: 'Capriciosa Pizza',
                         kind: 'Classic',
                         price: '22' ,
                         ingredients: [' spicy tomato sauce', 'cheese', 'ham', 'mushrooms']
                     },
                     {
                         type: 'pizzas',
                         name: 'Hawaiian Pizza',
                         kind: 'Classic',
                         price: '22' ,
                         ingredients: [' spicy tomato sauce', 'cheese', 'ham', 'pineapple']
                     },
                     {
                         type: 'pizzas',
                         name: 'Farmhouse',
                         kind: 'Classic',
                         price: '22' ,
                         ingredients: [' olives', 'sweetcorn', 'mushrooms', 'red onion', 'mixed peppers']
                     },
                 ]
             }
        },
       {
            'name': 'Pasta',
            'type': 'Italian',
            'link': 'italian',
            'range': 4,
            'img': 'spaghetti.png',
            'options': [{
                'deliverCost': 5,
                'deliveryTime': 60,
                'minCost': 30
            }]
        },
        {
            'name': 'American Burgers',
            'type': 'American',
            'link': 'american-burgers',
            'range': 5,
            'img': 'burger.png',
            'options': [{
                'deliverCost': 5,
                'deliveryTime': 35,
                'minCost': 50
            }]
        },
         {
            'name': 'Chinese Food',
            'type': 'Chinese',
            'link': 'chinese-food',
            'range': 5,
            'img': 'rice.png',
            'options': [{
                'deliverCost': 6,
                'deliveryTime': 45,
                'minCost': 40
            }]
        },
        {
            'name': 'Sushi',
            'type': 'Shusi',
            'link': 'sushi-house',
            'range': 5,
            'img': 'sushi.png',
            'options': [{
                'deliverCost': 6,
                'deliveryTime': 5,
                'minCost': 40
            }]

        },
    ],

};

const getters = {
    [types.GET_REST_LIST]: state=> {
        return state.restaurantItems
    },
    [types.GET_FILTERED_REST]: state=> {
        return state.filteredData
    },
    [types.GET_FILTERS]: state=> {
        return state.filters
    },
    [types.GET_PARAM]: state=> {
        console.log(state.params)
        return state.params
    }
};

const mutations = {
    [types.MUTATE_SELECT_FILTER](state,type) {
        state.filters= [];
        let checkedFiters = state.restaurantItems.filter(obj => obj.type === type);
        console.log(checkedFiters);
        checkedFiters.forEach(element => {
            state.filters.push(element.type);
        });
        return state.filters;
    },
    [types.MUTATE_PARAM](state,param){
        state.params = {};
        state.params.id = param[1];
        state.params.link = param[0].link;
        // state.paramID = param.id;
        return state.params
    }
};

const actions = {
    [types.ACT_SELECT_FILTER]({commit}, type){
        commit(types.MUTATE_SELECT_FILTER, type)
    },

    [types.ACT_PARAM]({commit}, param){
        commit(types.MUTATE_PARAM, param)
    },

    [types.ACT_GET_FILTERED_DATA]({dispatch, state},type) {
        state.filteredData = state.restaurantItems;
        let filteredDataByfilters = [];
        dispatch(types.ACT_SELECT_FILTER, type);

        if (state.filters.length > 0) {

            filteredDataByfilters= state.filteredData.filter(obj => state.filters.every(val => obj.type.indexOf(val) >= 0));
            state.filteredData = filteredDataByfilters;
        }

    }
};


export default {
    state,
    getters,
    mutations,
    actions
}

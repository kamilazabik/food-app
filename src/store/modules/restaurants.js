const state = {
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
        pizza: [
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
        ]
    }
}

const getters = {
    resItem: state=> {
        console.log(state.restaurantItems)
        return state.restaurantItems
    },
    oneResMenu: state=> {
        return state.menu
    },
}

export default {
    state,
    getters
}

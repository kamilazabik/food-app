<template>
 <div class="account-orders">
   <h2 class="pb-5">Your orders:</h2>
    <div v-if="user.orders">
      <div class="card mb-3"  v-for="(item, index) in user.orders" :key="index">
        <div class="row no-gutters restaurant">
          <div class="col-sm-3">
            <div v-for = "rest in restItem" v-if="rest.name == item.basket[0].restName">
                <img :src="require('../../assets/img/' + rest.img)"  class="card-img restaurant-logo" alt="">
            </div>
          </div>
          <div class="col-sm-9">
            <div class="card-body restaurant-body">
              <h5 class="card-title rest-card__title restaurant-name">
                {{item.basket[0].restName}}
              </h5>
              <p class="card-text fs-2 my-3">Total:  {{item.total}} zł </p>
              <div class="row">
                <div class="col-3 account-orders-col">
                  <p>Details: </p>
                </div>
                <div class="col-9">
                  <div class="row" v-for="order in item.basket">
                    <div class="col-6">
                      <p>{{order.name}}</p>
                    </div>
                    <div class="col-2">
                      <p>x {{order.quantity}}</p>
                    </div>
                    <div class="col-4 text-right">
                      <p>{{order.price}} zł</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   <div v-else>
     <p class="fs-2">You do not have any orders yet</p>
   </div>

 </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import * as types from '../../store/types';

    export default {
        computed: {
            ...mapGetters({
                restItem: types.GET_REST_LIST,
                user: types.GET_USER,
                isAuthenticated: types.GET_IS_AUTHENTICATED,
                showOrders: types.GET_SHOW_ORDERS
            }),

            auth(){
                return this.isAuthenticated
            }
        },
        created(){
            this.$store.dispatch(types.ACT_FETCH_USER)
        }
    }


</script>
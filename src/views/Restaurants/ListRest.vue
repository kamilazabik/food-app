<template>
  <div class="restaurant-container ">
    <div class="restaurant-list">
      <div class="card mb-4" v-for="(item, index) in filteredData" :key="index">
        <router-link :to="{name: 'oneRest', params: {link:  item.link, id: index }}" :id="index" tag="a" :itemid="item" class="restaurant-box">
        <div class="row no-gutters restaurant-item">
          <div class="col-4 d-flex align-items-center restaurant-img" :style="{backgroundImage: 'url('+require('../../assets/img/' + item.img) + ')'}">
          </div>
          <div class="col-8 d-flex align-items-center">
            <div class="card-body restaurant-body">
             <h3 class="card-title restaurant-name">{{item.name}} </h3>
              <div class="bg-orange">

              </div>
              <div class="star-rating">
                <div class="back-stars">
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                <div class="front-stars" :style="{width: item.rating + '%'}">
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                  <i class="icon-star" aria-hidden="true"></i>
                </div>
                </div>
              </div>
              <p class="card-text restaurant-type">{{item.type}} </p>
              <p class="card-text" v-for="(option, index) in item.options" :key="index">
                <small class="text-muted restaurant-option">{{option.deliverCost}} zł</small>
                <small class="text-muted restaurant-option">ok. {{option.deliveryTime}} min</small>
                <small class="text-muted restaurant-option">Min. {{option.minCost}} zł</small></p>
            </div>
          </div>
        </div>
        </router-link>
      </div>
    </div>
    <app-basket></app-basket>
  </div>
</template>

<script>
  import * as types from '@/store/types';
  import {mapGetters} from 'vuex'
  import Basket from '@/components/Basket.vue'

   export default {
       data(){
           return{
               id: this.$route.params.id,
               type: this.$route.params.type,
               arr: [],

           }
       },
       computed: {
           ...mapGetters({
               resItem: types.GET_REST_LIST,
               filteredData: types.GET_FILTERED_REST
           })
       },
       components: {
           appBasket: Basket
       }
   }
</script>

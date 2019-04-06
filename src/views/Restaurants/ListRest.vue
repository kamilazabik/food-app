<template>
  <div class="restaurant-container ">
    <div class="restaurant-list">
      <div class="card mb-4" v-for="(item, index) in filteredData" :key="index">
        <div class="row no-gutters restaurant-item">
          <div class="col-4 d-flex align-items-center restaurant-img" :style="{backgroundImage: 'url('+require('../../assets/img/' + item.img) + ')'}">
            <!--<img :src="require('../../assets/img/' + item.img)"  class="card-img restaurant-logo" alt="">-->
          </div>
          <div class="col-8 d-flex align-items-center">
            <div class="card-body restaurant-body">
              <router-link :to="{name: 'oneRest', params: {link:  item.link, id: index }}" :id="index" class="card-title" tag="h5" :itemid="item"><a class="restaurant-name">{{item.name}} </a></router-link>
              <div class="bg-orange">
                <span class="restaurant-stars icon-star-empty"></span>
                <span class="restaurant-stars icon-star-empty"></span>
                <span class="restaurant-stars icon-star-empty"></span>
                <span class="restaurant-stars icon-star-empty"></span>
                <span class="restaurant-stars icon-star-empty"></span>
              </div>
              <p class="card-text restaurant-type">{{item.type}} </p>
              <p class="card-text" v-for="(option, index) in item.options" :key="index">
                <small class="text-muted restaurant-option">{{option.deliverCost}} zł</small>
                <small class="text-muted restaurant-option">ok. {{option.deliveryTime}} min</small>
                <small class="text-muted restaurant-option">Min. {{option.minCost}} zł</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-basket></app-basket>
  </div>
</template>

<script>
  import * as types from '../../store/types';
  import {mapGetters} from 'vuex'
  import Basket from '../../components/Basket.vue'

   export default {
       data(){
           return{
               id: this.$route.params.id,
               type: this.$route.params.type,
               arr: [],

           }
       },
       methods: {
           getPic(index) {
//               return require('../../assets/img/'+index)
           },

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

<style lang="scss">

  .col-4.d-flex.align-items-center{
    /*background-image: url("../../assets/img/burger.jpg");*/
    background-size: cover;
    background-position: 50% 50%;
  }
  /*.bg {*/
    /*&-orange {*/
      /*background-color: orange;*/
      /*overflow: hidden;*/
    /*}*/

    /*&-white {*/
      /*background-color: white;*/
    /*}*/

  /*}*/



</style>
<template>
  <div class="rest-con ">
    <div class="listRest">
      <div class="card mb-3" v-for="(item, index) in resItem" :key="index">
        <div class="row no-gutters restaurant">
          <div class="col-md-4">
            <img :src="require('../assets/img/' + item.img)"  class="card-img restaurant-logo" alt="">
          </div>
          <div class="col-md-8">
            <div class="card-body restaurant-body">
              <router-link :to="{name: 'oneRest', params: {id:  index }}" class="card-title" tag="h5"><a class="restaurant-name">{{item.name}} {{ $route.params.id }}</a></router-link>
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
    import {mapGetters} from 'vuex'
    import Basket from '../components/Basket.vue'


   export default {
       data(){
           return{
               id: this.$route.params.id,
           }
       },
       methods: {
           getPic(index) {
               return require('../assets/img/'+index)
           }
       },
       computed: {
           ...mapGetters({
               resItem: 'resItem'
           })
       },
       components: {
           appBasket: Basket
       },




   }
</script>

<style lang="scss">


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
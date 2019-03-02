<template>
  <div>
    <!--{{resItem}}-->
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

            <p class="card-text restaurant-type">{{item.type}}    {{index}} </p>
            <p class="card-text" v-for="(option, index) in item.options" :key="index">
              <small class="text-muted restaurant-option">{{option.deliverCost}} zł</small>
              <small class="text-muted restaurant-option">ok. {{option.deliveryTime}} min</small>
              <small class="text-muted restaurant-option">Min. {{option.minCost}} zł</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import {mapGetters} from 'vuex'


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




   }
</script>

<style lang="scss">
  .card-body {

  }

  .restaurant {
    min-height: 118px;
    padding: 16px;
    margin: 4px 0;
    position: relative;
    background-color: #fff;
    /*cursor: pointer;*/

    &-body {
      padding: 0;
    }


    &-name {
      font-size: 2.2rem;
      line-height: 2.4rem;
      font-weight: 600;
      text-align: left;
      color: #0a3847;
      margin: 0 0 4px;
      display: inline-block;
    }

    &-logo {
      max-width: 110px;
      text-align: center;
    }
    &-stars {
      font-size: 2rem;
    }

    &-type {
      font-size: 1.5rem;
      margin: 0.5rem 0;
      line-height: 2rem;
    }

    &-option {
      font-size: 1.4rem;
      display: inline-block;
      padding: 0 1rem;

      &:first-child {
        padding: 0 1rem 0 0;
      }
    }
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
<template>
  <div class="sidebar">
    <a class="sidebar-btn btn-blue" @click="filter()" >All</a>
    <a class="sidebar-btn" @click="filter('Italian')">Italian</a>
    <a class="sidebar-btn" @click="filter('Polish')">Polish</a>
    <a class="sidebar-btn" @click="filter('American')">American</a>
    <a class="sidebar-btn" @click="filter('Chinese')" >Chinese</a>
    <a class="sidebar-btn" @click="filter('Sushi')">Sushi</a>
  </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

  export default {
        data(){
            return{
              filteredData:[],
              filters: [],
            }
        },

      computed: {
          ...mapGetters({
              restItems: types.GET_REST_LIST
          }),
      },

      methods: {
          ... mapActions({
              filterRestaurants1: 'filterRestaurants',
              getFilteredData: types.ACT_GET_FILTERED_DATA
          }),

          filter(type){
              this.getFilteredData(type)
          }
      },
      mounted() {
          this.$store.dispatch(types.ACT_GET_FILTERED_DATA)
      }
  }

</script>
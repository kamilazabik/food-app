<template>
  <div class="sidebar">
    <a class="sidebar-btn btn-blue" @click="filter()" >All</a>
    <a class="sidebar-btn" @click="filter('Italian')">Italian</a>
    <a class="sidebar-btn">Polish</a>
    <a class="sidebar-btn" @click="filter('American')">American</a>
    <a class="sidebar-btn" @click="filter('Chinese')" >Chinese</a>
    <a class="sidebar-btn">Sushi</a>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

  export default {
        data(){
            return{
              type: 'Italian',
                filteredData:[],
                filters: [],
            }
        },

      computed: {
          ...mapGetters({
              restItems: 'resItem'
          }),
      },

      methods: {
          ... mapActions({
              filterRestaurants1: 'filterRestaurants',
              getFilteredData: 'getFilteredData'
          }),

          filter(type){
              this.getFilteredData(type)
          }
      },
      mounted() {
          this.$store.dispatch('getFilteredData')
      }
  }

</script>
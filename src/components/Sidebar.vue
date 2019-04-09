<template>
  <div class="sidebar"  :class="{'open': ifOpenSidebar == true, 'sticky': ifStickySidebar == true}" ref="sidebar" v-if="$route.path == '/restaurants'">
    <a class="sidebar-btn sidebar-btn--blue" @click="filter()" >All</a>
    <div v-for="(item, index) in filters" :key="index">
      <a class="sidebar-btn" @click="filter(item)">{{item}}</a>
    </div>
  </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import {mapMutations} from 'vuex'

  export default {
      data(){
          return{
            filteredData:[],
            filters: [],
            sticky: 260,
          }
      },

      computed: {
          ...mapGetters({
              restItems: types.GET_REST_LIST,
              ifOpenSidebar: types.GET_OPEN_SIDEBAR,
              ifStickySidebar: types.GET_STICKY_SIDEBAR
          }),
      },

      methods: {
          ... mapActions({
              filterRestaurants1: 'filterRestaurants',
              getFilteredData: types.ACT_GET_FILTERED_DATA
          }),

          ...mapMutations({
              stickSidebar: types.MUTATE_STICKY_SIDEBAR,
              mobileSidebar: types.MUTATE_MOBILE_SIDEBAR
          }),

          stickySidebar() {
              this.stickSidebar()
          },

          filter(type){
              this.getFilteredData(type)
          },

          manageSidebar(e){
              this.mobileSidebar()
          },
          filterType(){
              let filters= [];
              this.restItems.forEach(function (item) {
                  if(filters.indexOf(item.type) === -1){
                      filters.push(item.type)
                  }
              });
              this.filters = filters;
          }
      },

      created(){
          this.filterType();
          addEventListener('resize', this.manageSidebar)
      },

      destroyed() {
          document.removeEventListener("resize", this.manageSidebar);
      },

      mounted() {
          window.addEventListener('scroll', this.stickySidebar);
          this.$store.dispatch(types.ACT_GET_FILTERED_DATA)
      }
  }
</script>
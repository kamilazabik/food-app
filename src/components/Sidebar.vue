<template>
  <div class="sidebar"  :class="{'open': ifOpenSidebar == true}" ref="sidebar" v-if="$route.path == '/restaurants'">
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
    import {mapMutations} from 'vuex'

  export default {
        data(){
            return{
              filteredData:[],
              filters: [],
              sticky: 260
            }
        },

      computed: {
          ...mapGetters({
              restItems: types.GET_REST_LIST,
              ifOpenSidebar: types.GET_OPEN_SIDEBAR
          }),
      },

      methods: {
          ... mapActions({
              filterRestaurants1: 'filterRestaurants',
              getFilteredData: types.ACT_GET_FILTERED_DATA
          }),

          ...mapMutations({
              setSidebar: types.MUTATE_SIDEBAR_VIS
          }),

          stickHeader() {
              if(window.matchMedia("(min-width: 700px)").matches){
                  if (typeof this.$refs["sidebar"] !== 'undefined' && window.pageYOffset > this.sticky) {
                      this.$refs["sidebar"].classList.add("sticky");
                  } else if (typeof this.$refs["sidebar"] !== 'undefined') {
                      this.$refs["sidebar"].classList.remove("sticky");
                  }
              }
          },

          filter(type){
              this.getFilteredData(type)
          },

          manageSidebar(e){
              if (typeof this.$refs["sidebar"] !== 'undefined' && window.innerWidth > 700) {
                  this.$refs["sidebar"].classList.remove('open')
              }else if (window.innerWidth > 600){
                  console.log(this.$refs["sidebar"])
              }

          }
      },
      created(){
          addEventListener('resize', this.manageSidebar)
      },

      destroyed() {
          document.removeEventListener("resize", this.manageSidebar);
      },

      mounted() {
          window.addEventListener('scroll', this.stickHeader);
          this.$store.dispatch(types.ACT_GET_FILTERED_DATA)
      }
  }

</script>
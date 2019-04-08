<template>
  <div class="sidebar" :class="{'open': ifOpenSidebar == true, 'sticky': ifStickySidebar == true}">
    <router-link tag="a" class="sidebar-btn" :to="{name: 'UserData'}">Personal Data</router-link>
    <router-link tag="a" class="sidebar-btn" :to="{name: 'userOrders'}">Your Orders</router-link>
    <a class="sidebar-btn" @click="onLogout">Logout</a>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import {mapMutations} from 'vuex'
    import * as types from '../../store/types';

 export default {
     methods: {
         ... mapActions({
            showOrders: types.ACT_SHOW_ORDERS
         }),

         ...mapMutations({
             stickSidebar: types.MUTATE_STICKY_SIDEBAR,
             mobileSidebar: types.MUTATE_MOBILE_SIDEBAR
         }),

         stickySidebar() {
             this.stickSidebar()
         },

         manageSidebar(){
             this.mobileSidebar()
         },
         showUserOrders(){
             this.showOrders()
         },
         onLogout(){
             this.$store.dispatch(types.ACT_LOGOUT)
         }
     },
     computed: {
         ...mapGetters({
             ifOpenSidebar: types.GET_OPEN_SIDEBAR,
             ifStickySidebar: types.GET_STICKY_SIDEBAR
         }),
     },
     destroyed() {
         document.removeEventListener("resize", this.manageSidebar);
     },
     created(){
         addEventListener('resize', this.manageSidebar)
     },
     mounted() {
         window.addEventListener('scroll', this.stickySidebar);
     }
 }

</script>
<template>
  <div class="sidebar">
    <router-link tag="a" class="sidebar-btn" :to="{name: 'UserData'}">Personal Data</router-link>
    <router-link tag="a" class="sidebar-btn" :to="{name: 'userOrders'}">Your Orders</router-link>
    <a class="sidebar-btn" @click="onLogout">Logout</a>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as types from '../../store/types';

 export default {
     methods: {
         ... mapActions({
            showOrders: types.ACT_SHOW_ORDERS
         }),
         showUserOrders(){
             this.showOrders()
         },
         onLogout(){
             this.$store.dispatch(types.ACT_LOGOUT)
         }
     },

 }

</script>
<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p> Your mail address {{email}}</p>
    <!--<p> {{user.orders}}</p>-->
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import * as types from '../store/types';
  export default {
      computed: {
          email(){
              return !this.user ? false : this.user.email
          },
          ...mapGetters({
              user: types.GET_USER
          }),
      },
      created(){
          this.$store.dispatch(types.ACT_FETCH_USER)
      }
  }


</script>
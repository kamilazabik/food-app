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
  export default {
      computed: {
          email(){
              return !this.$store.getters.user ? false : this.$store.getters.user.email
          },
          ...mapGetters({
              user: 'user'
          }),
      },
      created(){
          this.$store.dispatch('fetchUser')
      }
  }


</script>